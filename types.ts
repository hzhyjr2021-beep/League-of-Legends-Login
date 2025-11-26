export enum Region {
  IONIA = "艾欧尼亚",
  DEMACIA = "德玛西亚",
  NOXUS = "诺克萨斯",
  PILTOVER = "皮尔特沃夫",
  ZAUN = "祖安",
  BILGEWATER = "比尔吉沃特",
  KR = "韩服",
  NA = "美服"
}

export interface ServerStatusResponse {
  status: 'Online' | 'Maintenance' | 'Busy';
  message: string;
}