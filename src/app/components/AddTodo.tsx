import { useState } from "react";



const AddTodo = () => {
    const [isAddedData, setIsAddedData] = useState(false);
    
    
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        date: "",
        role: "new",
      });

     const handleSubmit = (event: React.FormEvent) => {
       event.preventDefault();
       const newEntry = {
         name: formData.name,
         description: formData.description,
         closed: false,
         status: formData.role === "new" ? "New" : "In-Progress",
         progress: formData.role === "new" ? 10 : 50,
         dueDate: formData.date,
       };
       setTableData((prevData) => [...prevData, newEntry]);
       setFormData({ name: "", description: "", date: "", role: "new" });
       console.log("Added Data Successfully");
       setIsAddedData(false);
     };

  return (
    <div
      className={` bg-gray-50 w-full h-full ${
        isAddedData ? "flex justify-center items-center " : "hidden"
      }`}
    >
      <div className=" absolute flex items-center justify-center top-0 mx-auto bg-white shadow-md h-2/4 w-2/4 rounded">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-4 bg-white shadow-md rounded"
        >
          <h2 className="text-xl font-bold">Add Todo</h2>
          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            type="text"
            placeholder="Add a new todo"
            className="border w-full border-gray-300 rounded p-2"
          />
          <input
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            type="text"
            placeholder="Description"
            className="border w-full border-gray-300 rounded p-2"
          />
          <input
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            type="date"
            className=" w-full border border-gray-300 rounded p-2"
          />
          <select
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            value={formData.role}
            className="border w-full border-gray-300 rounded p-2"
          >
            <option value="todo">Todo</option>
            <option value="new">New</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Add Todo
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
