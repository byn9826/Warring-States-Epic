Vue.mixin({
    methods: {
        getCitiesInfo: function() {
            return [
                {code: 0, name: "云中", position: [380, 60], resource: [1], type: 2},
                {code: 1, name: "雁门", position: [515, 120], resource: [1], type: 2},
                {code: 2, name: "代郡", position: [590, 120], resource: [0], type: 2},
                {code: 3, name: "太原", position: [440, 160], resource: [1], type: 1},
                {code: 4, name: "邯郸", position: [615, 210], resource: [0, 1], type: 0},
                {code: 5, name: "上谷", position: [695, 40], resource: [1], type: 2},
                {code: 6, name: "灵寿", position: [710, 105], resource: [1], type: 1},
                {code: 7, name: "蓟", position: [825, 55], resource: [0, 1], type: 0},
                {code: 8, name: "辽西", position: [915, 35], resource: [1], type: 2},
                {code: 9, name: "辽东", position: [1040, 35], resource: [0], type: 2},
                {code: 10, name: "陇西", position: [80, 285], resource: [], type: 1},
                {code: 11, name: "义渠", position: [280, 155], resource: [0], type: 2},
                {code: 12, name: "蜀", position: [100, 425], resource: [1, 1], type: 2},
                {code: 13, name: "巴", position: [100, 525], resource: [1], type: 2},
                {code: 14, name: "咸阳", position: [260, 310], resource: [0, 1], type: 0},
                {code: 15, name: "河东", position: [380, 230], resource: [1], type: 2},
                {code: 16, name: "上党", position: [485, 230], resource: [0], type: 1},
                {code: 17, name: "濮阳", position: [620, 285], resource: [0], type: 2},
                {code: 18, name: "长平", position: [530, 290], resource: [1], type: 2},
                {code: 19, name: "大梁", position: [650, 355], resource: [0,1], type: 0},
                {code: 20, name: "饶安", position: [720, 170], resource: [1], type: 2},
                {code: 21, name: "临淄", position: [790, 220], resource: [0,1], type: 0},
                {code: 22, name: "定陶", position: [705, 285], resource: [1], type: 2},
                {code: 23, name: "莒", position: [810, 300], resource: [0], type: 2},
                {code: 24, name: "即墨", position: [935, 220], resource: [0], type: 1},
                {code: 25, name: "渑池", position: [380, 295], resource: [0], type: 2},
                {code: 26, name: "商", position: [355, 385], resource: [1], type: 2},
                {code: 27, name: "安邑", position: [435, 365], resource: [1], type: 2},
                {code: 28, name: "郑", position: [485, 430], resource: [0, 1], type: 0},
                {code: 29, name: "陈", position: [585, 420], resource: [1], type: 1},
                {code: 30, name: "洛阳", position: [550, 350], resource: [0, 0], type: 0},
                {code: 31, name: "郢", position: [285, 515], resource: [0], type: 1},
                {code: 32, name: "南阳", position: [475, 555], resource: [1], type: 2},
                {code: 33, name: "寿春", position: [675, 535], resource: [0, 1], type: 0},
                {code: 34, name: "下邳", position: [825, 395], resource: [0], type: 2},
                {code: 35, name: "吴", position: [915, 515], resource: [1], type: 2},
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
                    //城市
                    return "城市";
            }
        }
    }
});
