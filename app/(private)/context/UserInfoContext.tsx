'use client';

import React, { createContext, useContext } from 'react';
import { IUserInfo } from '../shared/types';

const UserInfoContext = createContext<IUserInfo | null>(null);

export const UserInfoProvider = ({
  UserInfo,
  children,
}: {
  UserInfo: IUserInfo;
  children: React.ReactNode;
}) => {
  return (
    <UserInfoContext.Provider value={UserInfo}>
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = () => useContext(UserInfoContext);
