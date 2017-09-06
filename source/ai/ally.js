Vue.mixin({
    methods: {
        AIacceptAllyOrNot: function(request, receive, states, playerTotal, relations, rank) {
            var chance = this.acceptAllyRatio(request, receive, states, playerTotal, relations, rank);
            chance = (Math.random() * 0.30 + 0.7) * chance;
            dice = Math.random();
            if (chance >= dice) {
                return true;
            }
            return false;
        },
        acceptAllyRatio: function(request, receive, states, playerTotal, relations, rank) {
            //get existing allies number for targeting state
            var alliesTotal = states[receive].ally.length;
            //chance of accept ally based on existing ally numbers
            var alliesRatio = (playerTotal - 1 - alliesTotal) / (playerTotal - 1);
            //chance of accept ally based on relations
            var relationRatio = (playerTotal - 1 - relations[receive].indexOf(request)) / (playerTotal - 1);
            var requestRank, i = 0;
            for (i; i < rank.length; i++) {
                if (rank[i].code = request) {
                    requestRank = i;
                    break;
                }
            }
            //chance of accept ally based on rank
            var rankRatio = (requestRank + 1) / rank.length;
            return 0.5 * (relationRatio + rankRatio) * alliesRatio;
        }
    }
});