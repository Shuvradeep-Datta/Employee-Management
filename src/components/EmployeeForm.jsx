
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import EmployeeForm from "../components/EmployeeForm";
import { addEmployeeAsync } from "../features/employees/employeeSlice";

function AddEmployee() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, errors } = useSelector(
        (state) => state.employees
    );

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        department: "",
        salary: "",
    });

    const [formError, setFormError] = useState("");

    function handleFormChange(event) {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleAddEmployee(data) {
        setFormError("");

        try {
            await dispatch(addEmployeeAsync(data)).unwrap();
            navigate("/employees");
        } catch (error) {
            setFormError(
                typeof error === "string"
                    ? error
                    : "Failed to add employee. Please try again."
            );
        }
    }

    function handleCancel() {
        navigate("/employees");
    }

    return (
        <>
            <Helmet>
                <title>Add Employee</title>
            </Helmet>

            <div className="max-w-xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">
                    Add Employee
                </h1>

                <EmployeeForm
                    formData={formData}
                    onFormChange={handleFormChange}
                    onAddEmployee={handleAddEmployee}
                    error={formError || errors}
                    editingEmployee={false}
                    onCancelEdit={handleCancel}
                />

                {loading && (
                    <p className="mt-3 text-blue-600">
                        Saving employee...
                    </p>
                )}

                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mt-4 rounded bg-gray-200 px-4 py-2"
                >
                    Back to previous
                </button>
            </div>
        </>
    );
}

export default AddEmployee;
