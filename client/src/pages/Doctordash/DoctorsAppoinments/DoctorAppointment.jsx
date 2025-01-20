import React, { useEffect, useState } from 'react';
import axios from '../../../utils/axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DoctorAppointment = () => {
  const doctorId = localStorage.getItem('DOCTOR_ID');
  const [doctorSlotDetails, setDoctorSlotDetails] = useState([]);
  const [patients, setPatients] = useState(null);
 
  const Navigate = useNavigate();

  // Fetch slot details for the doctor
  const getSlotAccordingToDoctor = async () => {
    try {
      const response = await axios.get(
        `/doctor/getappointments?doctorId=${doctorId}`
      );
      setDoctorSlotDetails(response.data.slots || []);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Fetch patients for a specific slot
  const goToPatients = async (slotId, date) => {
    try {
      const response = await axios.get(
        `/doctor/getpatients?slodId=${slotId}&doctorId=${doctorId}&date=${date}`
      );

      if (response.data.success) {
        setPatients(response.data.todaysPatients);
      }
    } catch (error) {
      setPatients(null);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const doPrescription = async (userId,sTime,eTime) => {
    Navigate(`/doctor/userprescription/${userId}`, {
      state: { doctorId, sTime,eTime },
    });
  };

  // Fetch slots when component mounts
  useEffect(() => {
    getSlotAccordingToDoctor();
  }, []);

  return (
    <>
      <ToastContainer />

      <div className="container mx-auto p-6">
        {/* Render doctor slot details */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {doctorSlotDetails.length > 0 ? (
            doctorSlotDetails.map(item => (
              <div
                key={item._id}
                className="slot-item p-4 bg-white shadow-lg rounded-lg border-2 border-gray-200 cursor-pointer hover:bg-blue-100 transition duration-200 ease-in-out"
                onClick={() => goToPatients(item._id, item.date)}
              >
                <h3 className="text-xl font-semibold text-blue-600">
                  {item.date}
                </h3>
                <p className="text-gray-500 mt-2">Click to view patients</p>
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-500 col-span-3">
              No slots available.
            </p>
          )}
        </div>

        {/* Render patients for the selected slot */}
        {patients ? (
          <div className="patients-container space-y-6">
            {patients.slotDetails.map(slot => (
              <div
                key={slot.starttime}
                className="slot-details p-6 bg-white shadow-lg rounded-lg border-2 border-gray-200"
              >
                <h2 className="text-2xl font-bold text-blue-600">
                  Time Slot: {slot.starttime} - {slot.endtime}
                </h2>
                <p className="text-lg text-gray-500 mt-2">
                  {slot.isFull ? 'Slot Full' : 'Available'}
                </p>

                {slot.patients && slot.patients.length > 0 ? (
                  <ul className="mt-4">
                    {slot.patients.map(patient => (
                      <li
                        key={patient.userId._id}
                        className="py-2 px-4 border-b hover:bg-gray-100"
                        onClick={() => doPrescription(patient.userId._id,slot.starttime,slot.endtime)}
                      >
                        <p className="text-lg text-gray-700">
                          Patient Name: {patient.userId.firstname || 'Unknown'}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-gray-500">
                    No patients in this slot.
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-500 mt-6">
            Select a slot to view patients.
          </p>
        )}
      </div>
    </>
  );
};

export default DoctorAppointment;
