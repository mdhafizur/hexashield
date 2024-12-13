import { combineReducers } from '@reduxjs/toolkit';
import agentsReducer from './agents/slices/agentsSlice'
import conversationsReducer from '@app/conversations/slices/conversationsSlice'
import messagesReducer from '@app/messages/slices/messagesSlice'

// Combine all feature reducers
const rootReducer = combineReducers({
    agents: agentsReducer,
    conversations: conversationsReducer,
    messages: messagesReducer,
    // Add more feature reducers here
});

export default rootReducer;
