Vue.mixin({
    methods: {
        AIselectAttackOrder: function(state, cityData, cityInfo) {
            var cities = [];
            state.orderType.forEach(function(o, i) {
                if (o === 0) {
                    cities.push(state.occupy[i]);
                }
            })
            var all = new Array(cities.length).fill(0);
            var nearby = [];
            cities.forEach(function(c, i) {
                all[i] += cityData[c].status.filter(function(f) {return f === 1;}).length;
                nearby[i] = cityInfo[c].nearby.filter(function(f) {
                    if (cityData[f].occupy !== state.code && state.ally.indexOf(cityData[f].occupy) === -1) {
                        return true;
                    }
                });
            });
            enemy = new Array(cities.length).fill(0);
            nearby.forEach(function(n, i) {
                n.forEach(function(f) {
                    enemy[i] += cityData[f].status.filter(function(s) {return s === 1;}).length;
                });   
            });
            all = all.map(function(a, i) {
                return a * (enemy[i] + 1) / (nearby[i].length + 1);
            });
            var sum = all.reduce(function(a, b) {return a + b;}, 0);
            var i = 0;
            var target;
            var chance = Math.random();
            for (i; i < all.length; i++) {
                if (i === 0) {
                    all[i] = all[i] / sum;
                } else if (i === all.length - 1) {
                    all[i] = 1;
                } else {
                    all[i] = all[i] / sum + all[i - 1];
                }
                if (all[i] >= chance) {
                    target = cities[i];
                    break;
                }
            }
            return target;
        },
        AIselectMarchDestination: function(from, cityData, cityInfo, stateData, player) {
            var nearby = cityInfo[from].nearby.filter(function(n) {
                if (stateData[cityData[from].occupy].ally.indexOf(cityData[n].occupy) === -1) {
                    return true;
                }
            });
            var basic;
            var options = nearby.map(function(c) {
                basic = 0;
                if (player[cityData[c].occupy] === 0) {
                    basic = 7;
                } else if (cityData[c].occupy !== cityData[from].occupy) {
                    basic = 5;
                } else {
                    basic = 1;
                }
                if (cityData[c].occupy !== cityData[from].occupy) {
                    if (this.getStatesBaseLevel()[cityData[from].occupy][3].indexOf(c) !== -1) {
                        basic *= 24;
                    } else if (this.getStatesBaseLevel()[cityData[from].occupy][2].indexOf(c) !== -1) {
                        basic *= 12;
                    } else if (this.getStatesBaseLevel()[cityData[from].occupy][1].indexOf(c) !== -1) {
                        basic *= 6;
                    } else if (this.getStatesBaseLevel()[cityData[from].occupy][0].indexOf(c) !== -1) {
                        basic *= 3;
                    }
                } else {
                    if (this.getStatesBaseLevel()[cityData[from].occupy][3].indexOf(c) !== -1) {
                        basic /= 12;
                    } else if (this.getStatesBaseLevel()[cityData[from].occupy][2].indexOf(c) !== -1) {
                        basic /= 12;
                    } else if (this.getStatesBaseLevel()[cityData[from].occupy][1].indexOf(c) !== -1) {
                        basic /= 6;
                    } else if (this.getStatesBaseLevel()[cityData[from].occupy][0].indexOf(c) !== -1) {
                        basic /= 3;
                    }
                }
                //辽西
                if (from === 8 && c === 9) {
                    if (cityData[c].occupy === cityData[from].occupy) {
                        basic /= 12;
                    } else {
                        basic *= 6;
                    }
                } 
                //蓟
                if (from === 7 && c === 8) {
                    if (cityData[c].occupy === cityData[from].occupy && cityData[from].occupy === cityData[9].occupy) {
                        basic /= 12;
                    } else {
                        basic *= 6;
                    }
                }
                //临沂
                if (from === 21 && c === 24) {
                    if (cityData[c].occupy === cityData[from].occupy && cityData[from].occupy === cityData[23].occupy) {
                        basic /= 12;
                    } else {
                        basic *= 6;
                    }
                }
                //莒
                if (from === 23 && c === 24) {
                    if (cityData[c].occupy === cityData[from].occupy && cityData[from].occupy === cityData[21].occupy) {
                        basic /= 12;
                    } else {
                        basic *= 6;
                    }
                }
                return (
                    cityInfo[c].resource.length + 2 - cityInfo[c].type + 4 
                    - cityData[c].status.filter(function(d) {return d === 1;}).length
                    + cityData[c].status.filter(function(d) {return d === 0;}).length * 3
                    + cityInfo[c].nearby.length
                ) * basic;
            }.bind(this));
            var sum = options.reduce(function(a, b) {return a + b;}, 0);
            var chance = Math.random();
            var target, i = 0;
            for (i; i < options.length; i++) {
                if (i === 0) {
                    options[i] = options[i] / sum;
                } else if (i === options.length - 1) {
                    options[i] = 1;
                } else {
                    options[i] = options[i] / sum + options[i - 1];
                }
                if (options[i] >= chance) {
                    target = nearby[i];
                    break;
                }
            }
            return target;
        },
        AIselectMarchForce: function(from, to, cityInfo, cityData) {
            var target = [];
            var random;
            if (cityData[from].occupy !== cityData[to].occupy) {
                if (cityData[from].status.filter(function(c) {return c === 1;}).length === 4) {
                    cityData[from].status.forEach(function(s, i) {
                        if (s === 1) {
                            random = Math.random();
                            if (this.getArmyInfo()[cityData[from].army[i]].level === 0) {
                                if (random < 0.65) {
                                    target.push(i);
                                }
                            } else if (this.getArmyInfo()[cityData[from].army[i]].level === 1) {
                                if (random < 0.75) {
                                    target.push(i);
                                }
                            } else {
                                if (random < 0.85) {
                                    target.push(i);
                                }
                            }
                        }
                    }.bind(this));
                } else if (cityData[from].status.filter(function(c) {return c === 1;}).length === 3) {
                    cityData[from].status.forEach(function(s, i) {
                        if (s === 1) {
                            random = Math.random();
                            if (this.getArmyInfo()[cityData[from].army[i]].level === 0) {
                                if (random < 0.7) {
                                    target.push(i);
                                }
                            } else if (this.getArmyInfo()[cityData[from].army[i]].level === 1) {
                                if (random < 0.8) {
                                    target.push(i);
                                }
                            } else {
                                if (random < 0.9) {
                                    target.push(i);
                                }
                            }
                        }
                    }.bind(this));
                } else if (cityData[from].status.filter(function(c) {return c === 1;}).length === 2) {
                    cityData[from].status.forEach(function(s, i) {
                        if (s === 1) {
                            random = Math.random();
                            if (this.getArmyInfo()[cityData[from].army[i]].level === 0) {
                                if (random < 0.85) {
                                    target.push(i);
                                }
                            } else if (this.getArmyInfo()[cityData[from].army[i]].level === 1) {
                                if (random < 0.9) {
                                    target.push(i);
                                }
                            } else {
                                if (random < 0.95) {
                                    target.push(i);
                                }
                            }
                        }
                    }.bind(this));
                } else {
                    cityData[from].status.forEach(function(s, i) {
                        if (s === 1) {
                            random = Math.random();
                            if (random < 0.95) {
                                target.push(i);
                            }
                        }
                    }.bind(this));
                }
            } else {
                cityData[from].status.forEach(function(s, i) {
                    if (s === 1) {
                        random = Math.random();
                        if (cityData[to].army.length + target.length < 4) {
                            if (cityData[from].army.length === 4 && random < 0.8) {
                                target.push(i);
                            } else if (cityData[from].army.length === 3 && random < 0.85) {
                                target.push(i);
                            } else if (cityData[from].army.length === 2 && random < 0.85) {
                                target.push(i);
                            } else if (cityData[from].army.length === 1 && random < 0.8) {
                                target.push(i);
                            }
                        }
                    }
                }.bind(this));
            }
            return target;
        }
    }
});