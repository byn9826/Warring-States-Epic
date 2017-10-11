Vue.mixin({
    methods: {
        AIdecideRecruitResult: function(state, powers, citiesInfo, citiesData) {
            var current = powers[state.code];
            var plan = Math.ceil(Math.random() * current);
            var spend = plan;
            var options = state.capital.concat(state.city);
            var nearbys = options.map(function(o) {return citiesInfo[o].nearby});
            var potentials = new Array(nearbys.length).fill([]);
            nearbys.forEach(function(n, i) {
                n.forEach(function(f) {
                    potentials[i] = potentials[i].concat(citiesData[f].army);
                }); 
            });
            potentials = potentials.map(function(p) {
                return p.map(function(a) {
                    return this.getArmyInfo()[a].level + 1;
                }.bind(this)).reduce(function(m, n) {return m + n;}, 0)
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
                        if (random > 0.1 && spend >= 1) {
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
                    this.getStatesSupply()[state.supply] > (state.army.length - citiesData[reminder].army.length + army.length)
                    && army.length !== 4 && spend !== 0
                ) {
                    if (this.getCitySpecialArmy(state.code, reminder)) {
                        random = Math.random();
                        if (random > 0.25 && spend >= 2) {
                            spend -= 2;
                            army.push(state.code);
                        } else if (random > 0.1 && spend >= 1) {
                            spend -= 1;
                            army.push(0);
                        }
                    } else {
                        random = Math.random();
                        if (random > 0.4 && spend >= 2) {
                            spend -= 2;
                            army.push(8);
                        } else if (random > 0.25 && spend >= 1) {
                            spend -= 1;
                            army.push(0);
                        }
                    }
                    random = Math.random();
                    if (random > 0.3) {
                        break;
                    }
                }
                for (var i = 0; i < army.length; i++) {
                    if (
                        app.$data.cities[reminder].army[i] === null || 
                        army[i] !== app.$data.cities[reminder].army[i]
                    ) {
                        app.$data.cities[reminder].army = army;
                        app.$data.cities[reminder].status = new Array(army.length).fill(1);
                        info.push(reminder);
                    }
                }
                potentials.splice(index, 1);
            }
            app.$data.power.splice(state.code, 1, current - plan + spend);
            return info;
        }
    }
});