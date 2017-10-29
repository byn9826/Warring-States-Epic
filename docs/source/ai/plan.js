Vue.mixin({
    methods: {
        AIplanResult: function(own, ally, state, cities, relations, available, cityInfo) {
            var ownArmyStrength = [];
            var ownArmyLength = [];
            var ownNearbyCities = [];
            var ownNearbyCitiesLength = [];
            available.forEach(function(c) {
                ownArmyLength.push(cities[c].army.length);
                ownArmyStrength.push(
                    cities[c].army.reduce(function(a, b) {
                        return a + (this.getArmyInfo()[b].attack + this.getArmyInfo()[b].defend) / 2;
                    }.bind(this), 0)
                );
                ownNearbyCitiesLength.push(cityInfo[c].nearby.length);
                ownNearbyCities.push(cityInfo[c].nearby);
            }.bind(this));
            var nearbyFriendsArmyLength = new Array(available.length).fill(0);
            var nearbyFriendsArmyStrength = new Array(available.length).fill(0);
            var nearbyFriendsCitiesLength = new Array(available.length).fill(0);
            var nearbyEnemyArmyLength = new Array(available.length).fill(0);
            var nearbyEnemyArmyStrength = new Array(available.length).fill(0);
            var nearbyEnemyCitiesLength = new Array(available.length).fill(0);
            var nearbyFriendsnearbyEnemyLength = new Array(available.length).fill(0);
            ownNearbyCities.forEach(function(cs, index) {
                cs.forEach(function(c) {
                    if (cities[c].occupy === own && c !== available[index]) {
                        nearbyFriendsArmyLength[index] += cities[c].army.length;
                        nearbyFriendsArmyStrength[index] += cities[c].army.reduce(function(a, b) {
                            return a + (this.getArmyInfo()[b].attack + this.getArmyInfo()[b].defend) / 2;
                        }.bind(this), 0);
                        nearbyFriendsCitiesLength[index] += 1;
                        cityInfo[c].nearby.forEach(function(ct) {
                            if (cities[ct].occupy !== own && ally.indexOf(cities[ct].occupy) === -1) {
                                nearbyFriendsnearbyEnemyLength[index] += cities[ct].army.length;
                            }
                        });
                    } else if (cities[c].occupy !== own && ally.indexOf(cities[c].occupy) === -1) {
                        nearbyEnemyCitiesLength[index] += cities[c].army.length;
                        nearbyEnemyArmyStrength[index] += cities[c].army.reduce(function(a, b) {
                            return a + (this.getArmyInfo()[b].attack + this.getArmyInfo()[b].defend) / 2;
                        }.bind(this), 0);
                        nearbyEnemyCitiesLength[index] += 1;
                    }
                }.bind(this));
            }.bind(this));
            // console.log(available);
            // console.log(ownArmyLength);
            // console.log(ownArmyStrength);
            // console.log(nearbyFriendsCitiesLength);
            // console.log(nearbyEnemyCitiesLength);
            // console.log(nearbyFriendsArmyLength);
            // console.log(nearbyFriendsArmyStrength);
            // console.log(nearbyEnemyArmyLength);
            // console.log(nearbyEnemyArmyStrength);
            // console.log(nearbyFriendsnearbyEnemyLength);
            var odds = [];
            available.forEach(function(a, i) {
                odds[i] = [0, 0, 0, 0];
                odds[i][0] = ownArmyLength[i];
                if (ownArmyLength[i] === 1) {
                    odds[i][1] = 2;
                    odds[i][2] = 2;
                    odds[i][3] = 4;
                } else if (ownArmyLength[i] === 2) {
                    odds[i][1] = 2.5;
                    odds[i][2] = 1;
                    odds[i][3] = 1;
                } else if (ownArmyLength[i] === 3) {
                    odds[i][1] = 1.5;
                    odds[i][2] = 0.5;
                } else {
                    odds[i][1] = 1;
                }
                if (ownArmyStrength[i] < 4) {
                    odds[i][0] += 1;
                    odds[i][1] += 2;
                    odds[i][2] += 2;
                    odds[i][3] += 4;
                } else if (ownArmyStrength[i] < 7) {
                    odds[i][0] += 2;
                    odds[i][1] += 2.5;
                    odds[i][2] += 1;
                    odds[i][3] += 1;
                } else if (ownArmyStrength[i] < 10) {
                    odds[i][0] += 3;
                    odds[i][1] += 1.5;
                    odds[i][2] += 0.5;
                } else {
                    odds[i][0] += 4;
                    odds[i][1] += 1;
                } 
                if (nearbyFriendsCitiesLength[i] > nearbyEnemyCitiesLength[i] * 2) {
                    odds[i][1] *= 1.5;
                    odds[i][3] *= 1.5;
                } else if (nearbyFriendsCitiesLength[i] > nearbyEnemyCitiesLength[i] * 1.5) {
                    odds[i][1] *= 1.25;
                    odds[i][3] *= 1.25;
                } else if (nearbyEnemyCitiesLength[i] > nearbyFriendsCitiesLength[i] * 2) {
                    odds[i][0] *= 1.5;
                    odds[i][2] *= 1.5;
                } else if (nearbyEnemyCitiesLength[i] > nearbyFriendsCitiesLength[i] * 1.5) {
                    odds[i][0] *= 1.25;
                    odds[i][2] *= 1.25;
                }
                if (nearbyEnemyCitiesLength[i] === 0) {
                    odds[i][0] *= 1.3;
                    odds[i][1] *= 1.1;
                    odds[i][2] = 0;
                    odds[i][3] *= 1.2;
                }
                if (nearbyFriendsCitiesLength[i] === 0) {
                    odds[i][0] *= 1.2;
                    odds[i][1] = 0;
                    odds[i][2] *= 1.1;
                }
                if (nearbyFriendsArmyStrength[i] > nearbyEnemyArmyStrength[i] * 2) {
                    odds[i][1] *= 1.5;
                    odds[i][3] *= 1.5;
                } else if (nearbyFriendsArmyStrength[i] > nearbyEnemyArmyStrength[i] * 1.5) {
                    odds[i][1] *= 1.25;
                    odds[i][3] *= 1.25;
                } else if (nearbyEnemyArmyStrength[i] > nearbyFriendsArmyStrength[i] * 2) {
                    odds[i][0] *= 1.5;
                    odds[i][2] *= 1.5;
                } else if (nearbyEnemyArmyStrength[i] > nearbyFriendsArmyStrength[i] * 1.5) {
                    odds[i][0] *= 1.25;
                    odds[i][2] *= 1.25;
                } 
                if (nearbyEnemyArmyStrength[i] === 0) {
                    odds[i][0] *= 1.3;
                    odds[i][1] *= 1.1;
                    odds[i][2] = 0;
                    odds[i][3] *= 1.2;
                }
                if (nearbyFriendsArmyStrength[i] === 0) {
                    odds[i][0] *= 1.2;
                    odds[i][1] = 0;
                    odds[i][2] *= 1.1;
                }
                if (nearbyFriendsnearbyEnemyLength[i] === 0) {
                    odds[i][0] *= 3;
                    odds[i][1] = 0;
                    odds[i][2] /= 3;
                }
            });
            //console.log(odds);
            var attack = [0, 1, 2];
            var support = [3, 4, 5];
            var disturb = [6, 7, 8];
            var rest = [9, 10, 11];
            var dice, sum, i;
            var orders = new Array(available.length).fill(null);
            odds.forEach(function(odd, index) {
                if (attack.length === 0) {
                    odd[0] = 0;
                }
                if (support.length === 0) {
                    odd[1] = 0;
                }
                if (disturb.length === 0) {
                    odd[2] = 0;
                }
                if (rest.length === 0) {
                    odd[3] = 0;
                }
                dice = Math.random();
                sum = odd.reduce(function(a, b) {return a + b;}, 0);
                i = 0;
                for (i; i < 4; i++) {
                    if (i === 0) {
                        odd[i] = odd[i] / sum;
                    } else if (i === 3) {
                        odd[i] = 1;
                    } else {
                        odd[i] = odd[i] / sum + odd[i - 1];
                    }
                    if (odd[i] >= dice) {
                        switch (i) {
                            case 0:
                                orders[index] = attack.shift();
                                break;
                            case 1:
                                orders[index] = support.shift();
                                break;
                            case 2:
                                orders[index] = disturb.shift();
                                break;
                            case 3:
                                orders[index] = rest.shift();
                                break;
                        }
                        break;
                    }
                }
            });
            var options = attack.concat(rest, support, disturb);
            var holder;
            orders = orders.map(function(o) {
                if (o === null || o === undefined) {
                    dice = Math.random();
                    holder = options[Math.floor(dice * options.length)];
                    options.splice(Math.floor(dice * options.length), 1);
                    if (holder === undefined) {
                        return null;
                    }
                    return holder;
                } else {
                    return o;
                }
            });
            return orders;
        }
    }
});