import { useEffect, useState } from 'react';
import axios from '../../../utils/axios';
import './userprofile.css';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Button, Popconfirm ,message} from 'antd';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState([]);
  const id = localStorage.getItem('USER_ID');

  const fetchUserById = async () => {
    const response = await axios.get(`/user/userprofile/${id}`);
    console.log(response.data);
    setUserDetails(response.data);
  };
  useEffect(() => {
    fetchUserById();
  }, []);

  const navigate = useNavigate();

  const onLogout=()=>{
    localStorage.clear()
    message.success('Logged Out Succesfully')
    navigate('/user/login')
  }

  return (
    <>
      <div className="userprofiewrapper relative ">
        <Button className='absolute top-10 right-72' onClick={()=>navigate('/user/prescriptionhistory')} >Prescription History</Button>
        <div className="userlogoutbtn">
          <Popconfirm
            title="Delete the task"
            description="Are you sure you want to logout?"
            onConfirm={onLogout}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>LOGOUT</Button>
          </Popconfirm>
        </div> 
        
        <EditOutlined
            onClick={() => {
              navigate(`/user/editprofile/${id}`);
            }}
            className="useredit"
          />

        <div className="profilecard">
          
          <div className="userimage">
            <img src={userDetails.image} alt="user image" />
          </div>
          <h1>
            <strong>
              Name : {userDetails.firstname} {userDetails.lastname}
            </strong>
          </h1>
          <h2>Age : {userDetails.age}</h2>
          <h2>Gender : {userDetails.gender}</h2>
          <h2>Bloodgroup : {userDetails.bloodgroup}</h2>
          <h2>Phonenumber : {userDetails.phonenumber}</h2>
          <h2>Email : {userDetails.email}</h2>
          <h2>Address : {userDetails.address}</h2>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
