'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';

function NavigateBackHeader() {
  const router = useRouter();
  const navigateBack = () => {
    router.back();
  };
  return (
    <nav
      style={{
        backgroundColor: 'white',
        padding: '8px 12px',
        height: '50px',
      }}
    >
      <button onClick={navigateBack}>
        <IoIosArrowBack className="font-bold text-[18px]" />
      </button>
    </nav>
  );
}

export default NavigateBackHeader;
