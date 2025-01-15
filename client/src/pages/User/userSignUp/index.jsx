import React, { useState } from 'react';
import { Input, Button, Select, Form, Upload } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from '../../../utils/axios'
import { ToastContainer, toast } from 'react-toastify';
import './Signup.css'; 

const { TextArea } = Input;

const UserSignup = () => {
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'USER', 
    image: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    bloodgroup: '',
    phonenumber: '',
    address: '',
  });

  const navigate = useNavigate();

  const onChange = (e, key) => {
    setUser({ ...user, [key]: e.target.value });
  };

  const onUploadImage = async (e) => {
    const formData = new FormData();
    formData.append('avatar', e.file);
    const response = await axios.post('/upload', formData);
    setUser({ ...user, image: response.data.url });
  };

  const signupOnClick = async () => {
    try {
      const response = await axios.post('/user/signup', user);
      toast.success('Signup successful');
      navigate('/login');
    } catch (e) {
      toast.error(e.response.data.message || e.message);
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer />
      <h2 className="signup-heading">Signup</h2>
      <Form
        layout="vertical"
        onFinish={signupOnClick}
      >
        <Form.Item label="First Name" required>
          <Input onChange={(e) => onChange(e, 'firstname')} />
        </Form.Item>
        <Form.Item label="Last Name" required>
          <Input onChange={(e) => onChange(e, 'lastname')} />
        </Form.Item>
        <Form.Item label="Email" required>
          <Input onChange={(e) => onChange(e, 'email')} type="email" />
        </Form.Item>
        <Form.Item label="Password" required>
          <Input.Password onChange={(e) => onChange(e, 'password')} />
        </Form.Item>
        <Form.Item label="Age" required>
          <Input onChange={(e) => onChange(e, 'age')} />
        </Form.Item>
        <Form.Item label="Gender" required>
          <Select
            options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
              { value: 'Other', label: 'Other' },
            ]}
            onChange={(value) => setUser({ ...user, gender: value })}
          />
        </Form.Item>
        <Form.Item label="Weight" required>
          <Input onChange={(e) => onChange(e, 'weight')} />
        </Form.Item>
        <Form.Item label="Height" required>
          <Input onChange={(e) => onChange(e, 'height')} />
        </Form.Item>
        <Form.Item label="Blood Group" required>
          <Input onChange={(e) => onChange(e, 'bloodgroup')} />
        </Form.Item>
        <Form.Item label="Phone Number" required>
          <Input onChange={(e) => onChange(e, 'phonenumber')} />
        </Form.Item>
        <Form.Item label="Address" required>
          <TextArea onChange={(e) => onChange(e, 'address')} rows={4} />
        </Form.Item>
        <Form.Item label="Image" valuePropName="file">
          <Upload
            showUploadList={true}
            customRequest={onUploadImage}
          >
            <Button>Upload Image</Button>
            
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Signup
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserSignup;
