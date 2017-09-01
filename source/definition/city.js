Vue.mixin({
    methods: {
        getCitiesInfo: function() {
            return [
                //晋阳之战，三家分晋
                {name: "晋阳", position: [380, 70], resource: [0, 1], type: 1}
            ];
        },
        getCityTypeName: function(type) {
            switch (type) {
                case 0:
                    return "都会";
                case 1:
                    return "城市";
            }
        }
    }
});


// *** 七国原型
// 北境 - 燕
// 铁群岛 - 韩
// 谷地 - 赵
// 西境 - 秦
// 风暴地 - 魏
// 河湾地 - 齐
// 多恩 - 楚
// 王领 - 周
// 河间地
