'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function LecturePage() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title') || 'Untitled Lecture';
  const src = searchParams.get('src') || '/sample.mp4';

  return (
    <div className="min-h-screen bg-[#FFEDD5] text-black p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">{title}</h1>

        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
          <video
            src={src}
            controls
            className="w-full h-full rounded-lg"
            preload="metadata"
          />
        </div>

        <div className="mt-6 px-2 md:px-4">
          <h2 className="text-lg md:text-xl font-semibold mb-2">Description</h2>
          <p className="text-sm md:text-base text-gray-800">
            This is a detailed video lecture on <strong>{title}</strong>.for any querry solve it urself dont contact me
          </p>
        </div>
      </div>
    </div>
  );
}
