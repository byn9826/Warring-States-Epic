var app = new Vue({
    el: '#app',
    data: {
        cities: data.cities,
        player: data.player,
        power: data.power,
        hero: data.hero,
        round: data.round,
        stage: data.stage,
        allies: data.allies,
        relations: data.relations,
        settings: data.settings,
        history: data.history,
        force: data.force,
        fame: data.fame,
        item: null,
        focus: null,
        wild: 1,
        situation: 0,
        //no need to save
        save: save,
        scenerio: scenerio
    },
    methods: {
        toNextStage: function() {
            if (this.stage < 7) {
                this.stage += 1;
            } else {
                var fames = [];
                this.statesInfo.forEach(function(state, index) {
                    if (this.player[index] !== 0) {
                        fames.push({
                            cities: state.occupy.length,
                            code: state.code
                        });
                    }
                }.bind(this));
                fames.sort(function(a, b) {
                    if (b.cities - a.cities > 0) {
                        return true;
                    } else if ((b.cities - a.cities) === 0) {
                        if ((this.fame.indexOf(a.code) - this.fame.indexOf(b.code)) > 0) {
                            return true;
                        }
                        return false;
                    } else {
                        return false;
                    }
                }.bind(this));
                fames = fames.map(function(f) {
                    return f.code;
                });
                this.fame = fames;
                if (this.round === 9 && this.settings.mode === 1) {
                    alert(
                        this.getHerosInfo()[this.rank[0].code][
                            this.getHeroLeaderIndex()[this.rank[0].code]
                        ].name + "力敌群雄,成为战国霸主"
                    );
                    return false;
                } else {
                    this.round += 1;
                }
                this.stage = 0;
                if (this.settings.mode !== 0) {
                    try {
                        const fs = require('fs');
                        const path = require('path');
                        const location = path.join( __dirname, './save/', window.fileName + ".json");
                        fs.writeFileSync(location, JSON.stringify(app.$data), 'utf-8'); 
                    } catch(e) {}
                }
            }
        },
        replaceCitisOccupy: function(from, to, move) {
            if (this.cities[to].occupy !== this.cities[from].occupy) {
                this.cities[to].army = [];
                this.cities[to].status = [];
            }
            this.cities[to].occupy = this.cities[from].occupy;
            this.cities[from].order = null;
            this.cities[to].order = null;
            move.forEach(function(m) {
                this.cities[to].army.push(m);
                this.cities[to].status.push(1);
                this.cities[from].status.splice(this.cities[from].army.indexOf(m), 1);
                this.cities[from].army.splice(this.cities[from].army.indexOf(m), 1);
            }.bind(this));
        },
        addNewAlly: function(request, target) {
            this.allies.push([request, target]);
        },
        removeAlly: function(request, target) {
            var i = 0, index;
            for (i; i < this.allies.length; i++) {
                if (
                    (this.allies[i][0] === request && this.allies[i][1] === target) || 
                    (this.allies[i][0] === target && this.allies[i][1] === request)
                ) {
                    index = i;
                    break;
                }
            }
            this.allies.splice(index, 1);
        },
        increaseRelation: function(a, b, step) {
            var current = this.relations[a].indexOf(b);
            var increased = current - step;
            if (increased < 0) {
                increased = 0;
            }
            this.relations[a].splice(current, 1);
            this.relations[a].splice(increased, 0, b);
        },
        decreaseRelation: function(a, b, step) {
            var current = this.relations[a].indexOf(b);
            var decreased = current + step;
            if (decreased >= this.relations[a].length) {
                decreased = this.relations[a].length -1;
            }
            this.relations[a].splice(current, 1);
            this.relations[a].splice(decreased, 0, b);
        },
        addNewHistory: function(i) {
            this.history[this.round] ? 
                this.history[this.round].push(i):
                this.history[this.round] = [i];
        },
        saveItemOrder: function(i, l) {
            if (l === 0) {
                this.item = i;
            } else {
                this.updateOrderOfCities([i], [this.item]);
                this.item = null;
            }
        },
        updateOrderOfCities: function(city, orders) {
            city.forEach(function(c, i) {
                this.cities[c].order = orders[i];
            }.bind(this));
        },
        updateFocusVariable: function(focus) {
            this.focus = focus;
        },
        disturbPowerPoint: function(winer, loser) {
            this.power[winer] += 1;
            if (this.power[loser] > 0) {
                this.power[loser] -= 1;
            }
        },
        handleEvent: function(result) {
            if (result[0] === 0) {
                var aim, gap;
                this.cities.forEach(function(city) {
                    if (this.getCitySpecialArmy(city.occupy, city.code)) {
                        aim = 4 - city.army.length;
                        this.cities[city.code].army = this.cities[city.code].army.concat(
                            new Array(aim).fill(0)
                        );
                        this.cities[city.code].status = this.cities[city.code].status.concat(
                            new Array(aim).fill(1)
                        );
                    } 
                }.bind(this));
                this.addNewHistory("各国在国都募得义勇兵");
            } else if (result[0] === 1) {
                this.statesInfo.forEach(function(state, i) {
                    if (this.player[i] !== 0) {
                        this.power.splice(i, 1, this.power[i] + state.tax);
                    }
                }.bind(this));
                this.addNewHistory("各国完成变法国力增强");
            } else if (result[0] === 2) {
                this.hero = this.hero.map(function(h) {
                    return h.map(function(i) {
                        return 1;
                    });
                })
                this.addNewHistory("各国众将领请兵出征");
            } 
            if ([6, 7, 8].indexOf(result[1]) !== -1) {
                this.wild += 1;
                this.addNewHistory("四夷势力增长");
            } else if ([9, 10].indexOf(result[1]) !== -1) {
                var damage;
                this.statesInfo.forEach(function(state, i) {
                    if (this.player[i] !== 0 && state.live) {
                        this.power[i] - this.wild >= 0 ? damage = this.power[i] - this.wild : damage = (this.power[i] - this.wild) * 2;
                        this.power.splice(i, 1, damage);
                    }
                }.bind(this));
                this.wild = 1;
                this.addNewHistory("各国抵御四夷入侵");
            }
            this.situation = null;
            if (result[2] === 12) {
                this.situation = 1;
            } else if (result[2] === 13) {
                this.situation = 2;
            } else if (result[2] === 14) {
                this.situation = 3;
            } else {
                this.situation = 0;
            }
            this.addNewHistory(this.getEventSituation(this.situation));
        },
        selectState: function(i) {
            if (this.player[i] === 2) {
                this.player.splice(i, 1, 1);
            } else if (this.player[i] === 1 && this.settings.mode !== 0) {
                this.player = this.player.map(function(p) {
                    if (p !== 0) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
                this.player.splice(i, 1, 2);
            }
        },
        removeSelect: function(e) {
            if (e.target.value === 0 || e.target.value === '0') {
                this.player = this.player.map(function(p) {
                    if (p !== 0) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
            }
        },
        startGame: function() {
            if (this.settings.basic === 1) {
                this.power.splice(
                    this.player.indexOf(2), 1, this.power[this.player.indexOf(2)] - 8
                );
            }
            this.stage = 0;
            try {
				const fs = require('fs');
                const path = require('path');
                window.fileName = this.settings.name + "-" + this.getStatesInfo()[
                    this.player.indexOf(2)
                ].name + "-" + (fs.readdirSync(path.join(__dirname, './save/')).length + 1);
			} catch(e) {}
            this.$nextTick(function () {
                this.attachScroll();
            });
        },
        loadSave: function(i) {
            try {
				const fs = require('fs');
                const path = require('path');
                window.fileName = this.save[i].name.slice(0, -5);
                var loc = path.join(__dirname, './save/' + this.save[i].name);
				var file = fs.readFileSync(loc, {encoding:'utf-8'});
                var data = JSON.parse(file);
                Object.assign(app.$data, data);
			} catch(e) {}
            this.$nextTick(function () {
                this.attachScroll();
            });
        },
        attachScroll: function() {
            var mouseX = null, mouseY = null, drag = false;
            document.getElementById("main").addEventListener('mousemove', function(e) { 
                if(drag === true){
                    window.scrollTo(window.scrollX + mouseX - e.pageX, window.scrollY + mouseY - e.pageY);
                }
            });
            document.getElementById("main").addEventListener('mousedown', function(e){ 
                drag = true; 
                mouseX = e.pageX; 
                mouseY = e.pageY;
            });
            document.getElementById("main").addEventListener('mouseup', function(e){ 
                drag = false; 
                mouseX = null; 
                mouseY = null; 
            }); 
        },
        setMusic: function() {
            if (this.settings.music === 1) {
                this.$refs.music.play();
                this.$refs.music.volume = this.settings.volume / 10;
            } else {
                this.$refs.music.pause();
                this.$refs.music.currentTime = 0;
            }
        },
        setVolume: function() {
            this.$refs.music.volume = this.settings.volume / 10;
        },
        selectScenerio: function(i) {
            this.scenerio.push(data)
            for (var key in this.scenerio[i]) {
                if (!this.scenerio[i].hasOwnProperty(key)) continue;
                app.$data[key] = this.scenerio[i][key];
            }
            data = this.scenerio[i];
            this.scenerio.splice(i, 1);
        }
    },
    computed: {
        statesInfo: function() {
            var states = [], i = 0;
            for (i; i < this.getStatesInfo().length; i++) {
                states[i] = {
                    capital: [],
                    city: [],
                    occupy: [],
                    army: [],
                    supply: 0,
                    tax: 0,
                    ally: [],
                    code: i,
                    nearby: [],
                    order: [],
                    orderType: [],
                    live: true
                }
            }
            this.cities.forEach(function(city) {
                if (this.getCitiesInfo()[city.code].type === 0) {
                    states[city.occupy].capital.push(city.code);
                } else if (this.getCitiesInfo()[city.code].type === 1) {
                    states[city.occupy].city.push(city.code);
                }
                states[city.occupy].occupy.push(city.code);
                states[city.occupy].order.push(city.order);
                if (city.order !== null || city.order === 0) {
                    states[city.occupy].orderType.push(this.getOrdersInfo()[city.order].type);
                } else {
                    states[city.occupy].orderType.push(null);
                }
                states[city.occupy].army = states[city.occupy].army.concat(city.army);
                states[city.occupy].nearby = [...new Set([...states[city.occupy].nearby ,...this.getCitiesInfo()[city.code].nearby])];
                states[city.occupy].nearby = states[city.occupy].nearby.filter(function(a) {
                    return this.cities[a].occupy !== city.occupy;
                }.bind(this));
                this.getCitiesInfo()[city.code].resource.forEach(function(r) {
                    if (r === 1) {
                        states[city.occupy].supply += 1;
                    } else {
                        states[city.occupy].tax += 1;
                    }
                });
            }.bind(this));
            states = states.map(function(s) {
                if (s.occupy.length === 0) {
                    s.live = false;
                }
                return s;
            });
            this.allies.forEach(function(ally) {
                if (states[ally[0]].live && states[ally[1]].live) {
                    states[ally[0]].ally.push(ally[1]);
                    states[ally[1]].ally.push(ally[0]);
                }
            }.bind(this));
            return states;
        },
        rank: function() {
            var occupied = [];
            this.statesInfo.forEach(function(state, index) {
                if (this.player[index] !== 0) {
                    occupied.push({
                        cities: state.capital.length + state.city.length,
                        code: state.code
                    });
                }
            }.bind(this));
            occupied.sort(function(a, b) {
                if (b.cities - a.cities > 0) {
                    return true;
                } else if ((b.cities - a.cities) === 0) {
                    if ((this.fame.indexOf(a.code) - this.fame.indexOf(b.code)) > 0) {
                        return true;
                    }
                    return false;
                } else {
                    return false;
                }
            }.bind(this));
            return occupied;
        }
    }
});