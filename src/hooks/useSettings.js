import { useQuery } from '@tanstack/react-query';
import { settingsService } from '../services/settingsService';
import { QUERY_KEYS } from '../lib/queryClient';

export function useSettings() {
  return useQuery({
    queryKey: QUERY_KEYS.SETTINGS,
    queryFn: () => settingsService.get(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
