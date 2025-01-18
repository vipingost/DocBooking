import NavBar from './Navbar';
import { assets } from '../../../assets/assets';
import { data, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


const UserHome = () => {

    const Navigate = useNavigate()
    const goToUserDash=()=>{
      Navigate('/user/userDash')
    }

    const [username,setUsername]=useState()
    const usernamefetch=()=>{
       const data=localStorage.getItem('UNAME')
       setUsername(data)
       console.log(username);
       
    }

    useEffect(() => {
      usernamefetch()
    }, [])
    

  return (
    <>
      <NavBar />
      <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'>
        <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
          <img
            src={assets.header_img}
            className="w-40 h-40 rounded-full mb-6"
            alt=""
          />
          <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
          {username ? `Hey ${username}..` : 'Hey there...'}
          </h1>
          <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
            Welcome to your app
          </h2>
          <p className="mb-8 max-w-md ">
            Let's have a amazing booking experience with easyDoc.. !
          </p>
          <button className="border border-gray-500 rounded-full px-8 py-2 hover:bg-gray-200 transition-all"  onClick={() => {
    if (username) {
      goToUserDash(); 
    } else {
      Navigate('user/login'); 
    }
  }} >
            Get Start
          </button>
        </div>
      </div>
    </>
  );
};

export default UserHome;
