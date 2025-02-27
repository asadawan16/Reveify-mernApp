import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import DataTable from "./DataTable";
import usericon from "../../assets/user-icon.png";
import ordericon from "../../assets/query-icon.png";
import classes from "./adminDashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/authAction";
import { fetchUsers } from "../../store/users/userActions";
import { getReviews } from "../../store/reviews/reviewActions";
import Analytics from "../Analytics/Analytics";
import Footer from "../footer/footer";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, isLoading: usersLoading } = useSelector((state) => state.user);
  const { reviews, isLoading: reviewsLoading } = useSelector(
    (state) => state.review
  );
  const [activeComponent, setActiveComponent] = useState("dashboard");

  //  loading state
  const isDataLoading = usersLoading || reviewsLoading;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("jwtToken");
        const role = sessionStorage.getItem("user");

        if (!token || role !== "admin") {
          dispatch(logout());
          navigate("/login");
          return;
        }

        await Promise.all([dispatch(getReviews()), dispatch(fetchUsers())]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, navigate]);
  const OptionData = [
    {
      id: 1,
      title: "Total Users",
      icon: usericon,
      component: "totalUsers",
      value: isDataLoading ? "--" : users.length,
    },
    {
      id: 2,
      title: "Total Reviews",
      icon: ordericon,
      component: "TotalReviews",
      value: isDataLoading ? "--" : reviews?.length || 0,
    },
    {
      id: 3,
      title: "Analytics",
      icon: ordericon,
      component: "Analytics",
      value: 5,
    },
  ];

  // Rest of your component remains exactly the same
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "totalUsers":
        return (
          <DataTable title="Total Users" userdata={users} state="user">
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>User Status</th>
          </DataTable>
        );

      case "TotalReviews":
        return (
          <DataTable
            title="Total Reviews"
            reviewsdata={reviews}
            state="reviews"
          >
            <th>S.no</th>
            <th>agentId</th>
            <th>agentName</th>
            <th>customerId</th>
            <th>location</th>
            <th>discountApplied</th>
            <th>orderPrice</th>
            <th>rating</th>
            <th>Review</th>
            <th>sentiment, performance ,accuracy</th>
            <th>Edit Tags</th>
          </DataTable>
        );
      case "Analytics":
        return <Analytics />;

      default:
        return <Analytics />;
    }
  };

  return (
    <>
      {/* Keep all your existing JSX structure */}
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
                onClick={() =>
                  setActiveComponent(
                    option.component ? option.component : "Analytics"
                  )
                }
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
        <Footer />
      </div>
    </>
  );
};

export default AdminDashboard;
