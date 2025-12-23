import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { ScanStatus, ScanResult } from '../types';

interface ResultCardProps {
  status: ScanStatus;
  data: ScanResult | null;
}

export const ResultCard: React.FC<ResultCardProps> = ({ status, data }) => {
  if (status === ScanStatus.IDLE || status === ScanStatus.SCANNING || !data) return null;

  const isDanger = status === ScanStatus.DANGER;
  
  return (
    <GlassCard className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col items-center text-center">
        <div className={`
          p-3 rounded-full mb-3 
          ${isDanger ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}
        `}>
          {isDanger ? <ShieldAlert size={48} /> : <ShieldCheck size={48} />}
        </div>
        
        <h2 className="text-xl font-bold mb-1">
          {isDanger ? 'Terindikasi Berbahaya!' : 'Link Terlihat Aman'}
        </h2>
        
        <p className="text-sm text-white/60 mb-6">
          {isDanger 
            ? 'Beberapa vendor keamanan menandai link ini sebagai malicious.' 
            : 'Tidak ditemukan ancaman pada database kami.'}
        </p>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="bg-white/5 rounded-2xl p-3 flex flex-col items-center border border-white/5">
            <span className="text-xs uppercase tracking-wider text-red-400 font-bold mb-1">Bahaya</span>
            <span className="text-2xl font-bold text-white">{data.malicious}</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 flex flex-col items-center border border-white/5">
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-1">Aman</span>
            <span className="text-2xl font-bold text-white">{data.harmless}</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};