import { TasksTable } from './table';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <main className="w-full p-8">
      <h1 className="mb-8 text-2xl font-bold">Task Management</h1>
      <TasksTable />
    </main>
  );
}
