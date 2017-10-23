Vue.mixin({
    methods: {
        getStatesInfo: function() {
            return [
                {code: 0, name: "", color: "transparent", motto: ""},
                {code: 1, name: "齐", color: "darkorange", motto: "进如锋矢,战如雷霆,解如风雨"},
                {code: 2, name: "楚", color: "darkgreen", motto: "驾龙辀兮乘雷,载云旗兮委蛇"},
                {code: 3, name: "燕", color: "purple", motto: "风萧萧兮易水寒,壮士一去兮不复还"},
                {code: 4, name: "赵", color: "darkred", motto: "望断云中无鹄起,飞来天外有鹰扬"},
                {code: 5, name: "韩", color: "goldenrod", motto: "陆断牛马,水截鹄雁"},
                {code: 6, name: "魏", color: "darkblue", motto: "衣三属之甲,操十二石之弩"},
                {code: 7, name: "秦", color: "black", motto: "执敲扑而鞭笞天下,威振四海"},
                {code: 8, name: "周", color: "RosyBrown", motto: ""}
            ];
        },
        getStatesAllies: function(state) {
            if (state.ally.length === 0) {
                return null;
            }
            var allies = "盟友: ";
            state.ally.forEach(function(a) {
                allies += " " + this.getStatesInfo()[a].name;
            }.bind(this));
            return allies;
        },
        getStatesSupply: function() {
            return [
                4, 6, 10, 12, 16, 18, 22, 24,
                24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24
            ];
        },
        getStatesBaseLevel: function() {
            return [
                [],
                [
                    [7, 5, 2, 1, 3, 16, 18, 30, 29, 33, 35],
                    [22, 6, 4, 17, 19, 34],
                    [20, 23, 24],
                    [21]
                ],
                [
                    [13, 14, 26, 27, 30, 17, 4, 20, 21, 25],
                    [28, 29, 31, 19, 22, 23],
                    [32, 34, 35],
                    [33]
                ],
                [
                    [0, 3, 16, 17, 22, 23, 24],
                    [2, 4, 6, 20, 1, 21],
                    [5, 8, 9],
                    [7]
                ],
                [
                    [10, 14, 25, 18, 19, 30, 34, 21, 23],
                    [0, 11, 15, 16, 17, 20, 22, 6, 5],
                    [1, 2, 3],
                    [4]
                ],
                [
                    [10, 11, 12, 13, 15, 16, 17, 18, 22, 23, 35],
                    [31, 32, 33, 34, 19, 27, 30, 14, 25],
                    [26, 29],
                    [28]
                ],
                [
                    [31, 33, 32, 35, 20, 21, 23, 15, 16, 4, 14],
                    [26, 28, 29, 17, 22, 34, 18, 25],
                    [27, 30],
                    [19]
                ],
                [
                    [1, 4, 16, 18, 27, 28, 32],
                    [13, 31, 26, 25, 15, 3, 0],
                    [10, 11, 12],
                    [14]
                ],
                []
            ];
        }
    }
});
