Vue.mixin({
    methods: {
        AISelectRetreatTarget: function(city, cities, state) {
            var options = this.getCitiesInfo()[city].nearby.filter(function(c) {
                if (cities[c].occupy === state || cities[c].occupy === 0) {
                    return true;
                }
            });
            console.log(options);
        }
    }
});