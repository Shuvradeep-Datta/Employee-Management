import { Outlet } from 'react-router-dom';
function EmployeeLayout(){
    return (
        <div>
            <h1>
                Employee Management
            </h1>
            <Outlet />


            
        </div>
    );
}

export default EmployeeLayout;