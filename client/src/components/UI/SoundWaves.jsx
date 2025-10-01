import React from 'react';

export const SoundWaves = () => {
  return (
    <div className="flex items-center justify-center gap-[3px] h-5">
      <span className="w-[3px] h-3 bg-blue-500 animate-wave1 rounded-sm"></span>
      <span className="w-[3px] h-4 bg-blue-500 animate-wave2 rounded-sm"></span>
      <span className="w-[3px] h-6 bg-blue-500 animate-wave3 rounded-sm"></span>
      <span className="w-[3px] h-4 bg-blue-500 animate-wave2 rounded-sm"></span>
      <span className="w-[3px] h-3 bg-blue-500 animate-wave1 rounded-sm"></span>
    </div>
  );
};
