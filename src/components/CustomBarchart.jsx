import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const CustomBarchart = ({ data }) => {

  const getBarColor = (entry) => {
    switch (entry?.priority) {
      case "Low":
        return "#4CAF50";
      case "Medium":
        return "#FF9800";
      case "High":
        return "#F44336";
      default:
        return "#4CAF50";
    }
  };

  return (
    <div className="bg-white mt-6 w-full h-[260px] sm:h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data || []}>
          <CartesianGrid stroke="none" />

          <XAxis
            dataKey="priority"
            tick={{ fill: "#555", fontSize: 12 }}
            stroke="none"
          />

          <YAxis
            tick={{ fill: "#555", fontSize: 12 }}
            stroke="none"
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />

          <Bar
            dataKey="count"
            name="Priority"
            radius={[10, 10, 0, 0]}
          >
            {data?.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry)} />
            ))}
          </Bar>

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarchart;