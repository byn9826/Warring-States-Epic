Vue.mixin({
    methods: {
        AIplanResult: function(own, ally, state, cities, relations, available, cityInfo) {
            var protecters = [];
            var nearbys = [];
            available.forEach(function(c) {
                protecters.push(cities[c].army.length);
                nearbys.push(cityInfo[c].nearby);
            });
            var enemies = new Array(available.length).fill(0);
            var friends = new Array(available.length).fill(0);
            nearbys.forEach(function(n, i) {
                n.forEach(function(s) {
                    if (cities[s].occupy !== own && ally.indexOf(cities[s].occupy) === -1) {
                        enemies[i] += cities[s].army.length;
                    } else if (cities[s].occupy === own) {
                        friends[i] += cities[s].army.length * 2;
                    } else {
                        friends[i] += cities[s].army.length;
                    }
                });
            });
            var odds = [];
            available.forEach(function(a, i) {
                if (protecters[i] === 1 && enemies[i] === 0 && friends[i] === 0) {
                    odds.push([0.2, 0.2, 0.2, 1]);
                } else if (protecters[i] === 1 && enemies[i] === 0 && friends[i] !== 0) {
                    odds.push([0.3, 0.35, 0.35, 1]);
                } else if (protecters[i] === 1 && enemies[i] !== 0 && friends[i] !== 0) {
                    odds.push([0.4, 0.6, 0.8, 1]);
                } else if (protecters[i] === 1 && enemies[i] !== 0 && friends[i] == 0) {
                    odds.push([0.55, 0.55, 0.8, 1]);
                } else if (protecters[i] === 2 && enemies[i] === 0 && friends[i] === 0) {
                    odds.push([0.4, 0.4, 0.4, 1]);
                } else if (protecters[i] === 2 && enemies[i] === 0 && friends[i] !== 0) {
                    odds.push([0.5, 0.55, 0.55, 1]);
                } else if (protecters[i] === 2 && enemies[i] !== 0 && friends[i] !== 0) {
                    odds.push([0.5, 0.7, 0.9, 1]);
                } else if (protecters[i] === 2 && enemies[i] !== 0 && friends[i] == 0) {
                    odds.push([0.65, 0.65, 0.8, 1]);
                } else if (protecters[i] === 3 && enemies[i] === 0 && friends[i] === 0) {
                    odds.push([0.7, 0.7, 0.7, 1]);
                } else if (protecters[i] === 3 && enemies[i] === 0 && friends[i] !== 0) {
                    odds.push([0.7, 0.9, 0.9, 1]);
                } else if (protecters[i] === 3 && enemies[i] !== 0 && friends[i] !== 0) {
                    odds.push([0.75, 0.85, 0.95, 1]);
                } else if (protecters[i] === 3 && enemies[i] !== 0 && friends[i] == 0) {
                    odds.push([0.85, 0.85, 0.95, 1]);
                } else if (protecters[i] === 4 && enemies[i] === 0 && friends[i] === 0) {
                    odds.push([0.95, 0.95, 0.95, 1]);
                } else if (protecters[i] === 4 && enemies[i] === 0 && friends[i] !== 0) {
                    odds.push([0.9, 0.95, 0.95, 1]);
                } else if (protecters[i] === 4 && enemies[i] !== 0 && friends[i] !== 0) {
                    odds.push([0.9, 0.95, 1, 1]);
                } else if (protecters[i] === 4 && enemies[i] !== 0 && friends[i] == 0) {
                    odds.push([0.95, 0.95, 1, 1]);
                }
            });
            var orders = [], dice, i;
            var attack = [0, 1, 2, 3, 4, 5];
            var support = [6, 7, 8];
            var disturb = [9, 10, 11];
            var rest = [12, 13, 14, 15, 16, 17];
            odds.forEach(function(o, index) {
                dice = Math.random();
                for (i = 0; i < o.length; i++) {
                    if (o[i] > dice) {
                        switch (i) {
                            case 0:
                                if (attack.length !== 0) {
                                    orders.push(attack.shift());
                                } else {
                                    orders.push(null);
                                }
                                break;
                            case 1:
                                if (support.length !== 0) {
                                    orders.push(support.shift());
                                } else {
                                    orders.push(null);
                                }
                                break;
                            case 2:
                                if (disturb.length !== 0) {
                                    orders.push(disturb.shift());
                                } else {
                                    orders.push(null);
                                }
                                break;
                            case 3:
                                if (rest.length !== 0) {
                                    orders.push(rest.shift());
                                } else {
                                    orders.push(null);
                                }
                                break;
                        }
                        break;
                    }
                }
            });
            var options = attack.concat(rest);
            var dice, holder;
            orders = orders.map(function(o) {
                if (o === null) {
                    dice = Math.random();
                    holder = options[Math.floor(dice * options.length) - 1];
                    options.splice(Math.floor(dice * options.length) - 1, 1);
                    return holder;
                } else {
                    return o;
                }
            });
            return orders;
        }
    }
});