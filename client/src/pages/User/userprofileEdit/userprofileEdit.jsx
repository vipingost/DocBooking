import React, { useEffect, useState } from 'react';
import { Input, Button, Select, Form, Upload } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../../utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import '../userSignUp/Signup.css';
const { TextArea } = Input;

const UserprofileEdit = () => {
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

  const { id } = useParams();

  const fetchuser = async () => {
    try {
      const response = await axios.get(`/user/userprofile/${id}`);
      console.log(response.data);

      setUser(response.data);
    } catch (e) {
      toast.error('Failed to fetch user data');
    }
  };

  const onChange = (e, key) => {
    setUser({ ...user, [key]: e.target.value });
  };

  const onUploadImage = async e => {
    const formData = new FormData();
    formData.append('avatar', e.file);
    const response = await axios.post('/upload', formData);
    setUser({ ...user, image: response.data.url });
  };

  const editupOnClick = async () => {
    try {
      const response = await axios.patch(`/user/editprofile/${id}`, user);
      toast.success('Update successful');
      navigate(`/user/userprofile/${id}`);
    } catch (e) {
      toast.error(e.response.data.message || e.message);
    }
  };

  useEffect(() => {
    fetchuser();
  }, []);
  return (
    <div className="signup-container">
      <ToastContainer />
      <h2 className="signup-heading">Signup</h2>
      <Form layout="vertical" onFinish={editupOnClick}>
        <Form.Item label="First Name" required>
          <Input
            value={user.firstname}
            onChange={e => onChange(e, 'firstname')}
          />
        </Form.Item>
        <Form.Item label="Last Name" required>
          <Input
            value={user.lastname}
            onChange={e => onChange(e, 'lastname')}
          />
        </Form.Item>
        <Form.Item label="Email" required>
          <Input
            value={user.email}
            onChange={e => onChange(e, 'email')}
            type="email"
          />
        </Form.Item>

        <Form.Item label="Age" required>
          <Input value={user.age} onChange={e => onChange(e, 'age')} />
        </Form.Item>
        <Form.Item label="Gender" required>
          <Select
            value={user.gender}
            options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
              { value: 'Other', label: 'Other' },
            ]}
            onChange={value => setUser({ ...user, gender: value })}
          />
        </Form.Item>
        <Form.Item label="Weight" required>
          <Input value={user.weight} onChange={e => onChange(e, 'weight')} />
        </Form.Item>
        <Form.Item label="Height" required>
          <Input value={user.height} onChange={e => onChange(e, 'height')} />
        </Form.Item>
        <Form.Item label="Blood Group" required>
          <Input
            value={user.bloodgroup}
            onChange={e => onChange(e, 'bloodgroup')}
          />
        </Form.Item>
        <Form.Item label="Phone Number" required>
          <Input
            value={user.phonenumber}
            onChange={e => onChange(e, 'phonenumber')}
          />
        </Form.Item>
        <Form.Item label="Address" required>
          <TextArea
            value={user.address}
            onChange={e => onChange(e, 'address')}
            rows={4}
          />
        </Form.Item>
        <Form.Item label="Image" valuePropName="file">
          <Upload
            fileList={
              user.image
                ? [{ url: user.image, name: 'Uploaded Image', status: 'done' }]
                : []
            }
            showUploadList={true}
            customRequest={onUploadImage} 
            onRemove={() => setUser({ ...user, image: '' })} 
          >
            <Button>Upload Image</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            UPDATE
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserprofileEdit;
