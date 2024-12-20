import axios from 'axios';
import React, { useState, useEffect } from 'react';

const UserTrackingFB = () => {
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMcQs = async () => {
      try {
        const res = await axios.get("http://localhost:8080/getScore");
        setMcqs(res.data); // Assuming the backend returns an array of objects
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    getMcQs();
  }, []);

  return (
    <div className='bg-slate-300 min-h-screen p-4'>
      {loading ? (
        <div className="flex justify-center items-center h-screen text-black">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="table-auto mx-auto w-full border-collapse border border-gray-200">
            {/* Table Header */}
            <thead className='bg-red-500 text-white'>
              <tr>
                <th className='border border-gray-200 px-4 py-2'>#</th>
                <th className='border border-gray-200 px-4 py-2'>Name</th>
                <th className='border border-gray-200 px-4 py-2'>Question Types</th>
                <th className='border border-gray-200 px-4 py-2'>Total Score</th>
                <th className='border border-gray-200 px-4 py-2'>Total Attempts</th>
                <th className='border border-gray-200 px-4 py-2'>Total Time</th>
                <th className='border border-gray-200 px-4 py-2'>Date</th>
              </tr>
            </thead>
            <tbody className='text-black'>
              {mcqs.length > 0 ? (
                mcqs.map((item, index) => {
                  return (
                    <tr key={index} className={index % 2 === 0 ? 'bg-a6a6a6' : 'bg-white'}>
                      <th className='border border-gray-200 px-4 py-2 text-left font-bold'>{index + 1}</th>
                      <td className='border border-gray-200 px-4 py-2'>{item.studentName}</td>
                      <td className='border border-gray-200 px-4 py-2'>{item.questionTypes}</td>
                      <td className='border border-gray-200 px-4 py-2 font-bold'>{item.score}</td>
                      <td className='border border-gray-200 px-4 py-2'>{item.totalAttempts}</td>
                      <td className='border border-gray-200 px-4 py-2'>{item.time}</td>
                      <td className='border border-gray-200 px-4 py-2'>{new Date(item.timestamp).toLocaleDateString()}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="text-center p-4">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserTrackingFB;
