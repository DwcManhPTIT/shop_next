import React from 'react';
import Link from 'next/link';
import { ModeToggle } from './ModelToggle';
export default function header() {
  return (
    <div>
      <ul>
        <li>
          <Link href={'/login'}> Đăng nhập </Link>
        </li>
        <li>
          <Link href={'/register'}>Đăng kí</Link>
        </li>
        <li>
          <ModeToggle />
        </li>
      </ul>
    </div>
  );
}
