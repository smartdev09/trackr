'use client';

import { motion } from 'framer-motion';
import { Layers, BarChart3, GitCommit, RefreshCw, Users, Github } from 'lucide-react';

const features = [
  {
    icon: Layers,
    title: 'Multi-Provider Support',
    description: 'Track usage across Claude Code, Cursor, and GitHub Copilot in one unified dashboard',
    color: '#f59e0b', // amber (Claude Code)
  },
  {
    icon: BarChart3,
    title: 'Token & Cost Analytics',
    description: 'Real-time insights into token consumption and estimated costs per user and team',
    color: '#06b6d4', // cyan (Cursor)
  },
  {
    icon: GitCommit,
    title: 'AI Commit Attribution',
    description: 'Track which commits were AI-assisted across your repositories with Co-Authored-By detection',
    color: '#10b981', // emerald (Windsurf)
  },
  {
    icon: RefreshCw,
    title: 'Automated Sync',
    description: 'Hourly syncs via cron jobs keep your data fresh without manual intervention',
    color: '#0ea5e9', // sky (GitHub Copilot)
  },
  {
    icon: Users,
    title: 'User Analytics',
    description: 'Per-user breakdowns, percentile rankings, and adoption tracking across your team',
    color: '#f59e0b', // amber (Claude Code)
  },
  {
    icon: Github,
    title: 'Open Source',
    description: 'Self-host on Vercel or run locally. Full control over your data and customization',
    color: '#06b6d4', // cyan (Cursor)
  },
];

export function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="relative p-6 border border-white/10 rounded-lg bg-white/5 hover:bg-white/[0.07] transition-all duration-300 group overflow-hidden"
          >
            {/* Gradient glow effect on hover */}
            <div 
              className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
              style={{ backgroundColor: feature.color }}
            />
            
            {/* Icon with vibrant color */}
            <div 
              className="relative mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-300 group-hover:scale-110"
              style={{ 
                backgroundColor: `${feature.color}15`,
                boxShadow: `0 0 0 1px ${feature.color}30`
              }}
            >
              <Icon 
                className="w-6 h-6 transition-all duration-300" 
                style={{ color: feature.color }}
              />
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2 font-display">
              {feature.title}
            </h3>
            <p className="text-sm text-white/60 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
