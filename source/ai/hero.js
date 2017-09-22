Vue.mixin({
    methods: {
        AIdecideBattleHero: function(attack, defend, attackPoint, defendPoint, hero) {
            var differ = defendPoint - attackPoint;
            var attackHero = hero[attack].map(function(h, i) {
                if (h === 1) {
                    return this.getHerosInfo()[attack][i].strength;
                } else {
                    return null;
                }
            }.bind(this));
            var defendHero = hero[defend].map(function(h, i) {
                if (h === 1) {
                    return this.getHerosInfo()[defend][i].strength;
                } else {
                    return null;
                }
            }.bind(this));
            var attackMax = Math.max.apply(Math, attackHero);
            var attackMin = Math.min.apply(Math, attackHero);
            var defendMax = Math.max.apply(Math, defendHero);
            var odds, i, totalOdds, final;
            var dice = Math.random();
            if (differ > attackMax || (defendMax + differ) < 0) {
                odds = defendHero.map(function(h, i) {
                    if (h !== null) {
                        return i + 1;
                    } else {
                        return 0;
                    }
                });
                totalOdds = odds.reduce(function(a, b) {return a + b;}, 0);
                for (i = 0; i < odds.length; i++) {
                    if (i === 0) {
                        odds[0] = odds[0] / totalOdds;
                    } else if (odds[i] === 0) {
                        odds[i] = odds[i - 1];
                    } else if (i === odds.length - 1) {
                        odds[i] = 1;
                    } else {
                        odds[i] = odds[i] / totalOdds + odds[i - 1];
                    }
                    if (odds[i] >= dice) {
                        final = i;
                        break;
                    }
                }
            } else {
                odds = defendHero.map(function(h, i) {
                    if (h !== null) {
                        if (h + differ > attackMax + 1) {
                            return 16;
                        } else if (h + differ === attackMax) {
                            return 8;
                        } else if (h + differ > attackMin) {
                            return 4
                        } else if (h + differ === attackMin) {
                            return 2
                        } else {
                            return 1;
                        }
                    } else {
                        return 0;
                    }
                });
                totalOdds = odds.reduce(function(a, b) {return a + b;}, 0);
                for (i = 0; i < odds.length; i++) {
                    if (i === 0) {
                        odds[0] = odds[0] / totalOdds;
                    } else if (odds[i] === 0) {
                        odds[i] = odds[i - 1];
                    } else if (i === odds.length - 1) {
                        odds[i] = 1;
                    } else {
                        odds[i] = odds[i] / totalOdds + odds[i - 1];
                    }
                    if (odds[i] >= dice) {
                        final = i;
                        break;
                    }
                }
            }
            return final;
        }
    }
});