'use client';

import Link from 'next/link';
import MatrixTextWall from './matrix';

export function GetStarted() {
  return (
    <div className="relative">
      <div className="absolute left-1/2 -translate-x-1/2 bg-background -top-[10px] px-4 sm:px-8 uppercase text-center z-10 text-xs tracking-wider text-white/60">
        GET STARTED
      </div>

      <div className="border border-white p-1 bg-background overflow-hidden">
        <div className="border border-white px-4 sm:px-32 py-12 sm:py-24 flex flex-col sm:flex-row gap-4 bg-background overflow-hidden relative">
          <div className="space-y-4 z-10">
            <h4 className="text-[16px] font-regular text-white">
              Ready to track your AI tool usage?
            </h4>
            <p className="text-secondary text-sm block pb-4">
              Get insights into your team&apos;s AI coding tool consumption in minutes.
            </p>

            <div className="flex items-center gap-8 text-center sm:text-left">
              <Link href="/sign-in">
                <button className="relative inline-flex items-center justify-center px-6 py-2 text-sm font-mono bg-white text-black border border-white transition-transform hover:translate-x-0.5 hover:translate-y-0.5">
                  <span className="absolute -bottom-0.5 -right-0.5 w-full h-full border border-white -z-10"></span>
                  Get Started
                </button>
              </Link>

              <a href="https://smartdev.github.io/trackr/" target="_blank" rel="noopener noreferrer">
                <button className="relative inline-flex items-center justify-center px-6 py-2 text-sm font-mono bg-transparent text-white border border-white transition-transform hover:translate-x-0.5 hover:translate-y-0.5">
                  <span className="absolute -bottom-0.5 -right-0.5 w-full h-full border border-white -z-10"></span>
                  View Documentation
                </button>
              </a>
            </div>
          </div>

          <MatrixTextWall />
        </div>
      </div>
    </div>
  );
}
