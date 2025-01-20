import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from '../../../utils/axios';
import { toast, ToastContainer } from 'react-toastify';

const ViewSlotDetails = () => {
  const [slotDetails, setSlotDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userBooked, setUserBooked] = useState(false);
  const { id } = useParams();
  const Navigate = useNavigate();
  const userId = localStorage.getItem('USER_ID');
  const getSlotDetails = async () => {
    try {
      const response = await axios.get(`/slot/doctor/${id}`);
      setLoading(false);
      if (response.data && response.data.length > 0) {
        setSlotDetails(response.data[0]);
      } else {
        setSlotDetails([]);
      }
    } catch (error) {
      console.error('Error fetching slot details:', error);
      setLoading(false);
    }
  };



  const onSlotBook = async (sTime, eTime, date,identifyId) => {
    try {
      var slot = await axios.post('/user/bookslot', {
        doctorId: id,
        userId,
        sTime,
        eTime,
        date,
        slotId: slotDetails._id,
        identifyId
      });
      setUserBooked(!userBooked);
      toast.success('Slot Booked successfully');
    setTimeout(()=>Navigate(`/user/bookingreciept?userId=${userId}`),3000) 
      console.log('frgvrfrbh', slot);
    } catch (error) {
      console.log('slot', error);
      toast.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    getSlotDetails();
  }, [userBooked]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <ToastContainer />
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Available Slot Details
        </h1>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : slotDetails === null ? (
          <p className="text-red-600">
            Failed to load data. Please try again later.
          </p>
        ) : slotDetails.length === 0 ? (
          <p className="text-gray-600">
            No appointments set by the doctor yet.
          </p>
        ) : (
          <div className="space-y-4">
            {slotDetails.slot.map(slot => (
              <div key={slot._id} className="border rounded-lg p-4 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-700">
                  Date: {slot.date}
                </h2>
                <div className="mt-2">
                  <h3 className="text-sm font-medium text-gray-600">
                    Available Times:
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {slot.slotDetails.map(detail => (
                      <li
                        key={detail._id}
                        className="flex justify-between items-center p-3 bg-white shadow-sm rounded-lg hover:bg-gray-100 transition"
                      >
                        <span className="text-gray-700">
                          {detail.starttime} - {detail.endtime}
                        </span>

                        {detail?.isFull ? (
                          <button className="text-gray-500">
                            Not available
                          </button>
                        ) : (
                          <button
                            className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition"
                            onClick={() =>
                              onSlotBook(
                                detail.starttime,
                                detail.endtime,
                                slot.date,
                                detail._id
                              )
                            }
                          >
                            Book Now
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSlotDetails;
