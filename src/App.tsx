import React, { useEffect, useState } from 'react';
import { CssBaseline, Box, Button, Grid, createTheme, ThemeProvider } from '@mui/material';
import { Outlet } from 'react-router-dom';
import LeftSidebar from './components/LeftSidebar';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const theme = createTheme({
  palette: {
    background: {
      default: '#0A0F29', // Dark Blue for background
      paper: '#0A0F29',   // Dark Blue for paper (card) backgrounds
    },
    primary: {
      main: '#E5E5E5',  // Neon White for primary text
    },
    secondary: {
      main: '#00D9F9',  // Cyan for buttons
    },
    text: {
      primary: '#E5E5E5', // Neon White for text
      secondary: '#AB47BC', // Neon Purple for links/icons
    },
    divider: '#202940', // Steel Gray for dividers
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#00D9F9', // Cyan button background
          '&:hover': {
            backgroundColor: '#00A8D3', // Darker cyan on hover
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#AB47BC', // Neon Purple for links
          '&:hover': {
            color: '#9C27B0', // Slightly darker purple on hover
          },
        },
      },
    },
  },
});

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {}, [sidebarOpen]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container sx={{ height: '100vh', overflow: 'hidden' }}>
        {/* Sidebar */}
        <Grid
          item
          xs={sidebarOpen ? 2 : 0} // Adjust size when sidebar is open
          sx={{
            transition: 'width 0.3s ease',
            display: sidebarOpen ? 'block' : 'none',
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <LeftSidebar open={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} sm={12} lg={sidebarOpen ? 10 : 12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'background.default',
              position: 'relative',
              height: '100vh',
              overflow: 'auto',
            }}
          >
            {/* Toggle Sidebar Button */}
            {!sidebarOpen && (
              <Button
                variant="contained"
                sx={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  zIndex: 10,
                }}
                onClick={toggleSidebar}
              >
                <MenuOpenIcon sx={{ color: 'white' }} />
              </Button>
            )}

            {/* Nested Routes */}
            <Box sx={{ flexGrow: 1}}>
              <Outlet />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
