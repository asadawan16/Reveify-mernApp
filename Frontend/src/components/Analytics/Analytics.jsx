import React from "react";
import { useSelector } from "react-redux";
import AverageRatingsChart from "../AnalyticalCharts/AverageRatingsChart";
import TopBottomAgentsChart from "../AnalyticalCharts/TopBottomAgentsChart";
import CustomerComplaintsChart from "../AnalyticalCharts/CustomerComplaintsChart";
import OrderPriceChart from "../AnalyticalCharts/OrderPriceChart";
import getAverageRatingsPerLocation from "../../utils/Analytics/AverageRatingsPerLocation ";
import getTopAndBottomAgents from "../../utils/Analytics/topBottomAgents";
import getMostCommonComplaints from "../../utils/Analytics/CommonComplaints";
import getOrdersByPriceRange from "../../utils/Analytics/OrdersbyPrice";
import classes from "./Analytics.module.css";
const Analytics = () => {
  const reviews = useSelector((state) => state.review.reviews);

  if (!reviews || reviews.length === 0) {
    return <h2 className={classes.loading}>Loading Analytics...</h2>;
  }

  const avgRatingsData = getAverageRatingsPerLocation(reviews);
  const { topAgents, bottomAgents } = getTopAndBottomAgents(reviews);
  const complaintsData = getMostCommonComplaints(reviews);
  const orderPriceData = getOrdersByPriceRange(reviews);

  return (
    <div className={classes.Analytics}>
      <h2>Analytics Dashboard</h2>
      <AverageRatingsChart data={avgRatingsData} />
      <TopBottomAgentsChart topAgents={topAgents} bottomAgents={bottomAgents} />
      <CustomerComplaintsChart data={complaintsData} />
      <OrderPriceChart data={orderPriceData} />
    </div>
  );
};

export default Analytics;
