
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import {
    fetchEmployees,
    updateEmployeeAsync,
} from "../features/employees/employeeSlice";

function EditEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { employee = [], loading, errors: reduxError } = useSelector(
        state => state.employees
    );

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (employee.length === 0) {
            dispatch(fetchEmployees());
        }
    }, [dispatch, employee.length]);

    const selectedEmployee = employee.find(
        emp => String(emp.id) === String(id)
    );

    useEffect(() => {
        if (selectedEmployee) {
            setValue("name", selectedEmployee.name ?? "");
            setValue("role", selectedEmployee.role ?? "");
            setValue("department", selectedEmployee.department ?? "");
            setValue("salary", selectedEmployee.salary ?? "");
        }
    }, [selectedEmployee, setValue]);

    const onSubmit = async (data) => {
        try {
            await dispatch(
                updateEmployeeAsync({ id, data })
            ).unwrap();

            navigate("/employees");
        } catch (error) {
            console.error("Failed to update employee:", error);
        }
    };

    if (employee.length === 0 && loading) {
        return <p className="text-center mt-8">Loading employee...</p>;
    }

    if (!selectedEmployee) {
        return (
            <div className="max-w-2xl mx-auto p-8">
                <p className="text-red-600">
                    {reduxError || "Employee not found."}
                </p>
                <button
                    type="button"
                    onClick={() => navigate("/employees")}
                    className="mt-4 px-4 py-2 rounded bg-gray-200"
                >
                    Back to Employees
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="mb-6 border-b border-gray-100 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    Edit Employee
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Update the employee details below.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Employee Name *
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. John Doe"
                            {...register("name", {
                                required: "Name is required",
                            })}
                            className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none ${
                                errors.name
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-300 focus:border-indigo-500"
                            }`}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Role *
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Software Engineer"
                            {...register("role", {
                                required: "Role is required",
                            })}
                            className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none ${
                                errors.role
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-300 focus:border-indigo-500"
                            }`}
                        />
                        {errors.role && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.role.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Department *
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Engineering"
                            {...register("department", {
                                required: "Department is required",
                            })}
                            className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none ${
                                errors.department
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-300 focus:border-indigo-500"
                            }`}
                        />
                        {errors.department && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.department.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Salary ($) *
                        </label>
                        <input
                            type="number"
                            placeholder="e.g. 75000"
                            {...register("salary", {
                                required: "Salary is required",
                                valueAsNumber: true,
                                min: {
                                    value: 10000,
                                    message: "Salary must be at least 10000",
                                },
                            })}
                            className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none ${
                                errors.salary
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-300 focus:border-indigo-500"
                            }`}
                        />
                        {errors.salary && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.salary.message}
                            </p>
                        )}
                    </div>
                </div>

                {reduxError && (
                    <p className="text-red-600 text-sm">{reduxError}</p>
                )}

                <div className="flex gap-3 items-center justify-end pt-4 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={() => navigate("/employees")}
                        className="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {loading ? "Updating..." : "Update Employee"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditEmployee;
