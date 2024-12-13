export interface Message {
    _id: string;              // Unique identifier for the message
    conversation_id: string;  // ID of the conversation this message belongs to
    sender: string;   // Sender of the message
    content: string;          // Message content
    created_at: string;       // ISO8601 timestamp when the message was created
    updated_at: string;       // ISO8601 timestamp when the message was last updated
}

export interface MessageRequest {
    conversation_id: string;  // ID of the conversation this message belongs to
    sender: string;   // Sender of the message
    content: string;          // Message content
}
