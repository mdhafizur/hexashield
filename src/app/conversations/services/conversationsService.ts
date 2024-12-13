import { Conversation } from '@app/conversations/types/conversation.types';
import { publicClient } from '@app/axios.client';
import { BaseQueryParams } from '@app/base.types';

export interface ConversationQueryParams extends BaseQueryParams {
  user_id?: string;         // Filter by associated user ID
  title?: string;           // Optional filter by title
}

// Fetch all conversations
export const fetchConversations = async (): Promise<Conversation[]> => {
  const response = await publicClient.get("/conversations");
  return response.data;
};

// Create a new conversation
export const createConversation = async (title: string, user_id: string): Promise<Conversation> => {
  const created_by = user_id
  const response = await publicClient.post("/conversations", { title, user_id, created_by });
  return response.data;
};

// Update an existing conversation
export const updateConversation = async (
  conversationId: string,
  updatedFields: Partial<Conversation>
): Promise<Conversation> => {
  const response = await publicClient.put(`/conversations/${conversationId}`, updatedFields);
  return response.data;
};

// Query conversations with filters and pagination
export const queryConversations = async (params: ConversationQueryParams): Promise<Conversation[]> => {
  const response = await publicClient.get("/conversations/query", { params });
  return response.data;
};
