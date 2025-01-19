import axios from '../../../utils/axios';
import React, { useEffect } from 'react';

const BookingReciept = () => {
 

  useEffect(() => {
    console.log('JJJJ');

    fetchBookingDetails();
  }, []);

  const fetchBookingDetails = async () => {
     const id = localStorage.getItem('USER_ID');
    const bookinDetails = await axios.get(
      `/user/getbookingreciept?userId=${id}`
    );
    console.log(bookinDetails);
  };

  return <div>bookingReciept</div>;
};

export default BookingReciept;
