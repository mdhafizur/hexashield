import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Box } from "@mui/material";
import statsData from "../../assests/dummy-data/statsData.json";

// Define types
interface Task {
  agent: string;
  status: string;
}

interface TaskStatusByAgent {
  [agent: string]: { [status: string]: number }; // Use an index signature here
}

interface ChartData {
  agent: string;
  [key: string]: string | number; // Dynamic keys for the task statuses
}

const TaskStatusByAgentChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    // Aggregate task statuses by agent
    const taskStatusByAgent: TaskStatusByAgent = {};

    statsData.forEach((task: Task) => {
      const { agent, status } = task;

      if (!taskStatusByAgent[agent]) {
        taskStatusByAgent[agent] = {};
      }

      taskStatusByAgent[agent][status] = (taskStatusByAgent[agent][status] || 0) + 1;
    });

    // Transform data for Nivo Bar Chart
    const transformedData = Object.keys(taskStatusByAgent).map((agent) => {
      const data: ChartData = { agent }; // Start with the agent name
      Object.keys(taskStatusByAgent[agent]).forEach((status) => {
        data[status] = taskStatusByAgent[agent][status]; // Dynamically add status counts
      });
      return data;
    });

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
      <h2 style={{ textAlign: "center" }}>Task Status by Agent</h2>
      <ResponsiveBar
        data={chartData}
        keys={["completed", "in-progress", "pending", "failed"]} // Adjust based on possible statuses
        indexBy="agent"
        margin={{ top: 10, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="stacked"
        colors={{ scheme: "set3" }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: "Agent",
          legendPosition: "middle",
          legendOffset: 40,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Number of Tasks",
          legendPosition: "middle",
          legendOffset: -50,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        tooltip={({ id, value, color, indexValue }) => (
          <div
            style={{
              background: color,
              padding: "5px 10px",
              borderRadius: "4px",
              color: "#fff",
            }}
          >
            <strong>
              {indexValue} ({id})
            </strong>: {value} tasks
          </div>
        )}
        role="application"
        ariaLabel="Task status by agent bar chart"
        barAriaLabel={(e) =>
          `${e.id}: ${e.formattedValue} tasks for agent ${e.indexValue}`
        }
      />
    </Box>
  );
};

export default TaskStatusByAgentChart;
