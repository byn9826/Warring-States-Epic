Vue.mixin({
    methods: {
        processBeforeBattle: function(aHero, dHero, aSupport, dSupport) {
            var result = [0, 0];
            //春申君进攻
            if (aHero.code === 9) {
                if (aSupport !== 0) {
                    result[1] -= dSupport;
                }
            } 
            //申包胥进攻
            else if (aHero.code === 11) {
                if (aSupport !== 0) {
                    result[0] += 2;
                }
            }
            //苏秦进攻
            else if (aHero.code === 17) {
                result[0] -= aSupport;
                result[1] -= dSupport;
            }
            //韩非子进攻
            else if (aHero.code === 28) {
                if (app.$data.power[aHero.state] !== 0) {
                    app.$data.power.splice(aHero.state, 1, app.$data.power[aHero.state] - 1);
                    result[0] += 1;
                }
            }
            console.log(result);
            return result;
        }
    }
});