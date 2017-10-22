Vue.mixin({
    methods: {
        AIacceptAllyOrNot: function(request, receive, states, relations, rank) {
            var deactive = 0;
            states.forEach(function(s) {
                if (!s.live) {
                    deactive += 1;
                }
            });
            var playerTotal = rank.length - deactive;
            var alliesTotal = states[receive].ally.length;
            var alliesRatio = (playerTotal - 1 - alliesTotal) / playerTotal;
            var relationRatio = (rank.length - 2 - relations[receive].indexOf(request)) / rank.length;
            var requestRank, i = 0;
            for (i; i < rank.length; i++) {
                if (rank[i].code === request) {
                    requestRank = i;
                    break;
                }
            }
            var rankRatio = (requestRank + 1) / rank.length;
            var chance = 0.5 * (relationRatio + rankRatio) * alliesRatio;
            chance = (Math.random() * 0.3 + 0.7) * chance;
            if ([4, 5, 6].indexOf(request) !== -1 && [4, 5, 6].indexOf(receive) !== -1) {
                if (deactive === 0) {
                    chance += 0.1;
                } else if (deactive === 1) {
                    chance += 0.5;
                }
            } 
            if (app.$data.player[request] === 2) {
                chance -= 0.1;
            }
            var dice = Math.random();
            if (chance >= dice) {
                return true;
            }
            return false;
        },
        AIrequestAllyOrNot: function(active, states, relations, rank) {
            var deactive = 0;
            states.forEach(function(s) {
                if (!s.live) {
                    deactive += 1;
                }
            });
            var playerTotal = rank.length - deactive;
            if (playerTotal === 2) {
                return "";
            }
            var alliesTotal = states[active].ally.length;
            var alliesRatio = (playerTotal - 2 - alliesTotal) / playerTotal;
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
                    (rank.length - 1 - relations[active].indexOf(target.code)) / rank.length
                );
            });
            rank.forEach(function(r, i) {
                if (targetAllies.indexOf(r) !== -1) {
                    targetRatios[targetAllies.indexOf(r)] *= (i + 1) / rank.length;
                    if ([4, 5, 6].indexOf(r.code) !== -1 && [4, 5, 6].indexOf(active) !== -1) {
                        if (deactive === 0) {
                            targetRatios[targetAllies.indexOf(r)] *= 2;
                        } else if (deactive === 1) {
                            targetRatios[targetAllies.indexOf(r)] *= 1.5;
                        }
                    } 
                    if (app.$data.player[r.code] === 2) {
                        targetRatios[targetAllies.indexOf(r)] /= 2;
                    }
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