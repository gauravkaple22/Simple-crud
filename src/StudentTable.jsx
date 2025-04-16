import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { WiSnow } from 'react-icons/wi';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const displayDetails = (id) => {
    navigate('/student/view/' + id);
  }

  const editDetails = (id) => {
    navigate('/student/edit/' + id)
  }

  const deleteDetails = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      fetch(`http://localhost:8000/students/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            alert("Student Data Deleted Successfully");
            // Remove the deleted student from the state without reloading the page
            window.location.reload();
          } else {
            alert("Failed to delete student data.");
          }
        })
        .catch((err) => console.log(err.message));
    }
  }



  useEffect(() => {
    fetch('http://localhost:8000/students')
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-4xl border border-gray-300 mx-auto">
        <div className="p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Student Records</h2>
          <div className="mb-4 flex justify-between items-center">
            <Link
              className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
              to="/student/create"
            >
              Add New Student
            </Link>
          </div>
          <table className="min-w-full bg-white border-collapse border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="text-left bg-gray-100 text-gray-600">
                <th className="px-4 py-3 font-medium">SR NO</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Place</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students && students.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-t border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'} hover:bg-gray-200`}
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.Place}</td>
                  <td className="px-4 py-3">{item.Phone}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-4">
                      <button
                        onClick={() => displayDetails(item.id)}
                        className="text-blue-600 hover:text-blue-800 transition duration-200 cursor-pointer"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => editDetails(item.id)}
                        className="text-yellow-600 hover:text-yellow-800 transition duration-200 cursor-pointer"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteDetails(item.id)}
                        className="text-red-600 hover:text-red-800 transition duration-200 cursor-pointer"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentTable;
