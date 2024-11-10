import React from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux'
import useGetProfile from '../hooks/useGetProfile'
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast"
import { followingUpdate } from '../redux/userSlice';
import { getRefresh } from '../redux/tweetSlice';

function Profile() {

  const { user, Profile } = useSelector(store => store.user)
  const { id } = useParams()
  useGetProfile(id)
  const dispatch = useDispatch()

  const followAndUnfollowHandler = async () => {
    if (user.following.includes(id)) {
      //unfollow
      try {
        const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, { id:user?._id }, {
          withCredentials: true
        })
        console.log(res);
        dispatch(followingUpdate(id))
        dispatch(getRefresh())
        toast.success(res.data.message)
      } catch (error) {
        toast.error(error.response.data.message)
        console.log(error);

      }
    } else {
      //follow
      try {
        const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, { id:user?._id }, {
          withCredentials: true
        })
        console.log(res);
        dispatch(followingUpdate(id))
        dispatch(getRefresh())
        toast.success(res.data.message)
      } catch (error) {
        toast.error(error.response.data.message)
        console.log(error);

      }
    }
  }

  return (


    <div className='w-[50%] border-l border-r border-gary-200 '>
      <div >
        <div className='flex items-center py-2'>
          <Link to="/" className='p-2 rounded-full  hover:bg-gray-100 hover:cursor-pointer'>
            <IoMdArrowBack size="22px" />
          </Link>
          <div className='ml-2'>
            <h1 className='font-bold text-lg '>{Profile?.name}</h1>
            <p className='text-gray-500 text-sm'>10 Post</p>

          </div>
        </div>
        <img src="https://i.pinimg.com/originals/01/14/c6/0114c6c24c5f443dfc28ba63520cb2e5.png" alt="banner" />
        <div className='absolute top-40 ml-.5 border-4 border-white rounded-full'>
          <Avatar src="https://media.istockphoto.com/id/495827884/photo/you-are-the-creator-of-your-own-success.jpg?s=612x612&w=0&k=20&c=85c3fiwXwTIscqx2O00C2P4MIoWLtmyXRCWoQ5LZ1Cw=" size="80" round={true} />

        </div>
        <div className='text-right m-4 '>
          {
            Profile?._id === user?._id ? (
              <button  className='px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400'>Edit Profile</button>

            ) : (
              <button onClick={followAndUnfollowHandler} className='px-4 py-1 bg-black text-white rounded-full '>{user.following.includes(id) ? "Following" : "Follow"}</button>

            )
          }
        </div>
        <div className='m-4'>
          <h1 className='font-bold text-lg'>{Profile?.name}</h1>
          <p>{`@${Profile?.username}`}</p>
        </div>
        <div className='m-4 text-sm'>
          <p>🌐Exploring the web's endless possiblities with MERN Stack 🚀 | Problem solver by day, coder by night | Coffee lover ☕</p>
        </div>
      </div>
    </div>
  )
}

export default Profile