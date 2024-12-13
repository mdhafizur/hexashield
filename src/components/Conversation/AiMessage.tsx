// AiMessage Component
import { Message } from '@app/messages/types/message.types';
import { Paper, Typography, Avatar, Box } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { formatDistanceToNow } from "date-fns";

export function AiMessage({ message }: { message: Message }) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "flex-start",
                mb: 1,
            }}
        >
            {/* Avatar for AI Icon */}
            <Avatar
                sx={{
                    mr: 2,
                    bgcolor: "secondary.main",
                }}
            >
                <SmartToyIcon />
            </Avatar>
            <Paper
                elevation={3}
                sx={{
                    p: 1.5,
                    maxWidth: "70%",
                    bgcolor: "grey.200",
                    color: "primary.contrastText",
                }}
            >
                <Typography variant="body2">{message.content}</Typography>
                <Typography
                    variant="caption"
                    sx={{ mt: 0.5, display: "block", textAlign: "right" }}
                >
                    {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                </Typography>
            </Paper>
        </Box>
    );
}
