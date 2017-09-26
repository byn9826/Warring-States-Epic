Vue.mixin({
    methods: {
        processAfterBattle: function(result, aHero, aCity, aArmy, dHero, dCity, dArmy, aState, dState, aMove, aHeroIndex, dHeroIndex) {
            var kill = 0;
            var marchArmy = [];
            aArmy.forEach(function(a) {
                marchArmy.push(app.$data.cities[aCity].army[a]);
            });
            var defendArmy = dArmy.slice();
            if (result) {
                //国君进攻胜利
                if (this.getHeroLeaderCode().indexOf(aHero.code) !== -1) {
                    if (marchArmy.indexOf(0) !== -1) {
                        marchArmy[marchArmy.indexOf(0)] = aHero.state;
                    } else if (marchArmy.indexOf(8) !== -1) {
                        marchArmy[marchArmy.indexOf(8)] = aHero.state;
                    }
                } 
                //屈原进攻胜利
                else if (aHero.code === 10) {
                    app.$data.power.splice(aHero.state, 1, app.$data.power[aHero.state] + 2);
                }
                //有杀伤武将进攻胜利
                kill += this.getHeroKillNum(aHero.code);
                //有守护武将防守失败
                kill -= this.getHeroSafeNum(dHero.code);
                //孟尝君防守失败
                if (dHero.code === 5) {
                    kill = 0;
                } 
                //張平防守失败
                else if (dHero.code === 29) {
                    app.$data.power.splice(dHero.state, 1, app.$data.power[dHero.state] + 2);
                }
                var retreat = this.AISelectRetreatTarget(dCity, app.$data.cities, dHero.state);
                for (var i = 0; i < kill; i++) {
                    if (defendArmy.length === 0) {
                        break;
                    }
                    if (defendArmy.indexOf(0) !== -1) {
                        defendArmy.splice(defendArmy.indexOf(0), 1);
                    } else if (defendArmy.indexOf(8) !== -1) {
                        defendArmy.splice(defendArmy.indexOf(8), 1);
                    } else {
                        defendArmy.pop();
                    }
                }
                if (defendArmy.length > 0) {
                    if ((app.$data.cities[retreat].army.length + defendArmy.length) > 4) {
                        for (var j = 0; j < (app.$data.cities[retreat].army.length + defendArmy.length - 4); j++) {
                            if (defendArmy.length === 0) {
                                break;
                            }
                            if (defendArmy.indexOf(0) !== -1) {
                                defendArmy.splice(defendArmy.indexOf(0), 1);
                            } else if (defendArmy.indexOf(8) !== -1) {
                                defendArmy.splice(defendArmy.indexOf(8), 1);
                            } else {
                                defendArmy.pop();
                            }
                        }
                    }
                    app.$data.cities[retreat].army = app.$data.cities[retreat].army.concat(defendArmy);
                    app.$data.cities[retreat].status = app.$data.cities[retreat].status.concat(
                        new Array(defendArmy.length).fill(0)
                    );
                    app.$data.cities[retreat].occupy = dState;
                }
                app.$data.cities[dCity].army = marchArmy;
                app.$data.cities[dCity].occupy = aState;
                aMove.forEach(function(m) {
                    app.$data.cities[aCity].army.splice(m, 1);    
                });
                app.$data.cities[aCity].order = null;
                app.$data.cities[dCity].order = null;
                app.$data.hero[aHero.state].splice(aHeroIndex, 1, 0);
                app.$data.hero[dHero.state].splice(dHeroIndex, 1, 0);
                //郭隗防守失败
                if (dHero.code === 16) {
                    app.$data.hero[dHero.state] = new Array(app.$data.hero[dHero.state].length).fill(1);
                }
                if (app.$data.hero[aHero.state].sort()[app.$data.hero[aHero.state].length -1] === 0) {
                    app.$data.hero[aHero.state] = new Array(app.$data.hero[aHero.state].length).fill(1);
                }
                if (app.$data.hero[dHero.state].sort()[app.$data.hero[dHero.state].length -1] === 0) {
                    app.$data.hero[dHero.state] = new Array(app.$data.hero[dHero.state].length).fill(1);
                }
            } else {
                //国君防守胜利收益
                if (this.getHeroLeaderCode().indexOf(dHero.code) !== -1) {
                    if (defendArmy.indexOf(0) !== -1) {
                        defendArmy[defendArmy.indexOf(0)] = dHero.state;
                    } else if (defendArmy.indexOf(8) !== -1) {
                        defendArmy[defendArmy.indexOf(8)] = dHero.state;
                    }
                } 
                //屈原防守胜利收益
                else if (dHero.code === 10) {
                    app.$data.power.splice(dHero.state, 1, app.$data.power[dHero.state] + 2);
                }
                //有杀伤武将防守胜利
                kill += this.getHeroKillNum(dHero.code);
                //有守护武将进攻失败
                kill -= this.getHeroSafeNum(aHero.code);
                //郭隗进攻失败
                if (aHero.code === 16) {
                    app.$data.hero[aHero.state] = new Array(app.$data.hero[aHero.state].length).fill(1);
                } 
                //張平防守失败
                else if (aHero.code === 29) {
                    app.$data.power.splice(aHero.state, 1, app.$data.power[aHero.state] + 2);
                }
            }
        }
    }
});