import React, { useState, useEffect } from 'react';
import { StickyNavbar } from '../components/StickyNavbar';
import { Sidebar } from '../components/Sidebar';
import { Input, Typography, Button } from '@material-tailwind/react'; // Import Button component

const Profile = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditMode, setIsEditMode] = useState(false); // State to track edit mode

   const userDetail=async()=>{
      const token=localStorage.getItem("token");
      try {
        const res=await fetch("http://localhost:3000/user",{
          method:"GET",
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`,
          },
        });
        const data=await res.json();
        setFirstName(data.firstname);
        setLastName(data.lastname)
        setEmail(data.email);
        setPassword(data.password);
        console.log(data);
      } catch (error) {
        console.log(error);
      }

   }

    useEffect(() => {
      userDetail();
    }, []);

  const handleEditClick = () => {
    if (isEditMode) {
      // Update user details
      handleUpdate();
    }
    
    setIsEditMode((prev) => !prev);
  };

// //update user
 
  const handleUpdate=async()=>{
    const token=localStorage.getItem("token");
    try {
      const res=await fetch("http://localhost:3000/user",{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`,
        },
        body:JSON.stringify({
          firstname:firstname,
          lastname:lastname,
          email:email,
          password:password,
        }),
      });
      const data=await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='m-5'>
      <StickyNavbar />

      <div className='flex gap-4 mt-10'>
        <Sidebar />

        <div className='flex justify-center w-full'>
          <div className='flex flex-col w-full h-screen p-4 bg-gray-50 rounded-xl shadow-md dark:bg-gray-800'>
            <div className='flex flex-col gap-4'>
              <Typography variant='h4' color='blue-gray'>
                Profile
              </Typography>

              {/* Edit button */}
              <Button
                
                size='regular'
                onClick={handleEditClick}
                className='self-end mt-2'
              >
                {isEditMode ? 'Save' : 'Edit'}
              </Button>

              <div className='flex flex-col gap-4'>
              <Typography variant='h6' color='blue-gray' className='-mb-3'>
                  First Name
                </Typography>
                <Input
                  size='lg'
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder='John'
                  className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${
                    isEditMode ? 'border-b' : '' // Add a bottom border in edit mode
                  }`}
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                  disabled={!isEditMode} // Disable input in non-edit mode
                />

               <Typography variant='h6' color='blue-gray' className='-mb-3'>
                  Last Name
                </Typography>
                <Input
                  size='lg'
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder='Doe'
                  className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${
                    isEditMode ? 'border-b' : '' // Add a bottom border in edit mode
                  }`}
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                  disabled={!isEditMode} // Disable input in non-edit mode
                />

                <Typography variant='h6' color='blue-gray' className='-mb-3'>
                  Email
                </Typography>
                <Input
                  size='lg'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='example@xyz.com'
                  className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${
                    isEditMode ? 'border-b' : ''
                  }`}
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                  disabled={!isEditMode}
                />

                <Typography variant='h6' color='blue-gray' className='-mb-3'>
                  Password
                </Typography>
                <Input
                  size='lg'
                  value={password}
                  type={isEditMode ? 'text' : 'password'}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=''
                  className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${
                    isEditMode ? 'border-b' : ''
                  }`}
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                  disabled={!isEditMode}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
