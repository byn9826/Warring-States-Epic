Vue.mixin({
    methods: {
        AIselectAttackOrder: function(state, cityData, cityInfo) {
            var cities = [];
            state.orderType.forEach(function(o, i) {
                if (o === 0) {
                    cities.push(state.occupy[i]);
                }
            })
            var all = new Array(cities.length).fill(0);
            var nearby = [];
            cities.forEach(function(c, i) {
                all[i] += cityData[c].status.filter(function(f) {return f === 1;}).length;
                nearby[i] = cityInfo[c].nearby.filter(function(f) {
                    if (cityData[f].occupy !== state.code && state.ally.indexOf(cityData[f].occupy) === -1) {
                        return true;
                    }
                });
            });
            enemy = new Array(cities.length).fill(0);
            nearby.forEach(function(n, i) {
                n.forEach(function(f) {
                    enemy[i] += cityData[f].status.filter(function(s) {return s === 1;}).length;
                });   
            });
            all = all.map(function(a, i) {
                return a * (enemy[i] + 1) / (nearby[i].length + 1);
            });
            var sum = all.reduce(function(a, b) {return a + b;}, 0);
            var i = 0;
            var target;
            var chance = Math.random();
            for (i; i < all.length; i++) {
                if (i === 0) {
                    all[i] = all[i] / sum;
                } else if (i === all.length - 1) {
                    all[i] = 1;
                } else {
                    all[i] = all[i] / sum + all[i - 1];
                }
                if (all[i] >= chance) {
                    target = cities[i];
                    break;
                }
            }
            return target;
        }
    }
});