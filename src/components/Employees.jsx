import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useDebounce from "../hooks/useDeBounce";
import { fetchEmployees, deleteEmployeeAsync  } from "../features/employees/employeeSlice";

function Employees() {

  console.log("Employees rendered");

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const dispatch = useDispatch();

  // const {
  //   employee = [],
  //   // editEmployee, we will send to other due to this here it is removing
  //   loading,
  //   errors,

  // } = useSelector((state) => state.employees);


  const employee = useSelector(state => state.employees.employee);
  const loading =  useSelector(state => state.employees.loading);
  const errors = useSelector(state => state.employees.errors);


  // const {
  //   employee = [],
  //   // editEmployee, we will send to other due to this here it is removing
  //   deletingEmployee,
  // } = useContext(EmployeeContext)

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const totalSalary = useMemo(() => {
    return employee.reduce((total, employee) => total + employee.salary, 0);
  }, [employee]);

  const filteredEmployees = useMemo(() => {
    const query = debouncedSearchTerm.trim().toLowerCase();
    if (!query) {
      return employee;
    }

    return employee.filter((emp) =>
      [emp.name, emp.department].some((value) =>
        String(value ?? "").toLowerCase().includes(query)
      )
    );
  }, [employee, debouncedSearchTerm]);

  console.log(totalSalary);






  return (
    <>
      <Helmet>
        <title>Employee View Page</title>
        <meta
          name="description"
          content="Employee Management Application"
        />
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        {loading && <p className="text-center">Loading employees...</p>}

        {errors && (
          <p className="text-center text-red-600">
            Failed to load employees: {errors}
          </p>
        )}
        {/* Header Section */}
        <div className="max-w-7xl mx-auto mb-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Employee Directory
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your team members, roles, and salaries here.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              Total: {employee.length}
            </span>
          </div>
          <div className="max-w-xl mx-auto mt-6 sm:mt-0">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or department..."
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredEmployees.map((emp) => {
            // Fallback key process if emp.id is missing

            const empId = emp.id;
            return (
              <div
                key={empId}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Card Header Background / Avatar Accent */}
                <div>
                  <div className="h-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                      <div className="w-14 h-14 rounded-full bg-white p-1 shadow-md">
                        <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xl uppercase">
                          {emp.name && emp.name.charAt(0)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="pt-8 p-5 text-center">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                      {emp.name}
                    </h3>

                    <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mt-1 mb-3">
                      {emp.role}
                    </p>

                    <div className="bg-gray-50 rounded-xl p-3 space-y-1 text-sm text-gray-600">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-xs">Department</span>
                        <span className="font-medium text-gray-700">{emp.department}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-xs">Salary</span>
                        <span className="font-semibold text-emerald-600">
                          {emp.salary}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Card Actions */}
                <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex gap-3">
                  <button
                    onClick={() => navigate(`/employees/${empId}/edit`)}
                    className="flex-1 py-2 px-3 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(deleteEmployeeAsync(empId))}
                    className="flex-1 py-2 px-3 text-xs font-semibold text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-600 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-1"
                  >
                    Delete
                  </button>

                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredEmployees.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300 max-w-md mx-auto">
            <p className="text-gray-500 text-sm">
              {employee.length === 0
                ? "No employees found."
                : "No employees match your search."}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Employees;