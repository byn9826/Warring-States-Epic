Vue.mixin({
    methods: {
        getOrdersInfo: function() {
            return [
                {code: 0, name: "战备", type: 0, bonus: 1},
                {code: 1, name: "战备", type: 0, bonus: 1},
                {code: 2, name: "战备", type: 0, bonus: 1},
                
                {code: 3, name: "支援", type: 1, bonus: 0},
                {code: 4, name: "支援", type: 1, bonus: 0},
                {code: 5, name: "支援", type: 1, bonus: 0},
                
                {code: 6, name: "劫掠", type: 2, bonus: 0},
                {code: 7, name: "劫掠", type: 2, bonus: 0},
                {code: 8, name: "劫掠", type: 2, bonus: 0},
                
                {code: 9, name: "休整", type: 3, bonus: 0},
                {code: 10, name: "休整", type: 3, bonus: 0},
                {code: 11, name: "休整", type: 3, bonus: 0}
            ];
        },
        getDisturbleType: function() {
            return [1, 2, 3];
        },
        getOrderDesc: function(type) {
            switch (type) {
                case 0:
                    return "可用于行军,如遇战斗+1战力";
                case 1:
                    return "附近城市发生战斗时,对己方及同盟国家提供支援";
                case 2:
                    return "可消除附近非已方非同盟国家的支援、劫掠或休整指令,并增长国力";
                case 3:
                    return "回合结束时,获得区域国力资源数+1点国力";
            }
        }
    }
});