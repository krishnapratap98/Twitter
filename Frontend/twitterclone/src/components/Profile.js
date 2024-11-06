import React from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';

function Profile() {
  return (
    <div className='w-[50%] border-l border-r border-gary-200 '>
        <div >
            <div className='flex items-center py-2'>
                <Link to="/" className='p-2 rounded-full  hover:bg-gray-100 hover:cursor-pointer'>
                    <IoMdArrowBack size="22px" />
                </Link>
                <div className='ml-2'>
                <h1 className='font-bold text-lg '>Singh</h1>
                <p className='text-gray-500 text-sm'>10 Post</p>

                </div>
            </div>
            <img src="https://i.pinimg.com/originals/01/14/c6/0114c6c24c5f443dfc28ba63520cb2e5.png" alt="banner" />
         <div className='absolute top-40 ml-.5 border-4 border-white rounded-full'>
         <Avatar src="https://media.istockphoto.com/id/495827884/photo/you-are-the-creator-of-your-own-success.jpg?s=612x612&w=0&k=20&c=85c3fiwXwTIscqx2O00C2P4MIoWLtmyXRCWoQ5LZ1Cw=" size="80" round={true} />
  
         </div>
         <div className='text-right m-4 '>
            <button className='px-4 py-2 hover:bg-gray-200 rounded-full border border-gray-400'>Edit Profile</button>
         </div>
         <div className='m-4'>
            <h1 className='font-bold text-lg'>Singh</h1>
            <p>@singhmernstack</p>
         </div>
         <div className='m-4 text-sm'>
            <p>🌐Exploring the web's endless possiblities with MERN Stack 🚀 | Problem solver by day, coder by night | Coffee lover ☕</p>
         </div>
        </div>
    </div>
  )
}

export default Profile