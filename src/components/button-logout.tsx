'use client';

import authApiRequest from '@/apiRequest/auth';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { handleErrorApi } from '@/lib/utils';

export default function ButtonLogout() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFromNextClientToNextServer();
      router.push('/login');
    } catch (error) {
      handleErrorApi({
        error,
      });
    }
  };
  return (
    <Button onClick={handleLogout} size={'sm'}>
      Đăng xuất
    </Button>
  );
}
