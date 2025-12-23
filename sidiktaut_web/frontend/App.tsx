import React, { useState, useEffect } from 'react';
import { Shield, LayoutDashboard, Chrome, Terminal, Users, Menu, X, Sun, Moon, ChevronRight, ChevronLeft, Github } from 'lucide-react';
import { Scanner } from './components/Scanner';
import { FighterCard } from './components/FighterCard';
import { BrowserView, CliView, TeamView, GithubView } from './components/StaticViews';

// Menu Config
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'browser', label: 'Extension', icon: Chrome, group: 'Tools' },
  { id: 'cli', label: 'CLI Tool', icon: Terminal, group: 'Tools' },
  { id: 'team', label: 'Our Team', icon: Users, group: 'About' },
  { id: 'github', label: 'Repository', icon: Github, group: 'About' },
];

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  // Effect: Update Class & Storage
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Effect: Lock Scroll saat Menu HP terbuka
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
  }, [mobileMenuOpen]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // Dashboard Component
  const DashboardView = () => (
    <div className="animate-in fade-in duration-300">
      <Scanner theme={theme} />
      
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Downloads</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FighterCard
            title="Browser Ext" icon={Chrome} stats="Protection"
            pros={['Phishing Alerts', 'Instant Scan']} cons={[]}
            link="#" colorClass="bg-ios-blue"
            onNavigate={() => { setActiveView('browser'); window.scrollTo(0,0); }}
          />
          <FighterCard
            title="CLI Tool" icon={Terminal} stats="Dev Tool"
            pros={['Bulk Analysis', 'Fast Pipe']} cons={[]}
            link="#" colorClass="bg-gray-800 dark:bg-gray-600"
            onNavigate={() => { setActiveView('cli'); window.scrollTo(0,0); }}
          />
        </div>
      </div>
    </div>
  );

  // View Mapping
  const VIEWS: Record<string, React.ReactNode> = {
    'dashboard': <DashboardView />,
    'browser': <BrowserView />,
    'cli': <CliView />,
    'team': <TeamView />,
    'github': <GithubView />
  };

  return (
    <div className="flex min-h-screen w-full bg-transparent">
      
      {/* --- Desktop Sidebar --- */}
      <aside className={`hidden md:flex flex-col fixed inset-y-0 left-0 z-50 py-6 px-3 border-r border-gray-200 dark:border-white/10 bg-white dark:bg-[#111] transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'w-[70px]' : 'w-[240px]'}`}>
        <div className={`mb-6 flex ${sidebarCollapsed ? 'justify-center' : 'justify-between px-2'} items-center`}>
           {!sidebarCollapsed && (
             <div className="flex items-center gap-2 font-bold text-lg dark:text-white"><Shield size={20} className="text-ios-blue"/> SidikTaut</div>
           )}
           <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 active:scale-95 transition-transform">
             {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
           </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
          {NAV_ITEMS.map((item) => (
             <button key={item.id} onClick={() => setActiveView(item.id)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 active:scale-95 ${activeView === item.id ? 'bg-ios-blue text-white font-medium shadow-md shadow-blue-500/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}>
               <item.icon size={18} className="shrink-0" />
               {!sidebarCollapsed && <span>{item.label}</span>}
             </button>
          ))}
        </nav>

        <button onClick={toggleTheme} className="mt-auto flex items-center justify-center p-2 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 active:scale-95 transition-all">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </aside>

      {/* --- Mobile Header --- */}
      <header className="md:hidden h-14 fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#111]/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/10 flex items-center px-4 transition-all duration-300">
        <button 
          onClick={() => setMobileMenuOpen(true)} 
          className="p-2 -ml-2 text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg active:scale-90 transition-transform"
        >
          <Menu size={24} />
        </button>
        
        <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white ml-2 select-none">
          <Shield size={18} className="text-ios-blue" /> SidikTaut
        </div>

        <button 
          onClick={toggleTheme} 
          className="ml-auto p-2 text-gray-500 dark:text-gray-400 active:scale-90 transition-transform rounded-full hover:bg-black/5 dark:hover:bg-white/5"
        >
           {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* --- Mobile Drawer --- */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300" 
            onClick={() => setMobileMenuOpen(false)} 
          />
          
          {/* Sidebar Content */}
          <div className="absolute inset-y-0 left-0 w-[280px] bg-white dark:bg-[#1C1C1E] p-6 shadow-2xl animate-in slide-in-from-left duration-300 ease-out flex flex-col border-r border-gray-200 dark:border-white/5">
            
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2 font-bold text-xl dark:text-white">
                 <Shield size={24} className="text-ios-blue"/> SidikTaut
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 active:scale-90 transition-transform"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => { setActiveView(item.id); setMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all active:scale-95 ${activeView === item.id ? 'bg-ios-blue text-white shadow-lg shadow-blue-500/20' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'}`}
                >
                  <item.icon size={20} strokeWidth={2} /> 
                  {item.label}
                </button>
              ))}
            </nav>
            
            <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5">
               <p className="text-xs text-center text-gray-400 font-medium">
                  &copy; 2024 SidikTaut Team
               </p>
            </div>
          </div>
        </div>
      )}

      {/* --- Main Content --- */}
      <main className={`flex-1 min-h-screen transition-all duration-300 ${sidebarCollapsed ? 'md:ml-[70px]' : 'md:ml-[240px]'}`}>
        <div className="w-full max-w-5xl mx-auto p-4 pt-20 md:p-8 md:pt-8">
          {VIEWS[activeView]}
        </div>
      </main>
    </div>
  );
}