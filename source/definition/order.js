Vue.mixin({
    methods: {
        getOrderInfo: function() {
            return [
                {code: 0, name: "步兵"},
                {code: 1, name: "技击"},
                {code: 2, name: "舟师"},
                {code: 3, name: "死士"},
                {code: 4, name: "劲骑"},
                {code: 5, name: "材士"},
                {code: 6, name: "武卒"},
                {code: 7, name: "锐士"},
                {code: 8, name: "骑兵"},
                {code: 9, name: "楼车"},
            ];
        },
    }
});