
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MessageCircle, Settings, X, Search, Hexagon, Coins, Trophy, Gem, Backpack, Hammer, ShoppingBag } from 'lucide-react';
import { ChampionsView, CollectionView, LootView, StoreView, EventDetailView, PlaySelectionView } from './LobbyPages';

// Navigation Types
type ViewType = 'HOME' | 'PLAY' | 'TFT' | 'CLASH' | 'CHAMPIONS' | 'COLLECTION' | 'LOOT' | 'STORE' | 'EVENT_DETAIL';

// Left Side Nav
const GAME_MODES = [
    { id: 'HOME', label: "主页" },
    { id: 'TFT', label: "云顶之弈" },
    { id: 'CLASH', label: "冠军杯赛" },
    { id: 'CHAMPIONS', label: "英雄" }
];
// Center Nav (Assets)
const ASSET_NAV = [
    { id: 'COLLECTION', name: "藏品", icon: Backpack },
    { id: 'LOOT', name: "战利品", icon: Hammer },
    { id: 'STORE', name: "商城", icon: ShoppingBag },
];

const FRIENDS = [
    { name: "Faker", status: "正在游戏 - 15:30", avatar: "bg-red-500", rank: "Challenger" },
    { name: "Uzi", status: "在线", avatar: "bg-blue-500", rank: "Master" },
    { name: "TheShy", status: "离线", avatar: "bg-yellow-500", rank: "Diamond" },
    { name: "Clearlove", status: "队伍中", avatar: "bg-green-500", rank: "Platinum" },
];

// Mock Data for News Cards
const NEWS_ITEMS = [
    {
        id: 1,
        tag: "版本更新",
        title: "14.6 版本更新公告：阿兹尔调整",
        image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Azir_0.jpg"
    },
    {
        id: 2,
        tag: "皮肤预告",
        title: "西部魔影系列皮肤即将上线",
        image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lucian_1.jpg"
    },
    {
        id: 3,
        tag: "排位赛",
        title: "第 2 赛段即将结束，冲分倒计时",
        // Using Victorious Aatrox splash art which fits the Ranked theme perfectly and is reliable
        image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_9.jpg"
    }
];

export const Lobby: React.FC = () => {
    const [currentView, setCurrentView] = useState<ViewType>('HOME');

    const handleNavClick = (view: string) => {
        setCurrentView(view as ViewType);
    };

    // --- Render Logic for Main Content ---
    const renderContent = () => {
        switch (currentView) {
            case 'PLAY':
                return <PlaySelectionView />;
            case 'CHAMPIONS':
                return <ChampionsView />;
            case 'COLLECTION':
                return <CollectionView />;
            case 'LOOT':
                return <LootView />;
            case 'STORE':
                return <StoreView />;
            case 'EVENT_DETAIL':
                return <EventDetailView onBack={() => setCurrentView('HOME')} />;
            case 'HOME':
            default:
                return (
                    <div className="flex-1 p-8 overflow-y-auto custom-scrollbar relative">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="w-full h-[420px] rounded-sm border border-hextech-gold-700/30 overflow-hidden relative group shadow-2xl"
                        >
                            {/* Ahri Splash Art - reliable CDN */}
                            <div className="absolute inset-0 bg-[url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_27.jpg')] bg-cover bg-top transition-transform duration-[20s] group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#010A13] via-[#010A13]/10 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#010A13]/80 via-transparent to-transparent" />
                            
                            <div className="absolute bottom-12 left-12 max-w-lg">
                                <div className="flex items-center gap-2 mb-3">
                                    <Gem size={14} className="text-hextech-gold-500" />
                                    <h4 className="text-hextech-gold-500 font-bold tracking-[0.2em] uppercase text-xs">精选活动</h4>
                                </div>
                                <h1 className="text-5xl font-serif text-white font-bold mb-4 drop-shadow-lg leading-tight">灵魂莲华<br/><span className="text-3xl text-hextech-blue-300">重返符文之地</span></h1>
                                <p className="text-hextech-grey mb-6 text-sm leading-relaxed max-w-md">绽灵节已至。与其在遗憾中徘徊，不如在花海中寻找答案。完成任务解锁全新法球与限定表情。</p>
                                <button 
                                    onClick={() => setCurrentView('EVENT_DETAIL')}
                                    className="px-8 py-3 bg-gradient-to-r from-hextech-blue-900 to-[#052c38] border border-hextech-blue-500 text-hextech-blue-300 uppercase font-bold text-xs tracking-widest hover:brightness-125 transition-all shadow-[0_0_15px_rgba(10,200,185,0.2)]"
                                >
                                    查看详情
                                </button>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-3 gap-6 mt-8">
                            {NEWS_ITEMS.map((item, i) => (
                                <motion.div 
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + (i * 0.1) }}
                                    className="h-48 border border-[#3C3C41] bg-[#091428]/40 hover:border-hextech-gold-500 transition-all p-5 flex flex-col justify-end relative overflow-hidden group cursor-pointer"
                                >
                                    {/* Background Image with Scale Effect */}
                                    <div className="absolute inset-0">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                                    </div>
                                    
                                    <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                                        <Trophy size={20} className="text-hextech-gold-500" />
                                    </div>
                                    
                                    <div className="relative z-10">
                                        <div className="text-hextech-blue-500 text-[10px] uppercase font-bold mb-2 tracking-wider flex items-center gap-2">
                                            <div className="w-1 h-1 bg-hextech-blue-500 rounded-full" />
                                            {item.tag}
                                        </div>
                                        <div className="text-hextech-gold-100 font-bold text-lg leading-tight group-hover:text-white transition-colors drop-shadow-md">
                                            {item.title}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full h-screen bg-[#010A13]/95 backdrop-blur-md flex flex-col overflow-hidden"
        >
            {/* --- Top Navigation Bar --- */}
            <div className="h-[76px] w-full border-b border-[#3C3C41]/50 flex items-center px-6 justify-between bg-gradient-to-b from-[#091428] to-[#010A13] z-30 shadow-md flex-shrink-0">
                
                {/* 1. Left Section: Play & Game Modes */}
                <div className="flex items-center gap-8 flex-1">
                    {/* Play Button */}
                    <motion.button 
                        whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentView('PLAY')}
                        className="relative group cursor-pointer mr-4 outline-none"
                    >
                        <div className="absolute inset-0 bg-hextech-blue-500 blur-md opacity-30 group-hover:opacity-50 transition-opacity" />
                        <div className={`
                            relative w-36 h-10 bg-[url('https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/play-button-bg.png')] bg-cover flex items-center justify-center gap-2 border 
                            ${currentView === 'PLAY' ? 'border-hextech-gold-500' : 'border-hextech-blue-300/50'}
                            shadow-[0_0_15px_rgba(10,200,185,0.2)] transition-colors
                        `}>
                            <img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/icon-play-button-hover.png" className="w-5 h-5 opacity-0 group-hover:opacity-100 absolute left-3 transition-opacity" alt="" />
                            <span className={`font-sans font-bold tracking-widest text-base drop-shadow-md transition-colors ${currentView === 'PLAY' ? 'text-hextech-gold-100' : 'text-hextech-blue-300 group-hover:text-white'}`}>PLAY</span>
                        </div>
                    </motion.button>

                    {/* Text Nav Items */}
                    <div className="flex items-center gap-8">
                        {GAME_MODES.map((item) => (
                            <button 
                                key={item.id} 
                                onClick={() => handleNavClick(item.id)}
                                className={`
                                    uppercase font-bold text-sm tracking-wider transition-all duration-200 border-b-2 border-transparent pb-1 outline-none
                                    ${currentView === item.id ? 'text-hextech-gold-100 border-hextech-gold-500 shadow-[0_4px_10px_-2px_rgba(200,170,110,0.3)]' : 'text-hextech-grey hover:text-hextech-gold-300'}
                                `}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. Center Section: Assets (Collection, Loot, Store) */}
                <div className="flex items-center gap-8 justify-center flex-1 border-x border-[#3C3C41]/30 px-8 h-10">
                     {ASSET_NAV.map((item) => (
                         <button 
                            key={item.id} 
                            onClick={() => handleNavClick(item.id)}
                            className={`flex flex-col items-center gap-1 group outline-none ${currentView === item.id ? 'opacity-100' : 'opacity-70'}`}
                        >
                             <item.icon size={18} className={`transition-colors ${currentView === item.id ? 'text-hextech-gold-100' : 'text-hextech-grey group-hover:text-hextech-gold-300'}`} />
                             <span className={`text-[10px] font-bold uppercase tracking-wide transition-colors ${currentView === item.id ? 'text-hextech-gold-100' : 'text-hextech-grey/70 group-hover:text-hextech-gold-100'}`}>{item.name}</span>
                         </button>
                     ))}
                </div>

                {/* 3. Right Section: Profile & Currency */}
                <div className="flex items-center gap-6 flex-1 justify-end">
                    {/* Currencies */}
                    <div className="flex flex-col items-end gap-1 text-xs font-bold text-hextech-grey">
                        <div className="flex items-center gap-2 group cursor-help">
                            <span className="group-hover:text-white transition-colors">25,000</span>
                            <Coins size={14} className="text-blue-400 fill-blue-400/20" />
                        </div>
                        <div className="flex items-center gap-2 group cursor-help">
                            <span className="group-hover:text-white transition-colors">1,350</span>
                            <Hexagon size={14} className="text-orange-400 fill-orange-400/20 rotate-90" />
                        </div>
                    </div>

                    {/* Profile */}
                    <div className="flex items-center gap-3 pl-4 border-l border-[#3C3C41]/30">
                        <div className="text-right hidden xl:block">
                            <div className="text-hextech-gold-100 font-bold text-sm">最强王者</div>
                            <div className="flex items-center justify-end gap-1">
                                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]" />
                                <div className="text-green-500 text-[10px] uppercase font-bold tracking-wider">在线</div>
                            </div>
                        </div>
                        <div className="relative group cursor-pointer">
                            <div className="w-11 h-11 rounded-full border-2 border-hextech-gold-500 bg-[url('https://ddragon.leagueoflegends.com/cdn/14.3.1/img/profileicon/588.png')] bg-cover shadow-[0_0_10px_rgba(200,170,110,0.4)] transition-transform group-hover:scale-105" />
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#010A13] rounded-full flex items-center justify-center border border-hextech-gold-700">
                                <span className="text-[9px] font-bold text-white">99</span>
                            </div>
                        </div>
                    </div>

                    {/* System Icons */}
                    <div className="flex gap-4 border-l border-[#3C3C41]/30 pl-6 text-hextech-grey">
                        <Settings size={20} className="hover:text-white cursor-pointer transition-colors" />
                        <X size={20} className="hover:text-white cursor-pointer transition-colors" />
                    </div>
                </div>
            </div>

            {/* --- Main Layout --- */}
            <div className="flex-1 flex overflow-hidden">
                
                {/* Dynamic Content Area */}
                <div className="flex-1 bg-[#010A13]/50 relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentView}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="h-full w-full"
                        >
                            {renderContent()}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Sidebar (Social) - Persistent across views unless in full screen mode like Event Detail (Optional, but kept for consistency) */}
                {currentView !== 'EVENT_DETAIL' && (
                    <div className="w-[300px] bg-[#010A13]/95 border-l border-[#3C3C41]/50 flex flex-col z-20 shadow-[-5px_0_20px_rgba(0,0,0,0.5)]">
                        <div className="h-14 border-b border-[#3C3C41]/50 flex items-center px-4 justify-between bg-[#010A13]">
                            <span className="text-xs font-bold text-hextech-gold-100 uppercase tracking-wider">社交列表</span>
                            <div className="flex gap-3 text-hextech-grey">
                                <User size={16} className="hover:text-white cursor-pointer transition-colors" />
                                <Search size={16} className="hover:text-white cursor-pointer transition-colors" />
                            </div>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                            {/* Group: General */}
                            <div>
                                <h3 className="text-[10px] font-bold text-hextech-grey uppercase mb-3 px-2 flex justify-between">
                                    <span>通用好友</span>
                                    <span>(2/15)</span>
                                </h3>
                                <div className="space-y-1">
                                    {FRIENDS.slice(0, 2).map((friend) => (
                                        <div key={friend.name} className="flex items-center gap-3 p-2 hover:bg-[#1E2328] rounded cursor-pointer group transition-colors">
                                            <div className={`w-9 h-9 rounded-full ${friend.avatar} border border-black group-hover:border-hextech-gold-500 transition-colors relative`}>
                                                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#010A13] rounded-full flex items-center justify-center">
                                                    <div className={`w-2.5 h-2.5 rounded-full ${friend.status.includes('游戏') ? 'bg-blue-500' : 'bg-green-500'}`} />
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-hextech-gold-100 group-hover:text-white transition-colors">{friend.name}</span>
                                                <span className={`text-[10px] ${friend.status.includes('游戏') ? 'text-blue-400' : 'text-green-500'}`}>{friend.status}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Group: Offline */}
                            <div>
                                <h3 className="text-[10px] font-bold text-hextech-grey/50 uppercase mb-3 px-2 flex justify-between">
                                    <span>离线</span>
                                    <span>(24)</span>
                                </h3>
                                <div className="space-y-1 opacity-50">
                                    {FRIENDS.slice(2).map((friend) => (
                                        <div key={friend.name} className="flex items-center gap-3 p-2 hover:bg-[#1E2328] rounded cursor-pointer transition-colors">
                                            <div className={`w-9 h-9 rounded-full ${friend.avatar} grayscale border border-transparent`}></div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-hextech-grey">{friend.name}</span>
                                                <span className="text-[10px] text-hextech-grey">掌上英雄联盟在线</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        {/* Bottom Social Actions */}
                        <div className="h-12 border-t border-[#3C3C41]/50 flex">
                            <div className="flex-1 flex items-center justify-center gap-2 text-hextech-grey text-xs font-bold uppercase hover:bg-[#1E2328] cursor-pointer transition-colors border-r border-[#3C3C41]/50">
                                <MessageCircle size={14} />
                                <span>聊天</span>
                            </div>
                            <div className="w-12 flex items-center justify-center text-hextech-grey hover:bg-[#1E2328] cursor-pointer hover:text-white transition-colors">
                                <Gem size={14} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};
