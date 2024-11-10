import React from 'react'
import Avatar from 'react-avatar'
import { FaRegComment } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import axios from 'axios';
import { TWEET_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getRefresh } from '../redux/tweetSlice';
import { MdDeleteOutline } from "react-icons/md";


function Tweet({ tweet }) {
    const { user } = useSelector(store => store.user);
    const dispatch = useDispatch();


    const likeOrDislikeHandler = async (id) => {
        try {
            const res = await axios.put(`${TWEET_API_END_POINT}/like/${id}`, { id: user?._id }, {
                withCredentials: true
            })
            dispatch(getRefresh());
            toast.success(res.data.message);

        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }
    const deleteTweetHandler = async (id) => {
        try {
            const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`,{
                withCredentials:true
            })
            console.log(res);
            dispatch(getRefresh());
            toast.success(res.data.message)
            
        } catch (error) {
            toast.success(error.response.data.message)
            console.log(error);
            
        }
    }
    return (
        <div className='border-b border-gray-100'>
            <div>
                <div className='flex p-4'>
                    <Avatar src="https://media.istockphoto.com/id/495827884/photo/you-are-the-creator-of-your-own-success.jpg?s=612x612&w=0&k=20&c=85c3fiwXwTIscqx2O00C2P4MIoWLtmyXRCWoQ5LZ1Cw=" size="30" round={true} />
                    <div className='ml-2 w-full'>
                        <div className='flex items-center '>
                            <h2 className='font-bold'>{tweet?.userDetails[0]?.name}</h2>
                            <p className='text-gray-500 text-sm ml-1'>{`@${tweet?.userDetails[0]?.username}. 1m`}</p>
                        </div>
                        <div>
                            <p>{tweet?.description}</p>
                        </div>
                        <div className='flex justify-between my-3'>
                            <div className='flex items-center'>
                                <div className='p-2 hover:bg-green-200 rounded-full cursor-pointer'>
                                    <FaRegComment size="20px" />

                                </div>
                                <p>{0}</p>
                            </div>
                            <div className='flex items-center'>
                                <div onClick={() => likeOrDislikeHandler(tweet?._id)} className='p-2 hover:bg-green-200 rounded-full cursor-pointer'>
                                    <CiHeart size="24px" />

                                </div>
                                <p>{tweet?.like?.length}</p>
                            </div>
                            <div className='flex items-center'>
                                <div className='p-2 hover:bg-green-200 rounded-full cursor-pointer'>
                                    <CiBookmark size="22px" />

                                </div>
                                <p>0</p>
                            </div>
                            {
                                user?._id === tweet?.userId && (
                                    <div onClick={(id) => deleteTweetHandler(tweet?._id)} className='flex items-center'>
                                        <div className='p-2 hover:bg-red-300 rounded-full cursor-pointer'>
                                            <MdDeleteOutline size="22px" />
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tweet