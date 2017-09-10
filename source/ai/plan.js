Vue.mixin({
    methods: {
        AIplanResult: function(own, ally, state, cities, relations) {
            var avoid = [];
            ally.forEach(function(a) {
                avoid = avoid.concat(state[a].occupy);
            });
            var targets = state[own].nearby.filter(function(n) {
                if (avoid.indexOf(n) === -1) {
                    return true;
                }
            });
            var final = new Array(state[own].occupy.length);
            var benefits = new Array(targets.length).fill(0);
            var forces = new Array(targets.length);
            var enemy = new Array(targets.length);
            var attackCities = new Array(targets.length);
            targets.forEach(function(t, i) {
                enemy[i] = cities[t].army;
                this.getCitiesInfo()[t].resource.forEach(function(r) {
                    if (r === 0) {
                        benefits[i] += state[own].supply / state[own].tax;
                    } else {
                        benefits[i] += state[own].tax / state[own].supply;
                    }
                });
                if (this.getCitiesInfo()[t].type === 0) {
                    benefits[i] += 3;
                } else if (this.getCitiesInfo()[t].type === 1) {
                    benefits[i] += 2;
                }
                this.getCitiesInfo()[t].nearby.forEach(function(n) {
                    if (state[own].occupy.indexOf(n) !== -1) {
                        if (!forces[i]) {
                            forces[i] = [];
                            attackCities[i] = [];
                        }
                        attackCities[i].push(n);
                        forces[i] = forces[i].concat(cities[n].army);
                    }
                });
            }.bind(this));
            forces = forces.map(function(f) {
                var sum = 0;
                f.forEach(function(t) {
                    sum += this.getArmyEstimate(t, 0);
                }.bind(this));
                return sum;
            }.bind(this));
            enemy = enemy.map(function(f) {
                var sum = 0;
                f.forEach(function(t) {
                    sum += this.getArmyEstimate(t, 0);
                }.bind(this));
                return sum;
            }.bind(this));
            benefits = benefits.map(function(p, i) {
                return (forces[i] - enemy[i]) * p;
            });
            var totalBenefits = benefits.reduce(function(a, b) { return a + b;}, 0);
            for (var i = 0; i < benefits.length; i++) {
                if (i === 0) {
                    benefits[0] = benefits[0] / totalBenefits;
                } else if (i === benefits.length - 1) {
                    benefits[i] = 1;
                } else {
                    benefits[i] = benefits[i] / totalBenefits + benefits[i - 1];
                }
            }
            var dice = Math.random();
            var mainTarget;
            for (var i = 0; i < benefits.length; i++) {
                if (benefits[i] >= dice) {
                    mainTarget = i;
                    break;
                }
            }
            var fromCities = attackCities[mainTarget].map(function(m) {
                return cities[m].army.length;    
            });
            var sum = fromCities.reduce(function(a, b) {return a + b;}, 0);
            var chance = Math.random();
            var firstOrder, i = 0;
            for (i; i < fromCities.length; i++) {
                if (i === 0) {
                    fromCities[i] = fromCities[i] / sum;
                } else if (i === fromCities.length - 1) {
                    fromCities[i] = 1;
                } else {
                    fromCities[i] = fromCities[i] / sum + fromCities[i - 1];
                }
                if (fromCities[i] >= chance) {
                    firstOrder = attackCities[mainTarget][i];
                    break;
                }
            }
            final[state[own].occupy.indexOf(firstOrder)] = 0;
            if (cities[firstOrder].army.length <= cities[targets[mainTarget]].army.length) {
                
            }
 
            console.log(attackCities[mainTarget]);
            
            console.log(fromCities);
            console.log(firstOrder);
            console.log(final);
            console.log(mainTarget);
            
            
            console.log(targets);
            console.log(enemy);
            console.log(benefits);
            console.log(forces);
            
        }
    }
});