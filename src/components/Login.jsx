import React from 'react'
import authService from '../appwrite/auth'
import { useState } from 'react'
import Button from './Button'
import Input from './Input'
import Logo from './logo'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import {login as authLogin} from '../store/authSlice'
import { useNavigate , Link } from 'react-router-dom'
import loginBG from '../assets/loginBG.jpg'


function Login() {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async (data)=>{
    setError("")
    try{
      setLoading(true)
      const session= await authService.login(data)
      if(session){
        const userData= await authService.getCurrentUser()
        if(userData){
          dispatch(authLogin(userData))
          
        }
        navigate("/")
      }

    }catch(error){
        setError(error.message)
        setSuccess(false)
        
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className="flex items-center justify-center  " >
      <div className="mx-auto w-full max-w-lg rounded-xl p-10 border border-blue-950 bg-white " >
        <div className="mb-2 flex justify-center">
    
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        
        </div>
        <h2 className="text-center text-2xl font-serif text-blue-950 leading-tight">
          Welcome back! log into your account
        </h2>
        <p className="mt-2 text-center text-base font-serif text-back/60">
          Don't have an account?&nbsp;
          <Link to="/signup" className="font-medium text-primary transition-all duration-200 hover:underline">
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        {success && <p className="text-green-600 mt-8 text-center">logged in successfully! Redirecting...</p>}

        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            
            <Input {...register("email", { required: true })} label="Email :" placeholder="Email" type="email" />
            <Input {...register("password", { required: true })} label="Password :" type="password" placeholder="Password" />
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                  Redirecting...
                </span>
              ) : (
                "Log in"
              )}
            </Button>
          </div>
        </form>

      </div>
      
    </div>
  )
}

export default Login
