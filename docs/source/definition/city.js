Vue.mixin({
    methods: {
        getCitiesInfo: function() {
            var main = this._uid === 0 ? this : this.$parent;
            if (main.rewrite !== null && main.rewrite.getCitiesInfo) {
                return main.rewrite.getCitiesInfo;
            }
            return [
                {
                    code: 0, name: "云中", position: [300, 65], location: [430, 80],
                    resource: [1], type: 2, nearby: [1, 3, 11]
                },
                {
                    code: 1, name: "雁门", position: [525, 170], location: [525, 120],
                    resource: [1], type: 2, nearby: [0, 2, 3, 4]
                },
                {
                    code: 2, name: "代郡", position: [598, 150], location: [590, 110],
                    resource: [0], type: 2, nearby: [1, 4, 5, 6]
                },
                {
                    code: 3, name: "太原", position: [430, 195], location: [435, 160], 
                    resource: [1], type: 1, nearby: [0, 1, 11, 4, 16, 15]
                },
                {
                    code: 4, name: "邯郸", position: [610, 240], location: [610, 205],
                    resource: [0, 1], type: 0, nearby: [1, 2, 3, 20, 22, 16, 17]
                },
                {
                    code: 5, name: "上谷", position: [740, 75], location: [660, 55], 
                    resource: [1], type: 2, nearby: [2, 6, 7]
                },
                {
                    code: 6, name: "灵寿", position: [730, 135], location: [690, 100],
                    resource: [1], type: 1, nearby: [5, 7, 2, 20]
                },
                {
                    code: 7, name: "蓟", position: [825, 95], location: [825, 45], 
                    resource: [0, 1], type: 0, nearby: [5, 6, 8]
                },
                {
                    code: 8, name: "辽西", position: [915, 65], location: [905, 25],
                    resource: [1], type: 2, nearby: [7, 9]
                },
                {
                    code: 9, name: "辽东", position: [1035, 85], location: [1025, 35], 
                    resource: [0], type: 2, nearby: [8]
                },
                {
                    code: 10, name: "陇西", position: [75, 345], location: [75, 295],
                    resource: [], type: 1, nearby: [11, 14, 12]
                },
                {
                    code: 11, name: "义渠", position: [280, 195], location: [280, 145], 
                    resource: [0], type: 2, nearby: [0, 3, 15, 14, 10]
                },
                {
                    code: 12, name: "蜀", position: [100, 455], location: [100, 415], 
                    resource: [1, 1], type: 2, nearby: [10, 13, 14]
                },
                {
                    code: 13, name: "巴", position: [100, 555], location: [100, 515], 
                    resource: [1], type: 2, nearby: [12, 14, 31]
                },
                {
                    code: 14, name: "咸阳", position: [250, 360], location: [250, 310], 
                    resource: [0, 1], type: 0, nearby: [11, 10, 12, 13, 15, 25, 26, 31]
                },
                {
                    code: 15, name: "河东", position: [370, 250], location: [360, 215], 
                    resource: [1], type: 2, nearby: [11, 14, 3, 16, 25]
                },
                {
                    code: 16, name: "上党", position: [448, 275], location: [485, 235], 
                    resource: [0], type: 1, nearby: [15, 25, 18, 17, 4, 3]
                },
                {
                    code: 17, name: "濮阳", position: [625, 315], location: [615, 280], 
                    resource: [0], type: 2, nearby: [16, 18, 30, 19, 22, 4]
                },
                {
                    code: 18, name: "长平", position: [530, 325], location: [530, 290], 
                    resource: [1], type: 2, nearby: [25, 16, 17, 30, 27]
                },
                {
                    code: 19, name: "大梁", position: [644, 365], location: [644, 385], 
                    resource: [0,1], type: 0, nearby: [17, 30, 22, 34, 29]
                },
                {
                    code: 20, name: "饶安", position: [725, 200], location: [715, 160], 
                    resource: [1], type: 2, nearby: [6, 4, 21, 22]
                },
                {
                    code: 21, name: "临淄", position: [790, 255], location: [790, 220], 
                    resource: [0,1], type: 0, nearby: [20, 22, 23, 24]
                },
                {
                    code: 22, name: "定陶", position: [725, 340], location: [700, 300], 
                    resource: [1], type: 2, nearby: [17, 4, 20, 21, 23, 34, 19]
                },
                {
                    code: 23, name: "莒", position: [810, 340], location: [805, 300], 
                    resource: [0], type: 2, nearby: [21, 22, 24, 34]
                },
                {
                    code: 24, name: "即墨", position: [925, 240], location: [935, 205], 
                    resource: [0], type: 1, nearby: [21, 23]
                },
                {
                    code: 25, name: "渑池", position: [380, 325], location: [370, 285], 
                    resource: [0], type: 2, nearby: [15, 16, 18, 26, 27, 14]
                },
                {
                    code: 26, name: "商", position: [385, 435], location: [360, 400], 
                    resource: [1], type: 2, nearby: [25, 27, 28, 14, 31]
                },
                {
                    code: 27, name: "安邑", position: [445, 405], location: [435, 365], 
                    resource: [1], type: 2, nearby: [25, 18, 30, 28, 29, 26]
                },
                {
                    code: 28, name: "郑", position: [475, 465], location: [495, 430], 
                    resource: [0, 1], type: 0, nearby: [26, 27, 29, 31, 32]
                },
                {
                    code: 29, name: "陈", position: [600, 455], location: [575, 420], 
                    resource: [1], type: 1, nearby: [27, 28, 30, 19, 33, 34]
                },
                {
                    code: 30, name: "洛阳", position: [535, 385], location: [535, 350], 
                    resource: [0, 0], type: 0, nearby: [27, 18, 17, 29, 19]
                },
                {
                    code: 31, name: "郢", position: [285, 575], location: [285, 535], 
                    resource: [0], type: 1, nearby: [26, 13, 14, 28, 32]
                },
                {
                    code: 32, name: "南阳", position: [475, 595], location: [475, 555], 
                    resource: [1], type: 2, nearby: [31, 28, 33]
                },
                {
                    code: 33, name: "寿春", position: [655, 585], location: [655, 545], 
                    resource: [0, 1], type: 0, nearby: [32, 29, 34, 35]
                },
                {
                    code: 34, name: "下邳", position: [775, 445], location: [775, 405], 
                    resource: [0], type: 2, nearby: [29, 19, 22, 23, 33, 35]
                },
                {
                    code: 35, name: "吴", position: [915, 555], location: [905, 515], 
                    resource: [1], type: 2, nearby: [33, 34]
                },
            ];
        },
        getCityResourceIcon: function(code) {
            switch (code) {
                case 0:
                    //权力
                    return "&#128081;";
                case 1:
                    //粮草
                    return "&#127838;";
            }
        },
        getCityResourceDesc: function(code) {
            switch (code) {
                case 0:
                    //权力
                    return "国力资源,可用于提升国力";
                case 1:
                    //粮草
                    return "粮草资源,可提升兵力上限";
            }
        },
        getCityTypeName: function(type) {
            switch (type) {
                case 0:
                    //都会
                    return "&#127983;";
                case 1:
                    //城市
                    return "&#127960;";
            }
        },
        getCityTypeDesc: function(type) {
            switch (type) {
                case 0:
                    //都会
                    return "都会: 防守方战力+2";
                case 1:
                    //城市
                    return "城市: 防守方战力+1";
            }
        },
    }
});
