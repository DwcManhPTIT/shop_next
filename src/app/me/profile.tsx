'use client';

import React, { use, useContext, useEffect } from 'react';

import accountApiRequest from '@/apiRequest/account';
import { handleErrorApi } from '@/lib/utils';

export const Profile = () => {
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await accountApiRequest.meClient();
      } catch (error) {
        handleErrorApi({
          error,
        });
      }
    };

    fetchApi();
  }, []);

  return <div>Profile </div>;
};
