import  { useEffect, useState } from  'react';

function useFetch(){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
            async function fetchData(){
                try{

                    setLoading(true);
                    const response = await fetch(url);

                    if(!response.ok){
                        throw new Error("Failed to fetch data....");
                    }

                    const result = await response.json();
                    setData(result);

                }catch(error){
                    setError(error.message);

                }finally{
                    setLoading(false);

                }
            }
            fetchData();
    },[url]);

    return {
        data,
        loading,
        error
    };
}

export default useFetch;