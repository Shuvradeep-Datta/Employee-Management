import { api } from "./api";

export const  employeeApi = {
    //get
    getAll  : ()=>api.get("/employees"),
    //get by id
    getById : (id)=> api.get(`/employees/${id}`),
    // create
    create : (employee)=>api.post(`/employees`,employee),

    //update
    update: (id,employee)=> api.put(`/employees/${id}`,employee),
    //delete
    delete: (id)=>api.delete(`/employees/${id}`)


}