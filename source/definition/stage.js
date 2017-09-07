Vue.mixin({
    methods: {
        getStageName: function(i) {
            switch(i) {
                case 0:
                    return "缔盟阶段";
                case 1:
                    return "毁约阶段";
            }
        }
    }
});