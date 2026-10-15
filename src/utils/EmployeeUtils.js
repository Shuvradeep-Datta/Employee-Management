export function filterEmployees(employees,searchTerm){
    return employees.filter(employee=>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
}