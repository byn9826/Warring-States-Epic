Vue.mixin({
    methods: {
        getHerosInfo: function() {
            return [
                [],
                [
                    {code: 0, name: "齐威王", state: 1, strength: 2, kill: 0, safe: 0, skill: "战斗胜利后,可将一个军团升级为" + this.getArmyInfo()[1].name},
                    {code: 1, name: "孙膑", state: 1, strength: 3, kill: 2, safe: 3},
                    {code: 2, name: "田单", state: 1, strength: 3, kill: 0, safe: 4},
                    {code: 3, name: "田忌", state: 1, strength: 2, kill: 2, safe: 2},
                    {code: 4, name: "邹忌", state: 1, strength: 2, kill: 2, safe: 2},
                    {code: 5, name: "孟尝君", state: 1, strength: 1, kill: 0, safe: 0, skill: "防守失败后,可将部队撤退至已方任意一个控制区域"},
                ],
                [
                    {code: 6, name: "楚怀王", state: 2, strength: 2, kill: 0, safe: 0, skill: "战斗胜利后可将一个军团升级为" + this.getArmyInfo()[2].name},
                    {code: 7, name: "吴起", state: 2, strength: 4, kill: 3, safe: 1},
                    {code: 8, name: "项燕", state: 2, strength: 3, kill: 2, safe: 2},
                    {code: 9, name: "春申君", state: 2, strength: 2, kill: 0, safe: 0, skill: "当己方有援军时,敌方援军无法支援"},
                    {code: 10, name: "屈原", state: 2, strength: 1, kill: 0, safe: 0, skill: "战斗失败后,国力增长两点"},
                    {code: 11, name: "申包胥", state: 2, strength: 1, kill: 0, safe: 0, skill: "当已方有援军时,将领战力+2"},
                ],
                [
                    {code: 12, name: "燕昭王", state: 3, strength: 2, kill: 0, safe: 0, skill: "战斗胜利后可将一个军团升级为" + this.getArmyInfo()[3].name},
                    {code: 13, name: "乐毅", state: 3, strength: 3, kill: 4, safe: 1},
                    {code: 14, name: "秦开", state: 3, strength: 3, kill: 2, safe: 1},
                    {code: 15, name: "剧辛", state: 3, strength: 2, kill: 1, safe: 1},
                    {code: 16, name: "郭隗", state: 3, strength: 1, kill: 0, safe: 0, skill: "战斗失败后,已方全部将领恢复为待命"},
                    {code: 17, name: "苏秦", state: 3, strength: 1, kill: 0, safe: 0, skill: "战斗双方均无援军"},
                ],
                [
                    {code: 18, name: "赵武灵王", state: 4, strength: 2, kill: 0, safe: 0, skill: "战斗胜利后可将一个军团升级为" + this.getArmyInfo()[4].name},
                    {code: 19, name: "李牧", state: 4, strength: 4, kill: 2, safe: 2},
                    {code: 20, name: "廉颇", state: 4, strength: 3, kill: 1, safe: 4},
                    {code: 21, name: "赵奢", state: 4, strength: 3, kill: 2, safe: 2},
                    {code: 22, name: "蔺相如", state: 4, strength: 2, kill: 0, safe: 0, skill: "防守失败后,已方无需撤退且没有伤亡"},
                    {code: 23, name: "平原君", state: 4, strength: 1, kill: 0, safe: 0, skill: "防守时,已方守备军团战力乘以2"},
                ],
                [
                    {code: 24, name: "韩昭侯", state: 5, strength: 2, kill: 0, safe: 0, skill: "战斗胜利后可将一个军团升级为" + this.getArmyInfo()[5].name},
                    {code: 25, name: "冯亭", state: 5, strength: 2, kill: 1, safe: 2},
                    {code: 26, name: "暴鸢", state: 5, strength: 2, kill: 1, safe: 1},
                    {code: 27, name: "申不害", state: 5, strength: 2, kill: 0, safe: 0, skill: "防守时,立即征募一个" + this.getArmyInfo()[5].name + "军团"},
                    {code: 28, name: "韩非子", state: 5, strength: 2, kill: 0, safe: 0, skill: "防守时,"},
                    {code: 29, name: "張平", state: 5, strength: 1, kill: 0, safe: 0},
                ],
                [
                    {code: 30, name: "魏文侯", state: 6, strength: 2, kill: 0, safe: 0, skill: "胜利后可将一个军团升级为" + this.getArmyInfo()[6].name},
                    {code: 31, name: "庞涓", state: 6, strength: 3, kill: 3, safe: 1},
                    {code: 32, name: "公叔痤", state: 6, strength: 2, kill: 2, safe: 1},
                    {code: 33, name: "西门豹", state: 6, strength: 2, kill: 1, safe: 2},
                    {code: 34, name: "信陵君", state: 6, strength: 2, kill: 1, safe: 1},
                    {code: 35, name: "李悝", state: 6, strength: 2, kill: 0, safe: 0},
                ],
                [
                    {code: 36, name: "秦昭襄王", state: 7, strength: 2, kill: 0, safe: 0, skill: "战斗胜利后可将一个军团升级为" + this.getArmyInfo()[7].name},
                    {code: 37, name: "白起", state: 7, strength: 4, kill: 4, safe: 0},
                    {code: 38, name: "王翦", state: 7, strength: 3, kill: 3, safe: 2},
                    {code: 39, name: "蒙骜", state: 7, strength: 3, kill: 1, safe: 1},
                    {code: 40, name: "商鞅", state: 7, strength: 2, kill: 0, safe: 0},
                    {code: 41, name: "范雎", state: 7, strength: 1, kill: 0, safe: 0},
                ],
                []
            ];
        }
    }
});