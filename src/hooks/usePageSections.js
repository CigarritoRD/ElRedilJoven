import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pageSectionService } from '../services/pageSectionService';

export function usePageSections() {
  return useQuery({
    queryKey: ['page-sections'],
    queryFn: () => pageSectionService.getAll(),
    staleTime: 1000 * 60 * 5,
  });
}

export function usePageSection(page, sectionKey) {
  return useQuery({
    queryKey: ['page-section', page, sectionKey],
    queryFn: () => pageSectionService.getSection(page, sectionKey),
    staleTime: 1000 * 60 * 5,
  });
}

export function useUpdatePageSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }) => pageSectionService.update(id, updates),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['page-sections'] });
      queryClient.invalidateQueries({ queryKey: ['page-section', data.page, data.section_key] });
    },
  });
}
