import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('ADMIN_TOKEN');
    const doctorToken = localStorage.getItem('DOCTOR_TOKEN');
    const userToken = localStorage.getItem('USER_TOKEN');
    
    
    if (adminToken && window.location.pathname === '/admin/login') {
      navigate('/admin/department'); 
    } else if (doctorToken && window.location.pathname === '/doctor/login') {
      navigate('/doctor'); 
    } else if (userToken && window.location.pathname === '/user/login') {
      navigate('/'); 
    }
  }, [navigate]);

  return null; g
};

export default LoginRedirectHandler;
