import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';

type UseTableCellUpdaterProps = {
  rootId: string;
};

export function useTableCellUpdater({ rootId }: UseTableCellUpdaterProps) {
  const queryClient = useQueryClient();
  const [updatingCellId, setUpdatingCellId] = React.useState<string | null>(
    null
  );

  const { isFetching } = useQuery({
    queryKey: ['profile', rootId],
    enabled: false // We don't want to fetch data here, just track the state
  });

  // Clear updatingCellId only when fetching is complete
  React.useEffect(() => {
    if (!isFetching && updatingCellId) {
      setUpdatingCellId(null);
    }
  }, [isFetching, updatingCellId]);

  const handleCellSubmit = async <T extends { id: string }>(
    data: T,
    upsertFn: (data: T) => Promise<any>
  ) => {
    try {
      const result = await upsertFn(data);
      if (!result) {
        throw new Error('Failed to upsert');
      }

      // Create composite ID from row ID and field name
      const cellId = `${data.id}::${Object.keys(data).find(key => key !== 'id')}`;
      setUpdatingCellId(cellId);

      // Invalidate queries
      queryClient.invalidateQueries({
        queryKey: ['profile', rootId],
        exact: true,
        refetchType: 'all'
      });

      if (rootId) {
        queryClient.invalidateQueries({
          queryKey: ['validation-logs', rootId],
          exact: true,
          refetchType: 'all'
        });
      }

      return true;
    } catch (error) {
      setUpdatingCellId(null);
      console.error('Failed to upsert:', error);
      return false;
    }
  };

  return {
    updatingCellId,
    handleCellSubmit
  };
}
