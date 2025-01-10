import React from 'react';

export default function loading() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="w-full flex-1 animate-pulse rounded-lg bg-muted p-4">
          Loading...
        </div>
      </div>
    </>
  );
}
