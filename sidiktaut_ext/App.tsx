import React, { useState, useEffect } from 'react';
import { Link2, Info } from 'lucide-react';
import { GlassCard } from './components/GlassCard';
import { ScanButton } from './components/ScanButton';
import { ResultCard } from './components/ResultCard';
import { ScanStatus, ScanResult } from './types';

// Declare chrome global for TypeScript
declare const chrome: any;

// Helper to safely get the current tab URL
// This works both in the Chrome Extension environment and in local development
const getActiveTabUrl = async (): Promise<string> => {
  try {
    // Check if the Chrome API is available
    if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.query) {
      return new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
          const url = tabs[0]?.url || '';
          resolve(url);
        });
      });
    }
  } catch (e) {
    // Ignore errors if chrome API is not accessed correctly in dev
    console.warn("Chrome API not available, falling back to mock data.");
  }
  
  // Fallback URL for development/preview mode
  return "https://suspicious-website.com/login?u=admin";
};

export default function App() {
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [status, setStatus] = useState<ScanStatus>(ScanStatus.IDLE);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const url = await getActiveTabUrl();
      setCurrentUrl(url);
    };
    init();
  }, []);

  const handleScan = async () => {
    if (!currentUrl) return;

    setStatus(ScanStatus.SCANNING);
    setErrorMsg(null);
    setResult(null);

    try {
      // Connect to local python backend (SidikTaut Core)
      // Note: Ensure your manifest.json has host_permissions for localhost if needed
      const response = await fetch('http://127.0.0.1:5000/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: currentUrl })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal melakukan scan.");
      }

      const scanResult: ScanResult = {
        malicious: data.malicious,
        harmless: data.harmless
      };

      setResult(scanResult);

      if (data.malicious > 0) {
        setStatus(ScanStatus.DANGER);
      } else {
        setStatus(ScanStatus.SAFE);
      }

    } catch (err: any) {
      console.error(err);
      setStatus(ScanStatus.ERROR);
      // Fallback error message if backend isn't running
      setErrorMsg("Gagal terhubung ke SidikTaut Core. Pastikan app.py berjalan.");
      
      // FOR DEMO: Simulate a safe result if backend is unreachable (for UI testing)
      // Remove this block in production
      /*
      setTimeout(() => {
         setResult({ malicious: 0, harmless: 88 });
         setStatus(ScanStatus.SAFE);
         setErrorMsg(null);
      }, 1000);
      */
    }
  };

  return (
    <div className="w-[360px] min-h-[500px] p-4 flex flex-col relative overflow-hidden font-sans mx-auto">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-[-50px] left-[-50px] w-40 h-40 bg-emerald-500 rounded-full blur-[80px] opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-[-20px] right-[-20px] w-60 h-60 bg-blue-600 rounded-full blur-[80px] opacity-30 pointer-events-none"></div>

      {/* Header */}
      <header className="flex justify-between items-center mb-6 relative z-10">
        <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-sm overflow-hidden p-1">
                 <img src="https://i.imgur.com/K3aW2kF.png" alt="Logo" className="w-full h-full object-contain filter invert opacity-90" />
            </div>
            <div>
                <h1 className="text-white font-bold text-xl tracking-tight leading-none">sidiktaut.</h1>
                <span className="text-white/50 text-[10px] uppercase tracking-widest font-medium">Extension v2.0</span>
            </div>
        </div>
        <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-sm">
            ONLINE
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col gap-4">
        
        {/* URL Card */}
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2 text-white/60">
                <Link2 size={14} />
                <span className="text-xs font-medium uppercase tracking-wide">Target URL</span>
            </div>
            <div className="text-white text-sm font-mono break-all leading-relaxed opacity-90">
                {currentUrl || "Mengambil URL..."}
            </div>
        </div>

        {/* Action Area */}
        <div className="mt-2">
            <ScanButton 
                onClick={handleScan} 
                isLoading={status === ScanStatus.SCANNING} 
                disabled={!currentUrl || status === ScanStatus.SCANNING}
            />
        </div>

        {/* Results Area */}
        <div className="min-h-[200px]">
            {status === ScanStatus.ERROR && (
                <GlassCard className="mt-4 border-red-500/30 bg-red-500/10">
                    <div className="flex flex-col items-center text-center text-red-200">
                        <Info className="mb-2" />
                        <p className="text-sm">{errorMsg}</p>
                    </div>
                </GlassCard>
            )}
            
            {(status === ScanStatus.SAFE || status === ScanStatus.DANGER) && (
                <ResultCard status={status} data={result} />
            )}
            
            {status === ScanStatus.IDLE && (
                 <div className="mt-8 text-center text-white/30 text-sm flex flex-col items-center gap-2">
                    <div className="w-12 h-1 bg-white/10 rounded-full"></div>
                    <p>Tekan tombol scan untuk memulai analisis keamanan.</p>
                 </div>
            )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-4 text-center text-white/20 text-[10px]">
        Powered by SidikTaut Core & VirusTotal
      </footer>
    </div>
  );
}