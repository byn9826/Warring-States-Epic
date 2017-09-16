Vue.mixin({
    methods: {
        AIdecideDisturbTarget: function(own, state, rank, cities, relation) {
            var nearbys = state[own].orderType.map(function(o, i) {
                if (o === 2) {
                    return this.getCitiesInfo()[state[own].occupy[i]].nearby.filter(function(n) {
                        if (
                            cities[n].occupy !== own && 
                            state[own].ally.indexOf(cities[n].occupy) === -1 &&
                            this.getOrdersInfo()[cities[n].order] &&
                            this.getDisturbleType().indexOf(
                                this.getOrdersInfo()[cities[n].order].type
                            ) !== -1
                        ) {
                            return true;
                        } else {
                            return false;
                        }
                    }.bind(this));
                } else {
                    return null;
                }
            }.bind(this));
            nearbys.forEach(function(nearby) {
                if (nearby.length === 1) {
                    nearbys.forEach(function(n) {
                        if (n.length !== 1 && n.indexOf(nearby[0]) !== -1) {
                            n.splice(n.indexOf(nearby[0]), 1);
                            
                        }
                    })
                } 
            });
            var target = [];
            nearbys.forEach(function(nearby) {
                if (nearby) {
                    target.push(
                        nearby.map(function(a) {
                            return 0.25 * relation.indexOf(this.cities[a].occupy) / relation.length +
                                0.5 * (3 - this.getOrdersInfo()[this.cities[a].order].type) / 3 + 
                                0.25 * (rank.length - rank.indexOf(this.cities[a].occupy)) / rank.length;
                        }.bind(this))
                    );
                } else {
                    target.push(null);
                }
            }.bind(this));
            var result = [];
            target.forEach(function(t, i) {
                result.push(nearbys[i][this.getRandomDecision(t)]);
            }.bind(this));
            return result;
        },
        getRandomDecision: function(target) {
            var sum = target.reduce(function(a, b) { return a + b;}, 0);
            var random = Math.random();
            for (var j = 0; j < target.length; j++) {
                if (j === 0) {
                    target[j] = target[j] / sum;
                } else if (j === target.length - 1) {
                    target[j] = 1;
                } else {
                    target[j] = target[j] / sum + target[j - 1];
                }
                if (target[j] >= random) {
                    return j;
                }
            }
        }
    }
});