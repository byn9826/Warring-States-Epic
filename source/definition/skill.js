Vue.mixin({
    methods: {
        getSkillsInfo: function() {
            return [
                {code: 0, skill: ""},
                {code: 1, skill: "战斗胜利后,将一个本地参战军团升级为精兵"},
                {code: 2, skill: "防守失败后,己方军队不受伤亡"},
                {code: 3, skill: "当己方有援军时,敌方援军战力为0"},
                {code: 4, skill: "战斗胜利后,国力增长两点"},
                {code: 5, skill: "当已方有援军时,将领战力+2"},
                {code: 6, skill: "战斗失败后,已方全部将领恢复为待命"},
                {code: 7, skill: "当已方无援军时,将领战力+2"},
                {code: 8, skill: "防守失败后无需撤退,敌军无法占领交战区"},
                {code: 9, skill: "防守时,已方驻地参战各军团战力乘以2"},
                {code: 10, skill: "防守时,立即征募一个" + this.getArmyInfo()[5].name + "军团"},
                {code: 11, skill: "战斗时,使用一点国力换取一点战力"},
                {code: 12, skill: "战斗失败后,国力增长两点"},
                {code: 13, skill: "防守时，已方驻地参战各军团+1战力"},
                {code: 14, skill: "防守时,国力增长两点"},
                {code: 15, skill: "进攻时,国力增长两点"}
            ];
        }
    }
});