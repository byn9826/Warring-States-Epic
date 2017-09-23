Vue.mixin({
    methods: {
        processAfterBattle: function(result, aHero, aCity, aArmy) {
            console.log(result);
            console.log(aHero);
            console.log(aCity);
            console.log(aArmy);
            var marchArmy = [];
            aArmy.forEach(function(a) {
                marchArmy.push(app.$data.cities[aCity].army[a]);
            });
            if (result) {
                //国君胜利收益
                if (this.getHeroLeaderCode().indexOf(aHero.code) !== -1) {
                    if (marchArmy.indexOf(0) !== -1) {
                        marchArmy[marchArmy.indexOf(0)] = aHero.state;
                    } else if (marchArmy.indexOf(8) !== -1) {
                        marchArmy[marchArmy.indexOf(8)] = aHero.state;
                    }
                } 
                //屈原胜利收益
                else if (aHero.code === 10) {
                    app.$data.power.splice(aHero.state, 1, app.$data.power[aHero.state] + 2);
                }
                console.log(marchArmy);
            }
        }
    }
});