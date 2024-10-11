'use client';

import { signOut, useSession } from 'next-auth/react';
import React from 'react';

function Header() {
  const { data: session } = useSession();
  console.log('session', session);
  const logoutHandler = () => {
    signOut({
      callbackUrl: '/login',
      redirect: true,
    });
  };
  return (
    <div>
      <button onClick={logoutHandler}>로그아웃</button>
    </div>
  );
}

export default Header;
