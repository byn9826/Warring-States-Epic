Vue.mixin({
    methods: {
        getStageName: function(i) {
            switch(i) {
                case 0:
                    return "缔盟阶段";
                case 1:
                    return "毁约阶段";
                case 2:
                    return "运筹阶段";
                case 3:
                    return "劫掠阶段";
                case 4:
                    return "行军阶段";
            }
        },
        getStageDescName: function(i) {
            switch(i) {
                case 0:
                    return "议事";
                case 1:
                    return "密谋";
                case 2:
                    return "筹备";
            }
        }
    }
});