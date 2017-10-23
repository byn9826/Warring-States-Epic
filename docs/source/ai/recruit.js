Vue.mixin({
    methods: {
        AIdecideRecruitResult: function(state, powers, citiesInfo, citiesData) {
            var current = powers[state.code];
            var plan = Math.ceil(Math.random() * current);
            if (current > app.$data.wild) {
                if (plan < current - app.$data.wild - 5) {
                    plan = current - app.$data.wild - 5;
                }
            }
            var spend = plan;
            var options = state.capital.concat(state.city);
            var nearbys = options.map(function(o) {return citiesInfo[o].nearby});
            var potentials = new Array(nearbys.length).fill(0);
            nearbys.forEach(function(n, i) {
                n.forEach(function(f) {
                    if (citiesData[f].occupy !== state.code) {
                        potentials[i] += citiesData[f].army.length;
                    }
                }); 
            });
            options.forEach(function(o, i) {
                if (this.getCitySpecialArmy(state.code, o)) {
                    potentials[i] *= 2;
                }
            }.bind(this));
            var max, index, random;
            var info = [];
            while(potentials.length !== 0 && spend !== 0) {
                max = Math.max(...potentials);
                index = potentials.indexOf(max);
                reminder = options[index];
                army = citiesData[reminder].army.slice();
                army = army.map(function(a, i) {
                    if (a === 8 && this.getCitySpecialArmy(state.code, reminder)) {
                        return state.code;
                    } else if (a === 0 && this.getCitySpecialArmy(state.code, reminder)) {
                        random = Math.random();
                        if (random > 0.25 && spend >= 1) {
                            spend -= 1;
                            return state.code;
                        } else {
                            return 0;
                        }
                    } else if (a === 0 && !this.getCitySpecialArmy(state.code, reminder)) {
                        random = Math.random();
                        if (random > 0.3 && spend >= 1) {
                            spend -= 1;
                            return 8;
                        } else {
                            return 0;
                        }
                    } else {
                        return a;
                    }
                }.bind(this));
                while (
                    this.getStatesSupply()[state.supply] > (app.statesInfo[state.code].army.length - citiesData[reminder].army.length + army.length)
                    && army.length !== 4 && spend !== 0
                ) {
                    random = Math.random();
                    if (this.getCitySpecialArmy(state.code, reminder)) {
                        if (random > 0.35 && spend >= 2) {
                            spend -= 2;
                            army.push(state.code);
                        } else if (random > 0.15 && spend >= 1) {
                            spend -= 1;
                            army.push(0);
                        }
                    } else {
                        if (random > 0.4 && spend >= 2) {
                            spend -= 2;
                            army.push(8);
                        } else if (random > 0.2 && spend >= 1) {
                            spend -= 1;
                            army.push(0);
                        }
                    }
                    random = Math.random();
                    if (random > 0.4) {
                        break;
                    }
                }
                for (var i = 0; i < army.length; i++) {
                    if (
                        app.$data.cities[reminder].army[i] === null || 
                        app.$data.cities[reminder].army[i] === undefined ||
                        app.$data.cities[reminder].army[i] !== army[i]
                    ) {
                        app.$data.cities[reminder].army = army;
                        app.$data.cities[reminder].status = new Array(army.length).fill(1);
                        info.push(reminder);
                        break;
                    }
                }
                potentials.splice(index, 1);
            }
            app.$data.power.splice(state.code, 1, current - plan + spend);
            return info;
        }
    }
});