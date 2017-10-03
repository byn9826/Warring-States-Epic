Vue.mixin({
    methods: {
        AIselectAttackOrder: function(state, cityData, cityInfo) {
            var cities = [];
            state.orderType.forEach(function(o, i) {
                if (o === 0) {
                    cities.push(state.occupy[i]);
                }
            })
            console.log(state);
            console.log(cities);
            var all = new Array(cities.length).fill(0);
            var nearby = [];
            cities.forEach(function(c, i) {
                all[i] += cityData[c].status.filter(function(f) {return f === 1;}).length;
                nearby[i] = cityInfo[c].nearby;
            });
            console.log(all);
            console.log(nearby);
        }
    }
});