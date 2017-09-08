Vue.mixin({
    methods: {
        getCitiesInfo: function() {
            return [
                {code: 0, name: "云中", position: [370, 50], resource: [1], type: 2, nearby: [1, 3, 11]},
                {code: 1, name: "雁门", position: [495, 90], resource: [1], type: 2, nearby: [0, 2, 3, 4]},
                {code: 2, name: "代郡", position: [590, 120], resource: [0], type: 2, nearby: [1, 4, 5, 6]},
                {code: 3, name: "太原", position: [440, 150], resource: [1], type: 1, nearby: [0, 1, 11, 4, 16, 15]},
                {code: 4, name: "邯郸", position: [615, 190], resource: [0, 1], type: 0, nearby: [1, 2, 3, 20, 22, 16, 17]},
                {code: 5, name: "上谷", position: [685, 30], resource: [1], type: 2, nearby: [2, 6, 7]},
                {code: 6, name: "灵寿", position: [710, 95], resource: [1], type: 1, nearby: [5, 7, 2, 20]},
                {code: 7, name: "蓟", position: [815, 45], resource: [0, 1], type: 0, nearby: [5, 6, 8]},
                {code: 8, name: "辽西", position: [905, 25], resource: [1], type: 2, nearby: [7, 9]},
                {code: 9, name: "辽东", position: [1030, 25], resource: [0], type: 2, nearby: [8]},
                {code: 10, name: "陇西", position: [70, 305], resource: [], type: 1, nearby: [11, 14, 12]},
                {code: 11, name: "义渠", position: [270, 145], resource: [0], type: 2, nearby: [0, 3, 15, 14, 10]},
                {code: 12, name: "蜀", position: [100, 415], resource: [1, 1], type: 2, nearby: [10, 13, 14]},
                {code: 13, name: "巴", position: [100, 515], resource: [1], type: 2, nearby: [12, 14, 31]},
                {code: 14, name: "咸阳", position: [250, 310], resource: [0, 1], type: 0, nearby: [11, 10, 12, 13, 15, 25, 26, 31]},
                {code: 15, name: "河东", position: [360, 210], resource: [1], type: 2, nearby: [11, 14, 3, 16, 25]},
                {code: 16, name: "上党", position: [475, 220], resource: [0], type: 1, nearby: [15, 25, 18, 17, 4, 3]},
                {code: 17, name: "濮阳", position: [620, 275], resource: [0], type: 2, nearby: [16, 18, 30, 19, 22, 4]},
                {code: 18, name: "长平", position: [530, 280], resource: [1], type: 2, nearby: [25, 16, 17, 30, 27]},
                {code: 19, name: "大梁", position: [650, 345], resource: [0,1], type: 0, nearby: [17, 30, 22, 34, 29]},
                {code: 20, name: "饶安", position: [720, 165], resource: [1], type: 2, nearby: [6, 4, 21, 22]},
                {code: 21, name: "临淄", position: [800, 210], resource: [0,1], type: 0, nearby: [20, 22, 23, 24]},
                {code: 22, name: "定陶", position: [705, 270], resource: [1], type: 2, nearby: [17, 4, 20, 21, 23, 34, 19]},
                {code: 23, name: "莒", position: [810, 300], resource: [0], type: 2, nearby: [21, 22, 24, 34]},
                {code: 24, name: "即墨", position: [935, 220], resource: [0], type: 1, nearby: [21, 23]},
                {code: 25, name: "渑池", position: [370, 290], resource: [0], type: 2, nearby: [15, 16, 18, 26, 27, 14]},
                {code: 26, name: "商", position: [345, 375], resource: [1], type: 2, nearby: [25, 27, 28, 14, 31]},
                {code: 27, name: "安邑", position: [440, 355], resource: [1], type: 2, nearby: [25, 18, 30, 28, 29, 26]},
                {code: 28, name: "郑", position: [470, 430], resource: [0, 1], type: 0, nearby: [26, 27, 29, 31, 32]},
                {code: 29, name: "陈", position: [585, 435], resource: [1], type: 1, nearby: [27, 28, 30, 19, 33, 34]},
                {code: 30, name: "洛阳", position: [550, 350], resource: [0, 0], type: 0, nearby: [27, 18, 17, 29, 19]},
                {code: 31, name: "郢", position: [285, 515], resource: [0], type: 1, nearby: [26, 13, 14, 28, 32]},
                {code: 32, name: "南阳", position: [475, 555], resource: [1], type: 2, nearby: [31, 28, 33]},
                {code: 33, name: "寿春", position: [675, 535], resource: [0, 1], type: 0, nearby: [32, 29, 34, 35]},
                {code: 34, name: "下邳", position: [815, 385], resource: [0], type: 2, nearby: [29, 19, 22, 23, 33, 35]},
                {code: 35, name: "吴", position: [915, 515], resource: [1], type: 2, nearby: [33, 34]},
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
