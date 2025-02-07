import type { Column } from '@tanstack/react-table';

/**
 * Generate common pinning styles for a table column.
 *
 * This function calculates and returns CSS properties for pinned columns in a data table.
 * It handles both left and right pinning, applying appropriate styles for positioning,
 * shadows, and z-index. The function also considers whether the column is the last left-pinned
 * or first right-pinned column to apply specific shadow effects.
 */
export function getCommonPinningStyles<TData>({
  column,
  withBorder = false
}: {
  column: Column<TData>;
  /**
   * Show box shadow between pinned and scrollable columns.
   * @default false
   */
  withBorder?: boolean;
}): React.CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right');

  return {
    boxShadow: withBorder
      ? isLastLeftPinnedColumn
        ? '-4px 0 4px -4px hsl(var(--border)) inset'
        : isFirstRightPinnedColumn
          ? '4px 0 4px -4px hsl(var(--border)) inset'
          : undefined
      : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: isPinned ? 0.97 : 1,
    position: isPinned ? 'sticky' : 'relative',
    background: isPinned ? 'hsl(var(--background))' : 'hsl(var(--background))',
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0
  };
}

/**
 * Convert a string to sentence case.
 * Example: "firstName" -> "First Name"
 */
export function toSentenceCase(str: string) {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}

/**
 * Compose multiple refs into a single ref function.
 * Useful when you need to pass multiple refs to a component.
 */
export function composeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (node: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref && typeof ref === 'object') {
        (ref as React.MutableRefObject<T>).current = node;
      }
    });
  };
}
