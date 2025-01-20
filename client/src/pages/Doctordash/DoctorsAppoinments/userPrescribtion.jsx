import { useLocation, useParams } from 'react-router-dom';
import axios from '../../../utils/axios';
import { useEffect, useState } from 'react';
import Input from 'antd/es/input/Input';
import { Button } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
const { TextArea } = Input;

const UserPrescription = () => {
  const { userId } = useParams();
  const [userDetails, setuserdetails] = useState({});
  const [change, setChange] = useState('');
  const [appId, setAppoId] = useState('');

  const location = useLocation();
  const { doctorId, sTime, eTime } = location.state || {};
  var User_appointment_details;

  const getUser_appointmentDetails_for_prescription = async () => {
    User_appointment_details = await axios.post(
      '/doctor/userprescription',
      { userId, doctorId, sTime, eTime }
    );
    setAppoId(User_appointment_details.data.info._id);
    setuserdetails(User_appointment_details.data.info.user);
  };

  const onChangeClick = async () => {
    try {
      const changeClick = await axios.post('/doctor/addprescription', { change, appoinmentId: appId });
      if (changeClick.data.success) {
        toast.success(changeClick.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getUser_appointmentDetails_for_prescription();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="w-screen h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-6">
          {/* User Details Section */}
          <div className="text-gray-800">
            <h2 className="text-2xl font-semibold mb-4">Patient Information</h2>
            <p><strong>Name:</strong> {userDetails.firstname} {userDetails.lastname}</p>
            <p><strong>Age:</strong> {userDetails.age}</p>
            <p><strong>Weight:</strong> {userDetails.weight}</p>
            <p><strong>Height:</strong> {userDetails.height}</p>
            <p><strong>Blood Group:</strong> {userDetails.bloodgroup}</p>
            <p><strong>Phone Number:</strong> +91 {userDetails.phonenumber}</p>
            <p><strong>Address:</strong> {userDetails.address}</p>
          </div>

          {/* Prescription Input Section */}
          <div className="space-y-4">
            <label htmlFor="prescription" className="block text-lg font-medium text-gray-700">Prescription</label>
            <TextArea
              id="prescription"
              value={change}
              onChange={(e) => setChange(e.target.value)}
              rows={6}
              placeholder="Write the prescription here..."
              className="w-full p-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end">
              <Button
                type="primary"
                size="large"
                onClick={onChangeClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md focus:outline-none"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPrescription;
