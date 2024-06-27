import React from 'react';
import Link from 'next/link';
import { ModeToggle } from './ui/ModelToggle';
import ButtonLogout from './button-logout';
import { cookies } from 'next/headers';
import accountApiRequest from '@/apiRequest/account';
import { AccountResType } from '@/schemaValidations/account.schema';
export default async function header({
  user,
}: {
  user: AccountResType['data'] | null;
}) {
  return (
    <div>
      <ul className="flex justify-between mt-10">
        <li>
          <Link href={'/products'}> Sản phẩm </Link>
        </li>
        {user ? (
          <>
            <div>
              <Link href={'/me'}>
                <strong>XIn chao {user.name}</strong>
              </Link>
            </div>
            <li>
              <ButtonLogout />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href={'/login'}> Đăng nhập </Link>
            </li>
            <li>
              <Link href={'/register'}>Đăng kí</Link>
            </li>
          </>
        )}

        <li>
          <ModeToggle />
        </li>
      </ul>
    </div>
  );
}
