import { StatusMap, statusProps } from '@/app/(private)/shared/types';
import React from 'react';

const StatusLabel = ({
  statusKey,
  statusMap,
}: {
  statusKey: number;
  statusMap: StatusMap;
}) => {
  const status = statusMap[statusKey] as statusProps;
  if (!status) {
    return <span className="text-gray-500">{`${statusKey.toString()}`}</span>;
  }

  return (
    <div className="flex items-center space-x-2">
      <div className={`size-2 rounded-full bg-[${status.color}]`}> </div>
      <span className="text-sm">{status.text}</span>
    </div>
  );
};

export default StatusLabel;
