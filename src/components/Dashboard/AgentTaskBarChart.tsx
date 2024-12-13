import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Box } from "@mui/material";
import statsData from "../../assests/dummy-data/statsData.json"; // Importing task data

const AgentTaskBarChart: React.FC = () => {
  const [chartData, setChartData] = useState<{ agent: string; tasks: number }[]>([]);

  useEffect(() => {
    // Aggregate task counts by agent
    const agentTaskCounts: { [key: string]: number } = {};
    statsData.forEach((task) => {
      agentTaskCounts[task.agent] = (agentTaskCounts[task.agent] || 0) + 1;
    });

    // Transform into chart format
    const transformedData = Object.keys(agentTaskCounts).map((agent) => ({
      agent,
      tasks: agentTaskCounts[agent],
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
        minWidth: "350px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Tasks Per Agent</h2>
      <ResponsiveBar
        data={chartData}
        keys={["tasks"]}
        indexBy="agent"
        margin={{ top: 20, right: 80, bottom: 80, left: 80 }}
        padding={0.3}
        colors={{ scheme: "category10" }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45, // Rotate agent names for better visibility
          legend: "Agent",
          legendPosition: "middle",
          legendOffset: 60,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Tasks",
          legendPosition: "middle",
          legendOffset: -60,
        }}
        tooltip={({ id, value, color }) => (
          <div
            style={{
              padding: "10px",
              color: "#fff",
              backgroundColor: color,
              borderRadius: "5px",
              boxShadow: "0px 2px 4px rgba(0,0,0,0.25)",
            }}
          >
            <strong>Agent: {id}</strong>
            <div>Tasks Run: {value}</div>
          </div>
        )}
        theme={{
          axis: {
            ticks: {
              line: { stroke: "#ddd", strokeWidth: 1 },
              text: { fill: "#333" },
            },
          },
          grid: { line: { stroke: "#eee", strokeWidth: 1 } },
        }}
      />
    </Box>
  );
};

export default AgentTaskBarChart;
