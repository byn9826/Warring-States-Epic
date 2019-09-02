import STATE from '../types/state';

const states: STATE[] = [
  {
    code: 0,
    name: '周',
    color: 'grey',
    motto: '',
    armySpecial: null,
  },
  {
    code: 1,
    name: '齐',
    color: 'darkorange',
    motto: '进如锋矢，战如雷霆，解如风雨',
    armySpecial: 1,
  },
  {
    code: 2,
    name: '楚',
    color: 'darkgreen',
    motto: '驾龙辀兮乘雷，载云旗兮委蛇',
    armySpecial: 2,
  },
  {
    code: 3,
    name: '燕',
    color: 'purple',
    motto: '风萧萧兮易水寒，壮士一去兮不复还',
    armySpecial: 3,
  },
  {
    code: 4,
    name: '赵',
    color: 'darkred',
    motto: '望断云中无鹄起，飞来天外有鹰扬',
    armySpecial: 4,
  },
  {
    code: 5,
    name: '韩',
    color: 'teal',
    motto: '陆断牛马，水截鹄雁',
    armySpecial: 5,
  },
  {
    code: 6,
    name: '魏',
    color: 'darkblue',
    motto: '衣三属之甲，操十二石之弩',
    armySpecial: 6,
  },
  {
    code: 7,
    name: '秦',
    color: 'black',
    motto: '执敲扑而鞭笞天下，威振四海',
    armySpecial: 7,
  },
].map((rawState) => {
  const officerCode = 0;
  return {
    ...rawState,
    officerCode,
  };
});

export default states;
