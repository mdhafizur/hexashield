import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TableSortLabel,
  TablePagination,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip
} from "@mui/material";
import TasksData from "../assests/dummy-data/taskData.json";
import { CopyBlock, dracula } from "react-code-blocks";

type Order = "asc" | "desc";

const MachinePage: React.FC = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof typeof TasksData[0]>("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<typeof TasksData[0] | null>(null);

  const handleRequestSort = (property: keyof typeof TasksData[0]) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedData = React.useMemo(() => {
    return TasksData.slice()
      .sort((a, b) => {
        if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
        if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
        return 0;
      })
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [order, orderBy, page, rowsPerPage]);

  const handleOpenModal = (task: typeof TasksData[0]) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedTask(null);
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        bgcolor: "background.default",
        p: 3,
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        TASK HISTORY
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 3, boxShadow: 4, borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                "& .MuiTableCell-root": {
                  fontWeight: "bold",
                  fontSize: "1rem",
                },
              }}
            >
              {[
                { id: "name", label: "Task Name" },
                { id: "status", label: "Status" },
                { id: "started", label: "Started" },
                { id: "ended", label: "Ended" },
                { id: "executedtime", label: "Execution Time" },
                { id: "actions", label: "Actions" },
              ].map((column) => (
                <TableCell
                  key={column.id}
                  sx={{
                    bgcolor: "white",
                    color: orderBy === column.id ? "purple" : "black",
                  }}
                  
                >
                  {column.id !== "actions" ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      onClick={() => handleRequestSort(column.id as keyof typeof TasksData[0])}
                      sx={{
                        "& .MuiTableSortLabel-icon": {
                          color: orderBy === column.id ? "white" : "purple",
                        },
                      }}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((task, index) => (
              <TableRow
                key={index}
                sx={{
                  bgcolor: index % 2 === 0 ? "action.hover" : "background.paper",
                  "&:hover": {
                    bgcolor: "primary.action",
                  },
                }}
              >
                <TableCell>{task.name}</TableCell>
                <TableCell
                  sx={{
                    color: task.status === "passed" ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {task.status}
                </TableCell>
                <TableCell>{task.started}</TableCell>
                <TableCell>{task.ended}</TableCell>
                <TableCell>{task.executedtime}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      textTransform: "none",
                      bgcolor: "primary.main",
                      "&:hover": { bgcolor: "primary.dark" },
                    }}
                    onClick={() => handleOpenModal(task)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={TasksData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[15, 25, 50, 100]}
        sx={{
          mt: 2,
          "& .MuiTablePagination-actions": {
            color: "primary.main",
          },
        }}
      />
      {/* Modal */}
<Dialog open={open} onClose={handleCloseModal} fullWidth maxWidth="md">
  <DialogTitle>Task Details</DialogTitle>
  <DialogContent dividers>
    {selectedTask ? (
      <>
        <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" mb={2}>
          <Typography variant="body1" gutterBottom>
            <strong>{selectedTask.name}</strong> 
          </Typography>
        </Box>
        
        <Box display="flex" justifyContent="center" alignItems="center" gap={2} mb={2}>
          <Typography variant="body1">
            <strong>Started:</strong> {selectedTask.started}
          </Typography>
          <Typography variant="body1">
            <strong>Ended:</strong> {selectedTask.ended}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" gap={2} mb={2}>
          <Typography variant="body1" gutterBottom>
            <strong>Execution Time:</strong> {selectedTask.executedtime}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" gap={2} mb={2}>
          <Typography variant="body1" component="span">
            <strong>Status:</strong>
          </Typography>
          <Chip
            label={selectedTask.status.toUpperCase()}
            color={selectedTask.status === "passed" ? "success" : "error"}
            variant="outlined"
            sx={{
              fontWeight: "bold",
              fontSize: "0.875rem",
            }}
          />
        </Box>


        {/* Commands Section */}
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          All Commands
        </Typography>
        {selectedTask.commands.length > 0 ? (
          <Box sx={{ mt: 1 }}>
            <CopyBlock
              text={selectedTask.commands.map((cmd) => cmd.command).join("\n")}
              language="bash"
              showLineNumbers={true}
              theme={dracula}
              codeBlock
            />
          </Box>
        ) : (
          <Typography>No commands available for this task.</Typography>
        )}

        {/* Outputs Section */}
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          All Outputs
        </Typography>
        {selectedTask.commands.length > 0 ? (
          <Box sx={{ mt: 1 }}>
            <CopyBlock
              text={selectedTask.commands.map((cmd) => cmd.output).join("\n")}
              language="text"
              showLineNumbers={true}
              theme={dracula}
              codeBlock
            />
          </Box>
        ) : (
          <Typography>No outputs available for this task.</Typography>
        )}
      </>
    ) : (
      <Typography>No task details available</Typography>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseModal} color="primary">
      Close
    </Button>
  </DialogActions>
</Dialog>
    </Box>
  );
};

export default MachinePage;
