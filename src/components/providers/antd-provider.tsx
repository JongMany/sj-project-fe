import { AntdRegistry } from '@ant-design/nextjs-registry';
import React, { PropsWithChildren } from 'react';

function AntdProvider({ children }: PropsWithChildren) {
  return <AntdRegistry>{children}</AntdRegistry>;
}

export default AntdProvider;
