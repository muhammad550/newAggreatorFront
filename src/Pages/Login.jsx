import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_API_URL } from "../constants/apiConstants";
 // Assuming you have the loader image here

function Login() {
  const { setAuth, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(""); // State for login error
  const [isLoading, setIsLoading] = useState(false); // State for showing loader

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleOnSubmit = async (data) => {
    setIsLoading(true); // Start the loader
    try {
      const res = await axios.post(LOGIN_API_URL, data);
      axios.defaults.withCredentials = true;

      if (res.status === 200) {
        console.log("login successfully");
        setAuth(true);
        setUser(res.data.data.name);
        localStorage.setItem("userToken", res.data.data.token);
        navigate("/");
      }
    } catch (error) {
      // Handle error and set loginError message
      console.log("error while logging in", error);
      setLoginError("Invalid credentials. Please try again."); // Show error message
    } finally {
      setIsLoading(false); // Stop the loader
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-4 pb-34 pt-10 md:px-6 md:py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-black">
              Sign In
            </h1>

            
          
              
            

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleOnSubmit)}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium dark:text-black">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  {...register("email", {
                    required: { value: true, message: "Email is required" },
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
                {errors.email && (
                  <span style={{ color: "red" }}>{errors.email.message}</span>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium dark:text-black">
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password && (
                  <span style={{ color: "red" }}>{errors.password.message}</span>
                )}
              </div>

              {/* Error Message */}
              {loginError && (
                <div className="text-red-500 text-sm mb-4">{loginError}</div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading} // Disable button when loading
                className="w-full text-white bg-[#000000] hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center dark:hover:bg-primary-700"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>

              <p className="text-sm font-light text-black dark:text-gray-500">
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
