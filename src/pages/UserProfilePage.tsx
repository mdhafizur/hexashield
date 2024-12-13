import { Box } from '@mui/material'

export default function UserProfilePage() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        bgcolor: "background.default", // Using custom background color from theme
      }}
    >
     User Setting Page
    </Box>
  )
}
