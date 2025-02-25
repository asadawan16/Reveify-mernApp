import React from "react";
import { Link } from "react-router-dom";
import classes from "./footer.module.css";
const Footer = () => {
  return (
    <footer>
      <div className={classes.container}>
        <h2>Reviefy</h2>
        <ul>
          <li>
            <Link to="/">Reviews</Link>
          </li>
          <li>
            <Link to="/user-dashboard">Dashboard</Link>
          </li>
        </ul>
      </div>
      <span className={classes.copyright}>&copy; 2023 Reviefy</span>
    </footer>
  );
};

export default Footer;
