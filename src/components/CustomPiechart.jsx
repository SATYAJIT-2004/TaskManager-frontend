import React from "react";
import { Pie, PieChart, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const CustomPiechart = ({ data, colors }) => {
  return (
    <div className="w-full h-[260px] sm:h-[325px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={window.innerWidth < 640 ? 90 : 130}
            innerRadius={window.innerWidth < 640 ? 60 : 100}
            fill="#8884d8"
            dataKey="count"
            nameKey="status"
          >
            {data?.map((entry, index) => (
              <Cell
                key={`cell-${entry?.status}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPiechart;