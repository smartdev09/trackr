'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { StatCard } from '@/components/StatCard';
import { UsageChart } from '@/components/UsageChart';
import { ModelBreakdown } from '@/components/ModelBreakdown';
import { UserTable } from '@/components/UserTable';
import { TimeRangeSelector } from '@/components/TimeRangeSelector';
import { ToolDistribution } from '@/components/ToolDistribution';
import { CommitStats } from '@/components/CommitStats';
import { Users, Zap, DollarSign, TrendingUp, BarChart3, GitCommit, Activity, Database } from 'lucide-react';
import { formatTokens, formatCurrency } from '@/lib/utils';
import { TimeRange } from '@/lib/dateUtils';
import { Card } from '@/components/Card';
import { SectionLabel } from '@/components/SectionLabel';

type TabType = 'overview' | 'team' | 'usage' | 'commits' | 'status';

// Simple seeded pseudo-random generator for consistent SSR/client rendering
const seededRandom = (seed: number) => {
  let state = seed;
  return () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
};

// Fake data generators
const generateDailyUsage = (days: number) => {
  const data = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Use date as seed for consistent results
    const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
    const random = seededRandom(seed);
    
    // Simulate realistic usage patterns (higher during weekdays)
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseClaude = isWeekend ? 800000 : 1500000;
    const baseCursor = isWeekend ? 600000 : 1200000;
    
    // Add some variation using seeded random
    const claudeCode = Math.floor(baseClaude * (0.7 + random() * 0.6));
    const cursor = Math.floor(baseCursor * (0.7 + random() * 0.6));
    
    // Calculate cost (approximate pricing)
    const cost = (claudeCode * 3 + cursor * 3) / 1000000;
    
    data.push({
      date: date.toISOString().split('T')[0],
      claudeCode,
      cursor,
      cost,
    });
  }
  
  return data;
};

const generateUsers = () => [
  {
    email: 'sarah.chen@company.com',
    totalTokens: 12500000,
    totalCost: 37.5,
    claudeCodeTokens: 8500000,
    cursorTokens: 4000000,
    favoriteModel: 'sonnet-4',
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    email: 'alex.kim@company.com',
    totalTokens: 9800000,
    totalCost: 29.4,
    claudeCodeTokens: 5200000,
    cursorTokens: 4600000,
    favoriteModel: 'opus-4.5',
    lastActive: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    email: 'jordan.smith@company.com',
    totalTokens: 8200000,
    totalCost: 24.6,
    claudeCodeTokens: 6100000,
    cursorTokens: 2100000,
    favoriteModel: 'sonnet-4',
    lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    email: 'taylor.johnson@company.com',
    totalTokens: 7100000,
    totalCost: 21.3,
    claudeCodeTokens: 3500000,
    cursorTokens: 3600000,
    favoriteModel: 'haiku-3.5',
    lastActive: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    email: 'morgan.lee@company.com',
    totalTokens: 6500000,
    totalCost: 19.5,
    claudeCodeTokens: 4800000,
    cursorTokens: 1700000,
    favoriteModel: 'sonnet-4',
    lastActive: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
];

const generateModels = () => [
  {
    model: 'sonnet-4',
    tokens: 28500000,
    percentage: 48,
    tool: 'claude_code',
  },
  {
    model: 'opus-4.5',
    tokens: 15200000,
    percentage: 26,
    tool: 'claude_code',
  },
  {
    model: 'haiku-3.5',
    tokens: 9800000,
    percentage: 16,
    tool: 'cursor',
  },
  {
    model: 'sonnet-4',
    tokens: 6000000,
    percentage: 10,
    tool: 'cursor',
  },
];

export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [range, setRange] = useState<TimeRange>({ type: 'relative', days: 30 });
  const days = range.type === 'relative' ? range.days : 30;
  
  // Generate data based on selected range
  const dailyUsage = generateDailyUsage(days);
  const users = generateUsers();
  const models = generateModels();
  
  // Calculate totals
  const totalClaudeCode = dailyUsage.reduce((sum, d) => sum + d.claudeCode, 0);
  const totalCursor = dailyUsage.reduce((sum, d) => sum + d.cursor, 0);
  const totalTokens = totalClaudeCode + totalCursor;
  const totalCost = dailyUsage.reduce((sum, d) => sum + d.cost, 0);
  const activeUsers = users.length;
  
  // Simulate comparison data (previous period)
  const previousTotal = totalTokens * 0.88; // 12% growth
  const previousCost = totalCost * 0.92; // 8% growth
  const previousUsers = Math.max(1, activeUsers - 2);
  
  const trendTotal = ((totalTokens - previousTotal) / previousTotal * 100);
  const trendCost = ((totalCost - previousCost) / previousCost * 100);
  const trendUsers = ((activeUsers - previousUsers) / previousUsers * 100);
  
  // Tab configuration
  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: BarChart3 },
    { id: 'team' as TabType, label: 'Team', icon: Users },
    { id: 'usage' as TabType, label: 'Usage', icon: Activity },
    { id: 'commits' as TabType, label: 'Commits', icon: GitCommit },
    { id: 'status' as TabType, label: 'Status', icon: Database },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full max-w-7xl mx-auto"
    >
      {/* Dashboard Container */}
      <div className="relative border border-white/10 rounded-xl overflow-hidden bg-[#050507] backdrop-blur-sm shadow-2xl shadow-amber-500/5">
        {/* Header Bar with Tabs */}
        <div className="border-b border-white/10 bg-white/[0.02]">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="font-mono text-[10px] text-white/60 uppercase tracking-wider">
                Live Demo - Interactive
              </span>
            </div>
            <TimeRangeSelector 
              value={range} 
              onChange={setRange}
              isPending={false}
            />
          </div>
          
          {/* Tab Navigation */}
          <div className="px-4 pb-3 flex items-center gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-xs transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-white/5 text-white/40 border border-white/10 hover:bg-white/10 hover:text-white/60'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="p-4 sm:p-6 space-y-4 overflow-auto max-h-[600px]">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard
                  label="Total Tokens"
                  days={days}
                  value={formatTokens(totalTokens)}
                  icon={Zap}
                  trend={trendTotal}
                  delay={0}
                >
                  <p className="font-mono text-xs text-white/50">
                    {formatTokens(Math.round(totalTokens / activeUsers))} avg per user
                  </p>
                </StatCard>
                
                <StatCard
                  label="Estimated Cost"
                  days={days}
                  value={formatCurrency(totalCost)}
                  icon={DollarSign}
                  trend={trendCost}
                  accentColor="#06b6d4"
                  delay={0.1}
                >
                  <p className="font-mono text-xs text-white/50">
                    {formatCurrency(totalCost / activeUsers)} per user
                  </p>
                </StatCard>
                
                <StatCard
                  label="Active Users"
                  days={days}
                  value={activeUsers.toString()}
                  suffix="users"
                  icon={Users}
                  trend={trendUsers}
                  accentColor="#10b981"
                  delay={0.2}
                />
                
                <StatCard
                  label="Avg per Day"
                  days={days}
                  value={formatTokens(Math.round(totalTokens / days))}
                  suffix="tokens"
                  icon={TrendingUp}
                  trend={trendTotal}
                  accentColor="#8b5cf6"
                  delay={0.3}
                />
              </div>
              
              {/* Tool Distribution & Commit Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ToolDistribution
                  tools={[
                    {
                      tool: 'claude_code',
                      tokens: totalClaudeCode,
                      tokenPercentage: (totalClaudeCode / totalTokens) * 100,
                      users: 4,
                      userPercentage: 80,
                    },
                    {
                      tool: 'cursor',
                      tokens: totalCursor,
                      tokenPercentage: (totalCursor / totalTokens) * 100,
                      users: 3,
                      userPercentage: 60,
                    },
                  ]}
                  totalTokens={totalTokens}
                  totalUsers={activeUsers}
                  days={days}
                  commitTools={[
                    { tool: 'claude_code', commits: 287 },
                    { tool: 'cursor', commits: 143 },
                  ]}
                  totalCommits={430}
                />
                
                <CommitStats
                  totalCommits={568}
                  aiAssistedCommits={430}
                  aiAssistanceRate={75.7}
                  days={days}
                  hideToolBreakdown
                  trend={8.2}
                />
              </div>
              
              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <UsageChart data={dailyUsage} days={days} />
                </div>
                <ModelBreakdown data={models} days={days} />
              </div>
              
              {/* Users Table */}
              <UserTable users={users} days={days} />
            </motion.div>
          )}
          
          {activeTab === 'team' && (
            <motion.div
              key="team"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Active Users Stat */}
              <div className="max-w-xs">
                <StatCard
                  label="Active Users"
                  days={days}
                  value={activeUsers.toString()}
                  suffix="users"
                  icon={Users}
                  accentColor="#06b6d4"
                  delay={0}
                />
              </div>
              
              {/* Full Team Table */}
              <Card padding="none" className="overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5">
                  <SectionLabel days={days}>Team Members</SectionLabel>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.02]">
                        <th className="px-4 py-3 text-left font-mono text-[11px] uppercase tracking-wider text-white/60">User</th>
                        <th className="px-4 py-3 text-right font-mono text-[11px] uppercase tracking-wider text-white/60">Total Tokens</th>
                        <th className="px-4 py-3 text-right font-mono text-[11px] uppercase tracking-wider text-white/60">Cost</th>
                        <th className="px-4 py-3 text-left font-mono text-[11px] uppercase tracking-wider text-white/60">Tools</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.email} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="px-4 py-3">
                            <span className="font-mono text-xs text-white/70">{user.email}</span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className="font-mono text-xs text-white/60">{formatTokens(user.totalTokens)}</span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className="font-mono text-xs text-white/60">{formatCurrency(user.totalCost)}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              {user.claudeCodeTokens > 0 && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                  Claude
                                </span>
                              )}
                              {user.cursorTokens > 0 && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                  Cursor
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>
          )}
          
          {activeTab === 'usage' && (
            <motion.div
              key="usage"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Usage Stats */}
              <div className="grid gap-4 md:grid-cols-3">
                <StatCard
                  label="Total Tokens"
                  days={days}
                  value={formatTokens(totalTokens)}
                  icon={Activity}
                  accentColor="#f59e0b"
                  trend={trendTotal}
                  delay={0}
                />
                <StatCard
                  label="Estimated Cost"
                  days={days}
                  value={formatCurrency(totalCost)}
                  icon={TrendingUp}
                  accentColor="#10b981"
                  trend={trendCost}
                  delay={0.1}
                />
                <StatCard
                  label="Top Model"
                  days={days}
                  value="Sonnet 4"
                  icon={Zap}
                  accentColor="#8b5cf6"
                  delay={0.2}
                >
                  <p className="font-mono text-xs text-white/50">{formatTokens(28500000)} tokens</p>
                </StatCard>
              </div>
              
              {/* Usage Chart */}
              <UsageChart data={dailyUsage} days={days} />
              
              {/* Model Breakdown */}
              <Card padding="none" className="overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5">
                  <SectionLabel days={days}>Model Usage</SectionLabel>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.02]">
                        <th className="px-6 py-3 text-left font-mono text-[11px] uppercase tracking-wider text-white/60">Model</th>
                        <th className="px-6 py-3 text-right font-mono text-[11px] uppercase tracking-wider text-white/60">Tokens</th>
                        <th className="px-6 py-3 text-right font-mono text-[11px] uppercase tracking-wider text-white/60">%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {models.map((model) => (
                        <tr key={`${model.model}-${model.tool}`} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-3">
                            <span className="font-mono text-sm text-white">{model.model}</span>
                          </td>
                          <td className="px-6 py-3 text-right">
                            <span className="font-mono text-sm text-white/70">{formatTokens(model.tokens)}</span>
                          </td>
                          <td className="px-6 py-3 text-right">
                            <span className="font-mono text-sm text-white/50">{model.percentage}%</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>
          )}
          
          {activeTab === 'commits' && (
            <motion.div
              key="commits"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Commit Stats */}
              <div className="grid grid-cols-3 gap-3">
                <StatCard
                  label="Total Commits"
                  days={days}
                  value="568"
                  icon={GitCommit}
                  delay={0}
                >
                  <p className="font-mono text-xs text-white/50">across 12 repos</p>
                </StatCard>
                <StatCard
                  label="AI Attributed"
                  days={days}
                  value="75.7%"
                  icon={Activity}
                  accentColor="#10b981"
                  trend={8.2}
                  delay={0.1}
                >
                  <p className="font-mono text-xs text-white/50">430 commits</p>
                </StatCard>
                <StatCard
                  label="Repositories"
                  days={days}
                  value="12"
                  icon={Database}
                  accentColor="#06b6d4"
                  delay={0.2}
                >
                  <p className="font-mono text-xs text-white/50">with commits in period</p>
                </StatCard>
              </div>
              
              {/* Repository Table */}
              <Card padding="none" className="overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5">
                  <SectionLabel days={days}>Top Repositories</SectionLabel>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.02]">
                        <th className="px-4 py-3 text-left font-mono text-[11px] uppercase tracking-wider text-white/60">Repository</th>
                        <th className="px-4 py-3 text-right font-mono text-[11px] uppercase tracking-wider text-white/60">Commits</th>
                        <th className="px-4 py-3 text-right font-mono text-[11px] uppercase tracking-wider text-white/60">AI %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'company/backend-api', commits: 142, aiPercent: 82 },
                        { name: 'company/frontend-app', commits: 118, aiPercent: 79 },
                        { name: 'company/data-pipeline', commits: 95, aiPercent: 71 },
                        { name: 'company/ml-models', commits: 87, aiPercent: 68 },
                        { name: 'company/infrastructure', commits: 74, aiPercent: 73 },
                      ].map((repo) => (
                        <tr key={repo.name} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="px-4 py-3">
                            <span className="font-mono text-xs text-white">{repo.name}</span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className="font-mono text-xs text-white/70">{repo.commits}</span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className={`font-mono text-xs ${repo.aiPercent >= 70 ? 'text-emerald-400' : 'text-white/70'}`}>
                              {repo.aiPercent}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>
          )}
          
          {activeTab === 'status' && (
            <motion.div
              key="status"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* System Stats */}
              <Card padding="lg">
                <div className="flex items-center gap-2 mb-5">
                  <Database className="w-4 h-4 text-white/50" />
                  <h2 className="font-display text-lg text-white">System Stats</h2>
                  <span className="font-mono text-[11px] text-white/30 ml-auto">tracking since Oct 2024</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-white/50 block mb-1">Total Tokens</span>
                    <span className="font-display text-2xl text-white">{formatTokens(totalTokens * 5.2)}</span>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-white/50 block mb-1">Total Cost</span>
                    <span className="font-display text-2xl text-white">{formatCurrency(totalCost * 5.2)}</span>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-white/50 block mb-1">Users</span>
                    <span className="font-display text-2xl text-white">{activeUsers}</span>
                  </div>
                </div>
              </Card>
              
              {/* Data Sources */}
              <div>
                <SectionLabel margin="lg">Data Sources</SectionLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'Anthropic (Claude)', color: 'amber', status: 'Up to date', synced: 'Just now' },
                    { name: 'Cursor', color: 'cyan', status: 'Up to date', synced: '2 mins ago' },
                  ].map((source, i) => (
                    <div
                      key={source.name}
                      className={`bg-white/[0.02] hover:bg-white/[0.03] border border-white/5 ${
                        source.color === 'amber' ? 'border-l-amber-500/70' : 'border-l-cyan-500/70'
                      } border-l-2 rounded-lg p-5 transition-colors`}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <div className={`w-2 h-2 rounded-full ${source.color === 'amber' ? 'bg-amber-500' : 'bg-cyan-500'}`} />
                        <h3 className="font-display text-base text-white">{source.name}</h3>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[11px] uppercase tracking-wider text-white/50 font-mono">Forward Sync</span>
                            <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-mono border text-emerald-400 bg-emerald-500/10 border-emerald-500/20">
                              {source.status}
                            </span>
                          </div>
                          <div className="text-white/50 text-sm font-mono">Last synced: {source.synced}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Interactive Overlay Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm"
        >
          <p className="font-mono text-xs text-amber-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            {activeTab === 'overview' ? 'Try switching tabs or changing the time range' : 'Explore different tabs to see all features'}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
