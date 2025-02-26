import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import classes from "./login.module.css";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { getReviews } from "../../store/reviews/reviewActions";
import { fetchUsers } from "../../store/users/userActions";
import { authenticate } from "../../store/auth/authAction";
const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [toggledisabled, setToggleDisabled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setToggleDisabled(true);
    const result = await dispatch(authenticate(credentials));
    const user = result.user;
    if (result.success && user.role === "admin") {
      navigate("/admin-dashboard");
      return;
    }
    if (result.success && user.role === "user") {
      navigate("/review");
      return;
    } else {
      setToggleDisabled(false);
      alert(result.error);
    }
  };
  return (
    <div className={classes["login-container"]}>
      <form onSubmit={handleLogin} className={classes["auth-form"]}>
        <h1>Login</h1>
        <span>Welcome back! Please log in to access your account.</span>
        <label htmlFor="email" className={classes["login-email"]}>
          Email or Username
        </label>
        <input
          type="text"
          name="email"
          id="email"
          className="login-email"
          placeholder="Enter your email"
          value={credentials.email}
          onChange={handleChange}
        />
        <label htmlFor="password" className={classes["login-password"]}>
          Password
        </label>
        <div className={classes.password}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id={classes.password}
            placeholder="Enter your password"
            value={credentials.password}
            onChange={handleChange}
          />
          {showPassword ? (
            <IoMdEye
              className={classes["eye-icon"]}
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <IoMdEyeOff
              className={classes["eye-icon"]}
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        <Link to={"/forgotpassword"} className={classes.forgotpassword}>
          Forgot Password?
        </Link>

        <button
          type="submit"
          className={classes.submitbtn}
          disabled={toggledisabled}
          style={toggledisabled ? { opacity: 0.5, cursor: "not-allowed" } : {}}
        >
          Login
        </button>
        <span className={classes.choice}>OR</span>
        <p className={classes.redirect}>
          Don't have an account?
          <Link to={"/signup"} className={classes["login-link"]}>
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
