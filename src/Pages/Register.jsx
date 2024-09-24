import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { REGISTER_API_URL } from "../constants/apiConstants";

function Register() {
  const navigate = useNavigate();
 
  const [isLoading, setIsLoading] = useState(false); 

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Get the password value for confirm password validation
  const password = watch("password");

  const handleOnSubmit = (data) => {
    setIsLoading(true);
    console.log("formDatat", data);

    try {
      axios.post(REGISTER_API_URL, data).then((res) => {
        axios.defaults.withCredentials = true;
        console.log("res", res);
        if (res.status === 200) {
        //   console.log(res);
          localStorage.setItem("userToken", res.data.data.token);
          navigate("/");
         }
      });
    } catch (error) {
      console.log("error while loging", error);
      toast.error("Login Failed ");
    }
    finally {
      setIsLoading(false); // Stop the loader
    }
  };

  return (
    <>
      <section class="bg-gray-50 ">
        <div class="flex flex-col items-center justify-center px-4 pb-34 pt-10  md:px-6 md:py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight  md:text-2xl dark:text-black">
                Sign Up
              </h1>
              <form
                class="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(handleOnSubmit)}
              >
                {/* Name Field */}
                <div>
                  <label
                    for="username"
                    class="block mb-2 text-sm font-medium  dark:text-black"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Name is required",
                      },
                    })}
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name"
                    required=""
                  />
                  {errors.name && (
                    <span style={{ color: "red" }}>
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium  dark:text-black"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    {...register("email", {
                      required: { value: true, message: "Email is required" },
                    })}
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                  {errors.email && (
                    <span style={{ color: "red" }}>{errors.email.message}</span>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium  dark:text-black"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                      minLength: {
                        value: 3,
                        message: "Password must be at least 3 characters long!",
                      },
                    })}
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                  {errors.password && (
                    <span style={{ color: "red" }}>
                      {errors.password.message}
                    </span>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label
                    for="c_password"
                    class="block mb-2 text-sm font-medium  dark:text-black"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="c_password"
                    id="c_password"
                    placeholder="••••••••"
                    {...register("c_password", {
                      required: "Confirm password is required",
                      validate: (value) =>
                        value === password || "Passwords do not match!",
                    })}
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                  {errors.c_password && (
                    <span style={{ color: "red" }}>
                      {errors.c_password.message}
                    </span>
                  )}
                </div>

                {/* <button class="w-full text-white bg-black hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium  text-sm px-5 py-2.5 text-center dark:hover:bg-primary-700 ">
                  Sign Up
                </button> */}

                <button
                type="submit"
                disabled={isLoading} // Disable button when loading
                className="w-full text-white bg-[#000000] hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center dark:hover:bg-primary-700"
              >
                {isLoading ? "Signing up..." : "Sign Up"}
              </button>

                <p class="text-sm font-light text-gray-500 dark:text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign in
                  </Link>
                </p>
                
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
