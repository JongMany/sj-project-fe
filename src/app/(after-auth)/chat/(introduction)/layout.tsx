import NavigateBackHeader from '@/components/shared/navigate-back-header';

export default function AgentIntroductionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavigateBackHeader />
      {children}
    </>
  );
}
