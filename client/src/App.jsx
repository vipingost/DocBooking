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
// import DoctorLogin from './pages/Doctor Login';
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/admin/login/" element={<AdminLogin />} />
        <Route path="/admin" element={<PrivateRoute />}>
          <Route path="/admin/department/" element={<Listdepartment />} />
          <Route path="/admin/add-department/" element={<AddDepartment />} />
          <Route path="/admin/hospital/" element={<Listhospital />} />
          <Route path="/admin/add-hospital/" element={<AddHospital />} />
          <Route path="/admin/add-doctor/" element={<AddDoctor />} />
          <Route path="/admin/doctor/" element={<DoctorList />} />
        </Route>
          {/* <Route path="/doctor/" element={<DoctorLogin />} /> */}
      </Routes>
    </>
  );
};

export default App;
