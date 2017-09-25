Vue.mixin({
    methods: {
        getHerosInfo: function() {
            return [
                [],
                [
                    {code: 0, name: "齐威王", state: 1, strength: 2, kill: 0, safe: 0, skill: "战斗胜利后,将一个军团升级为" + this.getArmyInfo()[1].name},
                    {code: 1, name: "孙膑", state: 1, strength: 3, kill: 2, safe: 3, skill: ""},
                    {code: 2, name: "田单", state: 1, strength: 3, kill: 0, safe: 4, skill: ""},
                    {code: 3, name: "田忌", state: 1, strength: 2, kill: 2, safe: 2, skill: ""},
                    {code: 4, name: "邹忌", state: 1, strength: 2, kill: 2, safe: 2, skill: ""},
                    {code: 5, name: "孟尝君", state: 1, strength: 1, kill: 0, safe: 0, skill: "防守失败后,己方军队不受伤亡"},
                ],
                [
                    {code: 6, name: "楚怀王", state: 2, strength: 2, kill: 0, safe: 0, skill: "战斗胜利后,将一个军团升级为" + this.getArmyInfo()[2].name},
                    {code: 7, name: "吴起", state: 2, strength: 4, kill: 3, safe: 1, skill: ""},
                    {code: 8, name: "项燕", state: 2, strength: 3, kill: 2, safe: 2, skill: ""},
                    {code: 9, name: "春申君", state: 2, strength: 2, kill: 0, safe: 0, skill: "当己方有援军时,敌方援军战力为0"},
                    {code: 10, name: "屈原", state: 2, strength: 1, kill: 0, safe: 0, skill: "战斗胜利后,国力增长两点"},
                    {code: 11, name: "申包胥", state: 2, strength: 1, kill: 0, safe: 0, skill: "当已方有援军时,将领战力+2"},
                ],
                [
                    {code: 12, name: "燕昭王", state: 3, strength: 2, kill: 0, safe: 0, skill: "战斗胜利后,将一个军团升级为" + this.getArmyInfo()[3].name},
                    {code: 13, name: "乐毅", state: 3, strength: 3, kill: 4, safe: 1, skill: ""},
                    {code: 14, name: "秦开", state: 3, strength: 3, kill: 2, safe: 1, skill: ""},
                    {code: 15, name: "剧辛", state: 3, strength: 2, kill: 1, safe: 1, skill: ""},
                    {code: 16, name: "郭隗", state: 3, strength: 1, kill: 0, safe: 0, skill: "战斗失败后,已方全部将领恢复为待命"},
                    {code: 17, name: "苏秦", state: 3, strength: 1, kill: 0, safe: 0, skill: "当已方无援军时,将领战力+2"},
                ],
                [
                    {code: 18, name: "赵武灵王", state: 4, strength: 2, kill: 0, safe: 0, skill: "战斗胜利后,将一个军团升级为" + this.getArmyInfo()[4].name},
                    {code: 19, name: "李牧", state: 4, strength: 4, kill: 2, safe: 2, skill: ""},
                    {code: 20, name: "廉颇", state: 4, strength: 3, kill: 1, safe: 4, skill: ""},
                    {code: 21, name: "赵奢", state: 4, strength: 3, kill: 2, safe: 2, skill: ""},
                    {code: 22, name: "蔺相如", state: 4, strength: 2, kill: 0, safe: 0, skill: "防守失败后,敌军无法占领交战区"},
                    {code: 23, name: "平原君", state: 4, strength: 1, kill: 0, safe: 0, skill: "防守时,已方驻防各军团战力乘以2"},
                ],
                [
                    {code: 24, name: "韩昭侯", state: 5, strength: 2, kill: 0, safe: 0, skill: "战斗胜利后,将一个军团升级为" + this.getArmyInfo()[5].name},
                    {code: 25, name: "冯亭", state: 5, strength: 2, kill: 1, safe: 2, skill: ""},
                    {code: 26, name: "暴鸢", state: 5, strength: 2, kill: 1, safe: 1, skill: ""},
                    {code: 27, name: "申不害", state: 5, strength: 2, kill: 0, safe: 0, skill: "防守时,立即征募一个" + this.getArmyInfo()[5].name + "军团"},
                    {code: 28, name: "韩非子", state: 5, strength: 2, kill: 0, safe: 0, skill: "战斗时,使用一点国力换取一点战力"},
                    {code: 29, name: "張平", state: 5, strength: 1, kill: 0, safe: 0, skill: "战斗失败后,国力增长两点"},
                ],
                [
                    {code: 30, name: "魏文侯", state: 6, strength: 2, kill: 0, safe: 0, skill: "胜利后,将一个军团升级为" + this.getArmyInfo()[6].name},
                    {code: 31, name: "庞涓", state: 6, strength: 3, kill: 3, safe: 1, skill: ""},
                    {code: 32, name: "公叔痤", state: 6, strength: 2, kill: 2, safe: 1, skill: ""},
                    {code: 33, name: "西门豹", state: 6, strength: 2, kill: 1, safe: 2, skill: ""},
                    {code: 34, name: "信陵君", state: 6, strength: 2, kill: 1, safe: 1, skill: ""},
                    {code: 35, name: "李悝", state: 6, strength: 2, kill: 0, safe: 0, skill: "防守时，已方驻防各军团+1战力"},
                ],
                [
                    {code: 36, name: "秦昭襄王", state: 7, strength: 2, kill: 0, safe: 0, skill: "战斗胜利后,将一个军团升级为" + this.getArmyInfo()[7].name},
                    {code: 37, name: "白起", state: 7, strength: 4, kill: 4, safe: 0, skill: ""},
                    {code: 38, name: "王翦", state: 7, strength: 3, kill: 3, safe: 2, skill: ""},
                    {code: 39, name: "蒙骜", state: 7, strength: 3, kill: 1, safe: 1, skill: ""},
                    {code: 40, name: "商鞅", state: 7, strength: 2, kill: 0, safe: 0, skill: "防守时,国力增长两点"},
                    {code: 41, name: "范雎", state: 7, strength: 1, kill: 0, safe: 0, skill: "进攻时,国力增长两点"},
                ],
                []
            ];
        },
        getHeroLeaderCode: function() {
            return [0, 6, 12, 18, 24, 30, 36];
        },
        getHeroKillNum: function(code) {
            if ([15, 20, 25, 26, 33, 34, 39].indexOf(code) !== -1) {
                return 1;
            } else if ([1, 3, 4, 8, 14, 19, 21, 32].indexOf(code) !== -1) {
                return 2;
            } else if ([7, 31, 38].indexOf(code) !== -1) {
                return 3;
            } else if ([13, 37].indexOf(code) !== -1) {
                return 4;
            } else {
                return 0;
            }
        },
        getHeroSafeNum: function(code) {
            if ([7, 13, 14, 15, 26, 31, 32, 34, 39].indexOf(code) !== -1) {
                return 1;
            } else if ([3, 4, 8, 19, 21, 25, 33, 38].indexOf(code) !== -1) {
                return 2;
            } else if ([1].indexOf(code) !== -1) {
                return 3;
            } else if ([2, 20].indexOf(code) !== -1) {
                return 4;
            } else {
                return 0;
            }
        }
    }
});