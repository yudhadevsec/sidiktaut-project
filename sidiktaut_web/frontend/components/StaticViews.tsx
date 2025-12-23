import React from 'react';
import { Chrome, Terminal, Github, Download } from 'lucide-react';

// Config File
const ASSETS = {
  extension: '/sidiktaut_ext.zip',
  cli: '/sidiktaut_cli.zip'
};

// Data Anggota
const TEAM = [
  {
    name: 'Yudha Pratama',
    role: 'Lead Developer',
    tag: 'SYSTEMS',
    description: 'Ngerjain Backend Flask sama logic API VirusTotal, Spesialisasi di CLI',
    image: '/team/yudha.jpg' 
  },
  {
    name: 'Bram Lumozato M.',
    role: 'Web Developer',
    tag: 'INTERFACE',
    description: 'Desain tampilan web pakai React biar responsif, Spesialisasinya di Web',
    image: '/team/bram.jpg'
  },
  {
    name: 'Gyelgha Chonda',
    role: 'Extension Developer',
    tag: 'INTEGRATION',
    description: 'Bikin browser extension biar user gampang scan, Sama kayak sebelumnya tapi di extension',
    image: '/team/chonda.jpg'
  }
];

export const BrowserView = () => (
  <div className="max-w-3xl mx-auto text-center animate-in zoom-in-95 duration-700 pt-10 pb-20 relative isolate">
    {/* Background */}
    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>
    
    <div className="w-24 h-24 bg-gradient-to-tr from-ios-blue to-blue-400 rounded-[2.5rem] mx-auto flex items-center justify-center mb-10 shadow-lg relative z-10 rotate-3">
      <Chrome size={48} className="text-white" />
    </div>

    <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">Browser Extension</h1>
    <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-xl mx-auto">
      Capek buka web terus? Pasang ekstensi ini biar bisa scan link langsung dari klik kanan.
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 text-left">
       <div className="ios-card p-5 border-white/40 dark:border-white/5">
          <h3 className="font-bold mb-1">Cepat</h3>
          <p className="text-xs text-gray-500">Gak bikin browser lemot.</p>
       </div>
       <div className="ios-card p-5 border-white/40 dark:border-white/5">
          <h3 className="font-bold mb-1">Aman</h3>
          <p className="text-xs text-gray-500">Cek link sebelum diklik.</p>
       </div>
       <div className="ios-card p-5 border-white/40 dark:border-white/5">
          <h3 className="font-bold mb-1">Simpel</h3>
          {/* FIX: Mengganti '->' dengan '&rarr;' agar tidak error JSX */}
          <p className="text-xs text-gray-500">Tinggal klik kanan &rarr; Scan.</p>
       </div>
    </div>

    <a 
      href={ASSETS.extension}
      download="sidiktaut_ext.zip"
      className="inline-flex items-center gap-2 bg-ios-blue text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all active:scale-95"
    >
      <Download size={20} /> Download Extension
    </a>
  </div>
);

export const CliView = () => (
  <div className="max-w-3xl mx-auto text-center animate-in zoom-in-95 duration-700 pt-10 pb-20 relative isolate">
    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-gray-400/20 dark:bg-gray-600/10 rounded-full blur-[100px] -z-10"></div>
    
    <div className="w-24 h-24 bg-gradient-to-tr from-gray-800 to-black rounded-[2.5rem] mx-auto flex items-center justify-center mb-10 shadow-lg relative z-10 -rotate-3 border border-white/10">
      <Terminal size={48} className="text-white" />
    </div>

    <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">CLI Version</h1>
    <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-xl mx-auto">
      Versi terminal buat yang suka ngoding atau automation. Python based.
    </p>

    <div className="ios-card p-6 bg-black text-green-500 font-mono text-left mb-12 border-gray-800 shadow-xl text-sm overflow-hidden">
       <p><span className="text-gray-500">$</span> python cli.py scan google.com</p>
       <p className="text-gray-400 opacity-80">Scanning...</p>
       <p className="text-emerald-500">[SAFE] Link aman bos.</p>
    </div>

    <a 
      href={ASSETS.cli}
      download="sidiktaut_cli.zip"
      className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white dark:text-black text-white px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-all active:scale-95"
    >
      <Download size={20} /> Download Source Code
    </a>
  </div>
);

export const TeamView = () => (
  <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-20">
     <div className="text-center mb-16">
       <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Tim Kami</h1>
       <p className="text-gray-500">Project ini dibuat untuk memenuhi Tugas Akhir Semester 1.</p>
     </div>
     
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TEAM.map((member, idx) => (
          <div key={idx} className="ios-card p-8 flex flex-col items-center text-center hover:shadow-lg transition-all bg-white/50 dark:bg-white/5">
            {/* Foto Anggota */}
            <div className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden mb-6 border-4 border-white dark:border-gray-700 shadow-sm">
               <img 
                 src={member.image} 
                 alt={member.name} 
                 className="w-full h-full object-cover" 
               />
            </div>
            
            <div className="inline-block px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-ios-blue text-[10px] font-bold tracking-widest uppercase mb-3">
               {member.tag}
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
            <span className="text-xs font-medium text-gray-400 mb-4 block">{member.role}</span>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              "{member.description}"
            </p>
          </div>
        ))}
     </div>
  </div>
);

export const GithubView = () => (
  <div className="max-w-2xl mx-auto text-center pt-20">
    <div className="w-20 h-20 bg-black dark:bg-white rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-lg">
      <Github size={40} className="text-white dark:text-black" />
    </div>
    <h1 className="text-3xl font-black mb-4 dark:text-white">Open Source</h1>
    <p className="text-gray-500 mb-8">
      Kalau mau liat codingan aslinya atau mau kontribusi, bisa cek di GitHub kami.
    </p>
    <a 
      href="https://github.com/yudhadevsec/sidiktaut-project" 
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-black dark:bg-white dark:text-black text-white px-8 py-3 rounded-full font-bold hover:opacity-80 transition-all"
    >
      <Github size={18} /> Buka Repository
    </a>
  </div>
);