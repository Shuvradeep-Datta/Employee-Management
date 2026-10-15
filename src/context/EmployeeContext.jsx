import { createContext, useContext, useEffect, useReducer, useState } from "react";
import employees from "../data/employees.json";
import { employeeApi } from "../api/employeeApi";


const EmployeeContext = createContext();
const initialEmployees = [];

// function getInitialEmployees() {
//     const storedEmployees = localStorage.getItem("employee");
//     if (storedEmployees) {
//         return JSON.parse(storedEmployees);

//     }
//     return [];
// }


function saveEmployeeToStorage(employee) {
    localStorage.setItem("employee", JSON.stringify(employee));
}


function employeeReducer(state, action) {
    switch (action.type) {
        case 'SET_EMPLOYEES':
            return action.payload;
        case 'ADD_Employee':
            return [...state, action.payload];
        case 'DELETE_EMPLOYEE':
            return state.filter(
                employee => employee.id !== action.payload
            );
        case 'EDIT_EMPLOYEE':
            return state.map(employee =>
                employee.id === action.payload.id ? action.payload : employee
            );
        default:
            return state;
    }

}


export function EmployeeProvider({ children }) {
    // const [employee, setEmployee] = useState(employees);
    const [employee, dispatch] = useReducer(employeeReducer, initialEmployees);
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState(null)

    useEffect(() => {
        // localStorage.setItem("employee", JSON.stringify(employee));
        saveEmployeeToStorage(employee);

    }, [employee]);



    //Fetch Api

    useEffect(() => {
    async function fetchEmployees() {
        try {
            setLoading(true);

            const data = await employeeApi.getAll();

            console.log("Employees API response:", data);

            if (!Array.isArray(data)) {
                throw new Error("Employee API did not return an array");
            }

            dispatch({
                type: "SET_EMPLOYEES",
                payload: data
            });
        } catch (error) {
            console.error("Fetch employees failed:", error);
            setErrors(error.message);
        } finally {
            setLoading(false);
        }
    }

    fetchEmployees();
}, []);




    //add
    async function addEmployee(formData) {



        console.log(formData);
        console.log("Add employee from Context", formData);




        // const newEmployee = {
        //     id: Math.max(...employee.map(emp => emp.id)) + 1,
        //     name: formData.name,
        //     role: formData.role,
        //     department: formData.department,
        //     salary: formData.salary
        // };


        // setEmployee(prevEmployee => [
        //     ...prevEmployee,
        //     newEmployee
        // ]);

        try {

            const newEmployee = await employeeApi.create(formData);
            console.log("POST Response:", newEmployee);
            dispatch({
                type: "ADD_Employee",
                payload: newEmployee
            });
        } catch (errors) {

            setErrors(errors.message);

        } finally {

        }






    }

    //delete
    async function deletingEmployee(id) {
        // setEmployee(prevEmployee =>
        //     prevEmployee.filter(emp => emp.id !== id)
        // );

        try {
            await employeeApi.delete(id);
            dispatch({
                type: "DELETE_EMPLOYEE",
                payload: id
            });
        } catch (errors) {
            setErrors(errors.message);
        }
    }


    //edit
    async function editEmployee(id, formData) {
        // setEmployee(prevEmployee=>
        //     prevEmployee.map(emp=>
        //         emp.id === id
        //         ?{...emp,...formData}
        //         :emp
        //     )
        // );

        try {
            const updatedEmployee = {
                id,
                ...formData
            };

            const updatedData = await employeeApi.update(id, updatedEmployee);


            dispatch({
                type: "EDIT_EMPLOYEE",
                payload: updatedData,
            });
        } catch (errors) {
            setErrors(errors.message)
        }

    }

    return (
        <EmployeeContext.Provider value={
            {
                employee,
                loading,
                errors,
                addEmployee,
                deletingEmployee,
                editEmployee
            }
        }>
            {children}
        </EmployeeContext.Provider>
    );
}


export default EmployeeContext;