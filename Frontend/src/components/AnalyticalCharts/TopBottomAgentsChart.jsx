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

const TopBottomAgentsChart = ({ topAgents, bottomAgents }) => {
  return (
    <div>
      <h3 className={classes.chartHeading}>Top 5 Agents</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={topAgents}>
          <XAxis dataKey="agentName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="avgRating" fill="#4caf50" />
        </BarChart>
      </ResponsiveContainer>

      <h3 className={classes.chartHeading}>Bottom 5 Agents</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={bottomAgents}>
          <XAxis dataKey="agentName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="avgRating" fill="#e74c3c" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopBottomAgentsChart;
