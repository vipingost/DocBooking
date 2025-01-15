import React, { useContext } from 'react';
import { assets } from '../../../assets/assets';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';


const NavBar = () => {
    const navigate = useNavigate();
    
    const logout = async ()=>{
        try {
            const {data} = await axios.get();
            navigate('/login')
            setIsLoggedin(false)
            setUserData(false)
        } catch (error) {
            errorAlert(error.message)
        }
    }

    const SendVerificationOtp = async ()=>{
        try {
            const {data} = await axios.post()
            if(data.success){
                successAlert(data.message)
                navigate("/email-verify")
            }
        } catch (error) {
            errorAlert(error.response.data.message || error.message);
           navigate('/login')
        }
    }

    return (
        <div className='w-full flex justify-between items-center p-4 px-6 sm:px-16 absolute top-0  z-50'>
            {/* Logo */}
            <img src={assets.logo} alt="Logo" className='w-28 sm:w-32 cursor-pointer' onClick={() => navigate('/')} />

            {/* User Section */}
             
                
                <button
                    onClick={() => navigate('/user/login')}
                    className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-200 transition-all'
                >
                    Login
                    <img src={assets.arrow_icon} alt="Arrow" className='w-4 h-4' />
                </button>
            
        </div>
    );
};

export default NavBar;