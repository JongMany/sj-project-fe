import MainHeader from '@/components/shared/main-header';
import { Layout } from 'antd';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout>
      <MainHeader />
      {children}
    </Layout>
  );
}
