import { ILander } from '@/app/shared/types';
import { fetchApi } from '@/app/utils/api';
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
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function LanderDataTableActionsCell({
  lander,
}: {
  lander: ILander;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const handleDeleteClick = async (id?: number) => {
    if (!id) {
      setIsDialogOpen(false);
      return;
    }
    setIsDeleting(true);
    try {
      const result = await fetchApi(`/landers/${id}`, {
        method: 'DELETE',
      });

      console.log(result);
      setIsDeleting(false);
      setIsDialogOpen(false);
      router.push('/landers');
    } catch (error) {
      setIsDeleting(false);
      console.error(error);
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
            <Link className="cursor-pointer" href={`landers/${lander.id}/edit`}>
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              className="cursor-pointer"
              href={`landers/${lander.id}/duplicate`}
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
            lander?
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
                onClick={() => handleDeleteClick(lander.id)}
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
