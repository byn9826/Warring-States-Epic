Vue.mixin({
    methods: {
        getHerosInfo: function() {
            return [
                [],
                [
                    {code: 0, name: "孙膑", state: 1, strength: 3, kill: 2, safe: 3, skill: 0},
                    {code: 1, name: "田单", state: 1, strength: 3, kill: 0, safe: 4, skill: 0},
                    {code: 2, name: "齐威王", state: 1, strength: 2, kill: 0, safe: 0, skill: 1},
                    {code: 3, name: "田忌", state: 1, strength: 2, kill: 2, safe: 2, skill: 0},
                    {code: 4, name: "邹忌", state: 1, strength: 2, kill: 2, safe: 2, skill: 0},
                    {code: 5, name: "孟尝君", state: 1, strength: 1, kill: 0, safe: 0, skill: 2},
                ],
                [
                    {code: 6, name: "吴起", state: 2, strength: 4, kill: 3, safe: 1, skill: 0},
                    {code: 7, name: "项燕", state: 2, strength: 3, kill: 2, safe: 2, skill: 0},
                    {code: 8, name: "楚怀王", state: 2, strength: 2, kill: 0, safe: 0, skill: 1},
                    {code: 9, name: "春申君", state: 2, strength: 2, kill: 0, safe: 0, skill: 3},
                    {code: 10, name: "屈原", state: 2, strength: 1, kill: 0, safe: 0, skill: 4},
                    {code: 11, name: "申包胥", state: 2, strength: 1, kill: 0, safe: 0, skill: 5},
                ],
                [
                    {code: 12, name: "乐毅", state: 3, strength: 3, kill: 4, safe: 1, skill: 0},
                    {code: 13, name: "秦开", state: 3, strength: 3, kill: 2, safe: 1, skill: 0},
                    {code: 14, name: "燕昭王", state: 3, strength: 2, kill: 0, safe: 0, skill: 1},
                    {code: 15, name: "剧辛", state: 3, strength: 2, kill: 1, safe: 1, skill: 0},
                    {code: 16, name: "郭隗", state: 3, strength: 1, kill: 0, safe: 0, skill: 6},
                    {code: 17, name: "苏秦", state: 3, strength: 1, kill: 0, safe: 0, skill: 7},
                ],
                [
                    {code: 18, name: "李牧", state: 4, strength: 4, kill: 2, safe: 2, skill: 0},
                    {code: 19, name: "廉颇", state: 4, strength: 3, kill: 1, safe: 4, skill: 0},
                    {code: 20, name: "赵奢", state: 4, strength: 3, kill: 2, safe: 2, skill: 0},
                    {code: 21, name: "赵武灵王", state: 4, strength: 2, kill: 0, safe: 0, skill: 1},
                    {code: 22, name: "蔺相如", state: 4, strength: 2, kill: 0, safe: 0, skill: 8},
                    {code: 23, name: "平原君", state: 4, strength: 1, kill: 0, safe: 0, skill: 9},
                ],
                [
                    {code: 24, name: "韩昭侯", state: 5, strength: 2, kill: 0, safe: 0, skill: 1},
                    {code: 25, name: "冯亭", state: 5, strength: 2, kill: 1, safe: 2, skill: 0},
                    {code: 26, name: "暴鸢", state: 5, strength: 2, kill: 1, safe: 1, skill: 0},
                    {code: 27, name: "申不害", state: 5, strength: 2, kill: 0, safe: 0, skill: 10},
                    {code: 28, name: "韩非子", state: 5, strength: 2, kill: 0, safe: 0, skill: 11},
                    {code: 29, name: "張平", state: 5, strength: 1, kill: 0, safe: 0, skill: 12},
                ],
                [
                    {code: 30, name: "庞涓", state: 6, strength: 3, kill: 3, safe: 1, skill: 0},
                    {code: 31, name: "魏文侯", state: 6, strength: 2, kill: 0, safe: 0, skill: 1},
                    {code: 32, name: "公叔痤", state: 6, strength: 2, kill: 2, safe: 1, skill: 0},
                    {code: 33, name: "西门豹", state: 6, strength: 2, kill: 1, safe: 2, skill: 0},
                    {code: 34, name: "信陵君", state: 6, strength: 2, kill: 1, safe: 1, skill: 0},
                    {code: 35, name: "李悝", state: 6, strength: 2, kill: 0, safe: 0, skill: 13},
                ],
                [
                    {code: 36, name: "白起", state: 7, strength: 4, kill: 4, safe: 0, skill: 0},
                    {code: 37, name: "王翦", state: 7, strength: 3, kill: 3, safe: 2, skill: 0},
                    {code: 38, name: "蒙骜", state: 7, strength: 3, kill: 1, safe: 1, skill: 0},
                    {code: 39, name: "秦昭襄王", state: 7, strength: 2, kill: 0, safe: 0, skill: 1},
                    {code: 40, name: "商鞅", state: 7, strength: 2, kill: 0, safe: 0, skill: 14},
                    {code: 41, name: "范雎", state: 7, strength: 1, kill: 0, safe: 0, skill: 15},
                ],
                []
            ];
        },
        getHeroLeaderIndex: function() {
            return [null, 2, 2, 2, 3, 0, 1, 3, null];
        },
        getHeroKillNum: function(code) {
            if ([15, 19, 25, 26, 33, 34, 38].indexOf(code) !== -1) {
                return 1;
            } else if ([0, 3, 4, 7, 13, 18, 20, 32].indexOf(code) !== -1) {
                return 2;
            } else if ([6, 30, 37].indexOf(code) !== -1) {
                return 3;
            } else if ([12, 36].indexOf(code) !== -1) {
                return 4;
            } else {
                return 0;
            }
        },
        getHeroSafeNum: function(code) {
            if ([6, 12, 13, 15, 26, 30, 32, 34, 38].indexOf(code) !== -1) {
                return 1;
            } else if ([3, 4, 7, 18, 20, 25, 33, 37].indexOf(code) !== -1) {
                return 2;
            } else if ([0].indexOf(code) !== -1) {
                return 3;
            } else if ([1, 19].indexOf(code) !== -1) {
                return 4;
            } else {
                return 0;
            }
        }
    }
});