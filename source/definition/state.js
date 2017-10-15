Vue.mixin({
    methods: {
        getStatesInfo: function() {
            return [
                {code: 0, name: "", color: "transparent"},
                {code: 1, name: "齐", color: "darkorange"},
                {code: 2, name: "楚", color: "darkgreen"},
                {code: 3, name: "燕", color: "purple"},
                {code: 4, name: "赵", color: "darkred"},
                {code: 5, name: "韩", color: "goldenrod"},
                {code: 6, name: "魏", color: "darkblue"},
                {code: 7, name: "秦", color: "black"},
                {code: 8, name: "周", color: "RosyBrown"}
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
