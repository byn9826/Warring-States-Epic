Vue.mixin({
    methods: {
        processBeforeBattle: function(aHero, dHero, aSupport, dSupport, dArmy, dcity) {
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
                if (aSupport === 0) {
                    result[0] += 2;
                }
            }
            //韩非子进攻
            else if (aHero.code === 28) {
                if (app.$data.power[aHero.state] !== 0) {
                    app.$data.power.splice(aHero.state, 1, app.$data.power[aHero.state] - 1);
                    result[0] += 1;
                }
            }
            //范雎进攻
            else if (aHero.code === 41) {
                app.$data.power.splice(aHero.state, 1, app.$data.power[aHero.state] + 2);
            }
            
            
            //春申君防守
            if (dHero.code === 9) {
                if (dSupport !== 0) {
                    result[0] -= aSupport;
                }
            } 
            //申包胥防守
            else if (dHero.code === 11) {
                if (dSupport !== 0) {
                    result[1] += 2;
                }
            }
            //苏秦防守
            else if (dHero.code === 17) {
                if (dSupport === 0) {
                    result[1] += 2;
                }
            }
            //平原君防守
            else if (dHero.code === 23) {
                result[1] += dArmy;
            }
            //申不害防守
            else if (dHero.code === 27) {
                if (
                    app.$data.cities[dcity].army.length < 4 && 
                    app.statesInfo[dHero.state].army.length < this.getStatesSupply()[app.statesInfo[dHero.state].supply]
                ) {
                    app.$data.cities[dcity].army.push(dHero.state);
                    app.$data.cities[dcity].status.push(1);
                }
            }
            //韩非子防守
            else if (dHero.code === 28) {
                if (app.$data.power[dHero.state] !== 0) {
                    app.$data.power.splice(dHero.state, 1, app.$data.power[dHero.state] - 1);
                    result[1] += 1;
                }
            } 
            //李悝防守
            else if (dHero.code === 35) {
                result[1] += app.$data.cities[dcity].army.length;
            }
            //商鞅防守
            else if (dHero.code === 40) {
                app.$data.power.splice(dHero.state, 1, app.$data.power[dHero.state] + 2);
            }
            return result;
        }
    }
});