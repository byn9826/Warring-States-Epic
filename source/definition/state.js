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
                4, 5, 6, 8, 10, 12, 14, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16
            ];
        },
    }
});
