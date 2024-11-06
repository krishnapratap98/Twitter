import React, { useState } from 'react'
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant"

function Login() {
  const [islogin, setIsLogin] = useState(true)
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (islogin) {
      //login
      try {
        const res = await axios.post(`${USER_API_END_POINT}/login`, {  email, password });
        console.log(res);

      } catch (error) {
        console.log(error);

      }
    } else {
      //signup
      try {
        const res = await axios.post(`${USER_API_END_POINT}/register`, { name, email, username, password });
        console.log(res);

      } catch (error) {
        console.log(error);

      }
    }
  }



  const loginSignupHandler = () => {
    setIsLogin(!islogin);
  }
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='flex items-center justify-evenly w-[80%]'>
        <div>
          <img className='ml-5' width={"400px"} src='https://img.freepik.com/premium-vector/twitter-global-social-media-networking-service-new-logo-twitter_944081-108.jpg?semt=ais_hybrid' alt='twitter-logo' />
        </div>
        <div>
          <div className='my-5'>
            <h1 className='font-bold text-6xl'>Happening now.</h1>
          </div>
          <div>
            <h1 className='mt-4 mb-2 text-2xl font-bold'>{islogin ? "Login" : "Signup"}</h1>
          </div>
          <form onSubmit={submitHandler} className='flex flex-col w-[55%]'>
            {
              !islogin && (<>
                <input type='text' value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Name' className='outline-blue-500 border  border-gray-800 px-3 py-2 rounded-full my-1 font-semibold' />
                <input type='text' value={username} onChange={(e) => { setUsername(e.target.value) }} placeholder='Username' className='outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold' />
              </>)
            }
            <input type='email' value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' className='outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold' />
            <input type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' className='outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold' />
            <button className='bg-[#1D9BF0] my-4 border-none py-2 rounded-full text-white text-lg' >{islogin ? "Login" : "Create Account"}</button>
            <h1> {islogin ? "Do not hava an account?" : "Already have an account?"} <span onClick={loginSignupHandler} className='font-bold text-blue-600 cursor-pointer'>{islogin ? "Signup" : "Login"}</span></h1>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login