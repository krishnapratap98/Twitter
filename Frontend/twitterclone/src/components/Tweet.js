import React from 'react'
import Avatar from 'react-avatar'
import { FaRegComment } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";

function Tweet() {
    return (
        <div className='border-b border-gray-200'>
            <div>
                <div className='flex p-4'>
                    <Avatar src="https://media.istockphoto.com/id/495827884/photo/you-are-the-creator-of-your-own-success.jpg?s=612x612&w=0&k=20&c=85c3fiwXwTIscqx2O00C2P4MIoWLtmyXRCWoQ5LZ1Cw=" size="30" round={true} />
                    <div className='ml-2 w-full'>
                        <div className='flex items-center '>
                            <h2 className='font-bold'>Singh</h2>
                            <p className='text-gray-500 text-sm ml-1'>@singhmernstack .1m</p>
                        </div>
                        <div>
                            <p>Hello Developers let's connect and grow together</p>
                        </div>
                        <div className='flex justify-between my-3'>
                            <div className='flex items-center'>
                                <div className='p-2 hover:bg-green-200 rounded-full cursor-pointer'>
                                <FaRegComment size="20px" />

                                </div>
                                <p>0</p>
                            </div>
                            <div className='flex items-center'>
                                <div className='p-2 hover:bg-green-200 rounded-full cursor-pointer'>
                                <CiHeart size="24px" />

                                </div>
                                <p>0</p>
                            </div>
                            <div className='flex items-center'>
                                <div className='p-2 hover:bg-green-200 rounded-full cursor-pointer'>
                                <CiBookmark size="22px" />

                                </div>
                                <p>0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tweet