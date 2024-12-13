import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { Box } from "@mui/material";
import statsData from "../../assests/dummy-data/statsData.json";

// Define the type for the task
interface Task {
  date: string;
  // Add other properties that exist in each task object
}

interface ChartDataPoint {
  x: string;
  y: number;
}

interface LineChartData {
  id: string;
  color: string;
  data: ChartDataPoint[];
}

const TaskCompletionTrends: React.FC = () => {
  const [chartData, setChartData] = useState<LineChartData[]>([]);

  useEffect(() => {
    // Aggregate tasks by date
    const taskCountsByDate: { [key: string]: number } = {};
    statsData.forEach((task: Task) => {
      const date = task.date;
      taskCountsByDate[date] = (taskCountsByDate[date] || 0) + 1;
    });

    // Sort dates in chronological order
    const sortedDates = Object.keys(taskCountsByDate).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    // Transform data for Nivo Line Chart
    const transformedData: LineChartData[] = [
      {
        id: "Tasks Completed",
        color: "hsl(220, 70%, 50%)",
        data: sortedDates.map((date) => ({
          x: date,
          y: taskCountsByDate[date],
        })),
      },
    ];

    setChartData(transformedData);
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.default",
        height: "400px",
        width: "100%",
        minWidth: "400px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Task Completion Trends</h2>
      <ResponsiveLine
        data={chartData}
        margin={{ top: 10, right: 110, bottom: 70, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: "Date",
          legendOffset: 40,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Tasks Completed",
          legendOffset: -50,
          legendPosition: "middle",
        }}
        enableGridX={true}
        enableGridY={true}
        colors={{ scheme: "set2" }}
        pointSize={10}
        pointColor={{ from: "color", modifiers: [] }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        animate={true}
        motionConfig="wobbly"
        tooltip={({ point }) => (
          <div
            style={{
              backgroundColor: point.serieColor,
              color: "#fff",
              padding: "5px 10px",
              borderRadius: "4px",
            }}
          >
            <strong>{point.data.xFormatted}</strong>: {point.data.yFormatted} tasks
          </div>
        )}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: "#ffffff", // Change tick text color to white
              },
            },
            legend: {
              text: {
                fill: "#ffffff", // Change legend text color to white
              },
            },
          },
        }}
      />
    </Box>
  );
};

export default TaskCompletionTrends;