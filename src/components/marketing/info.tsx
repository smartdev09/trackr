'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Zap, Terminal, Check } from 'lucide-react';
import Link from 'next/link';

const sections = [
  {
    icon: TrendingUp,
    title: 'Smart Analytics',
    points: [
      'Real-time dashboard with lifetime stats',
      'Model breakdown by tool and user',
      'Daily, weekly, monthly trend analysis',
      'Cost projections and budget tracking',
      'Tool distribution visualization',
      'Customizable time range filters',
    ],
  },
  {
    icon: Zap,
    title: 'Easy Setup',
    points: [
      'One-click deploy to Vercel',
      'Connect provider admin APIs',
      'Configure org domain for SSO',
      'Start syncing in minutes',
    ],
  },
  {
    icon: Terminal,
    title: 'Developer Experience',
    points: [
      'CLI commands for sync and backfill',
      'CSV export for custom analysis',
      'Comprehensive API documentation',
      'GitHub App for commit tracking',
      'Modular provider architecture',
    ],
  },
];

export function Info() {
  return (
    <div className="space-y-16">
      {sections.map((section, index) => {
        const Icon = section.icon;
        return (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white font-display">
                {section.title}
              </h2>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {section.points.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
                  className="flex items-start gap-3 text-sm text-white/70"
                >
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        );
      })}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="pt-8 flex justify-center"
      >
        <Link href="/sign-in">
          <button className="relative inline-flex items-center justify-center px-8 py-3 text-sm font-mono bg-white text-black border border-white/20 transition-transform hover:translate-x-0.5 hover:translate-y-0.5">
            <span className="absolute -bottom-0.5 -right-0.5 w-full h-full border border-white/20 -z-10"></span>
            Get Started
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
