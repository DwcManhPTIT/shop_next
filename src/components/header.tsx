import React from 'react';
import Link from 'next/link';
import { ModeToggle } from './ui/ModelToggle';
import ButtonLogout from './button-logout';
export default function header() {
  return (
    <div>
      <ul>
        <li>
          <Link href={'/products/add'}> Thêm sản phẩm </Link>
        </li>
        <li>
          <Link href={'/login'}> Đăng nhập </Link>
        </li>
        <li>
          <Link href={'/register'}>Đăng kí</Link>
        </li>
        <li>
          <ButtonLogout />
        </li>
        <li>
          <ModeToggle />
        </li>
      </ul>
    </div>
  );
}
