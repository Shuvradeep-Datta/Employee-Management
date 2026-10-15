import { useCallback, useState } from "react";

function Counter(){
    const [count,setCount] = useState(0);


    const handleClick = useCallback(()=>{
        console.log("Button Clicked");
        
  },[]);
  return(
    <div>
        <h2>{count}</h2>
        <button onClick={()=>setCount(count+1)}> Increase Me</button>
        
    </div>
  );
}