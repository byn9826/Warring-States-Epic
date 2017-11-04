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
            var totalPlayers = relation.length + 1;
            if (deactive + 2 === totalPlayers) {
                return allies[0];
            }
            var hate = new Array(allies.length).fill(0);
            var overlap = new Array(allies.length).fill(0);
            var most = [0, 0];
            allies.forEach(function(ally, i) {
                hate[i] += relation.indexOf(ally) * 2;
                state[ally].occupy.forEach(function(occupy) {
                    if (state[own].nearby.indexOf(occupy) !== -1){
                        hate[i] += relation.length;
                        overlap[i] += 1;
                    }
                });
                state[ally].nearby.forEach(function(nearby) {
                    if (state[own].nearby.indexOf(nearby) !== -1){
                        hate[i] += (relation.length / 3);
                    }
                });
                if (state[ally].ally.length >= 3 && state[ally].ally.length > most[1]) {
                    most[0] = ally;
                    most[1] = state[ally].occupy.length;
                } else if (state[ally].ally.length >= 2 && state[ally].ally.length > most[1] && app.$data.player[ally] === 2) {
                    most[0] = ally;
                    most[1] = state[ally].occupy.length;
                }
                hate[i] *= state[ally].occupy.length;
                if ([4, 5, 6].indexOf(own) !== -1 && [4, 5, 6].indexOf(ally) !== -1) {
                    if (deactive === 0) {
                        hate[i] *= 0.7;
                    } else if (deactive === 1) {
                        hate[i] *= 0.9;
                    }
                }
            });
            var dice = Math.random();
            if (most[0] !== 0 && dice > 0.5) {
                return most[0];
            }
            dice = Math.random();
            if (dice > allies.length / (relation.length - deactive)) {
                return "";
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