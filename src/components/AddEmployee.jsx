import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function AddEmployee(){

    const navigate = useNavigate();

    function handleSubmit(){
        //employee add

        navigate("/employees")



    }

    return (
        <>

        
        <div>
        <button onClick={handleSubmit}>

            click me
        </button>
        <button onClick={()=> navigate(-1)}>
            back to previous
        </button>

        </div>

        </>
        
    );
}

export default AddEmployee;