
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, RefreshCw } from 'lucide-react';
import { fetchServerStatusMessage } from '../services/geminiService';

export const ServerStatus: React.FC = () => {
    const [message, setMessage] = useState<string>("正在连接海克斯网络...");
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const updateStatus = async () => {
        setLoading(true);
        const msg = await fetchServerStatusMessage();
        setMessage(msg);
        setLoading(false);
    };

    useEffect(() => {
        updateStatus();
    }, []);

    return (
        <div className="fixed bottom-6 left-6 z-50">
            <motion.div 
                className={`
                    flex items-center gap-3 bg-[#010A13]/90 backdrop-blur-md border border-hextech-gold-700/30 
                    rounded-full px-4 py-2 cursor-pointer hover:border-hextech-gold-500/60 transition-colors shadow-lg shadow-black/50
                `}
                onClick={() => setExpanded(!expanded)}
                layout
            >
                <div className="relative">
                    <Radio size={16} className={`${loading ? 'text-hextech-gold-500 animate-pulse' : 'text-green-500'}`} />
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" style={{ opacity: loading ? 0 : 0.6 }} />
                </div>
                
                <AnimatePresence mode='wait'>
                    {expanded && (
                        <motion.div 
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            className="overflow-hidden whitespace-nowrap text-xs font-medium text-hextech-gold-100 flex items-center gap-3"
                        >
                            <span className="border-r border-hextech-grey/30 pr-3">{message}</span>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    updateStatus();
                                }}
                                className="hover:rotate-180 transition-transform duration-500"
                            >
                                <RefreshCw size={12} className="text-hextech-blue-500" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
                
                {!expanded && (
                    <span className="text-xs font-bold text-hextech-grey tracking-wider uppercase">在线</span>
                )}
            </motion.div>
        </div>
    );
};