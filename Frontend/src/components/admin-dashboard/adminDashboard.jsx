import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import DataTable from "./DataTable";
import usericon from "../../assets/user-icon.png";
import ordericon from "../../assets/query-icon.png";
import classes from "./adminDashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/authAction";
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [profileToggle, setProfileToggle] = useState(false);
  const reviews = useSelector((state) => state.review.reviews);
  const OptionData = [
    {
      id: 1,
      title: "Total Users",
      icon: usericon,
      component: "totalUsers",
      // value: users.length,
    },
    {
      id: 2,
      title: "Total Reviews",
      icon: ordericon,
      component: "TotalReviews",
      value: reviews.length,
    },
    {
      id: 3,
      title: "Total Reviews",
      icon: ordericon,
      component: "TotalReviews",
      value: reviews.length,
    },
  ];

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "totalUsers":
        return (
          <DataTable title="Total Users" data={users} state="user">
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </DataTable>
        );

      case "TotalReviews":
        return (
          <DataTable title="Total Reviews" data={reviews} state="reviews">
            <th>S.no</th>
            <th>agentId</th>
            <th>agentName</th>
            <th>customerId</th>
            <th>location</th>
            <th>discountApplied</th>
            <th>orderPrice</th>
            <th>rating</th>
            <th>Review</th>
            <th>sentiment</th>
            <th>performance</th>
            <th>accuracy</th>
          </DataTable>
        );

      default:
        return (
          <div className={classes["dashboard-title"]}>
            <h2>Welcome to the Admin Dashboard</h2>
          </div>
        );
    }
  };

  return (
    <>
      <div className={classes["admin-header"]}>
        <div className={classes["admin-logo"]}>
          <Link to={"/admin-dashboard"}>
            <h1>Reviefy</h1>
          </Link>
        </div>
        <div className={classes.logout}>
          <Link
            to="/login"
            onClick={() => {
              dispatch(logout());
            }}
          >
            <BiLogOutCircle size={22} className={classes.logoutIcon} />
            Logout
          </Link>
        </div>
      </div>
      <div className={classes["admin-dashboard"]}>
        <div className={classes.container}>
          <h1>Dashboard</h1>
          <ul className={classes["option-grid"]}>
            {OptionData.map((option) => (
              <li
                key={option.id}
                className={classes.option}
                onClick={() => setActiveComponent(option.component)}
              >
                <div className={classes["option-info"]}>
                  <h2>{option.title}</h2>
                  <p>{option.value}</p>
                </div>
                <div className={classes["option-icon"]}>
                  <img src={option.icon} alt={option.title} />
                </div>
              </li>
            ))}
          </ul>
          <div className={classes["active-component"]}>
            {renderActiveComponent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
