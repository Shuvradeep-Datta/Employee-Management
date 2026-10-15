import axios from 'axios'
// const BASE_URL = "http://localhost:8080"

// async function request (endpoint, option={}){
//     const response = await fetch(`${BASE_URL}${endpoint}`,{
//             headers: {
//                 "Content-Type": "application/json",
//                 ...option.headers
//             },
//             ...option
//     });

//     if(!response.ok){
//         throw new Error(`${response.status}`)
//     }
    
//     if(response.status === 204){
//         return null;
//     }

//     return response.json();

// }


const apiClient = axios.create(
    {
        baseURL: import.meta.env.VITE_API_URL, //"http://localhost:8080",
        headers: {
            "Content-Type": "application/json"
        }
    });

export const api={
    get: async(endpoint) => { 
        //request(endpoint)//for fetch
        const response = await apiClient.get(endpoint);//axios.get(`${BASE_URL}${endpoint}`);
        return response.data;
    },
    post: async (endpoint, data) =>{
            const response = await apiClient.post(endpoint,data);//axios.post(`${BASE_URL}${endpoint}`,data);
            return response.data; 
    },
    
    put: async (endpoint,data) =>{
        const response  = await apiClient.put(endpoint,data); //axios.put(`${BASE_URL}${endpoint}`,data);
        return response.data;
    },
        // request (endpoint,{
        //         method: "PUT",
        //         body: JSON.stringify(data)
        // }),
    delete: async (endpoint) =>{
        const response = await apiClient.delete(endpoint);//axios.delete(`${BASE_URL}${endpoint}`);
        return response.data;
    }

};