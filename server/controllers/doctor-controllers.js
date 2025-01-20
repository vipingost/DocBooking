const Doctor = require('../db/models/doctor-schema');
const Slot = require('../db/models/slot-schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generator = require('generate-password');
const nodemailer = require('nodemailer');

module.exports.signup = async (req, res) => {
  try {
    const { email, firstname } = req.body;
    console.log(req.body);

    const doctor = await Doctor.findOne({ email: email });
    if (doctor) {
      return res
        .status(400)
        .json({ message: 'Doctor already exist', error: true });
    }
    const generatedPassword = generator.generate({
      length: 10,
      numbers: true,
    });
    console.log(generatedPassword);

    // const hashedPassword = await bcrypt.hash(generatedPassword, 2);
    const hashedPassword = await bcrypt.hash('doctor123', 2);
    const dbResponse = await Doctor.create({
      ...req.body,
      email,
      password: hashedPassword,
    });
    console.log(email);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '8280b1001@smtp-brevo.com',
        pass: 'ykkv phbv ifpv iktz',
      },
    });
    const mailOptions = {
      from: 'vipinviswanath425@gmail.com',
      to: email,
      subject: 'DOC APP PASSWORD',
      text: `Hi docter,
      please login to the doctor booking app using the password:${generatedPassword}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.status(201).json({ message: 'Doctor addded', error: false });
      }
    });
  } catch (e) {
    return res.status(500).json({ message: e.message, error: true });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email: email });
    if (!doctor) {
      return res
        .status(403)
        .json({ message: 'Email or Password incorrect', error: true });
    }
    const isMatching = await bcrypt.compare(password, doctor.password);
    if (!isMatching) {
      return res
        .status(403)
        .json({ message: 'Email or Password incorrect', error: true });
    }

    const token = jwt.sign(
      { id: doctor._id, role: 'DOCTOR' },
      process.env.SECRET_KEY,
      { expiresIn: '5d' }
    );

    return res.status(200).json({
      message: 'You are logged in',
      error: false,
      token,
      id: doctor._id,
      name: doctor.firstname + ' ' + doctor.lastname,
      role: 'DOCTOR',
    });
  } catch (e) {
    return res.status(500).json({ message: e.message, error: true });
  }
};

module.exports.getDoctor = async (req, res) => {
  try {
    const dbResponse = await Doctor.find()
      .populate('department')
      .populate('hospital');
    res.status(200).json(dbResponse);
  } catch (e) {
    res.status(500).json({ message: e.message, error: true });
  }
};
module.exports.getDoctorByid = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id).populate('hospital').populate('department')

    return res.status(200).json(doctor);
  } catch (e) {
    return res.status(500).json({ message: e.message, error: true });
  }
};


module.exports.updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const doctor = await Doctor.findByIdAndUpdate(id, body);
    return res.status(200).json({
      message: 'Department updated successfully',
      error: false,
      success: true,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message, error: true });
  }
};


module.exports.AddSlot = async (req, res) => {
  const { doctorId, slot } = req.body;

  try {
    let doctorSlot = await Slot.findOne({ doctorId });
    var newSlot = {
      doctorId,
      slot: slot,
      booked: true,
    };
    if (!doctorSlot) {
      await Slot.create({
        ...newSlot,
      });

      return res.status(200).json({ message: 'Slot added successfully' });
    } else {
      console.log(
        'Check',
        doctorSlot.slot.filter(fil => {
          return fil.date === slot.date;
        }).length != 0
      );

      if (
        doctorSlot.slot.filter(fil => {
          return fil.date === slot.date;
        }).length != 0
      ) {
        doctorSlot.slot.forEach(newSlot => {
          const existingSlot = doctorSlot.slot.find(
            slot => slot.date === newSlot.date
          );
          if (existingSlot) {
            existingSlot.slotDetails.push(...newSlot.slotDetails);
          } else {
            doctorSlot.slot.push({
              slot,
            });
          }
        });

        await doctorSlot.save();
        return res.status(200).json({ message: 'Slots added successfully' });
      } else {
        console.log('rfgrfghsrghhghik');

        doctorSlot.slot.push(slot);

        await doctorSlot.save();
        return res.status(200).json({ message: 'Slots added successfully' });
      }
    }
  } catch (error) {
    console.error('Error adding slot:', error);
    return res.status(500).json({ message: 'Failed to add slot' });
  }
};
