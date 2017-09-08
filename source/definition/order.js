Vue.mixin({
    methods: {
        getOrdersInfo: function() {
            return [
                {code: 0, name: "行军+1", type: 0},
                {code: 1, name: "行军+0", type: 0},
                {code: 2, name: "行军+0", type: 0},
                
                {code: 3, name: "劫掠+1", type: 1},
                {code: 4, name: "劫掠+0", type: 1},
                {code: 5, name: "劫掠+0", type: 1},
                
                {code: 6, name: "支援+1", type: 2},
                {code: 7, name: "支援+0", type: 2},
                {code: 8, name: "支援+0", type: 2},
                
                {code: 9, name: "防御+2", type: 3},
                {code: 10, name: "防御+1", type: 3},
                {code: 11, name: "防御+1", type: 3},
                
                {code: 12, name: "休整+1", type: 4},
                {code: 13, name: "休整+0", type: 4},
                {code: 14, name: "休整+0", type: 4},
            ];
        },
    }
});