Vue.mixin({
    methods: {
        getArmyInfo: function() {
            return [
                {code: 0, name: "步兵", attack: 1, defend: 1, cost: 1},
                
                {code: 1, name: "技击", attack: 2.5, defend: 3, cost: 2},
                {code: 2, name: "舟师", attack: 2.25, defend: 3.25, cost: 2},
                {code: 3, name: "死士", attack: 3.25, defend: 2.25, cost: 2},
                {code: 4, name: "劲骑", attack: 3, defend: 2.5, cost: 2},
                {code: 5, name: "材士", attack: 2, defend: 3.5, cost: 2},
                {code: 6, name: "武卒", attack: 2.75, defend: 2.75, cost: 2},
                {code: 7, name: "锐士", attack: 3.5, defend: 2, cost: 2},
                
                {code: 8, name: "骑兵", attack: 2, defend: 2, cost: 2},
                {code: 9, name: "战车", attack: 3, defend: 1, cost: 2},
            ];
        },
        getArmyIcon: function(t) {
            switch (t) {
                case 0:
                    return "&#9823;";
                case 8:
                    return "&#9822;";
                case 9:
                    return "&#9821;";
                default:
                    return "&#9819;";
            }
        }
    }
});