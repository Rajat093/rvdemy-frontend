import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { REACT_APP_API } from "../endpoint.jsx";
import { useAuth } from "../context/auth.jsx";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const [error, setError] = useState("");
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  //submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        localStorage.setItem("auth", JSON.stringify(res.data));
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        navigate(location.state || "/");
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };
  return (
    <>
      <div className="login flex justify-center items-center ">
        <div className="flex items-center justify-center flex-row h-2/5 w-full">
          <div className="p-4  rounded-md shadow-lg md:w-1/4 w-2/3">
            <h2 className="text-4xl font-bold mb-3">Login Page</h2>
            <div className="login-box">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="">Email</label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <div style={{ position: "relative" }}>
                    <label>password</label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span
                      className="show-password-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "67%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </span>
                  </div>
                </div>
                {error && (
                  <div className="text-red-500">
                    {"Invalid Passwod or Email"}
                  </div>
                )}
                <div className="mb-3">
                  <Link to="/forgot-password" className="text-blue-600">
                    Forgot Password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-400 rounded w-full"
                >
                  Login
                </button>
              </form>
            </div>
            <div className="my-3">
              <Link to="/register" className="text-blue-600">
                New User?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
