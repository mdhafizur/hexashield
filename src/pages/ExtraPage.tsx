import { Box } from '@mui/material'

export default function ExtraPage() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        bgcolor: "background.default", // Using custom background color from theme
        p: 3,
      }}
    >
      Extras
    </Box>
  )
}
