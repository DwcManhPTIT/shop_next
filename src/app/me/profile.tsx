'use client';

import React, { use, useContext, useEffect } from 'react';

import accountApiRequest from '@/apiRequest/account';

export const Profile = () => {
  useEffect(() => {
    const fetchApi = async () => {
      const result = await accountApiRequest.meClient();
    };
    fetchApi();
  }, []);

  return <div>Profile </div>;
};
