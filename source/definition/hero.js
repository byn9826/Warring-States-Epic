Vue.mixin({
    methods: {
        getHerosInfo: function() {
            return [
                {code: 0, name: "齐威王", state: 1},
                {code: 1, name: "孙膑", state: 1},
                {code: 2, name: "田忌", state: 1},
                {code: 3, name: "田单", state: 1},
                {code: 4, name: "邹忌", state: 1},
                {code: 5, name: "孟尝君", state: 1},
                
                {code: 6, name: "楚怀王", state: 2},
                {code: 7, name: "吴起", state: 2},
                {code: 8, name: "春申君", state: 2},
                {code: 9, name: "项燕", state: 2},
                {code: 10, name: "申包胥", state: 2},
                {code: 11, name: "屈原", state: 2},
                
                {code: 12, name: "燕昭王", state: 3},
                {code: 13, name: "乐毅", state: 3},
                {code: 14, name: "秦开", state: 3},
                {code: 15, name: "郭隗", state: 3},
                {code: 16, name: "剧辛", state: 3},
                {code: 17, name: "苏秦", state: 3},
                
                {code: 18, name: "赵武灵王", state: 4},
                {code: 19, name: "李牧", state: 4},
                {code: 20, name: "廉颇", state: 4},
                {code: 21, name: "蔺相如", state: 4},
                {code: 22, name: "赵奢", state: 4},
                {code: 23, name: "平原君", state: 4},
                
                {code: 24, name: "韩昭侯", state: 5},
                {code: 25, name: "申不害", state: 5},
                {code: 26, name: "韩非子", state: 5},
                {code: 27, name: "張平", state: 5},
                {code: 28, name: "冯亭", state: 5},
                {code: 29, name: "暴鸢", state: 5},
                
                {code: 30, name: "魏文侯", state: 6},
                {code: 31, name: "李悝", state: 6},
                {code: 32, name: "庞涓", state: 6},
                {code: 33, name: "信陵君", state: 6},
                {code: 34, name: "公叔痤", state: 6},
                {code: 35, name: "西门豹", state: 6},
                
                {code: 36, name: "秦昭襄王", state: 7},
                {code: 37, name: "白起", state: 7},
                {code: 38, name: "商鞅", state: 7},
                {code: 39, name: "王翦", state: 7},
                {code: 40, name: "范雎", state: 7},
                {code: 41, name: "蒙骜", state: 7},
                
            ];
        },
        getStateKingName: function(code) {
            var i = 0;
            for (i; i < this.getHerosInfo().length; i++) {
                if (this.getHerosInfo()[i].state === code) {
                    return this.getHerosInfo()[i].name;
                }
            }
        }
    }
});