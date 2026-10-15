
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, BrowserRouter } from "react-router-dom";
import AddEmployee from "./AddEmployee";

// Mock Redux hooks
vi.mock("react-redux", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
  };
});

// Mock navigation
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("AddEmployee form validation", () => {
  const mockDispatch = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    useDispatch.mockReturnValue(mockDispatch);

    useSelector.mockImplementation((selector) =>
      selector({
        employees: {
          loading: false,
          errors: null,
        },
      })
    );

    useNavigate.mockReturnValue(mockNavigate);
  });


  
function fillValidForm() {
  fireEvent.change(screen.getByPlaceholderText("e.g. John Doe"), {
    target: { value: "Rahul Das" },
  });

  fireEvent.change(
    screen.getByPlaceholderText("e.g. Software Engineer"),
    { target: { value: "Developer" } }
  );

  fireEvent.change(screen.getByPlaceholderText("e.g. Engineering"), {
    target: { value: "IT" },
  });

  fireEvent.change(screen.getByPlaceholderText("e.g. 75000"), {
    target: { value: "50000" },
  });
}


  function renderForm() {
    return render(
      <HelmetProvider>
        <BrowserRouter>
          <AddEmployee />
        </BrowserRouter>
      </HelmetProvider>
    );
  }

  it("shows required field errors when submitted empty", async () => {
    renderForm();

    fireEvent.click(
      screen.getByRole("button", { name: /add employee/i })
    );

    expect(
      await screen.findByText("Name is required")
    ).toBeInTheDocument();

    expect(screen.getByText("Role is required")).toBeInTheDocument();
    expect(screen.getByText("Department is required")).toBeInTheDocument();
    expect(screen.getByText("Salary is required")).toBeInTheDocument();

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("shows validation error when salary is below 10000", async () => {
    renderForm();

    fireEvent.change(screen.getByPlaceholderText("e.g. John Doe"), {
      target: { value: "Rahul Das" },
    });

    fireEvent.change(
      screen.getByPlaceholderText("e.g. Software Engineer"),
      { target: { value: "Developer" } }
    );

    fireEvent.change(screen.getByPlaceholderText("e.g. Engineering"), {
      target: { value: "IT" },
    });

    fireEvent.change(screen.getByPlaceholderText("e.g. 75000"), {
      target: { value: "5000" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /add employee/i })
    );

    expect(
      await screen.findByText("Salary must be at least 10000")
    ).toBeInTheDocument();

    expect(mockDispatch).not.toHaveBeenCalled();
  });


  
it("dispatches the action and navigates after successful submission", async () => {
  mockDispatch.mockReturnValue({
    unwrap: () => Promise.resolve({ id: 1, name: "Rahul Das" }),
  });

  renderForm();
  fillValidForm();

  fireEvent.click(
    screen.getByRole("button", { name: /add employee/i })
  );

  await waitFor(() => {
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/employees");
  });
});

it("does not navigate when submission fails", async () => {
  const consoleError = vi
    .spyOn(console, "error")
    .mockImplementation(() => {});

  mockDispatch.mockReturnValue({
    unwrap: () => Promise.reject(new Error("API failed")),
  });

  renderForm();
  fillValidForm();

  fireEvent.click(
    screen.getByRole("button", { name: /add employee/i })
  );

  await waitFor(() => {
    expect(consoleError).toHaveBeenCalledWith(
      "Failed to add employee:",
      expect.any(Error)
    );
  });

  expect(mockNavigate).not.toHaveBeenCalled();

  consoleError.mockRestore();
});

it("disables the submit button while loading", () => {
  useSelector.mockImplementation((selector) =>
    selector({
      employees: {
        loading: true,
        errors: null,
      },
    })
  );

  renderForm();

  const submitButton = screen.getByRole("button", {
    name: /adding employee/i,
  });

  expect(submitButton).toBeDisabled();
});

it("displays the Redux error message", () => {
  useSelector.mockImplementation((selector) =>
    selector({
      employees: {
        loading: false,
        errors: "Failed to load employees",
      },
    })
  );

  renderForm();

  expect(
    screen.getByText("Failed to load employees")
  ).toBeInTheDocument();
});


});
