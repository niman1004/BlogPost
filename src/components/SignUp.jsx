import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import Button from "./Button";
import Input from "./Input";
import Logo from "./logo";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading

  const create = async (data) => {
    setError("");
    setSuccess(false);
    setLoading(true); // Start loading

    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(login({ userData: currentUser }));
          setSuccess(true);
          setTimeout(() => navigate("/BlogPost"), 1000);
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg rounded-xl p-10 border border-blue-950">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-serif text-blue-950 leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base font-serif text-back/60">
          Already have an account?&nbsp;
          <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline">
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        {success && <p className="text-green-600 mt-8 text-center">Account created successfully! Redirecting...</p>}
        
        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input {...register("name", { required: true })} label="Full name :" placeholder="Full name" />
            <Input {...register("email", { required: true })} label="Email :" placeholder="Email" type="email" />
            <Input {...register("password", { required: true })} label="Password :" type="password" placeholder="Password" />
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                  Creating...
                </span>
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
