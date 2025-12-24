import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import imageRegister from "../../../assets/register.json";
import Lottie from "lottie-react";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import AnimatedSection from "../../../Utility/AnimatedSection";

const Register = () => {
  const [fbError, setFbError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegistration = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImg);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;
        axios.post(image_API_URL, formData).then((res) => {
          const photoURL = res.data.data.url;
          // create user in the database
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user created in the database");
            }
          });
          // update user profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          updateUserProfile(userProfile)
            .then(() => {
              // console.log('user profile updated done.')
              navigate(location.state || "/");
              toast.success(" User login successfully");
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        console.log(error);
        setFbError(error.code);
        toast.error("Something went wrong");
      });
  };

  return (
    <>
    <AnimatedSection variants="fadeUp">

    <div
      className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#fffaec" }}
    >
      <title>DecorNest-Registration</title>
      <div className="flex flex-col md:flex-row items-center max-w-7xl mx-auto py-12 px-4 gap-10">
        <div
          className="flex-1 rounded-3xl shadow-2xl p-8 md:p-10"
          style={{ backgroundColor: "#213943" }}
        >
          <h3 className="text-4xl font-bold text-center text-white">
            Welcome to DocorNest
          </h3>
          <p className="text-center text-2xl mt-2" style={{ color: "#c55626" }}>
            Please Register
          </p>

          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(handleRegistration)}
          >
            {/* Name */}
            <div>
              <label className="label font-medium text-white">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input w-full border-2 rounded-lg py-3 px-4 text-white placeholder-gray-300"
                style={{
                  borderColor: "#c55626",
                  backgroundColor: "#213943", // ডার্কের উপর ডার্ক, কিন্তু border দিয়ে হাইলাইট
                }}
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="text-[#c55626] text-sm mt-1">Name is required.</p>
              )}
            </div>

            {/* Photo */}
            <div>
              <label className="label font-medium text-white">Photo</label>
              <input
                type="file"
                {...register("photo", { required: true })}
                className="file-input w-full h-15 rounded-lg py-3 px-4 text-white"
                style={{ borderColor: "#c55626", backgroundColor: "#213943" }}
              />
              {errors.photo && (
                <p className="text-[#c55626] text-sm mt-1">
                  Photo is required.
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="label font-medium text-white">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input w-full border-2 rounded-lg py-3 px-4 text-white placeholder-gray-300"
                style={{ borderColor: "#c55626", backgroundColor: "#213943" }}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-[#c55626] text-sm mt-1">
                  Email is required.
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="label font-medium text-white">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                })}
                className="input w-full border-2 rounded-lg py-3 px-4 text-white placeholder-gray-300"
                style={{ borderColor: "#c55626", backgroundColor: "#213943" }}
                placeholder="••••••••"
              />
              {errors.password?.type === "required" && (
                <p className="text-[#c55626] text-sm mt-1">
                  Password is required.
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-[#c55626] text-sm mt-1">
                  Password must be 6 characters or longer
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-[#c55626] text-sm mt-1">
                  At least 1 uppercase, 1 lowercase, 1 number, 1 special
                  character
                </p>
              )}
            </div>

            <div className="text-right">
              <a className="link link-hover" style={{ color: "#c55626" }}>
                Forgot password?
              </a>
            </div>
                 {
              fbError && <p className="text-red-500">{fbError}</p>
            }
            <button
              type="submit"
              className="btn w-full  text-lg py-3 rounded-lg shadow-lg font-normal text-white hover:opacity-90 transition"
              style={{ backgroundColor: "#c55626" }}
            >
              Register
            </button>

            <p className="text-center mt-4 text-white">
              Already have an account?
              <Link
                to="/login"
                state={location.state}
                className="ml-2 font-normal link link-hover"
                style={{ color: "#c55626" }}
              >
                Login
              </Link>
            </p>
          </form>
          <div className="mt-6">
            <SocialLogin />
          </div>
        </div>

        {/* Lottie Animation */}
        <div className="flex-1 flex justify-center items-center">
          <div className="w-full max-w-md">
            <Lottie animationData={imageRegister} loop={true} />
          </div>
        </div>
      </div>
    </div>
      </AnimatedSection>
    </>
  );
};

export default Register;
