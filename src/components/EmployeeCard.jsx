import { memo } from "react";

function EmployeeCard({ id,name, role, department, salary,onDelete,onEdit}) {

  console.log("EmployeeCard rendered:", id);
    return (
    <div className="  overflow-hidden shadow-lg bg-white border border-gray-100 hover:shadow-xl transition-shadow duration-300 ease-in-out">
      {/* Card Image */}
      <div className="relative h-24 w-full overflow-hidden">
        
      </div>

      {/* Card Content */}
      <div className="p-5 ">
        {/* <div className="flex items-center gap-2 mb-2">
          {category && (
            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              {category}
            </span>
          )}
          {metaText && <span className="text-xs text-gray-400">• {metaText}</span>}
        </div> */}


        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 text-center">
          {name}
        </h3>

        <p className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 text-center">
          {role}
        </p>

        <h3 className="text-gray-600 text-sm mb-4 line-clamp-2 text-center">
         Department: {department}
        </h3>
        <h3 className="text-gray-600 text-sm mb-4 line-clamp-2 text-center">
            Salary: {salary}
        </h3>
        <div className="flex gap-2">
          <div className="text-center">
            <button  onClick={()=>onDelete(id)} className=" border-2 rounded-sm border-black ring-1 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ">Delete me </button>
        </div>

        <div className="text-center">
            <button  onClick={()=>onEdit(id)} className=" border-2 rounded-sm border-black ring-1 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ">Edit  me </button>
        </div>
        </div>

        

      </div>
    </div>
  );
}

export default memo(EmployeeCard);