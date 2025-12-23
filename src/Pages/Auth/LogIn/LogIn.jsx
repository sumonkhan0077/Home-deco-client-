import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import imagelogin from "../../../assets/login.json";
import Lottie from "lottie-react";
import { toast } from "react-toastify";
import AnimatedSection from "../../../Utility/AnimatedSection";

const Login = () => {
     const [fbError, setFbError] = useState(""); 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    console.log("form data", data);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");
        toast.success(" User login successfully");
      })
      .catch((error) => {
        console.log(error);
        setFbError(error.code)
        toast.error("Something went wrong");
      });
  };

  return (
    <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#fffaec" }}>
      <div className="flex flex-col md:flex-row items-center max-w-7xl mx-auto py-12 px-4 gap-10">
        {/* ফর্ম সেকশন – ডার্ক ব্যাকগ্রাউন্ড */}
     

        <div
          className="flex-1 rounded-3xl shadow-2xl p-8 md:p-10"
          style={{ backgroundColor: "#213943" }}
        >
          <AnimatedSection variants="fadeUp">

          <h3 className="text-4xl font-bold text-center text-white">
            Welcome back
          </h3>
          <p className="text-center text-2xl mt-2" style={{ color: "#c55626" }}>
            Please Login
          </p>
      </AnimatedSection>


          <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleLogin)}>
            {/* Email */}
            <AnimatedSection variants="fadeUp">

            <div>
              <label className="label font-medium text-white">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input w-full border-2 rounded-lg py-3 px-4 text-white placeholder-gray-300"
                style={{
                  borderColor: "#c55626",
                  backgroundColor: "#213943",
                }}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-[#c55626] text-sm mt-1">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="label font-medium text-white">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 6,
                    message: "Password must be 6 characters or longer",
                  },
                })}
                className="input w-full border-2 rounded-lg py-3 px-4 text-white placeholder-gray-300"
                style={{
                  borderColor: "#c55626",
                  backgroundColor: "#213943",
                }}
                placeholder="••••••••"
              />
              {errors.password?.type === "required" && (
                <p className="text-[#c55626] text-sm mt-1">
                  Password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-[#c55626] text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="text-right">
              <a className="link link-hover" style={{ color: "#c55626" }}>
                Forgot password?
              </a>
            </div>
      </AnimatedSection>

            {
              fbError && <p className="text-red-500">{fbError}</p>
            }
<AnimatedSection variants="fadeUp">
            {/* Login Button */}
            <button
              type="submit"
              className="btn w-full text-lg py-3 rounded-lg font-normal shadow-lg text-white hover:opacity-90 transition"
              style={{ backgroundColor: "#c55626" }}
            >
              Login
            </button>

            <p className="text-center mt-4 text-white">
              New to DocorNest?
              <Link
                to="/register"
                state={location.state}
                className="ml-2 font-normal link link-hover"
                style={{ color: "#c55626" }}
              >
                Register
              </Link>
            </p>
      </AnimatedSection>


          </form>
            <div className="mt-6">
              <AnimatedSection variants="fadeUp">

              <SocialLogin />
      </AnimatedSection>
            </div>
        </div>
     

        {/* Lottie Animation – লগইনের জন্য তোমার imagelogin */}
        
        <div className="flex-1 flex justify-center items-center">
          <div className="w-full max-w-md">
            <AnimatedSection variants="fadeUp">

            <Lottie animationData={imagelogin} loop={true} />
      </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
