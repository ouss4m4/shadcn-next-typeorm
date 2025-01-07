'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from './button';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowsCount: number;
  pageSize?: number;
  pageNumber: string;
  onPageChange: (page: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  rowsCount,
  pageSize = 10,
  pageNumber,
  onPageChange,
}: DataTableProps<TData, TValue>) {
  const page = Number(pageNumber);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const buildPaginationInfo = (): React.JSX.Element => {
    const safeRowsCount = Math.max(rowsCount, 0);
    const maxPage = Math.ceil(safeRowsCount / pageSize);

    if (safeRowsCount === 0) {
      return <div className="p-2">No records to display.</div>;
    }

    const from = page > 1 ? (page - 1) * pageSize + 1 : 1;
    const to = Math.min(page * pageSize, safeRowsCount);

    return (
      <div className="flex items-center justify-between p-2">
        <div>
          <span>Showing {from} </span>
          <span>to {to} </span>
          <span> total {rowsCount}</span>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page + 1)}
            disabled={page == maxPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  };
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {buildPaginationInfo()}
    </div>
  );
}
