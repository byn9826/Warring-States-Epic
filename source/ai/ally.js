Vue.mixin({
    methods: {
        AIacceptAllyOrNot: function(request, receive, states, relations, rank) {
            var playerTotal = rank.length;
            var alliesTotal = states[receive].ally.length;
            var alliesRatio = (playerTotal - 1 - alliesTotal) / (playerTotal - 1);
            var relationRatio = (playerTotal - 1 - relations[receive].indexOf(request)) / (playerTotal - 1);
            var requestRank, i = 0;
            for (i; i < rank.length; i++) {
                if (rank[i].code == request) {
                    requestRank = i;
                    break;
                }
            }
            var rankRatio = (requestRank + 1) / rank.length;
            var chance = 0.5 * (relationRatio + rankRatio) * alliesRatio;
            chance = (Math.random() * 0.3 + 0.7) * chance;
            var dice = Math.random();
            if (chance >= dice) {
                return true;
            }
            return false;
        },
        AIrequestAllyOrNot: function(active, states, relations, rank) {
            var playerTotal = rank.length;
            var alliesTotal = states[active].ally.length;
            var alliesRatio = (Math.random() * 0.1 + 0.9) * (playerTotal - 1 - alliesTotal) / (playerTotal - 1);
            var dice = Math.random();
            if (dice > alliesRatio) {
                return "";
            }
            var currentAllies = states[active].ally;
            var targetAllies = rank.filter(function(t) {
                return currentAllies.indexOf(t.code) === -1 && t.code !== active && states[t.code].live;
            });
            var targetRatios = [];
            targetAllies.forEach(function(target) {
                targetRatios.push(
                    (rank.length - 1 - relations[active].indexOf(target.code)) / (rank.length - 1)
                );
            });
            rank.forEach(function(r, i) {
                if (targetAllies.indexOf(r.code) !== -1) {
                    targetRatios[targetAllies.indexOf(r.code)] *= (i + 1) / rank.length;
                }
            });
            var sum = targetRatios.reduce(function(a, b) {return a + b;}, 0);
            var chance = Math.random();
            var target, i = 0;
            for (i; i < targetRatios.length; i++) {
                if (i === 0) {
                    targetRatios[i] = targetRatios[i] / sum;
                } else if (i === targetRatios.length - 1) {
                    targetRatios[i] = 1;
                } else {
                    targetRatios[i] = targetRatios[i] / sum + targetRatios[i - 1];
                }
                if (targetRatios[i] >= chance) {
                    target = targetAllies[i].code;
                    break;
                }
            }
            return target;
        },
    }
});