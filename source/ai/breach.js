Vue.mixin({
    methods: {
        AIbreachAllyOrNot: function(targets) {
            if (targets.length === 0) {
                return "";
            }
            console.log(targets);
        }
    }
});