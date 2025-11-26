
// Removed Google GenAI dependency as per user request.
// Now providing local, immersive lore text in Chinese.

const LORE_STATUSES = [
  "虚空今日悄无声息...",
  "班德尔城传送门运行稳定。",
  "海克斯压力读数：最优。",
  "召唤师峡谷正在等待。",
  "德玛西亚正义服务器在线。",
  "祖安灰霾指数在容差范围内。",
  "监视者的目光已移开。",
  "恕瑞玛的太阳照耀着服务器。",
  "法力流系带充能完毕。",
  "皮尔特沃夫海关通过。",
  "纳什男爵正在沉睡。",
  "正在校准海克斯科技水晶..."
];

export const fetchServerStatusMessage = async (): Promise<string> => {
  // Simulate network delay for realism
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const randomIndex = Math.floor(Math.random() * LORE_STATUSES.length);
  return LORE_STATUSES[randomIndex];
};