import { describe,it, expect } from "vitest";
import { filterEmployees } from "./EmployeeUtils";



describe("filterEmployees",()=>{
    const employee =[
        {id: 1, name: "Deep"},
        {id: 2, name: "Akash"},
        {id: 3, name: "Deep Das"},
    ];

    it("should return matching employees",()=>{
        const result = filterEmployees(employee, "Deep");
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe("Deep");
    });
    it("should return without case senstivity",()=>{
       const result = filterEmployees(employee, "deep");
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe("Deep");
    });

    it("should return empty array when no match exists",()=>{
        const result = filterEmployees(employee, "Asim");
        expect(result).toHaveLength(0);
    })
});
