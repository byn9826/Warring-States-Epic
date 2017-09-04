var app = new Vue({
    el: '#app',
    data: {
        cities: data.cities,
        player: data.player,
        power: data.power,
        hero: data.hero,
        rank: data.rank
    },
    computed: {
        statesInfo: function() {
            var states = [], i = 0;
            for (i; i < this.getStatesInfo().length; i++) {
                states[i] = {
                    capital: [],
                    city: [],
                    army: [],
                    supply: 0
                }
            }
            this.cities.forEach(function(city) {
                if (this.getCitiesInfo()[city.code].type === 0) {
                    states[city.occupy].capital.push(city.code);
                } else if (this.getCitiesInfo()[city.code].type === 1) {
                    states[city.occupy].city.push(city.code);
                }
                states[city.occupy].army = states[city.occupy].army.concat(city.army);
                this.getCitiesInfo()[city.code].resource.forEach(function(r) {
                    if (r === 1) {
                        states[city.occupy].supply += 1;
                    }
                });
            }.bind(this));
            return states;
        }
    }
});