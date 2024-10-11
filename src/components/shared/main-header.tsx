'use client';
import { Layout } from 'antd';
const { Header } = Layout;

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const items = [
  { key: '1', href: '/', label: 'Home' },
  { key: '2', href: '/chat', label: 'Chat' },
];

function MainHeader() {
  const pathname = usePathname();
  const logoutHandler = () => {
    signOut({
      callbackUrl: '/login',
      redirect: true,
    });
  };
  return (
    <Header
      style={{
        backgroundColor: 'white',
        display: 'flex',
        padding: '4px 8px',
        height: '50px',
        alignItems: 'center',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      <ul className="flex flex-1">
        {items.map((item) => (
          <li key={item.key}>
            <Link
              href={item.href}
              className={`text-black px-3 py-2 rounded-md ${
                pathname === item.href ? 'bg-gray-200 text-sky-400' : ''
              } transition-all`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={logoutHandler}>로그아웃</button>
      </div>
    </Header>
  );
}

export default MainHeader;
