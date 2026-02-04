'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { DashboardPreview } from './dashboard-preview';

export function Hero() {
  return (
    <div className="py-12 md:py-20 space-y-16">
      {/* Hero Content - Centered */}
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8 w-full"
        >
          <div>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-xs border border-white/10 bg-white/5 text-white/70">
              Track AI usage across your team
            </span>
          </div>

          <h1 className="xl:text-6xl !leading-[1.1] text-5xl text-pretty font-display font-semibold text-white">
            Analytics for Your AI Coding Tools
          </h1>
          <p className="text-secondary text-lg leading-relaxed max-w-3xl mx-auto">
            Track token usage, costs, and AI-assisted commits across Claude Code, Cursor, and GitHub Copilot. 
            Get insights into your team&apos;s AI adoption with real-time analytics and automated syncing.
          </p>

          <div className="flex items-center justify-center gap-6">
            <a href="https://smartdev09.github.io/trackr/" target="_blank" rel="noopener noreferrer">
              <button className="relative inline-flex items-center justify-center px-8 py-3 text-sm font-mono bg-white text-black border border-white/20 transition-transform hover:translate-x-0.5 hover:translate-y-0.5">
                <span className="absolute -bottom-0.5 -right-0.5 w-full h-full border border-white/20 -z-10"></span>
                Get Started
              </button>
            </a>

            <Link href="/sign-in">
              <button className="relative inline-flex items-center justify-center px-8 py-3 text-sm font-mono bg-transparent text-white border border-white/20 transition-transform hover:translate-x-0.5 hover:translate-y-0.5">
                <span className="absolute -bottom-0.5 -right-0.5 w-full h-full border border-white/20 -z-10"></span>
                Sign In
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Full Interactive Dashboard Preview */}
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-3xl font-semibold text-white mb-3">
            See It In Action
          </h2>
          <p className="text-white/60 text-sm max-w-2xl mx-auto">
            Explore an interactive preview of the dashboard with realistic data. Try changing the time range and switching between tabs.
          </p>
        </motion.div>
        
        <DashboardPreview />
      </div>
    </div>
  );
}
