Vue.mixin({
    methods: {
        AIbreachAllyOrNot: function(own, allies, state, relation) {
            var deactive = 0;
            state.forEach(function(s) {
                if (!s.live) {
                    deactive += 1;
                }
            });
            if (allies.length === 0) {
                return "";
            }
            var lapCount = 0;
            var hate = new Array(allies.length).fill(0);
            var overlap = new Array(allies.length).fill(0);
            allies.forEach(function(ally, i) {
                hate[i] += relation.indexOf(ally) * 1.5;
                state[ally].occupy.forEach(function(occupy) {
                    if (state[own].nearby.indexOf(occupy) !== -1){
                        hate[i] += relation.length;
                        lapCount += 1;
                        overlap[i] += 1;
                    }
                });
                state[ally].nearby.forEach(function(nearby) {
                    if (state[own].nearby.indexOf(nearby) !== -1){
                        hate[i] += (relation.length / 3);
                    }
                });
                if ([4, 5, 6].indexOf(own) !== -1 && [4, 5, 6].indexOf(ally) !== -1) {
                    if (deactive === 0) {
                        hate[i] *= 0.1;
                    } else if (deactive === 1) {
                        hate[i] *= 0.2;
                    } else if (deactive === 2) {
                        hate[i] *= 0.3;
                    }
                }
            });
            var dice = Math.random();
            if (lapCount === (state[own].nearby.length - 1)) {
                if (dice > 0.5) {
                    return "";
                }
            } else if (lapCount === (state[own].nearby.length - 2)) {
                if (dice > 0.7) {
                    return "";
                }
            } else if (lapCount !== state[own].nearby.length) {
                var breachRatio = (Math.random() * 0.1 + 0.8) * (allies.length / relation.length);
                if (dice > breachRatio) {
                    return "";
                }
            }
            var sum = hate.reduce(function(a, b) {return a + b;}, 0);
            if (sum === 0) {
                return "";
            }
            var chance = Math.random();
            var target, i = 0;
            for (i; i < allies.length; i++) {
                if (i === 0) {
                    hate[i] = hate[i] / sum;
                } else if (i === allies.length - 1) {
                    hate[i] = 1;
                } else {
                    hate[i] = hate[i] / sum + hate[i - 1];
                }
                if (hate[i] >= chance) {
                    target = allies[i];
                    break;
                }
            }
            return target;
        }
    }
});