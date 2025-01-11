
import './App.css'
import { Routes,Route } from 'react-router-dom'
import AdminLayout from './Components/AdminLayout'
import Listdepartment from './pages/Admin/Department/List'
import Listhospital from './pages/Admin/Hospital/List'
import AdminLogin from './pages/Admin/Login/index'

const App=()=>{

return <>
<Routes>
<Route path='/admin/department/' element={<Listdepartment/>} />
<Route path='/admin/hospital/' element={<Listhospital/>} />
<Route path='/admin/login/' element={<AdminLogin/>} />


</Routes>



</>

}

export default App
