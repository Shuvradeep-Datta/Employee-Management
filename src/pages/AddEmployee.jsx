import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addEmployeeAsync } from "../features/employees/employeeSlice";
import { Helmet } from 'react-helmet-async';

function AddEmployee({ onCancelEdit }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm();

  // const { addEmployee } = useContext(EmployeeContext);

  const dispatch = useDispatch();
  const { loading, errors: reduxError } = useSelector(
    state => state.employees
  );

  const navigate = useNavigate();





  async function onSubmit(formData) {
    try {
      await dispatch(
        addEmployeeAsync({
          ...formData,
          salary: Number(formData.salary),
        })
      ).unwrap();

      reset();
      navigate("/employees");
    } catch (error) {
      console.error("Failed to add employee:", error);
    }
  }



  return (
    <>
      <Helmet>
        <title>Add Employee</title>
        <meta
          name="description"
          content="Employee Management Application"
        />
      </Helmet>
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="mb-6 border-b border-gray-100 pb-4">
          <h1 className="text-2xl font-bold text-gray-800">Add Employee</h1>
          <p className="text-sm text-gray-500 mt-1">Enter employee details below to register them in the system.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Employee Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Employee Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                {...register("name", { required: "Name is required" })}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all outline-none ${errors.name
                  ? "border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Role <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Software Engineer"
                {...register("role", { required: "Role is required" })}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all outline-none ${errors.role
                  ? "border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  }`}
              />
              {errors.role && (
                <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
              )}
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Department <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Engineering"
                {...register("department", { required: "Department is required" })}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all outline-none ${errors.department
                  ? "border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  }`}
              />
              {errors.department && (
                <p className="text-red-500 text-xs mt-1">{errors.department.message}</p>
              )}
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Salary ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="e.g. 75000"
                {...register("salary", {
                  required: "Salary is required",
                  min: { value: 10000, message: "Salary must be at least 10000" }
                })}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all outline-none ${errors.salary
                  ? "border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  }`}
              />
              {errors.salary && (
                <p className="text-red-500 text-xs mt-1">{errors.salary.message}</p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 items-center justify-end pt-4 border-t border-gray-100">
            {onCancelEdit && (
              <button
                type="button"
                onClick={onCancelEdit}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all duration-200"
              >
                Cancel Editing
              </button>
            )}
            {reduxError && (
              <p className="text-red-600 text-sm">{reduxError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Adding Employee..." : "Add Employee"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddEmployee;