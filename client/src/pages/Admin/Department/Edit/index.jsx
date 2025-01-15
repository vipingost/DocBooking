import './edit.css';
import { Input, Button } from 'antd';
import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const { TextArea } = Input;

const EditDepartment = () => {
  const [editDepartment, setEditDepartment] = useState({
    name: '',
    about: '',
    image: '',
  });
  const navigate = useNavigate();
  const { id } = useParams(); 

 
  const fetchDepartment = async () => {
    try {
      const response = await axios.get(`/department/${id}`);
      console.log(response.data);
      
      setEditDepartment(response.data);
    } catch (e) {
      toast.error('Failed to fetch department data');
    }
  };

  useEffect(() => {
    fetchDepartment();
  }, [id]);

  const onChange = (e, key) => {
    setEditDepartment({ ...editDepartment, [key]: e.target.value });
  };

  const onUploadImage = async (e) => {
    const formData = new FormData();
    formData.append('avatar', e.target.files[0]);
    try {
      const response = await axios.post('/upload', formData);
      setEditDepartment({ ...editDepartment, image: response.data.url });
    } catch (e) {
      toast.error('Image upload failed');
    }
  };

  const updateDepartmentOnClick = async () => {
    try {
      await axios.patch(`/department/${id}`, editDepartment);
      toast.success('Department updated successfully');
      navigate('/admin/department');
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="edit-department-form">
        <div className="dep-input-container">
          <label>Name</label>
          <Input
            value={editDepartment.name}
            onChange={(e) => onChange(e, 'name')}
          />
        </div>
        <div className="dep-input-container">
          <label>Image</label>
          <Input onChange={onUploadImage} type="file" />
          {editDepartment.image && (
            <img
              src={editDepartment.image}
              alt="Department"
              className="preview-image"
            />
          )}
        </div>
        <div className="dep-input-container">
          <label>About</label>
          <TextArea
            value={editDepartment.about}
            onChange={(e) => onChange(e, 'about')}
            rows={5}
          />
        </div>
        <div className="edit-btn-container">
          <Button onClick={updateDepartmentOnClick}>Update</Button>
        </div>
      </div>
    </>
  );
};

export default EditDepartment;
