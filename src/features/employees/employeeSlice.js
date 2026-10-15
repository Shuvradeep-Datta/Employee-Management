
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { employeeApi } from "../../api/employeeApi";

//fetch
export const fetchEmployees = createAsyncThunk(
    "employees/fetchEmployees",
    async (_, { rejectWithValue }) => {
        try {
            const response = await employeeApi.getAll();
            console.log("API response:", response);
            console.log("Employee data:", response.data);
            return response;
        } catch (error) {
            return rejectWithValue(
                error.message || "Failed to fetch employees"
            );
        }
    }
);

//Delete 
export const deleteEmployeeAsync = createAsyncThunk(
    "employees/deleteEmployeeAsync",
    async (id, { rejectWithValue }) => {
        try {
            await employeeApi.delete(id);
            return id;
        } catch (error) {
            return rejectWithValue(
                error.message || "Failed to delete employee"
            );
        }
    }
);

//Add

export const addEmployeeAsync = createAsyncThunk(
    "employees/addEmployeeAsync",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await employeeApi.create({
                ...formData,
                salary: Number(formData.salary),
            });

            return response;
        } catch (error) {
            return rejectWithValue(
                error.message || "Failed to add employee"
            );
        }
    }
);

//Edit

export const updateEmployeeAsync = createAsyncThunk(
    "employees/updateEmployeeAsync",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await employeeApi.update(id, {
                ...data,
                salary: Number(data.salary),
            });

            return response;
        } catch (error) {
            return rejectWithValue(
                error.message || "Failed to update employee"
            );
        }
    }
);



const initialState = {
    employee: [],
    loading: false,
    errors: null,
};

const employeeSlice = createSlice({
    name: "employees",
    initialState,

    reducers: {
        setEmployees: (state, action) => {
            state.employee = action.payload;
        },

        addEmployee: (state, action) => {
            state.employee.push(action.payload);
        },

        deleteEmployee: (state, action) => {
            state.employee = state.employee.filter(
                (employee) => employee.id !== action.payload
            );
        },

        editEmployee: (state, action) => {
            const index = state.employee.findIndex(
                (employee) => employee.id === action.payload.id
            );

            if (index !== -1) {
                state.employee[index] = action.payload;
            }
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setErrors: (state, action) => {
            state.errors = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.employee = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload || action.error.message;
            })
            .addCase(deleteEmployeeAsync.fulfilled, (state, action) => {
                state.employee = state.employee.filter(
                    (emp) => emp.id !== action.payload
                );
            })

            .addCase(addEmployeeAsync.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(addEmployeeAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.employee.push(action.payload);
            })
            .addCase(addEmployeeAsync.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload || action.error.message;
            })

            .addCase(updateEmployeeAsync.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(updateEmployeeAsync.fulfilled, (state, action) => {
                state.loading = false;

                const updatedEmployee = action.payload;

                const index = state.employee.findIndex(
                    emp => String(emp.id) === String(updatedEmployee.id)
                );

                if (index !== -1) {
                    state.employee[index] = updatedEmployee;
                }
            })
            .addCase(updateEmployeeAsync.rejected, (state, action) => {
                state.loading = false;
                state.errors =
                    action.payload || action.error.message || "Failed to update employee";
            });


    },
});

export const {
    setEmployees,
    addEmployee,
    deleteEmployee,
    editEmployee,
    setLoading,
    setErrors,
} = employeeSlice.actions;

export default employeeSlice.reducer;
