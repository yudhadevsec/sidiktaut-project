import React from 'react';

interface SkeletonProps {
  className?: string;
}

// Komponen dasar kotak-kotak loading
export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700/50 rounded-xl ${className}`} />
  );
};

// Layout loading khusus Scanner
export const ScannerSkeleton = () => {
  return (
    <div className="animate-in fade-in duration-500 w-full">
      
      {/* 1. Main Stats Card (Mirip hasil scan asli) */}
      <div className="ios-card p-6 mb-6 border-l-4 border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Kiri: Teks Reputasi */}
          <div className="w-full md:w-auto flex flex-col items-center md:items-start gap-3">
            <Skeleton className="h-3 w-24" /> {/* Label */}
            <div className="flex items-baseline gap-2">
                <Skeleton className="h-12 w-32" /> {/* Angka Besar */}
                <Skeleton className="h-4 w-8" />
            </div>
            <Skeleton className="h-6 w-20" />  {/* Timer */}
          </div>

          {/* Kanan: Chart Lingkaran */}
          <div className="shrink-0">
            <Skeleton className="w-32 h-32 rounded-full" />
          </div>
        </div>

        {/* Garis Bawah (Hash) */}
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center gap-2">
           <Skeleton className="h-4 w-4 rounded-full" />
           <Skeleton className="h-3 w-48" />
        </div>
      </div>

      {/* 2. Grid 4 Kartu Kecil */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
         {[1, 2, 3, 4].map((i) => (
           <div key={i} className="ios-card p-4 flex flex-col items-center justify-center gap-3 h-28">
              <Skeleton className="h-8 w-12" /> {/* Angka */}
              <Skeleton className="h-3 w-16" /> {/* Label */}
           </div>
         ))}
      </div>

    </div>
  )
}