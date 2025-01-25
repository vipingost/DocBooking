import './App.css';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './Components/AdminLayout';
import Listdepartment from './pages/Admin/Department/List';
import Listhospital from './pages/Admin/Hospital/List';
import AdminLogin from './pages/Admin/Login/index';
import PrivateRoute from './Components/PrivateRoute';
import UserAuth from './Components/UserAuth';
import LoginRedirectHandler from './Components/loginHandler/loginhandler';
import AddDepartment from './pages/Admin/Department/Add';
import AddHospital from './pages/Admin/Hospital/Add/index';
import AddDoctor from './pages/Admin/Doctor/Add/index';
import EditDocter from './pages/Admin/Doctor/edit/DocEdit';
import DoctorList from './pages/Admin/Doctor/List';
import DoctorHome from './pages/Doctordash/Dochomepage/Doctorhome';
import DoctorProfile from './pages/Doctordash/Dochomepage/Doctorprofile';
import DoctorLogin from './pages/Doctordash';
import UserSignup from './pages/User/userSignUp';
import UserLogin from './pages/User/userLogin';
import EditDepartment from './pages/Admin/Department/Edit';
import EditHospital from './pages/Admin/Hospital/EditHospital';
import SetSlot from './pages/Doctordash/Slot/setSlot';
import UserHome from './pages/User/homepage/userhome';
import UserDash from './pages/User/userDash/userdash';
import ViewDoc from './pages/User/userDash/viewDoc';
import UserProfile from './pages/User/homepage/userprofile';
import UserprofileEdit from './pages/User/userprofileEdit/userprofileEdit';
import ViewSlotDetails from './pages/User/userDash/viewSlotDetails';
import BookingReciept from './pages/User/bookingReciept/bookingReciept';
import DoctorAppointment from './pages/Doctordash/DoctorsAppoinments/DoctorAppointment';
import UserPrescription from './pages/Doctordash/DoctorsAppoinments/userPrescribtion';
import PrescrptionHistory from './pages/User/bookingReciept/PrescrptionHistory';

const App = () => {
  return (
    <>
      <LoginRedirectHandler />
      <Routes>
        <Route path="/admin/login/" element={<AdminLogin />} />
        <Route path="/admin" element={<PrivateRoute />}>
          <Route path="/admin/department/" element={<Listdepartment />} />
          <Route path="/admin/add-department/" element={<AddDepartment />} />
          <Route path="/admin/hospital/" element={<Listhospital />} />
          <Route path="/admin/add-hospital/" element={<AddHospital />} />
          <Route path="/admin/add-doctor/" element={<AddDoctor />} />
          <Route path="/admin/doctor/" element={<DoctorList />} />
          <Route path="/admin/edit-doctor/:id" element={<EditDocter />} />
          <Route
            path="/admin/edit-department/:id"
            element={<EditDepartment />}
          />
          <Route path="/admin/edit-hospital/:id" element={<EditHospital />} />
        </Route>
        {/* <Route path="/doctor/" element={<DoctorLogin />} /> */}
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/set-slot" element={<SetSlot />} />
        <Route path="/doctor" element={<DoctorHome />} />
        <Route path="/doctor/profile" element={<DoctorProfile />} />
        <Route path="/doctor/doctorappointments" element={<DoctorAppointment />} />
        <Route path="/doctor/userprescription/:userId" element={<UserPrescription />} />

        <Route path="/" element={<UserHome />} />
        <Route path="/user" element={<UserAuth />}>
          <Route path="/user/userprofile/:id" element={<UserProfile />} />
          <Route path="/user/editprofile/:id" element={<UserprofileEdit />} />
          <Route path="/user/userDash" element={<UserDash />} />
          <Route path="/user/viewdoc/:id" element={<ViewDoc />} />
          <Route path="/user/slotdetails/:id" element={<ViewSlotDetails />} />
          <Route path="/user/bookingreciept" element={<BookingReciept />} />
          <Route path="/user/prescriptionhistory" element={<PrescrptionHistory />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
