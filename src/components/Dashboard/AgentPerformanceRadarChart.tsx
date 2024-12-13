import React, { useEffect, useState } from "react";
import { ResponsiveRadar } from "@nivo/radar";
import { Box } from "@mui/material";
import statsData from "../../assests/dummy-data/statsData.json"; // Importing task data


interface AgentMetrics {
  [agent: string]: {
    tasksCompleted: number;
    timeTaken: number;
    vulnerabilitiesIdentified: number;
  };
}
interface ChartData extends Record<string, unknown> {
  agent: string;
  tasksCompleted: number;
  timeTaken: number;
  vulnerabilitiesIdentified: number;
}


const AgentPerformanceRadarChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const agentMetrics: AgentMetrics = {};

    statsData.forEach((task) => {
      const { agent, timeTaken, vulnerable } = task;

      if (!agentMetrics[agent]) {
        agentMetrics[agent] = { tasksCompleted: 0, timeTaken: 0, vulnerabilitiesIdentified: 0 };
      }

      agentMetrics[agent].tasksCompleted += 1;

      // Parse timeTaken, e.g., "18mins" -> 18
      const time = parseInt(timeTaken.replace("mins", ""), 10) || 0;
      agentMetrics[agent].timeTaken += time;

      // Count vulnerabilities identified
      agentMetrics[agent].vulnerabilitiesIdentified += vulnerable.length;
    });

    const transformedData: ChartData[] = Object.keys(agentMetrics).map((agent) => ({
      agent,
      tasksCompleted: agentMetrics[agent].tasksCompleted,
      timeTaken: agentMetrics[agent].timeTaken,
      vulnerabilitiesIdentified: agentMetrics[agent].vulnerabilitiesIdentified,
    }));

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
      <h2 style={{ textAlign: "center" }}>Agent Performance Across Metrics</h2>
      <ResponsiveRadar
        data={chartData}
        keys={["tasksCompleted", "timeTaken", "vulnerabilitiesIdentified"]}
        indexBy="agent"
        maxValue="auto"
        margin={{ right: 80, bottom: 40, left: 80 }}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{ from: "color" }}
        gridLevels={5}
        gridShape="circular"
        gridLabelOffset={36}
        enableDots={true}
        dotSize={12}
        dotColor={{ theme: "background" }}
        dotBorderWidth={3}
        dotBorderColor={{ from: "color", modifiers: [["darker", 0.1]] }}
        colors={{ scheme: "category10" }}
        fillOpacity={0.25}
        blendMode="multiply"
        animate={true}
        isInteractive={true}
        theme={{
          dots: {
            text: {
              fill: "#fff",
            },
          },
          tooltip: {
            container: {
              background: "#222",
              color: "#fff",
              fontSize: "12px",
              borderRadius: "4px",
              boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.15)",
            },
          },
        }}
      />
    </Box>
  );
};

export default AgentPerformanceRadarChart;
