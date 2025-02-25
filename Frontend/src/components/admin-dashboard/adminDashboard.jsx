import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import DataTable from "./DataTable";
import usericon from "../../assets/user-icon.png";
import ordericon from "../../assets/query-icon.png";
import producticon from "../../assets/user-icon.png";
import "./AdminDashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/authAction";
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [profileToggle, setProfileToggle] = useState(false);

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
      title: "Total Orders",
      icon: ordericon,
      component: "totalOrders",
      // value: Orders.length,
    },
    {
      id: 3,
      title: "Total Products",
      icon: producticon,
      component: "totalProducts",
      // value: products.length,
    },
  ];

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "totalUsers":
        return (
          <DataTable title="Total Users" users={users} state="user">
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </DataTable>
        );

      case "totalOrders":
        return (
          <DataTable title="Total Orders" Orders={Orders} state="order">
            <th>Order No.</th>
            <th>Order ID</th>
            <th>User</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
            <th>Date</th>
            <th>Payment</th>
          </DataTable>
        );

      case "totalProducts":
        return (
          <DataTable title="Total Products" products={products} state="product">
            <th>Product ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
          </DataTable>
        );

      default:
        return (
          <div className="admin-dashboard">
            <h1>Welcome to the Admin Dashboard</h1>
          </div>
        );
    }
  };

  return (
    <>
      <div className="header-top">
        <div className="admin-logo">
          <Link to={"/admin-dashboard"}>
            <h1>Reviefy</h1>
          </Link>
        </div>
        <div className="profile">
          <Link onClick={() => setProfileToggle(!profileToggle)}>
            <FaRegUser id="profile-icon" />
            <ul
              id="profile-dropdown"
              style={{ display: profileToggle ? "block" : "none" }}
            >
              <li>
                <Link
                  to={"/"}
                  onClick={() => {
                    dispatch(logout());
                    navigate("/");
                  }}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </Link>
        </div>
      </div>
      <div id="admin-portal">
        <div className="admin-dashboard">
          <h1>Dashboard</h1>
          <ul className="option-grid">
            {OptionData.map((option) => (
              <li
                key={option.id}
                className="option"
                onClick={() => setActiveComponent(option.component)}
              >
                <div className="option-info">
                  <h2>{option.title}</h2>
                  <p>{option.value}</p>
                </div>
                <div className="option-icon">
                  <img src={option.icon} alt={option.title} />
                </div>
              </li>
            ))}
          </ul>
          <div className="component-container">{renderActiveComponent()}</div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
