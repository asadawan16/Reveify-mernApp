import React from "react";
import classes from "./charts.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomerComplaintsChart = ({ data }) => {
  return (
    <div>
      <h3 className={classes.chartHeading}>Most Common Customer Complaints</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="complaint" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#f39c12" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomerComplaintsChart;
