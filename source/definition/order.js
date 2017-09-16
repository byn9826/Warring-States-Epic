Vue.mixin({
    methods: {
        getOrdersInfo: function() {
            return [
                {code: 0, name: "战备1", type: 0},
                {code: 1, name: "战备1", type: 0},
                {code: 2, name: "战备0", type: 0},
                {code: 3, name: "战备0", type: 0},
                {code: 4, name: "战备0", type: 0},
                {code: 5, name: "战备0", type: 0},
                
                {code: 6, name: "支援1", type: 1},
                {code: 7, name: "支援0", type: 1},
                {code: 8, name: "支援0", type: 1},
                
                {code: 9, name: "劫掠0", type: 2},
                {code: 10, name: "劫掠0", type: 2},
                {code: 11, name: "劫掠0", type: 2},
                
                {code: 12, name: "休整0", type: 3},
                {code: 13, name: "休整0", type: 3},
                {code: 14, name: "休整0", type: 3},
                {code: 15, name: "休整0", type: 3},
                {code: 16, name: "休整0", type: 3},
                {code: 17, name: "休整0", type: 3},
            ];
        },
        getDisturbleType: function() {
            return [1, 2, 3];
        }
    }
});