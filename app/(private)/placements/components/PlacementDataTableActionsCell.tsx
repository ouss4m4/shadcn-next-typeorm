import { fetchApi } from '@/app/(private)/utils/api';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { IPlacement } from '../../shared/types';

export default function PlacementTableActionsCell({
  placement,
}: {
  placement: IPlacement;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteClick = async (id?: number) => {
    if (!id) {
      setIsDialogOpen(false);
      return;
    }
    setIsDeleting(true);
    try {
      await fetchApi(`/placements/${id}`, {
        method: 'DELETE',
      });

      setIsDeleting(false);
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
    }
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link
              className="cursor-pointer"
              href={`placements/${placement.id}/edit`}
            >
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              className="cursor-pointer"
              href={`placements/${placement.id}/duplicate`}
            >
              Duplicate
            </Link>
          </DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to delete this
            traffic source?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {isDeleting ? (
            <Button disabled type="submit">
              Deleting...
            </Button>
          ) : (
            <div className="flex space-x-4">
              <Button
                type="submit"
                variant="outline"
                onClick={() => handleDeleteClick()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="destructive"
                onClick={() => handleDeleteClick(placement.id)}
              >
                Delete
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
