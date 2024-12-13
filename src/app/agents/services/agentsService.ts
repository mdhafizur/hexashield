import axios from 'axios';
import { Agent } from '../types/agent.types';

const BASE_URL = import.meta.env.VITE_WEB_API_URL as string;

export const fetchAgents = async (): Promise<Agent[]> => {
  const response = await axios.get(`${BASE_URL}/agents`);
  return response.data;
};
