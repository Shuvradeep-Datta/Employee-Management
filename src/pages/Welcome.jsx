import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import Product from "./Product";
function Welcome({name, role, department}){

    const [count, setCount] = useState(0);

    return(
    <div>

        <Helmet>
                <title>Welcome | Employee Management</title>
                <meta
                    name="description"
                    content="Employee Management Application"
                />
            </Helmet>

        <h1 className='text-3xl '>
            Welcome {name}!
        </h1>
        <p className='text-3xl '>Role: {role}</p>
        <p className='text-3xl '>Department: {department}</p>
        <p>{count}</p>

        <button onClick={()=>setCount(count+1)}>Click Me</button>

        <Product
            name="Macbook"
            price = {120000} 
        />


        <Outlet/>
    </div>);
}

export default Welcome;