import { Hero } from '@/components/marketing/hero';
import { Features } from '@/components/marketing/features';
import { DottedSeparator } from '@/components/marketing/dotted-separator';
import { Info } from '@/components/marketing/info';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trackr - AI Coding Tool Analytics',
  description: 'Track token usage, costs, and AI-assisted commits across Claude Code, Cursor, and GitHub Copilot. Get insights into your team\'s AI adoption with real-time analytics.',
  keywords: ['AI analytics', 'coding tools', 'Claude Code', 'Cursor', 'GitHub Copilot', 'token tracking', 'AI usage tracking', 'developer analytics'],
  authors: [{ name: 'smartdev' }],
  openGraph: {
    title: 'Trackr - AI Coding Tool Analytics',
    description: 'Track token usage, costs, and AI-assisted commits across Claude Code, Cursor, and GitHub Copilot. Get insights into your team\'s AI adoption.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Trackr',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trackr - AI Coding Tool Analytics',
    description: 'Track token usage, costs, and AI-assisted commits across Claude Code, Cursor, and GitHub Copilot.',
  },
};

export default function LandingPage() {
  return (
    <div className="space-y-32 py-12 md:py-16">
      <Hero />
      
      {/* Features Section */}
      <section className="max-w-screen-lg mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Powerful features to track, analyze, and optimize your team&apos;s AI coding tool usage
          </p>
        </div>
        
        <Features />
      </section>
   
    </div>
  );
}
