import { AppHeader } from '@/components/AppHeader';
import { Footer } from '@/components/marketing/footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid-bg">
      <AppHeader />
      
      <main className="container mx-auto px-6">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
