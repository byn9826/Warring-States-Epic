# 战国史话
基于Vue + Electron开发，以春秋战国为背景，规则改编自权力的游戏版图桌游的单机桌游客户端   

[项目地址](https://github.com/byn9826/Warring-States-Epic)   

游戏下载
--
1. [网页版地址](https://byn9826.github.io/Warring-States-Epic/)   
也可以直接下载项目将/docs/index.html文件拖入浏览器即可  
不支持更换剧本，不支持存档与载入   
   
2. PC安装包  
也可以自己Build项目，支持剧本读取，支持存档与载入   
```
1. git clone https://github.com/byn9826/Warring-States-Epic.git   
2. cd warring-states-epic  
3. npm install electron -g  
4. electron .   
```  
   
游戏剧本  
--
1. 默认剧本，问鼎中原  
玩家扮演战国七雄之一进行游戏，会尽量做到各势力平衡   
剧本内容直接写在/docs/index.html文件中  
![default theme](https://raw.githubusercontent.com/byn9826/Warring-States-Epic/master/~legend/1.jpg)   
  
2. 自定义剧情  
可以在以战国七雄的历史背景为基础下，自由更改各国初始的城市及兵力来自定义剧情   
参考/docs/scenario/长平之战.json文件，主要修改为"cities"中内容   
   
3. 自定义剧本  
可以直接覆盖城市，国家，英雄，精兵的名称及部分数据来完全更改游戏的历史背景  
参考/docs/scenario/三国鼎立.json文件，将想要覆盖的内容放到"rewrite"中    
![Modified theme](https://raw.githubusercontent.com/byn9826/Warring-States-Epic/master/~legend/7.jpg)    
   
主要选项
--  
Vue的主文件/docs/source/epic.js会监听设置并调整对应参数   
![settings](https://raw.githubusercontent.com/byn9826/Warring-States-Epic/master/~legend/2.jpg)   
  
1. 游戏速度   
电脑做出决定后会加入一个延迟执行时间  
最快为1秒，最慢为5秒   
    
2. 游戏模式  
置身事外 - 观看AI互动，可以自动跑到天荒地老   
十回争霸 - 选择一个国家与AI战斗十个回合，排名第一者获胜   
灭国称帝 - 选择一个国家与AI战斗至退出游戏   

3. 游戏难度
简单 - 玩家与AI均无加成   
困难 - AI每回合结束获得一个义勇兵事件    

4. 战争迷雾  
开 - 可知道自己及盟友各城市军团的名称，可知道其他国家各城市的军团数   
关 - 可知道所有国家各城市的军团数   

游戏规则
--
基本上是根据权力的游戏版图桌游改编的，AI比较难写的地方都改编了...   
![map](https://raw.githubusercontent.com/byn9826/Warring-States-Epic/master/~legend/3.jpg)   

整个流程靠round, stage, active三个变量的大循环来控制, 主要在  
/docs/source/epic.js   
/docs/component/decision-board.js     
/docs/processor/before-battle.js   
/docs/processor/after-battle.js   
四个文件中相互触发    

游戏每回合分为七个阶段  
  
1. 缔盟阶段  
每个国家可选择申请成为另一个国家的盟友，盟友之间无法相互攻击或劫掠。  
战斗时，已方将获得临近地区盟友支援指令带来的加成（盟友不可同时是敌军盟友）     
  
2. 毁约阶段  
每个国家可选择断绝与另一个国家的同盟关系   
    
3. 运筹阶段  
每个国家在已方控制且有驻军的区域放置指令   
战备指令 - 可在行军阶段进行行军，战斗时，己方进攻或防御区域拥有战备指令则战力+1   
支援指令 - 行军阶段附近城市发生战斗时，对己方及同盟国家提供支援   
劫掠指令 - 劫掠阶段可消除附近非已方非同盟国家的支援、劫掠或休整指令，并增长国力   
休整指令 - 回合结束时，获得区域国力资源数+1点国力   

4. 劫掠阶段  
每个国家根据威望排序轮流结算一次劫掠指令，直至所有劫掠指令被结算完毕  

5. 行军阶段  
每个国家根据威望排行轮流结算一次行军指令，直至所有行军指令被结算完毕   
战斗时，双方均需使用一名将领，将领使用后将处于休整状态直至己方所有将领均处于休整状态时，全部恢复为待命可使用状态   
进攻其他国家时，总战力高者获胜。若战力相同，则军威排行高者获胜。   
进攻方失败后将撤退回原地，参与进攻军团变为休整状态。  
防守方失败后，所以军团将撤退至随机可撤退区域，变为休整状态。若没有可撤退区域则直接被消灭    
休整状态的军团被攻击时不会被计入战力，若战败，则直接被消灭    
![battle](https://raw.githubusercontent.com/byn9826/Warring-States-Epic/master/~legend/6.jpg)   

6. 征税阶段  
结算所有国家的休整指令，并增长相应国力   

7. 募兵阶段  
每个国家根据威望排序可选择在已方都会或城市募兵，募兵将消耗相应的国力   

8. 华夏阶段  
将从三个事件组中各随机发生一个事件，各个事件将会造成相关影响  
相关定义在/docs/source/definition/event.js文件下  
  
内政事件组  
义勇兵 - 各国在国都免费募得满编步兵  
大变法 - 各国获得与领土国力点数相等的国力  
将请缨 - 各国所有将领均调整为待命状态  
无为而治 - 无事发生  
  
四夷事件组  
四夷扩张 - 四夷军力 + 1  
四夷入侵 - 各国损失与四夷战力相等的国力,国库亏空时损失加倍  
天下太平 - 无事发生  
  
气候事件组  
夏雨连绵 - 下回合进攻方战力 - 1  
秋风萧瑟 - 下回合防守方战力 - 1  
寒冬凌冽 - 下回合战斗失败伤亡 + 1  
春日平常 - 无事发生  

其他规则    
![supply](https://raw.githubusercontent.com/byn9826/Warring-States-Epic/master/~legend/4.jpg)   
补给 - 每个城市最大为四个军团，国家总军团数不得超过补给上限。补给由控制领地下补给标记数决定，实时刷新  
![rank](https://raw.githubusercontent.com/byn9826/Warring-States-Epic/master/~legend/5.jpg)   
威望 - 根据各国控制领地数排序，每回合结束刷新。排名第一国家获得九鼎，防守时+ 1战力  
军威 - 军威低的国家战胜军威高的国家后，军威排名提升至战败国家之前。排名第一国家获得干将，进攻时+ 1 战力  
排名 - 根据各国控制都会+城市数排序，实时刷新  

AI
--  
各个阶段AI均会做出相应的行动，由/docs/source/ai下的文件决定   
AI目前比较简单，基本为判断当前形势给出一个合理固定值外加一个随机数   
```
/docs/source/ai/ally.js   //发起同盟请求，接受或拒绝同盟请求  
/docs/source/ai/breach.js   //是否背弃同盟   
/docs/source/ai/plan.js   //部署指令   
/docs/source/ai/disturb.js   //使用骚扰指令  
/docs/source/ai/attack.js   //使用行军指令，选择行军目标，选择兵力  
/docs/source/ai/hero.js   //选择出战英雄   
/docs/source/ai/retreat.js   //选择战败后撤退目的地   
/docs/source/ai/recruit.js   //募兵阶段决定     
```

存档读档
--
每个回合结束后会自动存档，下次可直接读取存档进行游戏  
  
视图
--
视图比较大，需要拖拽来移动。  
Web版可以直接用浏览器缩放功能调整  
PC版在Electron套壳文件/main.js中打开缩放功能，不过视图没有浏览器缩放自然  

资源
--
背景音乐  
```
Hero's Theme by Twin Musicom is licensed under a Creative Commons Attribution license (https://creativecommons.org/licenses/by/4.0/)  
Source: http://www.twinmusicom.org/song/280/heros-theme  
Artist: http://www.twinmusicom.org  
```
背景图片  
谷歌上搜的图重新描了一遍。。。找不到原出处   