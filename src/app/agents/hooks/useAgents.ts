import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook';
import { fetchAgentsThunk } from '../slices/agentsSlice';
import { RootState } from '../../store';

export const useAgents = () => {
  const dispatch = useAppDispatch();
  const { agents, loading, error } = useAppSelector((state: RootState) => state.agents);


  // Memoized fetch function to avoid unnecessary re-creations
  const fetchAgents = useCallback(() => {
    dispatch(fetchAgentsThunk());
  }, [dispatch]);

  // Automatically fetch agents on hook initialization (optional)
  useEffect(() => {
    if (!agents.length) {
      fetchAgents();
    }
  }, [fetchAgents, agents.length]);

  return { agents, loading, error, fetchAgents };
};
