import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";

function DifficultyChart({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const chartData = Object.entries(data || {})
    .map(([difficulty, count]) => ({
      difficulty,
      count,
    }))
    .sort((a, b) => Number(a.difficulty) - Number(b.difficulty));

  const colors = [
    "#FF6B6B",
    "#FFA500",
    "#FFD93D",
    "#6BCB77",
    "#4D96FF",
    "#845EC2",
    "#FF9671",
    "#FFC75F",
    "#F9F871",
    "#00C9A7",
  ];

  const getLabelColor = (bgColor) => {
    const hex = bgColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 140 ? "#111" : "#FFFDEE";
  };

  return (
    <section className="chart-section">
      <h2 className="chart-title">Problems Solved by Difficulty</h2>
      {chartData.length === 0 ? (
        <p className="no-data">No difficulty data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={chartData}
            margin={{ top: 40, right: 30, bottom: 50, left: 20 }}
            barCategoryGap="20%"
            onClick={(e) => {
              if (e && e.index !== undefined) setActiveIndex(e.index);
              else setActiveIndex(null);
            }}
          >
            <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
            <XAxis
              dataKey="difficulty"
              tick={{ className: "axis-tick" }}
              axisLine={{ className: "axis-line" }}
              tickLine={false}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={60}
            />
            <YAxis
              allowDecimals={false}
              tick={{ className: "axis-tick" }}
              axisLine={{ className: "axis-line" }}
              tickLine={false}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={60}>
              {chartData.map((entry, index) => {
                const fillColor = colors[index % colors.length];
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={fillColor}
                    stroke={index === activeIndex ? "#3a7bd5" : "none"}
                    strokeWidth={index === activeIndex ? 3 : 0}
                    cursor="pointer"
                  />
                );
              })}
              <LabelList
                dataKey="count"
                position="top"
                style={{
                  fill: ({ index }) =>
                    getLabelColor(colors[index % colors.length]),
                  fontWeight: "700",
                  fontSize: 16,
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}

DifficultyChart.propTypes = {
  data: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default DifficultyChart;
