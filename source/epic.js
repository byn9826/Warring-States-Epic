var app = new Vue({
    el: '#app',
    data: {
        cities: data.cities,
        player: data.player,
        power: data.power,
        hero: data.hero,
        round: data.round,
        stage: data.stage,
        allies: data.allies,
        relations: data.relations,
        settings: data.settings,
        history: data.history,
        treasure: data.treasure,
        fame: data.fame,
        item: null
    },
    methods: {
        toNextStage: function() {
            this.stage += 1;  
        },
        addNewAlly: function(request, target) {
            this.allies.push([request, target]);
        },
        removeAlly: function(request, target) {
            var i = 0, index;
            for (i; i < this.allies.length; i++) {
                if (
                    (this.allies[i][0] === request && this.allies[i][1] === target) || 
                    (this.allies[i][0] === target && this.allies[i][1] === request)
                ) {
                    index = i;
                    break;
                }
            }
            this.allies.splice(i, 1);
        },
        increaseRelation: function(a, b, step) {
            var current = this.relations[a].indexOf(b);
            var increased = current - step;
            if (increased < 0) {
                increased = 0;
            }
            this.relations[a].splice(current, 1);
            this.relations[a].splice(increased, 0, b);
        },
        decreaseRelation: function(a, b, step) {
            var current = this.relations[a].indexOf(b);
            var decreased = current + step;
            if (decreased >= this.relations[a].length) {
                decreased = this.relations[a].length -1;
            }
            this.relations[a].splice(current, 1);
            this.relations[a].splice(decreased, 0, b);
        },
        addNewHistory: function(i) {
            this.history[this.round]?this.history[this.round].push(i):this.history[this.round] = [i];
        },
        saveItemOrder: function(i, l) {
            if (l === 0) {
                this.item = i;
            } else {
                this.updateOrderOfCities([i], [this.item]);
                this.item = null;
            }
        },
        updateOrderOfCities: function(city, orders) {
            city.forEach(function(c, i) {
                this.cities[c].order = orders[i];
            }.bind(this));
        }
    },
    created: function() {
        console.log("state info:");
        console.log(this.statesInfo);
    },
    computed: {
        statesInfo: function() {
            var states = [], i = 0;
            for (i; i < this.getStatesInfo().length; i++) {
                states[i] = {
                    capital: [],
                    city: [],
                    occupy: [],
                    army: [],
                    supply: 0,
                    ally: [],
                    code: i,
                    nearby: [],
                    order: []
                }
            }
            this.allies.forEach(function(ally) {
                states[ally[0]].ally.push(ally[1]);
                states[ally[1]].ally.push(ally[0]);
            }.bind(this));
            this.cities.forEach(function(city) {
                if (this.getCitiesInfo()[city.code].type === 0) {
                    states[city.occupy].capital.push(city.code);
                } else if (this.getCitiesInfo()[city.code].type === 1) {
                    states[city.occupy].city.push(city.code);
                }
                states[city.occupy].occupy.push(city.code);
                states[city.occupy].order.push(city.order);
                states[city.occupy].army = states[city.occupy].army.concat(city.army);
                states[city.occupy].nearby = [...new Set([...states[city.occupy].nearby ,...this.getCitiesInfo()[city.code].nearby])];
                states[city.occupy].nearby = states[city.occupy].nearby.filter(function(a) {
                    return this.cities[a].occupy !== city.occupy;
                }.bind(this));
                this.getCitiesInfo()[city.code].resource.forEach(function(r) {
                    if (r === 1) {
                        states[city.occupy].supply += 1;
                    }
                });
            }.bind(this));
            return states;
        },
        rank: function() {
            var occupied = [];
            this.statesInfo.forEach(function(state, index) {
                if (this.player[index] !== 0) {
                    occupied.push({
                        cities: state.capital.length + state.city.length,
                        code: state.code
                    });
                }
            }.bind(this));
            occupied.sort(function(a, b) {
                if (b.cities - a.cities > 0) {
                    return true;
                } else if ((b.cities - a.cities) === 0) {
                    if ((this.fame.indexOf(a.code) - this.fame.indexOf(b.code)) > 0) {
                        return true;
                    }
                    return false;
                } else {
                    return false;
                }
            }.bind(this));
            return occupied;
        }
    }
});