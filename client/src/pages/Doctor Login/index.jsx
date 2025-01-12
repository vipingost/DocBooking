// import './doclogin.css'
// import { Input, Button, Select } from 'antd';
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import AdminLayout from '../../../../Components/AdminLayout';
// const { TextArea } = Input;


// const DoctorLogin = () => {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const [doctorData, setDoctorData] = useState(null);
  
//     return (
//       <AdminLayout heading="Doctor Login">
//         <ToastContainer />
//         <div className="doctor-login-form">
//           <div className="dep-input-container">
//             <label>Email</label>
//             <Input onChange={(e) => onChange(e, 'email')} type="email" />
//           </div>
//           <div className="dep-input-container">
//             <label>Password</label>
//             <Input onChange={(e) => onChange(e, 'password')} type="password" />
//           </div>
//           <div className="add-btn-container">
//             <Button onClick={onLogin}>Login</Button>
//           </div>
//         </div>
//         {doctorData && (
//           <div className="doctor-profile">
//             <h3>Doctor Profile</h3>
//             <p>
//               <strong>Name:</strong> {doctorData.firstname} {doctorData.lastname}
//             </p>
//             <p>
//               <strong>Email:</strong> {doctorData.email}
//             </p>
//             <p>
//               <strong>Specialization:</strong> {doctorData.specialization}
//             </p>
//             <p>
//               <strong>About:</strong> {doctorData.about}
//             </p>
//             <p>
//               <strong>Department:</strong> {doctorData.department?.name || 'N/A'}
//             </p>
//             <p>
//               <strong>Hospital:</strong> {doctorData.hospital?.name || 'N/A'}
//             </p>
//             <img src={doctorData.image} alt="Doctor" />
//           </div>
//         )}
//       </AdminLayout>
//     );
//   };

//   export default DoctorLogin
  