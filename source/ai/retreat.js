Vue.mixin({
    methods: {
        AISelectRetreatTarget: function(city, cities, state) {
            var options = this.getCitiesInfo()[city].nearby.filter(function(c) {
                if (cities[c].occupy === state || cities[c].occupy === 0) {
                    return true;
                }
            });
            var chance = new Array(options.length).fill(0);
            options.forEach(function(o, index) {
                this.getCitiesInfo()[o].nearby.forEach(function(n) {
                    if (cities[n].occupy === state) {
                        chance[index] += 4;
                    } else if (cities[n].occupy === 0) {
                        chance[index] += 1;
                    }
                }.bind(this));
            }.bind(this));
            var total = chance.reduce(function(a, b) {return a + b;}, 0);
            var dice = Math.random(), final;
            for (var i = 0; i < chance.length; i++) {
                if (i === 0) {
                    chance[i] = chance[i] / total;
                } else if (i === chance.length - 1) {
                    chance[i] = 1;
                } else {
                    chance[i] = chance[i] / total + chance[i - 1];
                }
                if (chance[i] >= dice) {
                    final = i;
                    break;
                }
            }
            return options[final];
        }
    }
});