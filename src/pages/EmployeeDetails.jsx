import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchEmployees } from "../features/employees/employeeSlice";
import NotFound from "./NotFound";

function EmployeeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { employee = [], loading, errors } = useSelector(
        state => state.employees
    );

    useEffect(() => {
        if (employee.length === 0) {
            dispatch(fetchEmployees());
        }
    }, [dispatch, employee.length]);

    const selectedEmployee = employee.find(
        emp => String(emp.id) === String(id)
    );

    // Loading State
    if (loading && employee.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
                <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-gray-500 font-medium">Loading employee details...</p>
            </div>
        );
    }

    // Error State
    if (employee.length === 0 && errors) {
        return (
            <div className="max-w-md mx-auto mt-12 p-6 bg-red-50 border border-red-200 rounded-2xl shadow-sm text-center">
                <p className="text-red-600 font-semibold mb-4">{errors}</p>
                <button
                    onClick={() => dispatch(fetchEmployees())}
                    className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-medium shadow-sm hover:bg-red-700 transition-all cursor-pointer"
                >
                    Retry Connection
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6 mt-8">
            {selectedEmployee ? (
                <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8 mb-6 transition-all duration-300">
                    {/* Header with Avatar placeholder */}
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold shadow-inner">
                            {selectedEmployee.name?.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-2xl font-extrabold text-gray-800">
                                {selectedEmployee.name}
                            </h2>
                            <span className="inline-block mt-1 px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full uppercase tracking-wider">
                                {selectedEmployee.role}
                            </span>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <span className="block text-gray-400 font-medium mb-1">Department</span>
                            <span className="text-gray-800 font-semibold text-base">
                                {selectedEmployee.department}
                            </span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <span className="block text-gray-400 font-medium mb-1">Salary</span>
                            <span className="text-emerald-600 font-bold text-base">
                                ${selectedEmployee.salary}
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mb-6">
                    <NotFound />
                </div>
            )}

            {/* Back Button */}
            <button
                onClick={() => navigate("/employees")}
                className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl shadow-xs hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all duration-200 cursor-pointer active:scale-95"
            >
                <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
                <span>Back to Employees</span>
            </button>
        </div>
    );
}

export default EmployeeDetails;