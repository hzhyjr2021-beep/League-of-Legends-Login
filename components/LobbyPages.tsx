
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sword, Shield, BookOpen, Lock, Archive, ShoppingBag, ArrowLeft, Star, Box, Key, Sparkles, Zap, Brain, Activity, Play, Map, Users } from 'lucide-react';

// --- Types & Mock Data ---

const CHAMPIONS = [
  { 
    id: "Ahri", 
    name: "阿狸", 
    title: "九尾妖狐", 
    role: "法师 / 刺客",
    image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg",
    stats: { attack: 3, magic: 8, defense: 4, difficulty: 5 },
    story: "阿狸是生来就与符文之地的魔法有着紧密连接的瓦斯塔亚人。她可以将魔法塑造成充满着原始能量的宝珠，以此在猎杀猎物时把玩弄于股掌之间，最后吞噬他们的生命精魄。阿狸作为一个掠食者，她在保留着兽性的同时，也充满了同情心，因为她在吞噬每一个灵魂的时候，都会接收他们生前的记忆片段。",
    fullLore: "阿狸最初被遗弃在艾欧尼亚北部的雪原中，身上只有一个奇怪的双生宝石护身符。她被一群冰原狐抚养长大，并在它们之中学会了生存。虽然她学不会狐狸的语言，但她学会了像它们一样通过肢体语言表达自己。随着年龄的增长，她发现自己与魔法有着天然的亲和力，这种力量不仅能以此捕猎，甚至能安抚垂死猎物的痛苦。\n\n然而，这种力量是有代价的。她发现自己如果不吸取精魄，身体就会开始衰弱。在很长一段时间里，她都在这种捕食者的本能和日益增长的同情心之间挣扎。尤其是当她意外吞噬了一个爱人的记忆后，那种悔恨几乎摧毁了她。\n\n如今，阿狸正在搜寻关于她身世的线索。她手持那对双生宝石，漫步在艾欧尼亚的森林中，试图寻找这一族类的同胞，并希望能找到一种不需要伤害他人就能控制自己力量的方法。她不再是那只懵懂的狐狸，而是一个在过去与未来之间寻找平衡的瓦斯塔亚行者。"
  },
  { 
    id: "Yasuo", 
    name: "亚索", 
    title: "疾风剑豪", 
    role: "战士 / 刺客",
    image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg",
    stats: { attack: 8, magic: 4, defense: 4, difficulty: 10 },
    story: "亚索是一个百折不屈的艾欧尼亚人，也是一名身手敏捷的御风剑客。年轻的时候，他因为狂妄自大而招致了灾难，被误解为杀害长老的凶手。即使真相大白，他也无法原谅自己。",
    fullLore: "作为一个才华横溢的剑术学徒，亚索是同辈中唯一掌握了传说中御风剑术的学生。许多人都相信他注定会成为一名伟大的英雄。但是，当诺克萨斯入侵艾欧尼亚时，他的命运被彻底改变了。他违背了保护素马长老的命令，冲上前线杀敌。当他返回时，长老已经死于疾风剑术之下。\n\n被指控为凶手的亚索被迫逃亡，他在艾欧尼亚的土地上流浪，寻找真正的凶手。在这个过程中，他被迫杀死了许多前来追捕他的昔日同窗，甚至包括他的亲生哥哥，永恩。那一战成为了他心中永远的痛。\n\n虽然如今真相已经大白——放逐之刃锐雯才是意外导致长老死亡的人——但亚索仍然无法原谅自己当年的擅离职守。他继续在符文之地上游荡，用酒精麻痹自己的悔恨，只有在风起之时，他的剑才会再次出鞘，为了保护那些无辜者，也为了寻找内心的救赎。"
  },
  { 
    id: "Lux", 
    name: "拉克丝", 
    title: "光辉女郎", 
    role: "法师 / 辅助",
    image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_0.jpg",
    stats: { attack: 2, magic: 9, defense: 2, difficulty: 3 },
    story: "拉克丝·冕卫来自于德玛西亚——一个将魔法视为禁忌的封闭国度。只要一提起魔法，人们总是带着恐惧和怀疑。然而拉克丝却拥有控制光之魔法的天赋。",
    fullLore: "拉克丝出生在德玛西亚最显赫的家族之一：冕卫家族。她的哥哥盖伦是家族的骄傲，是军队的楷模。而拉克丝则从小就被教导要服务国家，维护家族的荣誉。但当她发现自己能够控制光线时，恐惧笼罩了她。在德玛西亚，这不仅是禁忌，更是可能导致流放甚至死刑的罪名。\n\n多年来，她一直小心翼翼地隐藏着自己的能力，这种双重生活让她感到窒息。直到她遇到了被囚禁的塞拉斯，一个能够感知并窃取魔法的法师。塞拉斯利用了拉克丝的善良，不仅逃脱了监禁，还引发了德玛西亚的内乱。\n\n经历了这些动荡后，拉克丝不再选择隐藏。她开始秘密地帮助那些像她一样拥有魔法天赋的德玛西亚人。她相信，魔法本身并不是邪恶的，关键在于如何使用它。她正努力在传统与变革之间寻找一条新的道路，希望有一天，德玛西亚的光芒能包容所有的子民，无论他们是否拥有魔法。"
  },
  { 
    id: "Jinx", 
    name: "金克丝", 
    title: "暴走萝莉", 
    role: "射手",
    image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg",
    stats: { attack: 9, magic: 2, defense: 2, difficulty: 6 },
    story: "金克丝来自祖安，是生来的破坏分子。她喜欢制造混乱，不计后果，留下的只有身后的一片狼藉和惊慌失措。她最讨厌的就是无聊。",
    fullLore: "在皮尔特沃夫，金克丝的名字已经成为了混乱的代名词。她使用各种致命且色彩斑斓的武器——包括她的火箭发射器“鱼骨头”和迷你机枪“砰砰枪”——在进步之城制造最响亮的爆炸和最耀眼的闪光。对于大多数人来说，她只是一个危险的疯子，但在她疯狂的笑声背后，隐藏着一段破碎的过往。\n\n曾经的她并不叫金克丝，而是一个名叫爆爆的祖安女孩，总是渴望得到姐姐蔚的认可。然而，一系列悲剧性的误会和灾难将她们分开，让爆爆跌入了疯狂的深渊，最终重生为金克丝。她现在的每一次破坏，似乎都是在向那个抛弃她的姐姐发出扭曲的信号。\n\n她把皮尔特沃夫当成了自己的游乐场，并在每一次犯罪现场留下标志性的涂鸦。执法官凯特琳和现在已成为执法官的蔚一直试图抓住她，但金克丝总能凭借她那混乱的天才计划逃脱，留下的只有一串长长的笑声和满城的硝烟。"
  },
  { 
    id: "Thresh", 
    name: "锤石", 
    title: "魂锁典狱长", 
    role: "辅助",
    image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Thresh_0.jpg",
    stats: { attack: 5, magic: 6, defense: 6, difficulty: 7 },
    story: "残酷成性的锤石是暗影岛上游荡的亡灵，不仅狡诈，而且还拥有着折磨凡人的这种可怕嗜好。他生前曾是一个保管地下宝库的看守。",
    fullLore: "在很久以前，锤石是一个致力于收集和保护奥术知识的教团成员。但他那被各种强大法器所环绕的工作环境，最终扭曲了他的心智。他开始从折磨活物中获得快感，这种施虐的欲望在他生前就已经根深蒂固。当破败之咒降临，黑雾吞噬了福光岛时，锤石并没有像其他人一样感到恐惧，反而欣然接受了这种变化。\n\n重生为亡灵的他，成为了这片诅咒之地最可怕的幽灵之一。他不再满足于简单的杀戮，而是专注于捕捉灵魂，并将其囚禁在他的幽冥灯笼中，进行永恒的折磨。即使是卢锡安的妻子赛娜，也曾长期被囚禁在他的灯笼里。\n\n锤石以别人的痛苦为食，受害者的绝望让他变得更加强大。他现在游荡在瓦洛兰大陆，寻找着那些意志坚强或者拥有特殊羁绊的灵魂，因为摧毁这样的灵魂能给他带来最大的愉悦。"
  },
  { 
    id: "LeeSin", 
    name: "李青", 
    title: "盲僧", 
    role: "战士 / 刺客",
    image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/LeeSin_0.jpg",
    stats: { attack: 8, magic: 3, defense: 5, difficulty: 9 },
    story: "李青是一名艾欧尼亚古老武术的大师，讲原则、重信义的他能将神龙之灵的精粹运用自如，助他面对任何挑战。虽然他失去了视力，但他的其他感官却敏锐异常。",
    fullLore: "李青年轻时曾是一名极具天赋的召唤师学徒，但他的傲慢导致了一场悲剧。在试图召唤一只来自瘟疫丛林的猛兽时，他失去控制，导致了一个村庄的毁灭。愧疚之下，他发誓再也不使用魔法，并前往尚赞的修道院寻求赎罪，成为了一名苦行僧。\n\n多年后，诺克萨斯军队入侵艾欧尼亚。李青在修道院顶端自焚以抗议侵略者的暴行。神龙之灵被他的牺牲精神所感动，保护了他的生命，但他的双眼却被烈火彻底烧毁。重生后的李青获得了神龙之力，他用这种力量击退了侵略者。\n\n如今，虽然双目失明，但李青的感官比任何人都敏锐。他能够通过声音、气流和能量的波动感知周围的一切。作为艾欧尼亚最坚定的守护者之一，他继续修行，教导新一代的武僧，并随时准备用他的拳脚和神龙之魂，痛击任何胆敢威胁这片神圣土地的敌人。"
  }
];

const GAME_MODES = [
    {
        id: 'CLASSIC',
        title: "召唤师峡谷",
        subtitle: "5v5 匹配 / 排位",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop", // Forest/River vibe
        description: "英雄联盟最经典的对战模式。三条兵线，两片野区，摧毁敌方水晶枢纽以获得胜利。"
    },
    {
        id: 'ARAM',
        title: "极地大乱斗",
        subtitle: "5v5 单路",
        image: "https://images.unsplash.com/photo-1480497490787-505ec076689f?q=80&w=2669&auto=format&fit=crop", // Snowy bridge/winter vibe
        description: "嚎哭深渊只有一条兵线。随机英雄，团战到底。节奏快速，充满乐趣。"
    },
    {
        id: 'TFT',
        title: "云顶之弈",
        subtitle: "8人 策略",
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2694&auto=format&fit=crop", // Fantasy/Space vibe
        description: "组建你的队伍，强化你的英雄，在这个各自为战的回合制策略游戏中生存到最后。"
    }
];

// --- Sub-components for UI ---

const StatBar: React.FC<{ label: string; value: number; icon: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="flex items-center gap-4 mb-3">
        <div className="w-24 text-hextech-grey text-xs font-bold uppercase flex items-center gap-2">
            {icon}
            {label}
        </div>
        <div className="flex-1 h-2 bg-[#010A13] border border-hextech-blue-900 rounded-sm overflow-hidden relative">
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${value * 10}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-hextech-blue-900 to-hextech-blue-500"
            />
            {/* Grid lines */}
            <div className="absolute inset-0 flex">
                {[...Array(9)].map((_, i) => (
                    <div key={i} className="flex-1 border-r border-black/30" />
                ))}
            </div>
        </div>
        <div className="w-8 text-right text-hextech-gold-500 font-bold text-xs">{value}</div>
    </div>
);

// --- 1. Champions View ---
export const ChampionsView: React.FC = () => {
    const [selectedChamp, setSelectedChamp] = useState<typeof CHAMPIONS[0] | null>(null);
    const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'LORE' | 'STATS'>('OVERVIEW');

    return (
        <div className="flex h-full relative">
            {/* List */}
            <div className={`${selectedChamp ? 'w-1/3' : 'w-full'} transition-all duration-500 p-8 overflow-y-auto custom-scrollbar`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-hextech-gold-100 font-bold text-2xl tracking-widest font-serif-lol uppercase">英雄列表</h2>
                    <div className="relative group">
                        <input type="text" placeholder="搜索英雄..." className="bg-[#010A13] border border-hextech-gold-700/50 rounded pl-8 pr-4 py-1 text-sm text-white focus:border-hextech-gold-500 outline-none w-48" />
                        <Search size={14} className="absolute left-2.5 top-2 text-hextech-grey" />
                    </div>
                </div>
                
                <div className={`grid ${selectedChamp ? 'grid-cols-2' : 'grid-cols-4 xl:grid-cols-5'} gap-4`}>
                    {CHAMPIONS.map(champ => (
                        <motion.div 
                            key={champ.id}
                            layoutId={`card-${champ.id}`}
                            onClick={() => {
                                setSelectedChamp(champ);
                                setActiveTab('OVERVIEW');
                            }}
                            className={`aspect-[3/4] relative cursor-pointer group border transition-all overflow-hidden
                                ${selectedChamp?.id === champ.id ? 'border-hextech-gold-500 ring-2 ring-hextech-gold-500/30' : 'border-transparent hover:border-hextech-gold-500'}
                            `}
                        >
                            <img src={champ.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={champ.name} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                            <div className="absolute bottom-0 left-0 w-full p-2">
                                <p className="text-hextech-gold-100 font-bold text-sm">{champ.name}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Detail View */}
            <AnimatePresence>
                {selectedChamp && (
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="w-2/3 h-full relative border-l border-hextech-gold-700/30 bg-[#010A13]/90 backdrop-blur-md overflow-hidden flex flex-col"
                    >
                        {/* Header Image Background */}
                        <div className="absolute inset-0 h-1/2 z-0">
                             <motion.img 
                                layoutId={`img-${selectedChamp.id}`}
                                src={selectedChamp.image} 
                                className="w-full h-full object-cover mask-image-linear-gradient opacity-40" 
                                style={{ maskImage: 'linear-gradient(to bottom, black, transparent)' }}
                            />
                        </div>

                        {/* Content Container */}
                        <div className="relative z-10 flex flex-col h-full">
                            {/* Top Bar */}
                            <div className="p-8 pb-0">
                                <button onClick={() => setSelectedChamp(null)} className="flex items-center gap-2 text-hextech-gold-500 mb-6 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest">
                                    <ArrowLeft size={14} /> 返回列表
                                </button>
                                <h3 className="text-hextech-blue-300 font-bold uppercase tracking-[0.3em] text-sm mb-1">{selectedChamp.title}</h3>
                                <h1 className="text-5xl font-serif-lol font-bold text-hextech-gold-100 mb-6 drop-shadow-lg">{selectedChamp.name}</h1>
                                
                                {/* Tabs */}
                                <div className="flex border-b border-[#3C3C41]">
                                    {['OVERVIEW', 'STATS', 'LORE'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab as any)}
                                            className={`
                                                px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all relative
                                                ${activeTab === tab ? 'text-hextech-gold-100' : 'text-hextech-grey hover:text-hextech-gold-300'}
                                            `}
                                        >
                                            {tab === 'OVERVIEW' ? '概览' : tab === 'STATS' ? '属性' : '背景故事'}
                                            {activeTab === tab && (
                                                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-hextech-gold-500" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tab Content */}
                            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                                <AnimatePresence mode="wait">
                                    {activeTab === 'OVERVIEW' && (
                                        <motion.div 
                                            key="overview"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                        >
                                            <p className="text-hextech-gold-100 text-lg leading-relaxed mb-6 italic font-serif">
                                                "{selectedChamp.story}"
                                            </p>
                                            
                                            <div className="grid grid-cols-2 gap-4 mt-8">
                                                <div className="bg-[#091428]/50 p-4 border border-hextech-blue-900 rounded">
                                                    <div className="text-hextech-blue-500 text-xs font-bold uppercase mb-2">定位</div>
                                                    <div className="text-white font-bold flex items-center gap-2">
                                                        <Sword size={16} />
                                                        {selectedChamp.role}
                                                    </div>
                                                </div>
                                                <div className="bg-[#091428]/50 p-4 border border-hextech-blue-900 rounded">
                                                    <div className="text-hextech-blue-500 text-xs font-bold uppercase mb-2">难度</div>
                                                    <div className="text-white font-bold flex items-center gap-2">
                                                        <Activity size={16} />
                                                        {selectedChamp.stats.difficulty >= 7 ? '高' : selectedChamp.stats.difficulty >= 4 ? '中' : '低'}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'STATS' && (
                                        <motion.div 
                                            key="stats"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="max-w-md"
                                        >
                                            <h4 className="text-hextech-gold-100 font-bold uppercase mb-6 text-sm tracking-wider">基础属性</h4>
                                            <StatBar label="攻击力" value={selectedChamp.stats.attack} icon={<Sword size={14} />} />
                                            <StatBar label="法术强度" value={selectedChamp.stats.magic} icon={<Zap size={14} />} />
                                            <StatBar label="防御力" value={selectedChamp.stats.defense} icon={<Shield size={14} />} />
                                            <StatBar label="上手难度" value={selectedChamp.stats.difficulty} icon={<Brain size={14} />} />
                                        </motion.div>
                                    )}

                                    {activeTab === 'LORE' && (
                                        <motion.div 
                                            key="lore"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                        >
                                            <div className="prose prose-invert max-w-none">
                                                <p className="text-hextech-grey leading-loose text-sm text-justify border-l-2 border-hextech-gold-700/50 pl-6 whitespace-pre-wrap">
                                                    {selectedChamp.fullLore}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// --- 2. Collection View ---
export const CollectionView: React.FC = () => {
    return (
        <div className="p-8 h-full flex flex-col">
             <div className="flex border-b border-[#3C3C41] mb-6">
                {["英雄", "皮肤", "表情", "符文页", "守卫"].map((tab, i) => (
                    <div key={tab} className={`px-6 py-3 text-sm font-bold uppercase cursor-pointer transition-colors ${i === 0 ? 'text-hextech-gold-100 border-b-2 border-hextech-gold-500' : 'text-hextech-grey hover:text-white'}`}>
                        {tab}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-6 gap-4 overflow-y-auto custom-scrollbar pb-10">
                 {CHAMPIONS.map((champ, i) => (
                    <div key={champ.id} className="relative aspect-[3/4] bg-[#091428] border border-[#3C3C41] group hover:border-hextech-gold-500 transition-colors flex flex-col">
                        <img src={champ.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                        
                        {/* Mastery Badge Simulation */}
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8">
                             <img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/mastery-7.png" alt="Mastery" onError={(e) => e.currentTarget.style.display='none'} />
                        </div>
                        <div className="absolute top-2 right-2">
                            {i < 3 && <Star size={12} className="text-hextech-gold-500 fill-hextech-gold-500" />}
                        </div>
                    </div>
                 ))}
                 {[...Array(12)].map((_, i) => (
                     <div key={i} className="aspect-[3/4] bg-[#010A13] border border-[#3C3C41] flex items-center justify-center relative">
                         <Lock size={24} className="text-[#3C3C41]" />
                     </div>
                 ))}
            </div>
        </div>
    )
}

// --- 3. Loot View ---
export const LootView: React.FC = () => {
    // Helper for Loot Items
    const LootItem = ({ icon, name, count, type = "material" }: { icon: React.ReactNode, name: string, count?: string, type?: "material" | "shard" }) => (
        <div className="aspect-square bg-[#091428]/50 border border-[#3C3C41] hover:border-hextech-gold-500 transition-colors flex flex-col items-center justify-center gap-3 group cursor-pointer relative shadow-lg">
            <div className={`p-3 rounded-full ${type === 'material' ? 'bg-hextech-blue-900/30' : ''} group-hover:scale-110 transition-transform duration-300 relative`}>
                {icon}
                {/* Glow effect */}
                <div className="absolute inset-0 bg-hextech-gold-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xs font-bold text-hextech-grey group-hover:text-hextech-gold-100 text-center px-2 leading-tight">{name}</span>
            {count && <span className="absolute bottom-2 right-2 text-xs font-bold text-hextech-gold-500">{count}</span>}
        </div>
    );

    return (
        <div className="h-full flex">
            {/* Left: Inventory */}
            <div className="w-2/3 p-8 border-r border-[#3C3C41]/50 overflow-y-auto custom-scrollbar">
                <h2 className="text-hextech-gold-100 font-bold text-lg tracking-widest font-serif-lol uppercase mb-6">战利品背包</h2>
                
                <div className="grid grid-cols-5 gap-4">
                    <LootItem 
                        icon={<Box size={32} className="text-hextech-gold-300" />} 
                        name="海克斯科技宝箱" 
                        count="x3" 
                    />
                    <LootItem 
                        icon={<Key size={32} className="text-hextech-blue-300" />} 
                        name="符文钥匙碎片" 
                        count="x2" 
                    />
                    <LootItem 
                        icon={<Sparkles size={32} className="text-orange-400" />} 
                        name="橙色精萃" 
                        count="1050" 
                    />
                    {/* Skin Shard Example */}
                    <div className="aspect-square bg-[#091428]/50 border border-[#3C3C41] hover:border-hextech-gold-500 transition-colors flex flex-col items-center justify-center gap-2 group cursor-pointer relative overflow-hidden">
                         <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Teemo_8.jpg" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity" />
                         <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                         <div className="relative z-10 flex flex-col items-center">
                             <div className="w-8 h-8 rounded-full border border-hextech-gold-500 flex items-center justify-center mb-1 bg-black/50">
                                <span className="text-[10px] text-hextech-gold-500 font-bold">皮肤</span>
                             </div>
                             <span className="text-xs font-bold text-center px-2 text-hextech-gold-100 drop-shadow-md">小蜜蜂 提莫</span>
                         </div>
                    </div>
                     <LootItem 
                        icon={<Activity size={32} className="text-purple-400" />} 
                        name="第 1 系列小小英雄蛋" 
                        count="x1" 
                    />
                </div>
            </div>

            {/* Right: Actions */}
            <div className="w-1/3 p-8 flex flex-col items-center justify-center bg-[#010A13]/80 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-hextech-blue-900/20 to-transparent pointer-events-none" />
                
                <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-40 h-40 mb-8 relative flex items-center justify-center"
                >
                    <Box size={100} className="text-hextech-gold-300 drop-shadow-[0_0_15px_rgba(200,170,110,0.5)]" />
                    <div className="absolute inset-0 bg-hextech-gold-500/10 blur-3xl rounded-full" />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-4 font-serif-lol tracking-wide">海克斯科技宝箱</h3>
                <p className="text-hextech-grey text-sm text-center mb-10 px-6 leading-relaxed">
                    包含皮肤碎片、守卫皮肤碎片、召唤师图标以及宝石。有几率额外掉落一个海克斯科技宝箱和钥匙。
                </p>
                
                <div className="flex gap-4 w-full px-6">
                    <button className="flex-1 py-4 bg-[#1e2328] border border-hextech-gold-700 text-hextech-gold-500 font-bold text-xs uppercase hover:bg-hextech-gold-700 hover:text-black transition-all shadow-lg hover:shadow-hextech-gold-500/20">
                        开启 (需要钥匙)
                    </button>
                    <button className="flex-1 py-4 bg-[#1e2328] border border-hextech-blue-500 text-hextech-blue-300 font-bold text-xs uppercase hover:bg-hextech-blue-500 hover:text-black transition-all shadow-lg hover:shadow-hextech-blue-500/20">
                        锻造
                    </button>
                </div>
            </div>
        </div>
    )
}

// --- 4. Store View ---
export const StoreView: React.FC = () => {
    return (
        <div className="h-full flex flex-col">
             {/* Sub Nav */}
             <div className="flex items-center justify-center gap-8 py-4 border-b border-[#3C3C41] bg-[#091428]">
                {["精选", "英雄", "皮肤", "云顶之弈", "战利品", "点券充值"].map((item, idx) => (
                    <button key={item} className={`text-sm font-bold uppercase ${idx === 0 ? 'text-hextech-gold-100 scale-110' : 'text-hextech-grey hover:text-hextech-gold-300'}`}>
                        {item}
                    </button>
                ))}
             </div>

             <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                 {/* Banner */}
                 <div className="w-full h-64 bg-gradient-to-r from-purple-900 to-indigo-900 mb-8 rounded border border-hextech-gold-700/50 relative overflow-hidden flex items-center p-10">
                     <div className="z-10">
                         <h2 className="text-3xl font-bold text-white mb-2 font-serif-lol">西部魔影 2024</h2>
                         <p className="text-hextech-blue-300 mb-6">全新皮肤系列现已上架，包含传说级皮肤与限定边框。</p>
                         <button className="bg-hextech-gold-500 text-[#010A13] px-6 py-2 font-bold uppercase text-xs tracking-wider border border-hextech-gold-300 hover:bg-white transition-colors">立即购买</button>
                     </div>
                     <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lucian_9.jpg" className="absolute right-0 top-0 h-full w-2/3 object-cover mask-image-linear-gradient" style={{ maskImage: 'linear-gradient(to right, transparent, black)' }} />
                 </div>

                 <h3 className="text-hextech-gold-100 font-bold uppercase tracking-wider mb-4 text-sm flex items-center gap-2">
                     <Sparkles size={14} /> 热门推荐
                 </h3>

                 <div className="grid grid-cols-4 gap-6">
                     {[
                        { name: "源计划：联合 艾希", price: 1820, img: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ashe_8.jpg" },
                        { name: "神王 盖伦", price: 1820, img: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Garen_13.jpg" },
                        { name: "真实伤害 艾克", price: 1820, img: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ekko_19.jpg" },
                        { name: "星之守护者 卡莎", price: 1820, img: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kaisa_29.jpg" }
                     ].map((skin) => (
                         <div key={skin.name} className="bg-[#1E2328] border border-[#3C3C41] group hover:border-hextech-gold-500 transition-all flex flex-col cursor-pointer">
                             <div className="relative aspect-[16/9] overflow-hidden">
                                 <img src={skin.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                 <div className="absolute top-0 right-0 bg-[#010A13]/80 px-2 py-1 text-[10px] text-hextech-gold-500 font-bold border-bl border-[#3C3C41]">
                                     -{Math.floor(Math.random() * 30 + 10)}%
                                 </div>
                             </div>
                             <div className="p-3">
                                 <div className="text-white text-sm font-bold truncate mb-3">{skin.name}</div>
                                 <div className="flex items-center justify-between">
                                     <div className="flex items-center gap-1">
                                         <div className="w-3 h-3 rounded-full bg-hextech-blue-500 border border-white" />
                                         <span className="text-xs font-bold text-white">{skin.price}</span>
                                     </div>
                                     <ShoppingBag size={14} className="text-hextech-gold-700 group-hover:text-hextech-gold-500 cursor-pointer" />
                                 </div>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
        </div>
    )
}

// --- 5. Event Detail View ---
export const EventDetailView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-full w-full relative bg-[#010A13]"
        >
             {/* Background - using Yone Spirit Blossom splash which is reliable */}
             <div className="absolute inset-0 bg-[url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yone_1.jpg')] bg-cover bg-center opacity-40" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#010A13] via-[#010A13]/60 to-transparent" />

             <div className="absolute top-6 left-6 z-20">
                <button onClick={onBack} className="flex items-center gap-2 text-hextech-gold-500 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-hextech-gold-700/30">
                    <ArrowLeft size={14} /> 返回大厅
                </button>
             </div>

             <div className="relative z-10 h-full flex flex-col items-center pt-20 px-20 text-center overflow-y-auto custom-scrollbar">
                 {/* Event Logo Mockup */}
                 <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-4"
                 >
                     <Sparkles size={64} className="text-pink-300 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
                 </motion.div>
                 
                 <h1 className="text-6xl font-serif-lol text-white font-bold mb-4 drop-shadow-lg tracking-wider">灵魂莲华</h1>
                 <p className="text-pink-200 text-lg mb-12 max-w-2xl leading-relaxed font-serif">
                     "当风起时，我们能听见逝者的低语。" <br/>
                     绽灵节是艾欧尼亚传统的民间节日。生者与死者的界限在此时变得模糊。
                 </p>

                 <div className="grid grid-cols-3 gap-8 w-full max-w-5xl pb-20">
                     <div className="bg-[#091428]/80 backdrop-blur-md border border-hextech-blue-500/30 p-6 rounded-lg flex flex-col items-center hover:bg-[#091428] transition-colors">
                         <div className="w-12 h-12 bg-hextech-blue-900 rounded-full flex items-center justify-center mb-4 text-hextech-blue-300 font-bold border border-hextech-blue-500 shadow-[0_0_10px_rgba(10,200,185,0.3)]">1</div>
                         <h3 className="text-hextech-gold-100 font-bold uppercase mb-2">每日首胜</h3>
                         <p className="text-hextech-grey text-xs">赢得一场匹配对局或在云顶之弈获得前4名。</p>
                         <div className="mt-4 w-full h-1 bg-[#010A13] rounded-full overflow-hidden">
                             <div className="h-full w-1/2 bg-hextech-blue-500" />
                         </div>
                     </div>
                     <div className="bg-[#091428]/80 backdrop-blur-md border border-hextech-blue-500/30 p-6 rounded-lg flex flex-col items-center hover:bg-[#091428] transition-colors">
                         <div className="w-12 h-12 bg-hextech-blue-900 rounded-full flex items-center justify-center mb-4 text-hextech-blue-300 font-bold border border-hextech-blue-500 shadow-[0_0_10px_rgba(10,200,185,0.3)]">2</div>
                         <h3 className="text-hextech-gold-100 font-bold uppercase mb-2">灵魂羁绊</h3>
                         <p className="text-hextech-grey text-xs">使用拥有灵魂莲华皮肤的英雄进行游戏。</p>
                         <div className="mt-4 w-full h-1 bg-[#010A13] rounded-full overflow-hidden">
                             <div className="h-full w-0 bg-hextech-blue-500" />
                         </div>
                     </div>
                     <div className="bg-[#091428]/80 backdrop-blur-md border border-hextech-gold-700/30 p-6 rounded-lg flex flex-col items-center relative overflow-hidden group">
                         <div className="absolute inset-0 bg-gradient-to-br from-hextech-gold-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                         <div className="relative z-10 flex flex-col items-center">
                            <Star size={32} className="text-hextech-gold-500 mb-4 fill-hextech-gold-500 animate-pulse" />
                            <h3 className="text-hextech-gold-100 font-bold uppercase mb-2">通行证奖励</h3>
                            <button className="bg-hextech-gold-500 text-black px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded mt-2 hover:bg-white transition-colors">
                                购买通行证
                            </button>
                         </div>
                     </div>
                 </div>
             </div>
        </motion.div>
    )
}

// --- 6. Play Selection View ---
export const PlaySelectionView: React.FC = () => {
    const [selectedMode, setSelectedMode] = useState<string | null>(null);

    return (
        <div className="h-full w-full flex flex-col p-8 relative">
            <h1 className="text-4xl font-bold text-hextech-gold-100 font-serif-lol uppercase tracking-widest mb-2">选择模式</h1>
            <p className="text-hextech-grey mb-8">选择你的战场，召唤师。</p>

            <div className="flex-1 flex gap-6 items-center justify-center">
                {GAME_MODES.map((mode) => (
                    <motion.div
                        key={mode.id}
                        layoutId={`mode-${mode.id}`}
                        onClick={() => setSelectedMode(mode.id)}
                        className={`
                            relative h-[500px] w-1/3 max-w-sm rounded-lg overflow-hidden cursor-pointer group border-2 transition-all duration-300
                            ${selectedMode === mode.id ? 'border-hextech-gold-500 scale-105 shadow-[0_0_30px_rgba(200,170,110,0.3)]' : 'border-[#3C3C41] hover:border-hextech-gold-700 hover:scale-[1.02]'}
                        `}
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <img src={mode.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#010A13] via-[#010A13]/20 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 w-full p-6">
                             {selectedMode === mode.id && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute -top-12 left-6">
                                    <div className="w-8 h-8 rounded-full border-2 border-hextech-gold-500 flex items-center justify-center bg-[#010A13]">
                                        <div className="w-4 h-4 bg-hextech-gold-500 rounded-full" />
                                    </div>
                                </motion.div>
                             )}
                            <h2 className={`text-2xl font-bold uppercase mb-1 font-serif-lol ${selectedMode === mode.id ? 'text-hextech-gold-100' : 'text-white'}`}>{mode.title}</h2>
                            <p className="text-hextech-blue-300 text-xs font-bold uppercase tracking-wider mb-4">{mode.subtitle}</p>
                            
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: selectedMode === mode.id ? 'auto' : 0, opacity: selectedMode === mode.id ? 1 : 0 }}
                                className="overflow-hidden"
                            >
                                <p className="text-hextech-grey text-sm leading-relaxed mb-4">
                                    {mode.description}
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Action Bar */}
            <div className="h-24 border-t border-[#3C3C41]/50 flex items-center justify-end gap-6">
                <AnimatePresence>
                    {selectedMode && (
                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="h-12 px-12 bg-hextech-blue-900 border border-hextech-blue-500 text-hextech-blue-300 text-sm font-bold uppercase tracking-widest hover:bg-hextech-blue-500 hover:text-black transition-colors shadow-[0_0_20px_rgba(10,200,185,0.3)]"
                        >
                            确认选择
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
