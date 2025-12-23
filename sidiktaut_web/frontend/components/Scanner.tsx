import React, { useState } from 'react';
import { Loader2, AlertTriangle, ArrowRight, Globe, Lock, Timer, Fingerprint } from 'lucide-react';
import { scanUrl } from '../services/api';
import { ScanResponse } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ScannerProps { theme?: string; }

// Chart
const SimpleChart = ({ data }: { data: any[] }) => (
  <div className="w-32 h-32 mx-auto relative">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value" stroke="none">
          {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export const Scanner: React.FC<ScannerProps> = ({ theme }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi
    if (!url.trim()) return;
    
    setLoading(true); setError(null); setResult(null);
    try {
      const data = await scanUrl(url);
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const chartData = result ? [
    { name: 'Malicious', value: result.malicious, color: '#FF3B30' }, 
    { name: 'Suspicious', value: result.suspicious, color: '#FF9500' },
    { name: 'Harmless', value: result.harmless, color: '#34C759' }, 
  ].filter(d => d.value > 0) : [];

  return (
    <div className="w-full mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        {!result && !loading && (
          <>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-ios-blue text-[10px] font-bold uppercase tracking-widest mb-4">
               <Lock size={12} /> Secure Scan
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">
              SidikTaut Scanner
            </h1>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              Cek keamanan link sebelum kamu klik. Ringan, Cepat, Akurat.
            </p>
          </>
        )}
      </div>

      {/* Input */}
      <div className="max-w-xl mx-auto mb-8">
        <form onSubmit={handleScan} className="relative flex items-center">
          <div className="absolute left-4 text-gray-400 pointer-events-none">
            <Globe size={18} />
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Tempel link mencurigakan..."
            className="w-full h-12 pl-12 pr-24 rounded-xl glass-input text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-ios-blue focus:border-transparent outline-none transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-lg bg-ios-blue hover:bg-blue-600 text-white font-bold text-xs transition-colors disabled:opacity-70 flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : 'SCAN'}
          </button>
        </form>
        {result && (
            <button onClick={() => {setResult(null); setUrl('');}} className="mt-2 w-full text-center text-xs font-medium text-gray-400 hover:text-ios-blue">
              Reset Analysis
            </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="max-w-xl mx-auto p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm flex gap-3 items-center border border-red-100 dark:border-red-900/30">
          <AlertTriangle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Hasil Scan */}
      {result && !loading && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          
          {/* Stats Card */}
          <div className="ios-card p-6 mb-6 border-l-4" style={{ borderLeftColor: result.malicious > 0 ? '#FF3B30' : '#34C759' }}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Reputation Score</p>
                <div className="flex items-baseline gap-2 justify-center md:justify-start">
                   <h2 className={`text-5xl font-black ${result.malicious > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>{result.reputation}</h2>
                   <span className="text-sm text-gray-400 font-medium">/ 100</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs font-mono text-gray-400 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded">
                   <Timer size={12} /> {result.process_time || 'N/A'}
                </div>
              </div>

              <div className="shrink-0">
                <SimpleChart data={chartData} />
              </div>
            </div>

            {/* Hash */}
            {result.scan_signature && (
               <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5">
                 <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono">
                    <Fingerprint size={12} /> SHA-256: <span className="truncate max-w-[200px] md:max-w-full">{result.scan_signature}</span>
                 </div>
               </div>
            )}
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
             <div className="ios-card p-4 text-center">
                <span className="block text-2xl font-bold text-rose-500">{result.malicious}</span>
                <span className="text-[10px] text-gray-400 uppercase font-bold">Malicious</span>
             </div>
             <div className="ios-card p-4 text-center">
                <span className="block text-2xl font-bold text-amber-500">{result.suspicious}</span>
                <span className="text-[10px] text-gray-400 uppercase font-bold">Suspicious</span>
             </div>
             <div className="ios-card p-4 text-center">
                <span className="block text-2xl font-bold text-emerald-500">{result.harmless}</span>
                <span className="text-[10px] text-gray-400 uppercase font-bold">Safe</span>
             </div>
             <button onClick={() => alert('Fitur belum tersedia')} className="ios-card p-4 flex flex-col items-center justify-center text-ios-blue hover:bg-blue-50 dark:hover:bg-white/5 transition-colors">
                <ArrowRight size={20} className="mb-1" />
                <span className="text-[10px] font-bold uppercase">Full Report</span>
             </button>
          </div>

        </div>
      )}
    </div>
  );
};