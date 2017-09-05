Vue.mixin({
    methods: {
        AIacceptAllyOrNot: function(request, receive, states, playerTotal) {
            //get existing allies number for targeting state
            var alliesTotal = states[receive].ally.length;
            console.log(alliesTotal);
            console.log((playerTotal - alliesTotal) / playerTotal);
        },
    }
});