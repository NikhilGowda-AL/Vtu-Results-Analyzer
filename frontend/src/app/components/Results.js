import React from 'react';

const ResultsTable = ({ results }) => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <h1 className='text-2xl mb-2'>Hello, {results.name}!</h1>
      <div className="flex items-center justify-center flex-col md:flex-row bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <div className="w-full md:w-3/4 p-4">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-200">Subject</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-200">Internal Marks</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-200">External Marks</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-200">Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(results.results).map(([subject, marks]) => (
                <tr key={subject}>
                  <td className="border border-gray-300 px-4 py-2 text-center">{subject}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{marks["Internal Marks"]}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{marks["External Marks"]}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{marks.Total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full h-[100%] md:w-1/4 p-4 bg-green-100 rounded-lg flex flex-col items-center justify-center shadow-inner">
          <h2 className="text-2xl font-bold mb-4 text-green-900">Summary</h2>
          <p className="text-xl font-semibold mb-2">SGPA: <span className="text-green-800">{results.sgpa[0]}</span></p>
          <p className="text-xl font-semibold">Total Marks: <span className="text-green-800">{results.sgpa[1]}</span></p>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;
