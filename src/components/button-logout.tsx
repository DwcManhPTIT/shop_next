'use client';

import authApiRequest from '@/apiRequest/auth';
import { Button } from './ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { handleErrorApi } from '@/lib/utils';
import { useAppContext } from '@/app/app-provider';

export default function ButtonLogout() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFromNextClientToNextServer();
      router.push('/login');
      router.refresh();
    } catch (error) {
      handleErrorApi({
        error,
      });
      authApiRequest.logoutFromNextClientToNextServer(true).then((res) => {
        router.push(`/login?redirectFrom=${pathname}`);
      });
    }
  };
  return (
    <Button onClick={handleLogout} size={'sm'}>
      Đăng xuất
    </Button>
  );
}
