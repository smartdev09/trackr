'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { MainNav } from '@/components/MainNav';
import { MobileNav } from '@/components/MobileNav';
import { UserMenu } from '@/components/UserMenu';
import { SearchInput } from '@/components/SearchInput';
import { PageContainer } from '@/components/PageContainer';
import { useTimeRange } from '@/contexts/TimeRangeContext';
import { useSession } from '@/lib/auth-client';
import { AbacusLogo } from '@/components/AbacusLogo';

interface AppHeaderProps {
  /**
   * Optional custom search component to show in header.
   * If not provided, a default SearchInput will be shown.
   * Will be hidden on mobile (sm:hidden) automatically.
   */
  search?: ReactNode;
  /**
   * If true, only shows the logo without navigation or user menu.
   * Useful for marketing/welcome pages.
   */
  logoOnly?: boolean;
}

/**
 * Shared app header with navigation, mobile menu, search, and user menu.
 * Uses TimeRangeContext for the days parameter.
 * 
 * On /welcome page:
 * - If user is authenticated: show full navigation (they can access dashboard)
 * - If user is not authenticated: show only logo (they cannot access dashboard)
 */
export function AppHeader({ search, logoOnly = false }: AppHeaderProps) {
  const { days } = useTimeRange();
  const pathname = usePathname();
  const { data: session } = useSession();

  // Auto-detect if we're on welcome/marketing pages
  const isWelcomePage = pathname === '/welcome' || pathname?.startsWith('/welcome/');
  
  // Show logo only if:
  // 1. Explicitly requested via logoOnly prop, OR
  // 2. On welcome page AND user is not authenticated
  const showLogoOnly = logoOnly || (isWelcomePage && !session?.user);

  const searchComponent = search ?? <SearchInput days={days} placeholder="Search users..." />;

  if (showLogoOnly) {
    return (
      <header className="relative z-20 border-b border-white/5">
        <PageContainer className="py-4">
          <Link href="/welcome" className="flex items-center gap-2.5 group">
            <AbacusLogo className="w-6 h-6 text-white/70 transition-all duration-200 group-hover:text-white group-hover:scale-105" />
            <span className="font-display text-lg font-medium tracking-tight text-white group-hover:text-white/90 transition-colors">
              Trackr
            </span>
          </Link>
        </PageContainer>
      </header>
    );
  }

  return (
    <header className="relative z-20 border-b border-white/5">
      <PageContainer className="py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MobileNav days={days} />
            <MainNav days={days} />
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              {searchComponent}
            </div>
            <UserMenu />
          </div>
        </div>
      </PageContainer>
    </header>
  );
}
