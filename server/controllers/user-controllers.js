const User = require('../db/models/user-schema');
const Hospital = require('../db/models/hospital-schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Doctor = require('../db/models/doctor-schema');
const Slot = require('../db/models/slot-schema');
const mongoose = require('mongoose');
const { tempFunc } = require('../dependencies/temp');
const Appointment = require('../db/models/appointment-schema');

module.exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .json({ error: true, message: 'Account already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 2);
    const dbresponse = await User.create({
      ...req.body,
      email: email,
      password: hashedPassword,
    });
    return res.status(201).json({ message: 'You are signed up' });
  } catch (e) {
    res.status(500).json({ message: e.message, error: true });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ message: 'Email or Password incorrect', error: true });
    }
    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching) {
      return res.status(400).json({ message: 'Email or Password incorrect' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '2D',
      }
    );
    res.status(200).json({
      message: 'You are logged in',
      token: token,
      id: user._id,
      role: 'USER',
      name: `${user.firstname} ${user.lastname}`,
    });
  } catch (e) {
    res.status(500).json({ message: e.message, error: true });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).json({ message: e.message, error: true });
  }
};

module.exports.updateuserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await User.findByIdAndUpdate(id, body);
    return res.status(200).json({
      message: 'user updated successfully',
      error: false,
      success: true,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message, error: true });
  }
};

module.exports.getHospitalLocation = async (req, res) => {
  try {
    const { doctorId, slotId, sTime, eTime, userId, date } = req.body;
    const Location = await Hospital.find();
    const locationArray = Location.map(item => ({
      value: item.location,
      label: item.location,
    }));
    const uniqueLocations = Array.from(
      new Map(locationArray.map(item => [item.value, item])).values()
    );
    return res
      .status(200)
      .json({ message: 'location fetched', uniqueLocations });
  } catch (error) {
    return res.status(500).json({ message: e.message, error: true });
  }
};

module.exports.getHospitalsByLocation = async (req, res) => {
  try {
    const hospital = await Hospital.find({
      location: req.query.location,
    }).populate('department');

    console.log(req.query.location);

    return res.status(200).json({ message: 'Hospital fetched', hospital });
  } catch (error) {
    return res.status(500).json({ message: e.message, error: true });
  }
};
module.exports.getDoctorByHospital = async (req, res) => {
  try {
    const doctor = await Doctor.find({
      hospital: req.query.hospitalId,
    }).populate('department');

    console.log(req.query.hospitalId);

    return res.status(200).json({ message: 'doctor fetched', doctor });
  } catch (error) {
    return res.status(500).json({ message: e.message, error: true });
  }
};

module.exports.doSLotBooking = async (req, res) => {
  const { doctorId, slotId, sTime, eTime, userId, date, identifyId } = req.body;

  try {
    
    const slotArray = await Slot.findOne({ doctorId: doctorId, _id: slotId });
    if (!slotArray) {
      return res.status(404).json({ message: 'Slot not found' });
    }

   
    const dateSlot = slotArray.slot.find(item => item.date === date);
    if (!dateSlot) {
      return res
        .status(404)
        .json({ message: 'No slots available for this date' });
    }

   
    const slotDetails = dateSlot.slotDetails.find(
      item => item.starttime === sTime && item.endtime === eTime
    );
    if (!slotDetails) {
      return res.status(404).json({ message: 'Slot details not found' });
    }

   
    const alreadyIn = slotDetails.patients.some(
      patient => patient.userId.toString() === userId.toString()
    );
    if (alreadyIn) {
      return res
        .status(400)
        .json({ message: 'You already booked in this slot' });
    }

   
    slotDetails.patients.push({
      userId: new mongoose.Types.ObjectId(userId),
      already: true,
    });

    
    const [sHours, sMinutes] = sTime.split(':').map(Number);
    const [eHours, eMinutes] = eTime.split(':').map(Number);

    const startMinutes = sHours * 60 + sMinutes;
    const endMinutes = eHours * 60 + eMinutes;

    const slotsAvailable = Math.floor((endMinutes - startMinutes) / 15);

    if (slotDetails.patients.length >= slotsAvailable) {
      slotDetails.isFull = true;
    }

   
    await slotArray.save();
    const hospitalDetails=  await Doctor.findOne({_id:doctorId}).populate('hospital')
    console.log(hospitalDetails);
    
    const AppointmentTime = await tempFunc(
      sTime,
      eTime,
      dateSlot.slotDetails,
      userId,
      identifyId
    );
    console.log('Db', userId, doctorId, sTime, eTime, AppointmentTime, date);

    const appointmentDetailforid=await Appointment.create({
      user: userId,
      doctor: doctorId,
      startTime: sTime,
      endTime: eTime,
      bookedSlotTime: AppointmentTime,
      date: date,
      hospital:hospitalDetails.hospital._id
    });
console.log('appointmentDetailforid',appointmentDetailforid);

    return res.status(200).json({ message: 'Slot booked successfully',appointmentId:appointmentDetailforid._id });
  } catch (error) {
    console.error('Error booking slot:', error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

module.exports.getbookingreciept = async (req, res) => {
  

  try {
    
    const { userId } = req.query;
    console.log(req.query);

    const appointments = await Appointment.find({ user: userId }).populate(
      'doctor'
    ).populate('user').populate('hospital')

    if (appointments) {
      return res.status(200).json({ success: true,appointments});
    }
    return res
      .status(400)
      .json({ success: false, message: 'restricted userId modification' });
  } catch (e) {  
    return res
    .status(400)
    .json({ success: false, error:e.message });
    //   console.log('Query UserID:', userId);
    //   // Ensure userId is converted to an ObjectId
    //   const userObjectId = new mongoose.Types.ObjectId(userId);
    //   // Query the database to find slots where patients include this userId
    //   const details = await Slot.find({
    //     slot: {
    //       $elemMatch: {
    //         slotDetails: {
    //           $elemMatch: {
    //             patients: {
    //               $elemMatch: { userId: userObjectId },
    //             },
    //           },
    //         },
    //       },
    //     },
    //   });
    //   console.log('Booking Details:', details);
    //   const dateList = details.flatMap(detail =>
    //     detail.slot.flatMap(one =>
    //       one.slotDetails.flatMap(two =>
    //         tempFunc(two.starttime, two.endtime, two, userId, detail.doctorId)
    //       )
    //     )
    //   );
    //   console.log(dateList);
    //   // Respond with appropriate data
    //   // if (details.length > 0) {
    //   //   res.status(200).json({ success: true, data: details });
    //   // } else {
    //   //   res
    //   //     .status(404)
    //   //     .json({ success: false, message: 'No booking found for this user' });
    //   // }
    // } catch (error) {
    //   // Handle any errors that occur during the database query
    //   console.error('Error fetching booking receipt:', error);
    //   res.status(500).json({
    //     success: false,
    //     message: 'An error occurred',
    //     error: error.message,
    //   });
    // }
  }
};

module.exports.Getprescriptionhistory= async (req,res)=>{
   

  
  try {
    const {id}= req.params
    
    const info = await Appointment.find({user:id}).populate('doctor').populate('hospital')
    console.log(info);
    if (info) {
      return res.status(200).json({ success: true,info});
    }
    
    return res
      .status(400)
      .json({ success: false, message: 'No prescription found' });
  } catch (e) {  
    return res
    .status(400)
    .json({ success: false, error:e.message });}


}