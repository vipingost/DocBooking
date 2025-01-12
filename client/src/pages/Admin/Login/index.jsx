import './Login.css';
import { useState } from 'react';
import axios from '../../../utils/axios';
import { Button, Input } from 'antd';
import { useNavigate,useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const location =useLocation()
  const [login, setLogin] = useState({
    email: '',
    pasword: '',
  });

  const onChange = (e, key) => {
    console.log(e.target.value);
    console.log(login);

    setLogin({ ...login, [key]: e.target.value });
  };

  const onLogin = async () => {
    try {
      const response = await axios.post('/admin/login', login);
      localStorage.setItem('ID',response.data.id)
      localStorage.setItem('TOKEN',response.data.token)
      localStorage.setItem('ROLE',response.data.role)
      
      navigate('/admin/department')
      console.log(response.data);
    } catch (e) {
       
        toast.error(e.response.data.message||e.message)

    }
  };
  

  return (
    <>
      <div className="wrapper">
      <ToastContainer />
        <div className="admin-login">
          <div className="admin-login-form">
            <div className="heading">
              <span>Admin</span>
              <h1>DOC BOOKING</h1>
            </div>
            <label>Email</label>
            <Input
              onChange={e => {
                onChange(e, 'email');
              }}
            />
            <label>Password</label>
            <Input
              onChange={e => {
                onChange(e, 'password');
              }}
            />
            <div className="login-btn-container">
              <Button className="login-btn" onClick={onLogin}>
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
