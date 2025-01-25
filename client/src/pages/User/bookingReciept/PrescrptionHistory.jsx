import React, { useEffect, useState } from 'react';
import axios from '../../../utils/axios';
import { message } from 'antd';

const PrescrptionHistory = () => {
  const id = localStorage.getItem('USER_ID');
  const [prescription, setPrescription] = useState([]);

  const fetchUserprescriptionHistory = async () => {
    try {
      const prescriptionDetails = await axios.get(
        `/user/getprescriptionhistory/${id}`
      );
      setPrescription(prescriptionDetails.data.info);
      console.log('122344545', prescription);
    } catch (error) {
      console.error('Error fetching booking details:', error);
      message.error('Failed to load prescription history.');
    }
  };

  useEffect(() => {
    fetchUserprescriptionHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 ">
      <header className="bg-blue-600 text-white py-4">
        <h1 className="text-3xl font-semibold text-center">Prescription History</h1>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10">
        {prescription.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {prescription.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 max-w-xs mx-auto"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4">Prescription Details</h2>

                <div className="space-y-4">
                  <div className="flex flex-col">
                    <p className="text-gray-600 font-medium">Date:</p>
                    <p className="text-gray-800 font-semibold">{item.date}</p>
                  </div>

                  <div className="flex flex-col">
                    <p className="text-gray-600 font-medium">Hospital:</p>
                    <p className="text-gray-800 font-semibold">{item.hospital.name}</p>
                  </div>

                  <div className="flex flex-col">
                    <p className="text-gray-600 font-medium">Doctor:</p>
                    <p className="text-gray-800 font-semibold">
                      Dr. {item.doctor.firstname} {item.doctor.lastname}
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <p className="text-gray-600 font-medium">Prescription:</p>
                    <p className="text-gray-800 font-semibold">{item.prescription}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-lg text-gray-600">
            No prescription history available.
          </div>
        )}
      </main>
    </div>
  );
};

export default PrescrptionHistory;
