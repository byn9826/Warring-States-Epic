Vue.mixin({
    methods: {
        AIdecideDisturbTarget: function(own, state, rank, cities, relation) {
            var options = [];
            state[own].orderType.forEach(function(o, i) {
                if (o === 2) {
                    options.push(state[own].occupy[i]);
                } 
            });
            var targets = options.map(function(o, i) {
                return this.getCitiesInfo()[o].nearby.filter(function(n) {
                    if (
                        cities[n].occupy !== own && 
                        state[own].ally.indexOf(cities[n].occupy) === -1 &&
                        cities[n].order !== null &&
                        this.getDisturbleType().indexOf(
                            this.getOrdersInfo()[cities[n].order].type
                        ) !== -1
                    ) {
                        return true;
                    } else {
                        return false;
                    }
                }.bind(this))   
            }.bind(this));
            targets.forEach(function(t, i) {
                if (t.length === 0) {
                    app.$data.cities[options[i]].order = null;
                    options[i] = null;
                }
            })
            options = options.filter(function(o) {
                return o !== null;
            });
            targets = targets.filter(function(t) {
                return t.length !== 0;
            })
            var chance = targets.map(function(t) {
                return t.length;
            });
            var min = Math.min(...chance);
            var last = targets[chance.indexOf(min)];
            var final;
            if (last !== null && last !== undefined) {
                final = last[Math.floor(Math.random() * last.length)];
            } else {
                final = null;
            }
            return [options[chance.indexOf(min)], final];
        }
    }
});