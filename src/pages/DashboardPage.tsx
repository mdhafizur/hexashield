import { Box, Grid } from "@mui/material";  // Corrected Grid import
import TaskStatusPieChart from "../components/Dashboard/TaskStatusPieChart";
import AgentTaskBarChart from "../components/Dashboard/AgentTaskBarChart";
import TaskCompletionTrends from "../components/Dashboard/TaskCompletionTrends";
import AgentPerformanceRadarChart from "../components/Dashboard/AgentPerformanceRadarChart";
import TaskStatusByAgentChart from "../components/Dashboard/TaskStatusByAgentChart";

const DashboardPage: React.FC = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        height: "100vh",
        p: { xs: 1, sm: 3, md: 4 }, // Responsive padding
        bgcolor: "background.default",
      }}
    >
      {/* Dashboard Charts */}
      <Grid container spacing={3}>
        {/* First Row */}
        <Grid item xs={12} sm={12} md={8} marginBottom={"20px"}>
          <TaskCompletionTrends />
        </Grid>
        <Grid item xs={12} sm={12} md={4} marginBottom={"20px"}>
          <AgentPerformanceRadarChart />
        </Grid>

        {/* Second Row */}
        <Grid item xs={12} sm={6} md={4} marginBottom={"20px"}>
          <TaskStatusPieChart />
        </Grid>
        <Grid item xs={12} sm={6} md={4} marginBottom={"20px"}>
          <AgentTaskBarChart />
        </Grid>
        <Grid item xs={12} sm={6} md={4} marginBottom={"20px"}>
          <TaskStatusByAgentChart />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
