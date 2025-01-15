import React, { useState } from 'react';
import { Input, Button, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from '../../../utils/axios'
import { ToastContainer, toast } from 'react-toastify';
import './Login.css'; 

const UserLogin = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const onChange = (e, key) => {
    setUser({ ...user, [key]: e.target.value });
  };

  const loginOnClick = async () => {
    try {
      const response = await axios.post('/user/login', user);
      localStorage.clear();
      localStorage.setItem('USER_ID',response.data.id)
      localStorage.setItem('USER_TOKEN',response.data.token)
      localStorage.setItem('ROLE',response.data.role)
      localStorage.setItem('UNAME',response.data.name)
      toast.success('Login successful');
      navigate('/');  
    } catch (e) {
      toast.error(e.response.data.message || e.message);
    }
  };

  return (
    
    <div className="login-container">
      <ToastContainer />
      <h2 className="login-heading">Login</h2>
      <Form
        layout="vertical"
        onFinish={loginOnClick}
      >
        <Form.Item label="Email" required>
          <Input onChange={(e) => onChange(e, 'email')} type="email" />
        </Form.Item>
        <Form.Item label="Password" required>
          <Input.Password onChange={(e) => onChange(e, 'password')} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserLogin;
