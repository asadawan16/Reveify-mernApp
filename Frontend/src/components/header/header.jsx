import React from "react";
import { Link, NavLink } from "react-router-dom";
import classes from "./header.module.css";
import { BiLogOutCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth/authAction";
const Header = () => {
  const dispatch = useDispatch();
  return (
    <header>
      <Link to="/" className={classes.logo}>
        <span>Reviefy</span>
      </Link>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Reviews</NavLink>
          </li>
          <li>
            <NavLink to="/user-dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/review-table">Review Data</NavLink>
          </li>
        </ul>
      </nav>
      <div className={classes.logout}>
        <Link to="/login" onClick={() => dispatch(logout())}>
          <BiLogOutCircle size={22} className={classes.logoutIcon} />
          Logout
        </Link>
      </div>
    </header>
  );
};

export default Header;
