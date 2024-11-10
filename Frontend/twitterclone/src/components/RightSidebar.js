import React from 'react'
import { CiSearch } from "react-icons/ci";
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';

function RightSidebar({ otherUsers }) {
  return (
    <div className='w-[25%]'>
      <div className='flex  items-center p-2 bg-gray-100 rounded-full outline-none w-full'>
        <CiSearch size="20px" />
        <input type='text' className='bg-transparent outline-none px-2' placeholder='Search' />
      </div>
      <div className='p-4 bg-gray-100 rounded-2xl my-4'>
        <h1 className='font-bold text-lg '>Who to follow</h1>
        {
          otherUsers?.map((user) => {
            return (
              <div key={user?._id} className='flex items-center justify-between my-3'>
                <div className='flex justify-start items-center gap-1 '>
                  <div>
                    <Avatar src="https://media.istockphoto.com/id/495827884/photo/you-are-the-creator-of-your-own-success.jpg?s=612x612&w=0&k=20&c=85c3fiwXwTIscqx2O00C2P4MIoWLtmyXRCWoQ5LZ1Cw=" size="30" round={true} />

                  </div>
                  <div className='ml-2'>
                    <Link to={`/profile/${user?._id}`}>
                    <h1 className='font-bold'>{user?.name}</h1>
                    <p className='text-sm'>{`@${user?.username}`}</p>
                    </Link>
                  </div>
                  
                </div>
                <div>
                    <Link to={`/profile/${user?._id}`}>
                      <button className='px-2 bg-black text-white rounded-full'>Profile</button>
                    </Link>

                  </div>

              </div>
            )
          })
        }


      </div>
    </div>
  )
}

export default RightSidebar