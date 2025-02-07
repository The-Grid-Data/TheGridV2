'use client';

import * as React from 'react';
import type { DataTableAdvancedFilterField } from '@/components/thegrid-ui/data-table/types';
import { useDataTable } from '@/components/thegrid-ui/data-table/hooks/use-data-table';
import { DataTable } from '@/components/thegrid-ui/data-table/data-table';
import { DataTableToolbar } from '@/components/thegrid-ui/data-table/data-table-toolbar';
import { type ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/thegrid-ui/data-table/data-table-column-header';

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignee: string;
  createdAt: string;
}

const tasks: Task[] = [
  {
    id: '1',
    title: 'Create new landing page',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2024-02-01',
    assignee: 'John Doe',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Fix login bug',
    status: 'todo',
    priority: 'medium',
    dueDate: '2024-02-15',
    assignee: 'Jane Smith',
    createdAt: '2024-01-16'
  },
  {
    id: '3',
    title: 'Update documentation',
    status: 'done',
    priority: 'low',
    dueDate: '2024-01-30',
    assignee: 'Bob Wilson',
    createdAt: '2024-01-14'
  }
];

const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    )
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    enableSorting: true
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    )
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    )
  },
  {
    accessorKey: 'assignee',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assignee" />
    )
  }
];

interface TasksTableProps {}

export function TasksTable({}: TasksTableProps) {
  const [rowSelection, setRowSelection] = React.useState({});

  const filterFields: DataTableAdvancedFilterField<Task>[] = [
    {
      id: 'title',
      label: 'Title',
      placeholder: 'Filter titles...',
      type: 'text'
    },
    {
      id: 'status',
      label: 'Status',
      type: 'multi-select',
      options: [
        { label: 'Todo', value: 'todo' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Done', value: 'done' }
      ]
    },
    {
      id: 'priority',
      label: 'Priority',
      type: 'multi-select',
      options: [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' }
      ]
    }
  ];

  const table = useDataTable({
    data: tasks,
    columns,
    pageCount: Math.ceil(tasks.length / 10),
    filterFields,
    initialState: {
      sorting: [{ id: 'dueDate', desc: true }],
      columnPinning: { right: ['actions'] },
      pagination: {
        pageSize: 10,
        pageIndex: 0
      }
    }
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} filterFields={filterFields} />
      <DataTable table={table} />
    </div>
  );
}
