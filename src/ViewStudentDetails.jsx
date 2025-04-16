import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaUserGraduate, FaMapMarkerAlt, FaPhoneAlt, FaIdCard } from 'react-icons/fa';

const ViewStudentDetails = () => {
  const { studentId } = useParams();
  const [studentData, setStudentData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8000/students/${studentId}`)
      .then((res) => res.json())
      .then((data) => setStudentData(data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl w-full max-w-lg p-8 space-y-6 transition-all duration-500">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FaUserGraduate className="text-indigo-600" />
            Student Profile
          </h2>
          <Link
            to="/"
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition"
          >
            <FaArrowLeft />
            <span>Back</span>
          </Link>
        </div>

        <div className="space-y-5 text-lg text-gray-700">
          <DetailRow icon={<FaIdCard />} label="ID" value={studentData.id} />
          <DetailRow icon={<FaUserGraduate />} label="Name" value={studentData.name} />
          <DetailRow icon={<FaMapMarkerAlt />} label="Place" value={studentData.Place} />
          <DetailRow icon={<FaPhoneAlt />} label="Phone" value={studentData.Phone} />
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 border-b border-gray-200 pb-3">
    <div className="text-indigo-600 text-xl">{icon}</div>
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-gray-900 font-semibold">{value || '-'}</p>
    </div>
  </div>
);

export default ViewStudentDetails;
