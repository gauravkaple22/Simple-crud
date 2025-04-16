import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditStudent = () => {

  const { studentId } = useParams();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [Place, setPlace] = useState("");
  const [Phone, setPhone] = useState("");

  const [validation, setValidation] = useState(false);

  const navigate = useNavigate();
  // const [studentData, setStudentData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8000/students/${studentId}`)
      .then((res) => res.json())
      .then((data) => {
        setId(data.id);
        setName(data.name);
        setPlace(data.Place);
        setPhone(data.Phone);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = { id, name, Place, Phone };

    fetch(`http://localhost:8000/students/${studentId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(studentData)
    })
      .then((res) => {
        alert("Student Data Updated Successfully");
        navigate('/');
      })
      .catch((err) => console.log(err.message))
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">Edit Student Details</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
            <input
              type="text"
              id="id"
              name="id"
              value={id}
              required
              onChange={e => setId(e.target.value)}
              onMouseDown={() => setValidation(true)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
            {id.length === 0 && validation && (
              <span className="text-red-500 text-sm mt-1 block">Please Enter Your ID</span>
            )}
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              onMouseDown={() => setValidation(true)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
            {name.length === 0 && validation && (
              <span className="text-red-500 text-sm mt-1 block">Please Enter Your Name</span>
            )}
          </div>

          <div>
            <label htmlFor="place" className="block text-sm font-medium text-gray-700">Place</label>
            <input
              type="text"
              id="place"
              name="place"
              required
              value={Place}
              onChange={e => setPlace(e.target.value)}
              onMouseDown={() => setValidation(true)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
            {Place.length === 0 && validation && (
              <span className="text-red-500 text-sm mt-1 block">Please Enter Your Place</span>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              required
              value={Phone}
              maxLength={10}
              onChange={e => setPhone(e.target.value)}
              onMouseDown={() => setValidation(true)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
            {Phone.length === 0 && validation && (
              <span className="text-red-500 text-sm mt-1 block">Please Enter Your Phone</span>
            )}
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-300 cursor-pointer"
            >
              Update
            </button>
            <Link
              to="/"
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
            >
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditStudent
