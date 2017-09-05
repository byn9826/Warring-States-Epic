Vue.mixin({
    methods: {
        AIacceptAllyOrNot: function(request, receive, states, playerTotal) {
            //get existing allies number for targeting state
            var alliesTotal = states[receive].ally.length;
            var alliesRatio = (Math.random() * 0.2 + 0.8) * (playerTotal - 1 - alliesTotal) / (playerTotal - 1);
            console.log(playerTotal);
            console.log(alliesRatio);
        },
    }
});