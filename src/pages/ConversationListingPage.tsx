import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useConversations } from "@app/conversations/hooks/useConversations";
import {
  Box,
  CircularProgress,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  IconButton,
  Tooltip,
  useMediaQuery,
  Theme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ChatComponent from "@components/Conversation/ChatComponent";

export default function ConversationListingPage() {
  const { conversations, loading, error } = useConversations();
  const navigate = useNavigate();
  const location = useLocation();

  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("md")); // Media query for small screens
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  // Extract the conversation ID or "new" from the URL
  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const conversationId = pathParts[pathParts.length - 1];
    setSelectedConversation(conversationId === "new" ? "new" : conversationId || null);
  }, [location.pathname]);

  const handleCreateConversation = () => {
    setSelectedConversation("new");
    navigate("/conversations/new"); // Update URL for "new" conversation
  };

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversation(conversationId);
    navigate(`/conversations/${conversationId}`);
  };

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row", // Stack on small screens, row on larger screens
        height: "100vh",
        bgcolor: "background.default",
      }}
    >
      {/* Conversations Sidebar */}
      <Paper
        elevation={2}
        sx={{
          flexShrink: 0,
          width: isSmallScreen ? "100%" : 300, // Full width on small screens, fixed width on larger screens
          maxHeight: "100vh", // Ensure it takes the full viewport height
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid",
          borderColor: "divider",
        }}
      >
        {/* Sidebar Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <Typography variant="h6">Conversations</Typography>
          <Tooltip title="Create Conversation">
            <IconButton color="primary" onClick={handleCreateConversation}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Conversation List */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: 2,
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              borderRadius: "4px",
            },
          }}
        >
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress />
            </Box>
          )}
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              Failed to load conversations
            </Typography>
          )}
          {!loading && !error && conversations.length === 0 && (
            <Typography sx={{ mt: 2 }}>No conversations available</Typography>
          )}
          {!loading && !error && conversations.length > 0 && (
            <List>
              {conversations.map((conversation) => (
                <ListItemButton
                  key={conversation._id}
                  onClick={() => handleSelectConversation(conversation._id)}
                  selected={selectedConversation === conversation._id}
                  sx={(theme) => ({
                    "&.Mui-selected": {
                      backgroundColor: theme.palette.action.selected,
                      color: theme.palette.primary.main,
                      fontWeight: "bold",
                      borderLeft: `4px solid ${theme.palette.primary.main}`,
                    },
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  })}
                >
                  <ListItemText
                    primary={conversation.title || `Chat ${conversation._id}`}
                    primaryTypographyProps={{
                      variant: "body1",
                      noWrap: true,
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          )}
        </Box>
      </Paper>

      {/* Chat Component */}
      <Box
        component="section"
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          p: isSmallScreen ? 1 : 3, // Reduce padding on smaller screens
        }}
      >
        {selectedConversation ? (
          <ChatComponent conversationId={selectedConversation} />
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <Typography variant="body1" color="text.secondary">
              Select a conversation or create a new one to start chatting.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
