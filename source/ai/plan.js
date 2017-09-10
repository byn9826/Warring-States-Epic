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
                    enemy[i] = enemy[i].concat([8]);
                } else if (this.getCitiesInfo()[t].type === 1) {
                    benefits[i] += 2;
                    enemy[i] = enemy[i].concat([0]);
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
                return (forces[i] - enemy[i]) >=0 ? (forces[i] - enemy[i]) * p : 0;
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
            var mainTarget = null;
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
            var firstOrder = null, i = 0;
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
            var primaryForce = 0;
            cities[firstOrder].army.forEach(function(p) {
                primaryForce += this.getArmyEstimate(p, 0);
            }.bind(this));
            if (
                (primaryForce <= enemy[mainTarget] + 2) && 
                cities[targets[mainTarget]].army.length !== 0
            ) {
                attackCities[mainTarget].splice(attackCities[mainTarget].indexOf(firstOrder), 1);
                var odds = null;
                attackCities[mainTarget].forEach(function(h) {
                    if ((cities[h].army.length + cities[firstOrder].army.length) <= 4) {
                        if (cities[h].army.length <= 1) {
                            odds = [0.3, 0.8, 1];
                        } else {
                            odds = [0.5, 0.8, 1];
                        }
                    } else {
                        odds = [0.2, 0.9, 1];
                    }
                    var random = Math.random(), assistOrder = null;
                    for (var i = 0; i < 3; i++) {
                        if (random <= odds[i]) {
                            assistOrder = i;
                            break;
                        }
                    }
                    switch (assistOrder) {
                        case 0:
                            final[state[own].occupy.indexOf(h)] = "attack";
                            break;
                        case 1:
                            final[state[own].occupy.indexOf(h)] = "helper";
                            break;
                        case 2:
                            final[state[own].occupy.indexOf(h)] = "disturb";
                            break;
                    }
                }.bind(this));
            }
            var chance = null;
            state[own].occupy.forEach(function(o, i) {
                if (final[i] !== 0 && !final[i]) {
                    if(cities[o].army.length !== 0) {
                        chance = 0.5 * cities[o].army.length;
                        var random = Math.random();
                        final[i] = random <= chance ? "attack" : "rest";
                    } else {
                        final[i] = "rest";
                    }
                }
            }.bind(this));
            var i = 0;
            for (i; i < final.length; i++) {
                var mode = null;
                switch(final[i]) {
                    case "attack":
                        mode = 0;
                        break;
                    case "helper":
                        mode = 1;
                        break;
                    case "disturb":
                        mode = 2;
                        break;
                    case "rest":
                        mode = 3;
                        break;
                    default:
                        mode = false;
                        break
                } 
                if (mode === 0 || mode) {
                    var f = 0;
                    for (f; f < this.getOrdersInfo().length; f++) {
                        if (
                            this.getOrdersInfo()[f].type === mode && 
                            final.indexOf(this.getOrdersInfo()[f].code) === -1
                        ) {
                            final[i] = this.getOrdersInfo()[f].code;
                            break;
                        }
                    }
                }
            }
            return final;
        }
    }
});