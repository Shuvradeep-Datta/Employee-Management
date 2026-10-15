
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EmployeeCard from "./EmployeeCard";

describe("EmployeeCard", () => {
  const employee = {
    id: 1,
    name: "Rahul Das",
    role: "Developer",
    department: "IT",
    salary: 50000,
  };

  it("renders employee details", () => {
    render(
      <EmployeeCard
        {...employee}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
      />
    );

    expect(screen.getByText("Rahul Das")).toBeInTheDocument();
    expect(screen.getByText("Developer")).toBeInTheDocument();
    expect(screen.getByText(/Department:\s*IT/)).toBeInTheDocument();
    expect(screen.getByText(/Salary:\s*50000/)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /delete me/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /edit me/i })
    ).toBeInTheDocument();
  });

  it("calls onDelete with employee id", () => {
    const onDelete = vi.fn();

    render(
      <EmployeeCard
        {...employee}
        onDelete={onDelete}
        onEdit={vi.fn()}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: /delete me/i })
    );

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it("calls onEdit with employeeId",()=>{
    const onEdit = vi.fn();
    render(
        <EmployeeCard 
        {...employee}
        onDelete={vi.fn()}
        onEdit={onEdit}
        />

    );

    fireEvent.click(
        screen.getByRole("button", { name: /edit me/i })
    );

    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith(1);
  });
});
