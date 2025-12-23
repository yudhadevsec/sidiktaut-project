import React from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';

interface FighterCardProps {
  title: string;
  icon: LucideIcon;
  stats: string;
  pros: string[];
  cons: string[]; // Disiapkan kalau nanti butuh list kekurangan
  link: string;
  colorClass: string;
  onNavigate?: () => void;
}

export const FighterCard: React.FC<FighterCardProps> = ({ 
  title, 
  icon: Icon, 
  stats, 
  pros, 
  link, 
  colorClass,
  onNavigate
}) => {
  return (
    <div 
      onClick={onNavigate}
      className="ios-card p-6 flex flex-col cursor-pointer shadow-ios hover:shadow-ios-hover group h-full justify-between"
    >
      <div>
        {/* Ikon & Header */}
        <div className="flex items-start justify-between mb-6">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${colorClass} text-white`}>
            <Icon size={28} />
          </div>
          <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 group-hover:bg-ios-blue group-hover:text-white transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-ios-blue transition-colors">
          {title}
        </h3>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
          {stats}
        </p>
        
        {/* List Kelebihan */}
        <div className="space-y-2 mb-6">
          {pros.map((item, idx) => (
            <p key={idx} className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              • {item}
            </p>
          ))}
        </div>
      </div>

      <a 
        href={link} 
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()} // Biar klik tombol gak dianggap klik kartu (parent)
        className="w-full py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-bold text-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        View Repository
      </a>
    </div>
  );
};