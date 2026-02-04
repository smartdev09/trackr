'use client';

import { useEffect, useState } from 'react';

const WORDS = [
  'Dashboard', 'Analytics', 'Users', 'Models', 'Tokens', 'Cost',
  'Commits', 'Tools', 'GitHub', 'Cursor', 'Claude', 'Anthropic',
  'Trends', 'Reports', 'Team', 'Usage', 'Sync', 'API', 'Stats',
  'Chart', 'Data', 'Insights', 'Metrics', 'Export', 'Filter',
  'Search', 'Settings', 'Profile', 'Billing', 'Support', 'Docs',
  'CLI', 'Deploy', 'Vercel', 'Open Source', 'AI', 'Code', 'Dev',
  'Repo', 'Branch', 'Pull', 'Request', 'Merge', 'Deploy', 'Build',
];

export default function MatrixTextWall() {
  const [grid, setGrid] = useState<string[][]>([]);

  useEffect(() => {
    // Initialize 30x30 grid
    const initialGrid: string[][] = [];
    for (let i = 0; i < 30; i++) {
      const row: string[] = [];
      for (let j = 0; j < 30; j++) {
        row.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
      }
      initialGrid.push(row);
    }
    setGrid(initialGrid);

    // Scramble random cells every 100ms
    const interval = setInterval(() => {
      setGrid(prevGrid => {
        const newGrid = prevGrid.map(row => [...row]);
        // 1% chance for each cell to scramble
        for (let i = 0; i < newGrid.length; i++) {
          for (let j = 0; j < newGrid[i].length; j++) {
            if (Math.random() < 0.01) {
              newGrid[i][j] = WORDS[Math.floor(Math.random() * WORDS.length)];
            }
          }
        }
        return newGrid;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      <div className="text-[8px] sm:text-[10px] md:text-xs leading-relaxed space-y-1">
        {grid.map((row, i) => (
          <div key={i} className="flex gap-2">
            {row.map((word, j) => (
              <span
                key={`${i}-${j}`}
                className="text-white/20 whitespace-nowrap transition-all duration-300"
              >
                {word}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
