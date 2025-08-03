import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  ReferenceArea,
} from "recharts";

const COLORS = [
  "#36cfc9",
  "#9254de",
  "#fadb14",
  "#ff4d4f",
  "#40a9ff",
  "#fa8c16",
  "#73d13d",
  "#13c2c2",
];

function TopicChart({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  const chartData = Object.entries(data || {})
    .map(([topic, count]) => ({
      topic,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  const highlightIndex = activeIndex !== null ? activeIndex : hoverIndex;

  return (
    <section
      className="chart-section"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "95%", maxWidth: "1000px" }}>
        {" "}
        {/* Limit width */}
        <h2 className="chart-title" style={{ textAlign: "center" }}>
          Problems Solved by Topic
        </h2>
        {chartData.length === 0 ? (
          <p className="no-data" style={{ textAlign: "center" }}>
            No topic data available.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 30, right: 30, left: 40, bottom: 30 }}
              barCategoryGap="30%"
              onClick={(e) => {
                if (e && e.index !== undefined) {
                  setActiveIndex((prev) => (prev === e.index ? null : e.index));
                }
              }}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis
                type="number"
                allowDecimals={false}
                tick={{ className: "axis-tick" }}
                axisLine={{ className: "axis-line" }}
                tickLine={false}
              />
              <YAxis
                dataKey="topic"
                type="category"
                tick={{ className: "axis-tick-y" }}
                width={120} // ✅ Reduced width
                axisLine={{ className: "axis-line" }}
                tickLine={false}
                onMouseMove={(e) => {
                  if (e && e.activeTooltipIndex !== undefined) {
                    setHoverIndex(e.activeTooltipIndex);
                  } else {
                    setHoverIndex(null);
                  }
                }}
              />
              {highlightIndex !== null && (
                <ReferenceArea
                  y1={highlightIndex - 0.5}
                  y2={highlightIndex + 0.5}
                  x1="auto"
                  x2="auto"
                  stroke="none"
                  fill="rgba(54, 207, 201, 0.15)"
                  ifOverflow="visible"
                />
              )}
              <Tooltip
                contentStyle={{
                  background: "#222",
                  border: "none",
                  color: "#fff",
                  padding: "6px 10px",
                  maxWidth: "180px",
                  fontWeight: "700",
                  borderRadius: "6px",
                }}
                labelStyle={{
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: "14px",
                }}
                itemStyle={{
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: "14px",
                }}
              />
              <Bar
                dataKey="count"
                radius={[0, 6, 6, 0]}
                maxBarSize={40}
                cursor="pointer"
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}

TopicChart.propTypes = {
  data: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default TopicChart;
