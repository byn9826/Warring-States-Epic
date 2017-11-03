Vue.mixin({
    methods: {
        AIselectAttackOrder: function(state, cityData, cityInfo, states) {
            var cities = [];
            state.orderType.forEach(function(o, i) {
                if (o === 0) {
                    cities.push(state.occupy[i]);
                }
            });
            var nearbys = cities.map(function(c) {
                return cityInfo[c].nearby.filter(function(f) {
                    if (cityData[f].occupy !== state.code && state.ally.indexOf(cityData[f].occupy) === -1) {
                        return true;
                    } else {
                        return false;
                    }
                });
            });
            var attackSupport, defendSupport, env;
            var strength = nearbys.map(function(nearby, index) {
                return nearby.map(function(near) {
                    attackSupport = 0;
                    defendSupport = 0;
                    cityInfo[near].nearby.forEach(function(each) {
                        if (cityData[each].order !== null && this.getOrdersInfo()[cityData[each].order].type === 1) {
                            if (
                                cityData[each].occupy === state.code || (
                                    state.ally.indexOf(cityData[each].occupy) !== -1
                                    && states[cityData[near].occupy].ally.indexOf(cityData[each].occupy) === -1
                                )
                            ) {
                                cityData[each].army.forEach(function(c, i) {
                                    if (cityData[each].status[i] === 1) {
                                        attackSupport += this.getArmyInfo()[c].attack;
                                    }
                                }.bind(this));
                            }
                            if (
                                cityData[each].occupy === cityData[near].occupy || (
                                    states[cityData[near].occupy].ally.indexOf(cityData[each].occupy) !== -1
                                    && state.ally.indexOf(cityData[each].occupy) === -1
                                )
                            ) {
                                cityData[each].army.forEach(function(c, i) {
                                    if (cityData[each].status[i] === 1) {
                                        defendSupport += this.getArmyInfo()[c].attack;
                                    }
                                }.bind(this));
                            }
                        }
                    }.bind(this));
                    env = 0;
                    if (cityData[near].order !== null && this.getOrdersInfo()[cityData[near].order].type === 0) {
                        env = -1;
                    }
                    env = env - 2 + cityInfo[near].type;
                    if (app.$data.force[0] === state.code) {
                        env += 1;
                    }
                    if (app.$data.fame[0] === states[cityData[near].occupy].code) {
                        env -= 1;
                    }
                    if (app.$data.situation === 1) {
                        env -= 1;
                    }
                    if (app.$data.situation === 2) {
                        env += 1;
                    }
                    cityData[cities[index]].army.forEach(function(c, i) {
                        if (cityData[cities[index]].status[i] === 1) {
                            attackSupport += this.getArmyInfo()[c].attack;
                        }
                    }.bind(this));
                    cityData[near].army.forEach(function(c, i) {
                        if (cityData[near].status[i] === 1) {
                            defendSupport += this.getArmyInfo()[c].attack;
                        }
                    }.bind(this));
                    return attackSupport - defendSupport + 1 + env;
                }.bind(this));
            }.bind(this));
            var allMax = strength.map(function(s) {
                return Math.max(...s);
            });
            var max = Math.max(...allMax);
            var min = Math.min(...allMax);
            if (max > 0) {
                return cities[allMax.indexOf(max)];
            } else {
                return cities[allMax.indexOf(min)];
            }
            // var all = new Array(cities.length).fill(0);
            // var nearby = [];
            // cities.forEach(function(c, i) {
            //     all[i] += cityData[c].status.filter(function(f) {return f === 1;}).length;
            //     nearby[i] = cityInfo[c].nearby.filter(function(f) {
            //         if (cityData[f].occupy !== state.code && state.ally.indexOf(cityData[f].occupy) === -1) {
            //             return true;
            //         }
            //     });
            // });
            // enemy = new Array(cities.length).fill(0);
            // nearby.forEach(function(n, i) {
            //     n.forEach(function(f) {
            //         enemy[i] += cityData[f].status.filter(function(s) {return s === 1;}).length;
            //     });   
            // });
            // all = all.map(function(a, i) {
            //     return a * (enemy[i] + 1) / (nearby[i].length + 1);
            // });
            // var sum = all.reduce(function(a, b) {return a + b;}, 0);
            // var i = 0;
            // var target;
            // var chance = Math.random();
            // for (i; i < all.length; i++) {
            //     if (i === 0) {
            //         all[i] = all[i] / sum;
            //     } else if (i === all.length - 1) {
            //         all[i] = 1;
            //     } else {
            //         all[i] = all[i] / sum + all[i - 1];
            //     }
            //     if (all[i] >= chance) {
            //         target = cities[i];
            //         break;
            //     }
            // }
            // return target;
        },
        AIselectMarchDestination: function(from, cityData, cityInfo, stateData, player) {
            var targets = cityInfo[from].nearby.filter(function(n) {
                if (stateData[cityData[from].occupy].ally.indexOf(cityData[n].occupy) === -1) {
                    return true;
                }
            });
            var chances, choices, calculate;
            var attackSupport, defendSupport;
            choices = targets.filter(function(target) {
                if (cityData[target].occupy !== cityData[from].occupy) {
                    return true;
                } else {
                    return false;
                }
            });
            chances = choices.map(function(choice) {
                calculate = 0;
                if (cityData[choice].order !== null && this.getOrdersInfo()[cityData[choice].order].type === 0) {
                    calculate = -1;
                }
                calculate = calculate - 2 + cityInfo[choice].type;
                if (app.$data.force[0] === stateData[cityData[from].occupy].code) {
                    calculate += 1;
                }
                if (app.$data.fame[0] === stateData[cityData[choice].occupy].code) {
                    calculate -= 1;
                }
                if (app.$data.situation === 1) {
                    calculate -= 1;
                }
                if (app.$data.situation === 2) {
                    calculate += 1;
                }
                attackSupport = 0;
                defendSupport = 0;
                cityInfo[choice].nearby.forEach(function(each) {
                    if (cityData[each].order !== null && this.getOrdersInfo()[cityData[each].order].type === 1) {
                        if (
                            cityData[each].occupy === stateData[cityData[from].occupy].code || (
                                stateData[cityData[from].occupy].ally.indexOf(cityData[each].occupy) !== -1
                                && stateData[cityData[choice].occupy].ally.indexOf(cityData[each].occupy) === -1
                            )
                        ) {
                            cityData[each].army.forEach(function(c, i) {
                                if (cityData[each].status[i] === 1) {
                                    attackSupport += this.getArmyInfo()[c].attack;
                                }
                            }.bind(this));
                        }
                        if (
                            cityData[each].occupy === cityData[choice].occupy || (
                                stateData[cityData[choice].occupy].ally.indexOf(cityData[each].occupy) !== -1
                                && stateData[cityData[from].occupy].ally.indexOf(cityData[each].occupy) === -1
                            )
                        ) {
                            cityData[each].army.forEach(function(c, i) {
                                if (cityData[each].status[i] === 1) {
                                    defendSupport += this.getArmyInfo()[c].attack;
                                }
                            }.bind(this));
                        }
                    }
                }.bind(this));
                cityData[from].army.forEach(function(c, i) {
                    if (cityData[from].status[i] === 1) {
                        attackSupport += this.getArmyInfo()[c].attack;
                    }
                }.bind(this));
                cityData[choice].army.forEach(function(c, i) {
                    if (cityData[choice].status[i] === 1) {
                        defendSupport += this.getArmyInfo()[c].attack;
                    }
                }.bind(this));
                return 1 - calculate + attackSupport - defendSupport;
            }.bind(this));
            choices = choices.filter(function(choice, index) {
                return chances[index] > 0 ? true : false;
            });
            chances = chances.filter(function(chance) {
                return chance > 0 ? true : false;
            });
            var final;
            if (choices.length !== 0) {
                chances = chances.map(function(chance, index) {
                    final = chance;
                    final += cityData[choices[index]].status.filter(function(s) {
                        return s === 1 ? false : true;
                    }).length;
                    if (cityInfo[choices[index]].type === 0) {
                        final *= 4;
                    } else if (cityInfo[choices[index]].type === 1) {
                        final *= 2.5;
                    }
                    if (this.getStatesBaseLevel()[cityData[from].occupy][3].indexOf(choices[index]) !== -1) {
                        final *= 6;
                    } else if (this.getStatesBaseLevel()[cityData[from].occupy][2].indexOf(choices[index]) !== -1) {
                        final *= 4;
                    } else if (this.getStatesBaseLevel()[cityData[from].occupy][1].indexOf(choices[index]) !== -1) {
                        final *= 2.5;
                    } else if (this.getStatesBaseLevel()[cityData[from].occupy][0].indexOf(choices[index]) !== -1) {
                        final *= 1.5;
                    }
                    if (app.$data.player[cityData[choices[index]].occupy] !== 0) {
                        final *= 1.7 - app.$data.fame.indexOf(cityData[choices[index]].occupy) / 10;
                        final *= 1.6 - app.$data.relations[cityData[from].occupy].indexOf(cityData[choices[index]].occupy) / 10;
                    }
                    if (app.$data.player[cityData[choices[index]].occupy] === 2) {
                        final *= 4;
                    }
                    return final;
                }.bind(this));
            } else {
                choices = targets.filter(function(target) {
                    if (cityData[target].occupy === cityData[from].occupy) {
                        return true;
                    } else {
                        return false;
                    }
                });
                choices.push(from);
                final = [];
                chances = [];
                choices.forEach(function(choice, index) {
                    final.push(0);
                    chances.push(0);
                    cityInfo[choice].nearby.forEach(function(c) {
                        if (cityData[c].occupy === cityData[from].occupy) {
                            final[index] += 1;
                        } else {
                            chances[index] += 1;
                        }
                    });
                });
                if (chances.filter(function(c) {return c !== 0;}).length !== 0) {
                    chances = chances.map(function(chance, i) {
                        return chance / (chance + final[i]);
                    });
                } else {
                    chances = choices.map(function(choice) {
                        if (this.getStatesBaseLevel()[cityData[from].occupy][3].indexOf(choice) !== -1) {
                            final = 1;
                        } else if (this.getStatesBaseLevel()[cityData[from].occupy][2].indexOf(choice) !== -1) {
                            final = 2;
                        } else if (this.getStatesBaseLevel()[cityData[from].occupy][1].indexOf(choice) !== -1) {
                            final = 3;
                        } else if (this.getStatesBaseLevel()[cityData[from].occupy][0].indexOf(choice) !== -1) {
                            final = 4;
                        } else {
                            final = 5;
                        }
                        //辽东辽西
                        if (from === 9 && choice === 8) {
                            final = 10;
                        } 
                        //辽西
                        if (from === 8) {
                            if (choice = 7 && cityData[9].occupy === cityData[from].occupy) {
                                final = 10;
                            } else if (choice = 9 && cityData[7].occupy === cityData[from].occupy) {
                                final = 0.2;
                            }
                        }
                        //蓟
                        if (from === 7) {
                            if (choice = 8 && cityData[9].occupy === cityData[from].occupy) {
                                final = 0.2;
                            }
                        }
                        //临沂
                        if (from === 21) {
                            if (choice = 24 && cityData[23].occupy === cityData[from].occupy) {
                                final = 0.2;
                            }
                        }
                        //莒
                        if (from === 23) {
                            if (choice = 24 && cityData[21].occupy === cityData[from].occupy) {
                                final = 0.2;
                            }
                        }
                        //即墨
                        if (from === 24) {
                            if (choice = 24 && cityData[21].occupy === cityData[from].occupy &&  cityData[23].occupy === cityData[from].occupy) {
                                final = 0.2;
                            }
                        }
                        return final;
                    }.bind(this));
                }
            }
            var sum = chances.reduce(function(a, b) {return a + b;}, 0);
            var dice = Math.random();
            var target, i = 0;
            for (i; i < chances.length; i++) {
                if (i === 0) {
                    chances[i] = chances[i] / sum;
                } else if (i === chances.length - 1) {
                    chances[i] = 1;
                } else {
                    chances[i] = chances[i] / sum + chances[i - 1];
                }
                if (chances[i] >= dice) {
                    target = choices[i];
                    break;
                }
            }
            if (target === from) {
                return null;
            } else {
                return target;
            }
            
            // var basic;
            // var options = nearby.map(function(c) {
            //     basic = 0;
            //     if (player[cityData[c].occupy] === 0) {
            //         basic = 12;
            //     } else if (player[cityData[c].occupy] === 2) {
            //         basic = 2 * (app.rank.length + 5 - app.rank.indexOf(cityData[c].occupy));
            //     } else if (cityData[c].occupy !== cityData[from].occupy) {
            //         basic = app.rank.length + 5 - app.rank.indexOf(cityData[c].occupy);
            //     } else {
            //         basic = 1;
            //     }
            //     if (cityData[c].occupy !== cityData[from].occupy) {
            //         if (this.getStatesBaseLevel()[cityData[from].occupy][3].indexOf(c) !== -1) {
            //             basic *= 384;
            //         } else if (this.getStatesBaseLevel()[cityData[from].occupy][2].indexOf(c) !== -1) {
            //             basic *= 96;
            //         } else if (this.getStatesBaseLevel()[cityData[from].occupy][1].indexOf(c) !== -1) {
            //             basic *= 24;
            //         } else if (this.getStatesBaseLevel()[cityData[from].occupy][0].indexOf(c) !== -1) {
            //             basic *= 6;
            //         }
            //     } else {
            //         if (this.getStatesBaseLevel()[cityData[from].occupy][3].indexOf(c) !== -1) {
            //             basic /= 12;
            //         } else if (this.getStatesBaseLevel()[cityData[from].occupy][2].indexOf(c) !== -1) {
            //             basic /= 12;
            //         } else if (this.getStatesBaseLevel()[cityData[from].occupy][1].indexOf(c) !== -1) {
            //             basic /= 6;
            //         } else if (this.getStatesBaseLevel()[cityData[from].occupy][0].indexOf(c) !== -1) {
            //             basic /= 3;
            //         }
            //     }
            //     //辽西
            //     if (from === 8 && c === 9) {
            //         if (cityData[c].occupy === cityData[from].occupy) {
            //             basic /= 12;
            //         } else {
            //             basic *= 6;
            //         }
            //     } 
            //     //蓟
            //     if (from === 7 && c === 8) {
            //         if (cityData[c].occupy === cityData[from].occupy && cityData[from].occupy === cityData[9].occupy) {
            //             basic /= 12;
            //         } else {
            //             basic *= 6;
            //         }
            //     }
            //     //临沂
            //     if (from === 21 && c === 24) {
            //         if (cityData[c].occupy === cityData[from].occupy && cityData[from].occupy === cityData[23].occupy) {
            //             basic /= 12;
            //         } else {
            //             basic *= 6;
            //         }
            //     }
            //     //莒
            //     if (from === 23 && c === 24) {
            //         if (cityData[c].occupy === cityData[from].occupy && cityData[from].occupy === cityData[21].occupy) {
            //             basic /= 12;
            //         } else {
            //             basic *= 6;
            //         }
            //     }
            //     return (
            //         cityInfo[c].resource.length + (2 - cityInfo[c].type) * 5 + 4 
            //         - cityData[c].status.filter(function(d) {return d === 1;}).length
            //         + cityData[c].status.filter(function(d) {return d === 0;}).length * 3
            //         + cityInfo[c].nearby.length
            //     ) * basic;
            // }.bind(this));
            // var sum = options.reduce(function(a, b) {return a + b;}, 0);
            // var chance = Math.random();
            // var target, i = 0;
            // for (i; i < options.length; i++) {
            //     if (i === 0) {
            //         options[i] = options[i] / sum;
            //     } else if (i === options.length - 1) {
            //         options[i] = 1;
            //     } else {
            //         options[i] = options[i] / sum + options[i - 1];
            //     }
            //     if (options[i] >= chance) {
            //         target = nearby[i];
            //         break;
            //     }
            // }
            // return target;
        },
        AIselectMarchForce: function(from, to, cityInfo, cityData, states) {
            var target = [], random;
            if (cityData[from].occupy !== cityData[to].occupy) {
                var attack = 0;
                var defend = 0;
                cityInfo[to].nearby.forEach(function(each) {
                    if (cityData[each].order !== null && this.getOrdersInfo()[cityData[each].order].type === 1) {
                        if (
                            cityData[each].occupy === cityData[from].occupy || (
                                states[cityData[from].occupy].ally.indexOf(cityData[each].occupy) !== -1
                                && states[cityData[to].occupy].ally.indexOf(cityData[each].occupy) === -1
                            )
                        ) {
                            cityData[each].army.forEach(function(c, i) {
                                if (cityData[each].status[i] === 1) {
                                    attack += this.getArmyInfo()[c].attack;
                                }
                            }.bind(this));
                        }
                        if (
                            cityData[each].occupy === cityData[from].occupy || (
                                states[cityData[from].occupy].ally.indexOf(cityData[each].occupy) !== -1
                                && states[cityData[to].occupy].ally.indexOf(cityData[each].occupy) === -1
                            )
                        ) {
                            cityData[each].army.forEach(function(c, i) {
                                if (cityData[each].status[i] === 1) {
                                    defend += this.getArmyInfo()[c].attack;
                                }
                            }.bind(this));
                        }
                    }
                }.bind(this));
                env = 0;
                if (cityData[to].order !== null && this.getOrdersInfo()[cityData[to].order].type === 0) {
                    env = -1;
                }
                env = env - 2 + cityInfo[to].type;
                if (app.$data.force[0] === cityData[from].occupy) {
                    env += 1;
                }
                if (app.$data.fame[0] === cityData[to].occupy) {
                    env -= 1;
                }
                if (app.$data.situation === 1) {
                    env -= 1;
                }
                if (app.$data.situation === 2) {
                    env += 1;
                }
                cityData[from].army.forEach(function(c, i) {
                    if (cityData[from].status[i] === 1) {
                        attack += this.getArmyInfo()[c].attack;
                    }
                }.bind(this));
                cityData[to].army.forEach(function(c, i) {
                    if (cityData[to].status[i] === 1) {
                        defend += this.getArmyInfo()[c].attack;
                    }
                }.bind(this));
                var final = attack - defend + 1 + env;
                cityData[from].status.forEach(function(status, i) {
                    if (status === 1) {
                        target.push(i);
                    }
                });
                if (final > 4) {
                    var decision = [];
                    target.forEach(function(t, i) {
                        random = Math.random();
                        if (random > 0.65) {
                            decision.push(t);
                        } else {
                            final -= this.getArmyInfo()[cityData[from].army[i]].attack;
                            if (final <= 4) {
                                decision.push(t);
                            }
                        }
                    }.bind(this));
                    target = decision;
                }
            } else {
                cityData[from].status.forEach(function(s, i) {
                    if (s === 1) {
                        random = Math.random();
                        if (cityData[to].army.length + target.length < 4) {
                            if (cityData[from].army.length === 4 && random < 0.75) {
                                target.push(i);
                            } else if (cityData[from].army.length === 3 && random < 0.8) {
                                target.push(i);
                            } else if (cityData[from].army.length === 2 && random < 0.85) {
                                target.push(i);
                            } else if (cityData[from].army.length === 1) {
                                target.push(i);
                            }
                        }
                    }
                }.bind(this));
            }
            return target;

            //    if (cityData[from].occupy !== cityData[to].occupy) {
            //     var target = [];
            //     var random;

            //     if (cityData[from].status.filter(function(c) {return c === 1;}).length === 4) {
            //         cityData[from].status.forEach(function(s, i) {
            //             if (s === 1) {
            //                 random = Math.random();
            //                 if (this.getArmyInfo()[cityData[from].army[i]].level === 0) {
            //                     if (random < 0.65) {
            //                         target.push(i);
            //                     }
            //                 } else if (this.getArmyInfo()[cityData[from].army[i]].level === 1) {
            //                     if (random < 0.75) {
            //                         target.push(i);
            //                     }
            //                 } else {
            //                     if (random < 0.85) {
            //                         target.push(i);
            //                     }
            //                 }
            //             }
            //         }.bind(this));
            //     } else if (cityData[from].status.filter(function(c) {return c === 1;}).length === 3) {
            //         cityData[from].status.forEach(function(s, i) {
            //             if (s === 1) {
            //                 random = Math.random();
            //                 if (this.getArmyInfo()[cityData[from].army[i]].level === 0) {
            //                     if (random < 0.7) {
            //                         target.push(i);
            //                     }
            //                 } else if (this.getArmyInfo()[cityData[from].army[i]].level === 1) {
            //                     if (random < 0.8) {
            //                         target.push(i);
            //                     }
            //                 } else {
            //                     if (random < 0.9) {
            //                         target.push(i);
            //                     }
            //                 }
            //             }
            //         }.bind(this));
            //     } else if (cityData[from].status.filter(function(c) {return c === 1;}).length === 2) {
            //         cityData[from].status.forEach(function(s, i) {
            //             if (s === 1) {
            //                 random = Math.random();
            //                 if (this.getArmyInfo()[cityData[from].army[i]].level === 0) {
            //                     if (random < 0.85) {
            //                         target.push(i);
            //                     }
            //                 } else if (this.getArmyInfo()[cityData[from].army[i]].level === 1) {
            //                     if (random < 0.9) {
            //                         target.push(i);
            //                     }
            //                 } else {
            //                     if (random < 0.95) {
            //                         target.push(i);
            //                     }
            //                 }
            //             }
            //         }.bind(this));
            //     } else {
            //         cityData[from].status.forEach(function(s, i) {
            //             if (s === 1) {
            //                 random = Math.random();
            //                 if (random < 0.95) {
            //                     target.push(i);
            //                 }
            //             }
            //         }.bind(this));
            //     }
            // } else {
            //     cityData[from].status.forEach(function(s, i) {
            //         if (s === 1) {
            //             random = Math.random();
            //             if (cityData[to].army.length + target.length < 4) {
            //                 if (cityData[from].army.length === 4 && random < 0.8) {
            //                     target.push(i);
            //                 } else if (cityData[from].army.length === 3 && random < 0.85) {
            //                     target.push(i);
            //                 } else if (cityData[from].army.length === 2 && random < 0.85) {
            //                     target.push(i);
            //                 } else if (cityData[from].army.length === 1 && random < 0.8) {
            //                     target.push(i);
            //                 }
            //             }
            //         }
            //     }.bind(this));
            // }
            //return target;
        }
    }
});