
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { Background } from './components/Background';
import { HexInput, HexButton, HexCheckbox } from './components/UIComponents';
import { ServerStatus } from './components/ServerStatus';
import { Lobby } from './components/Lobby';
import { Region } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [region, setRegion] = useState<Region>(Region.IONIA);

  // --- Login Handler (Simulated) ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate connection delay then enter lobby
    setTimeout(() => {
        setIsLoading(false);
        setIsLoggedIn(true);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#010A13] overflow-hidden">
      <Background />
      
      {/* Show Server Status only on Login Screen */}
      {!isLoggedIn && <ServerStatus />}

      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
            /* --- LOGIN SCREEN --- */
            <motion.div 
                key="login-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-[400px] px-6"
            >
                {/* Logo Area */}
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="flex flex-col items-center mb-12"
                >
                    <div className="w-20 h-20 border-2 border-hextech-gold-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(200,170,110,0.3)] bg-[#010A13]/50 backdrop-blur-sm relative group">
                        <div className="absolute inset-0 rounded-full border border-hextech-blue-500 opacity-50 animate-ping" />
                        <span className="text-4xl font-serif font-bold text-hextech-gold-100 italic">L</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-[0.2em] text-hextech-gold-100 uppercase font-serif-lol drop-shadow-lg text-center">
                        英雄联盟
                    </h1>
                </motion.div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h2 className="text-xl font-bold text-white mb-6 text-center tracking-widest uppercase opacity-80">登录</h2>
                        
                        <HexInput 
                            id="username"
                            type="text"
                            label="用户名 / QQ号"
                            autoComplete="off"
                            // No 'required' attribute, allowing easy access
                        />
                        
                        <HexInput 
                            id="password"
                            type="password"
                            label="密码"
                            // No 'required' attribute
                        />

                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-2 group cursor-pointer relative z-20">
                                <div className="bg-[#D13639]/10 p-1.5 rounded-full border border-[#D13639]/30 group-hover:border-[#D13639] transition-colors">
                                    <Globe size={14} className="text-[#D13639]" />
                                </div>
                                <select 
                                    value={region}
                                    onChange={(e) => setRegion(e.target.value as Region)}
                                    className="bg-transparent text-xs font-bold text-hextech-grey uppercase outline-none cursor-pointer hover:text-white transition-colors appearance-none pr-4"
                                    style={{
                                        WebkitAppearance: 'none',
                                        MozAppearance: 'none'
                                    }}
                                >
                                    {Object.values(Region).map((r) => (
                                        <option key={r} value={r} className="bg-[#091428] text-hextech-gold-100">{r}</option>
                                    ))}
                                </select>
                            </div>
                            <HexCheckbox label="保持登录" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <HexButton type="submit" isLoading={isLoading} className="mb-6 shadow-[0_0_20px_rgba(209,54,57,0.4)]">
                            进入游戏
                        </HexButton>

                        <div className="flex justify-center gap-6 text-[12px] font-bold tracking-widest text-hextech-grey">
                            <button type="button" className="hover:text-hextech-gold-300 transition-colors">无法登录?</button>
                            <button type="button" className="hover:text-hextech-gold-300 transition-colors">注册账号</button>
                        </div>
                    </motion.div>
                </form>

                {/* Footer Version */}
                <motion.div 
                    className="absolute -bottom-24 w-full text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <span className="text-[10px] text-hextech-grey/40 font-mono">V14.6.1 // HEXTECH 客户端</span>
                </motion.div>

                 {/* Decorative Borders (Corner acccents) */}
                <div className="absolute -top-10 -left-10 p-8 z-10 opacity-20 pointer-events-none">
                    <div className="w-40 h-40 border-l-2 border-t-2 border-hextech-gold-500 rounded-tl-[40px]" />
                </div>
                <div className="absolute -bottom-10 -right-10 p-8 z-10 opacity-20 pointer-events-none">
                    <div className="w-40 h-40 border-r-2 border-b-2 border-hextech-gold-500 rounded-br-[40px]" />
                </div>
            </motion.div>
        ) : (
            /* --- LOBBY SCREEN --- */
            <motion.div 
                key="lobby-screen" 
                className="w-full h-full z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <Lobby />
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default App;