import { NavLink, useNavigate} from 'react-router-dom';
import './adminlayout.css';
import { Button,Popconfirm,message } from 'antd';

const AdminLayout = ({children,heading}) => {
  const navigate = useNavigate();
  const onLogout=()=>{
    localStorage.removeItem('ADMIN_TOKEN')
    localStorage.removeItem('ROLE')
    localStorage.removeItem('ID')
    message.success('Logged Out Succesfully')
    navigate('/admin/login')
  }

  return<>
  <div className="admin-layout">
    <div className="sidebar">
        <div className="logo">
            <img className='img' src="/images/download.png" alt="" />
            <p>EasyDoc</p>
        </div>
        <div className="menu">
            <p className="menu-head">Pages</p>
            <div className="menu-container">
                <NavLink className="menu-item" to="/admin/home">
                <i class="fa-solid fa-house"></i> 
                    Home
                </NavLink>
                <NavLink className="menu-item" to="/admin/department">
                <i class="fa-solid fa-building"></i>
                    Department
                </NavLink>
                <NavLink className="menu-item" to="/admin/hospital">
                <i class="fa-solid fa-hospital"></i>
                    Hospital
                </NavLink>
                <NavLink className="menu-item" to="/admin/doctor">
                <i class="fa-solid fa-user-doctor"></i>
                    Doctor
                </NavLink>
                <NavLink className="menu-item" to="/admin/profile">
                <i class="fa-solid fa-user"></i>
                    Profile
                </NavLink>
            </div>
            <p className='menu-head'>Others</p>
            <div className="menu-container">
            <NavLink className="menu-item" to="/admin/settings">
                <i class="fa-solid fa-gear"></i>
                    Settings
                </NavLink>
                <p className="menu-item" >
                <i class="fa-solid fa-right-from-bracket"></i>
                <Popconfirm
            title="Are you sure ?"
            onConfirm={onLogout}
            okText="Yes"
            cancelText="No"
          >
            LogOut
            
          </Popconfirm>
                    
                </p>
            </div>
        </div>
    </div>
    <nav></nav>
    <div className="container">
        <h1 className='heading' >{heading}</h1>
        {children}
    </div>
  </div>
  
  </>
};

export default AdminLayout