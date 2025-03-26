import React, { useEffect, useState } from "react";
import { Button } from "@heroui/button";

const data = [
  {
    name: "Bank of America",
    description: "AirTable - Onboarding",
    closed: true,
    status: "New",
    progress: 10,
    dueDate: "19 Sep",
  },
  {
    name: "IBM",
    description: "Raised $300M",
    closed: true,
    status: "New",
    progress: 10,
    dueDate: "19 Sep",
  },
  {
    name: "Louis Vuitton",
    description: "FTX - Investment",
    closed: false,
    status: "In-Progress",
    progress: 90,
    dueDate: "19 Sep",
  },
];

const statusClass = (status: string) => {
  return status === "New"
    ? "bg-green-200 text-green-800"
    : "bg-yellow-200 text-yellow-800";
};

export default function TodoData() {
  const [checkedRows, setCheckedRows] = useState<number[]>([]);

  const [isAddedData, setIsAddedData] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");

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

  const filters = ["All", "New", "In-Progress"];

  const [tableData, setTableData] = useState(data);

  const addData = () => {
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
  };

  const toggle = () => {
    setIsAddedData((prev) => !prev);
  };

  const handleDelete = (index: number) => {
    const updatedData = tableData.filter((_, i) => i !== index);
    setTableData(updatedData);
    setCheckedRows((prev) => prev.filter((i) => i !== index));
  };

  const filteredData =
    selectedFilter === "All"
      ? tableData
      : tableData.filter((item) => item.status === selectedFilter);

  const handleCheckboxChange = (index: number) => {
    setCheckedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    const updatedData = tableData.map((item, index) => {
      if (checkedRows.includes(index)) {
        return { ...item, closed: true };
      }
      return item;
    });
    setTableData(updatedData);
  }, [checkedRows]);

  return (
    <div className="p-24 text-gray-700  relative6">
      <Button
        size="small"
        className={`bg-blue-500 text-white p-6  rounded-full absolte z-20 cursor-pointer ${
          isAddedData ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => toggle()}
        disabled={isAddedData}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </Button>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Todo Overview</h2>
        <select
          className="border p-2 rounded cursor-pointer"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          {filters.map((filter) => (
            <option key={filter} value={filter}>
              {filter}
            </option>
          ))}
        </select>
      </div>

      <div>
        <table className="w-full border-collapse relative">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">
                <input type="checkbox" />
              </th>
              <th className="p-3">Name</th>
              <th className="p-3">Description</th>
              <th className="p-3">Status</th>
              <th className="p-3">Due Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={`border-t border-e-gray-300 ${
                  checkedRows.includes(index)
                    ? "line-through text-gray-400"
                    : " "
                }`}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={checkedRows.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.description}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded ${statusClass(item.status)}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-3">{item.dueDate}</td>
                <td className="p-3">
                  <button
                    className="mr-2 bg-red-600 hover:bg-red-500 text-white p-2 rounded cursor-pointer"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                type="text"
                required
                placeholder="Add a new todo"
                className="border w-full border-gray-300 rounded p-2"
              />
              <input
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                type="text"
                required
                placeholder="Description"
                className="border w-full border-gray-300 rounded p-2"
              />
              <input
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
                type="date"
                className=" w-full border border-gray-300 rounded p-2"
              />
              <select
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
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
                className="w-full bg-blue-500 text-white p-2 rounded cursor-pointer"
              >
                Add Todo
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
