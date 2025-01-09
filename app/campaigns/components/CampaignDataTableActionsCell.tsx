/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICampaign } from '@/app/shared/types';
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CampaignDataTableActionsCell({
  campaign,
  // onDelete
}: {
  campaign: ICampaign;
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
      const result = await fetchApi(`/campaigns/${id}`, {
        method: 'DELETE',
      });

      console.log(result);
      setIsDeleting(false);
      setIsDialogOpen(false);
    } catch (error) {
      setIsDeleting(false);
    }
    // setIsDialogOpen(false);
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
              href={`campaigns/${campaign.id}/edit`}
            >
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              className="cursor-pointer"
              href={`campaigns/${campaign.id}/duplicate`}
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
            campaign?
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
                onClick={() => handleDeleteClick(campaign.id)}
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
