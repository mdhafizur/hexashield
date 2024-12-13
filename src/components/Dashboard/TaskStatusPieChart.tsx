import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box } from "@mui/material";
import statsData from '../../assests/dummy-data/statsData.json';

// Example task data
const tasks = statsData;

// Define the type for the chart data
interface ChartData {
  id: string;
  label: string;
  value: number;
  percentage: string;
}

const TaskStatusPieChart: React.FC = () => {
  // Explicitly define the state type as ChartData[]
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    // Aggregate task statuses
    const statusCounts: { [key: string]: number } = {};
    tasks.forEach((task) => {
      statusCounts[task.status] = (statusCounts[task.status] || 0) + 1;
    });

    // Transform into chart format
    const transformedData = Object.keys(statusCounts).map((status) => ({
      id: status,
      label: status,
      value: statusCounts[status],
      percentage: ((statusCounts[status] / tasks.length) * 100).toFixed(2), // Calculate percentage
    }));

    setChartData(transformedData);
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.default",
        height: "350px",
        width: "100%",
        minWidth: "350px"
      }}
    >
      <h2 style={{ textAlign: "center" }}>Task Status Overview</h2>
      <ResponsivePie
        data={chartData}
        margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
        innerRadius={0.5} // Donut chart
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={10}
        colors={{ scheme: "pastel1" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        tooltip={({ datum: { id, value, color, data } }) => (
          <div
            style={{
              backgroundColor: "#1a202c",
              color: "#fff",
              padding: "10px",
              borderRadius: "6px",
              boxShadow: "0px 2px 4px rgba(0,0,0,0.25)",
              maxWidth: "200px",
            }}
          >
            <strong style={{ color }}>{id}</strong>
            <div>Tasks: {value}</div>
            <div>Percentage: {data.percentage}%</div>
          </div>
        )}
      />
    </Box>
  );
};

export default TaskStatusPieChart;
