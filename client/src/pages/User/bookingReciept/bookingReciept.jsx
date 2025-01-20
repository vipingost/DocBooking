import axios from '../../../utils/axios';
import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import QRCode from "qrcode";
import { saveAs } from "file-saver";

const BookingReciept = () => {
  const [bookingDetails, setBookingDetails] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  

  useEffect(() => {
    fetchBookingDetails();
  }, []);

  const fetchBookingDetails = async () => {
    try {
      const id = localStorage.getItem('USER_ID'); 
      const responsecheck = await axios.get(
        `/user/getbookingreciept?userId=${id}`
      );
      setBookingDetails(responsecheck.data.appointments); 
    } catch (err) {
      console.error('Error fetching booking details:', err);
      setError('Failed to load booking details.');
    } finally {
      setLoading(false);
    }
  };

 

  const downloadPDF = (booking) => {
    const doc = new jsPDF();
    const { user, date, bookedSlotTime, doctor, hospital, startTime, endTime } = booking;

    // Add a header with a background color
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(75, 85, 99); // Set color to a grayish tone similar to bg-indigo-300
    doc.rect(0, 0, 210, 20, 'F'); // Add background for the header
    doc.text('Booking Receipt', 14, 15);

    // Set body font and text color
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);

    // Start adding the details
    doc.setFontSize(12);
    doc.text(`Name: ${user.firstname} ${user.lastname}`, 14, 40);
    doc.text(`Date: ${date}`, 14, 50);
    doc.text(`Allocated Time Slot: ${bookedSlotTime}`, 14, 60);

    // Add appointment details
    doc.text(`Appointment with Dr. ${doctor.firstname} ${doctor.lastname}`, 14, 80);
    doc.text(`Location: ${hospital.name}`, 14, 90);
    doc.text(`Time: ${startTime} - ${endTime}`, 14, 100);

    // Add a box around the content to mimic the card design
    doc.setLineWidth(0.5);
    doc.rect(10, 30, 190, 80); // Outer box around the content

    // Inner box for the appointment details section
    doc.rect(10, 120, 190, 40);

    // Add some text padding and format the content
    doc.setFontSize(10);
    doc.text(`Doctor: Dr. ${doctor.firstname} ${doctor.lastname}`, 14, 130);
    doc.text(`Hospital: ${hospital.name}`, 14, 140);
    doc.text(`From: ${startTime} - ${endTime}`, 14, 150);

    // Download the PDF with a custom file name
    doc.save(`Booking_Receipt_${user.firstname}_${user.lastname}.pdf`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-600 text-lg">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-red-500 text-lg">
        {error}
      </div>
    );
  }

  return (
    <>
      <header className="bg-blue-600 text-white shadow-md py-10">
        <h1 className="text-3xl font-semibold text-center">Your Bookings</h1>
      </header>

      <main className="bg-gray-100 py-10 min-h-screen pt-36">
        <div className="container mx-auto flex flex-wrap justify-center gap-8 px-4">
          {bookingDetails.length > 0 ? (
            bookingDetails.map((booking, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-96"
              >
                <h2 className="text-xl font-bold text-gray-700 text-center mb-4">
                  Appointment Details
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600 font-medium">Name:</p>
                    <p className="text-gray-800 font-semibold">
                      {booking.user.firstname} {booking.user.lastname}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600 font-medium">Date:</p>
                    <p className="text-gray-800 font-semibold">{booking.date}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-gray-600 font-medium">
                      Allocated Time Slot:
                    </p>
                    <p className="text-blue-600 text-2xl font-bold">
                      {booking.bookedSlotTime}
                    </p>
                  </div>
                  <div className="border-t pt-4 text-gray-700">
                    <p>
                      Appointment with{' '}
                      <strong>
                        Dr. {booking.doctor.firstname} {booking.doctor.lastname}
                      </strong>
                      <br />
                      Location: <strong>{booking.hospital.name}</strong>
                      <br />
                      Time: <strong>{booking.startTime}</strong> -{' '}
                      <strong>{booking.endTime}</strong>
                    </p>
                  </div>
                </div>

               
                <div className="text-center mt-4">
                  <button
                    onClick={() => downloadPDF(booking)}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-600 text-center text-lg">
              No booking details available.
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default BookingReciept;
