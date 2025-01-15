import './App.css';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './Components/AdminLayout';
import Listdepartment from './pages/Admin/Department/List';
import Listhospital from './pages/Admin/Hospital/List';
import AdminLogin from './pages/Admin/Login/index';
import PrivateRoute from './Components/PrivateRoute';
import AddDepartment from './pages/Admin/Department/Add'
import AddHospital from './pages/Admin/Hospital/Add/index'
import AddDoctor from './pages/Admin/Doctor/Add/index'
import DoctorList from './pages/Admin/Doctor/List';
import DoctorLogin from './pages/Doctor Login';
import UserSignup from './pages/User/userSignUp';
import UserLogin from './pages/User/userLogin';
import EditDepartment from './pages/Admin/Department/Edit';
import EditHospital from './pages/Admin/Hospital/EditHospital';
import SetSlot from './pages/Admin/Doctor/Slot/setSlot';

const App = () => {


  return (
    <>
      <Routes>
        <Route path="/admin/login/" element={<AdminLogin  />} />
        <Route path="/admin" element={<PrivateRoute />}>
          <Route path="/admin/department/" element={<Listdepartment />} />
          <Route path="/admin/add-department/" element={<AddDepartment />} />
          <Route path="/admin/hospital/" element={<Listhospital />} />
          <Route path="/admin/add-hospital/" element={<AddHospital />} />
          <Route path="/admin/add-doctor/" element={<AddDoctor />} />
          <Route path="/admin/doctor/" element={<DoctorList />} />
          <Route path="/admin/edit-department/:id" element={<EditDepartment />} />
          <Route path="/admin/edit-hospital/:id" element={<EditHospital />} />
        </Route>
          {/* <Route path="/doctor/" element={<DoctorLogin />} /> */}
          <Route path="/user/signup" element={<UserSignup />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/doctor/set-slot" element={<SetSlot />} />

      </Routes>
    </>
  );
};

export default App;
