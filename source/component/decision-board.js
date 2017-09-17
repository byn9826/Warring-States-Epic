Vue.component("decision-board", {
    props: [
        "stage", "player", "state", "cities", "relations", "rank", "orders", "settings", "addnewally",
        "focus", "addnewhistory", "tonextstage", "removeally", "increaserelation", "decreaserelation",
        "saveitemorder", "updateorderofcities", "disturbpowerpoint"
    ],
    template: `
        <div v-bind:style="cardStyle">
            <header v-bind:style="roundStyle">
                {{getStageName(stage)}} 
            </header>
            <section v-if="stage===0 && player[orders[active]]===2">
                <div v-bind:style="descStyle">{{getStatesAllies(state[activeState.code]) || "无盟友"}}</div>
                <div v-bind:style="descStyle">请选择想要缔盟的国家</div>
                <div v-bind:style="lineStyle">
                    <select v-model="target" v-bind:style="selectStyle">
                        <option disabled selected value="">-国家-</option>
                        <option 
                            v-for="(s, i) in getStatesInfo()" v-bind:value="i"
                            v-if="player[i]!==0 && player[i]!==2 && state[activeState.code].ally.indexOf(s.code) === -1" 
                        >
                            {{s.name}}
                        </option>
                    </select>
                    <input 
                        v-show="target!==''" v-bind:style="buttonStyle" 
                        type="button" value="递交盟书" v-on:click="submitAlly()" 
                    />
                    <input 
                        v-bind:style="buttonStyle" 
                        type="button" value="不缔盟" v-on:click="skipAlly()" 
                    />
                </div>
            </section>
            <section v-else-if="stage===1 && player[orders[active]]===2">
                <div v-bind:style="descStyle">{{getStatesAllies(state[activeState.code]) || "无盟友"}}</div>
                <div v-bind:style="descStyle">请选择想要毁约的国家</div>
                <div v-bind:style="lineStyle">
                    <select v-model="target" v-bind:style="selectStyle">
                        <option disabled selected value="">-国家-</option>
                        <option 
                            v-for="(s, i) in state[activeState.code].ally" v-bind:value="s" 
                        >
                            {{getStatesInfo()[s].name}}
                        </option>
                    </select>
                    <input 
                        v-show="target!==''" v-bind:style="buttonStyle" 
                        type="button" value="撕毁盟约" v-on:click="submitBreach()" 
                    />
                    <input 
                        v-bind:style="buttonStyle" 
                        type="button" value="不毁约" v-on:click="skipBreach()" 
                    />
                </div>
            </section>
            <section v-else-if="stage===2 && player[orders[active]]===2">
                <div v-bind:style="descStyle">
                    {{getStatesAllies(state[activeState.code]) || "无盟友"}}
                </div>
                <div v-bind:style="descStyle">请将指令拖拽至目标领地</div>
                <div v-bind:style="lineStyle">
                    <span 
                        v-for="order in getOrdersInfo()" 
                        draggable="true" @dragstart="recordSelectedOrder(order.code)"
                        v-bind:style="state[activeState.code].order.indexOf(order.code)===-1?orderStyle:setStyle"
                    >
                        {{order.name}}
                    </span>
                </div>
                <input 
                    v-bind:style="submitStyle" type="button" value="收回指令" 
                    v-on:click="recallPlan()"
                />
                <input 
                    v-bind:style="submitStyle" type="button" value="布局完毕" 
                    v-on:click="submitPlan()"
                />
            </section>
            <section v-else-if="stage===3 && player[orders[active]]===2">
                <div v-bind:style="descStyle">
                    {{getStatesAllies(state[activeState.code]) || "无盟友"}}
                </div>
                <div
                    v-for="(o, i) in state[activeState.code].order" 
                    v-if="o&&getOrdersInfo()[o].type===2"
                    v-bind:style="boxStyle"
                >
                    <div>
                        {{getCitiesInfo()[state[activeState.code].occupy[i]].name}}
                    </div>
                    <select 
                        v-bind:style="selectStyle" v-on:change="setDisturbTarget(i)"
                    >
                        <option selected value="">无目标</option>
                        <option 
                            v-for="c in getCitiesInfo()[state[activeState.code].occupy[i]].nearby"
                            v-if="filterTargetOptions(c, 3)" v-bind:value="c"
                        >
                            {{getCitiesInfo()[c].name}}
                        </option>
                    </select>
                </div>
                <input 
                    v-bind:style="confirmStyle" type="button" value="确认劫掠目标" 
                    v-on:click="submitDisturb()"
                />
            </section>
            <section v-else-if="stage===4 && player[orders[active]]===2">
                <div v-bind:style="descStyle">
                    {{getStatesAllies(state[activeState.code]) || "无盟友"}}
                </div>
                <div v-bind:style="descStyle">请从地图选择发兵城市</div>
                <template v-if="focus!==null">
                    <span>自{{getCitiesInfo()[focus].name}}进攻</span>
                    <select 
                        v-bind:style="selectStyle" v-model="reminder"
                    >
                        <option selected value="">无目标</option>
                        <option 
                            v-for="c in getCitiesInfo()[focus].nearby"
                            v-if="filterTargetOptions(c, 4)" v-bind:value="getCitiesInfo()[c].code"
                        >
                            {{getCitiesInfo()[c].name}}
                        </option>
                    </select>
                </template>
                <section v-bind:style="marchStyle" v-if="focus!==null">
                    <div v-bind:style="lineStyle">
                        选择我军出征部队 战力:{{calAttackArmy()}}
                    </div>
                    <span 
                        v-for="(a, i) in cities[focus].army" 
                        v-bind:style="[forceStyle, target.indexOf(i)!==-1?borderStyle:'']" 
                        v-on:click="chooseArmy(i)"
                    >
                        {{getArmyInfo()[a].name}}
                    </span>
                    <div v-if="reminder!==''" v-bind:style="lineStyle">
                        敌军军团数:{{calDefendNum()}}
                    </div>
                </section>
            </section>
            <section v-else>
                <div v-bind:style="descStyle">
                    {{activeState.name}}国正在{{getStageDescName(stage)}} ...
                </div>
                <div v-bind:style="flagStyle">{{getStateKingName(orders[active])}}行动中</div>
            </section>
            <div v-show="info" v-bind:style="infoStyle">{{info}}</div>
        </div>
    `,
    computed: {
        activeState: function() {
            return this.getStatesInfo()[this.orders[this.active]];
        }
    },
    created: function() {
        this.active = 0;
    },
    methods: {
        filterTargetOptions(i, stage) {
            if (stage === 3) {
                if (this.cities[i].occupy===this.activeState.code) {
                    return false;
                }
                if (this.state[this.activeState.code].ally.indexOf(this.cities[i].occupy) !== -1) {
                    return false;
                }
                if (!this.getOrdersInfo()[this.cities[i].order]) {
                    return false;
                }
                if (
                    this.getDisturbleType().indexOf(
                        this.getOrdersInfo()[this.cities[i].order].type
                    ) === -1
                ) {
                    return false;
                }
            } else if (stage === 4) {
                if (this.cities[i].occupy===this.activeState.code) {
                    return false;
                }
                if (this.state[this.activeState.code].ally.indexOf(this.cities[i].occupy) !== -1) {
                    return false;
                }
            }
            return true;
        },
        calAttackArmy: function() {
            var attack = 0;
            this.target.forEach(function(t) {
                attack += this.getArmyInfo()[this.cities[this.focus].army[t]].attack;
            }.bind(this));
            attack += this.getOrdersInfo()[this.cities[this.focus].order].bonus;
            if (this.reminder !== "") {
                this.getCitiesInfo()[this.reminder].nearby.forEach(function(n) {
                    if (this.cities[n].order !== null) {
                        console.log();
                        if (
                            (
                                this.cities[n].occupy === this.activeState.code ||
                                this.state[this.activeState.code].ally.indexOf(this.cities[n].occupy) !== -1
                            ) && this.getOrdersInfo()[this.cities[n].order].type === 1
                        ) {
                            this.cities[n].army.forEach(function(a) {
                                attack += this.getArmyInfo()[a].attack;
                            }.bind(this));
                            attack += this.getOrdersInfo()[this.cities[n].order].bonus;
                        }
                    }
                }.bind(this));
            }
            return attack;
        },
        calDefendNum: function() {
            var num = 0;
            num += this.cities[this.reminder].army.length;
            return num;
        },
        chooseArmy: function(i) {
            if (this.target.indexOf(i) === -1) {
                this.target.push(i);
            } else {
                this.target.splice(this.target.indexOf(i), 1);
            }
        },
        submitDisturb: function() {
            var remover = [];
            Object.keys(this.target).forEach(function(key) { 
                if (this.target[key] !== "" && remover.indexOf(parseInt(this.target[key])) === -1) {
                    remover.push(parseInt(this.target[key]));
                }
            }.bind(this));
            this.disturbProcess(remover);
        },
        disturbProcess: function(remover) {
            remover.forEach(function(r) {
                if (this.getOrdersInfo()[this.cities[r].order].type === 3) {
                    this.$emit(
                        "disturbpowerpoint", this.activeState.code, 
                        this.getStatesInfo()[this.cities[r].occupy].code
                    );
                }
                this.info = this.activeState.name + "国劫掠了" + this.getStatesInfo()[this.cities[r].occupy].name + "国的" + this.getCitiesInfo()[r].name;
                this.$emit("addnewhistory", this.info);
                this.$emit(
                    "decreaserelation", this.getStatesInfo()[this.cities[r].occupy].code, 
                    this.activeState.code, 1
                );
                this.$emit("updateorderofcities", [r], [null]);
            }.bind(this));
            var own = this.state[this.activeState.code].occupy.filter(function(o, index) {
                if (this.state[this.activeState.code].orderType[index] === 2) {
                    return true;
                }
            }.bind(this));
            this.$emit("updateorderofcities", own, new Array(own.length).fill(null));
            this.nextActive();
        },
        setDisturbTarget(i) {
            this.target[i] = event.target.value;
        },
        recordSelectedOrder(i) {
            this.$emit("saveitemorder", i, 0);
        },
        recallPlan: function() {
            this.$emit(
                "updateorderofcities", this.state[this.activeState.code].occupy, 
                new Array(this.state[this.activeState.code].occupy.length).fill(null)
            );
        },
        submitPlan: function() {
            this.info = this.activeState.name + "国完成筹备";
            this.nextActive();
        },
        submitBreach: function() {
            if (this.target === "") {
                return false;
            }
            this.info = this.activeState.name + this.getStatesInfo()[this.target].name + "联盟瓦解";
            this.$emit("addnewhistory", this.info);
            this.$emit("removeally", this.activeState.code, this.target);
            this.$emit("decreaserelation", this.target, this.activeState.code, 2);
            this.$emit("decreaserelation", this.activeState.code, this.target, 1);
            this.nextActive();
        },
        skipBreach: function() {
            this.info = this.activeState.name + "国选择不毁约";
            this.nextActive();
        },
        skipAlly: function() {
            this.info = this.activeState.name + "国选择不缔盟";
            this.nextActive();
        },
        submitAlly: function() {
            if (this.target === "") {
                return false;
            }
            var result = this.AIacceptAllyOrNot(
                this.activeState.code, this.target, this.state, this.relations, this.rank
            );
            this.allyProcess(result);
        },
        allyProcess: function(result) {
            if (result) {
                this.info = this.getStatesInfo()[this.target].name + this.activeState.name + "两国结成同盟";
                this.$emit("addnewhistory", this.info);
                this.$emit("addnewally", this.activeState.code, this.target);
                this.$emit("increaserelation", this.activeState.code, this.target, 2);
                this.$emit("increaserelation", this.target, this.activeState.code, 1);
            } else {
                this.info = this.getStatesInfo()[this.target].name + "国拒绝与" + this.activeState.name + "国缔盟";
                this.$emit("decreaserelation", this.activeState.code, this.target, 1);
            }
            this.nextActive();
        },
        nextActive: function() {
            if (this.active < (this.rank.length - 1)) {
                this.active += 1; 
            } else {
                this.$emit("tonextstage");
            }
        }
    },
    watch: {
        stage: function() {
            this.active = 0;
        },
        active: function (newVal) {
            this.$nextTick(function () {
                if (this.stage === 0) {
                //缔盟阶段
                    if (this.player[this.orders[newVal]] !== 2) {
                        this.target = this.AIrequestAllyOrNot(
                            this.activeState.code, this.state, this.relations, this.rank
                        );
                        setTimeout(function () {
                            if (this.target !== "") {
                                var result;
                                if (this.player[this.target] !== 2) {
                                    result = this.AIacceptAllyOrNot(
                                        this.activeState.code, this.target, this.state, this.relations, this.rank
                                    );
                                } else {
                                    result = confirm(this.activeState.name + "国想与你结盟,是否同意?");
                                }
                                this.allyProcess(result);
                            } else {
                                this.skipAlly();
                            }
                        }.bind(this), this.settings.delay);
                    } else {
                        this.target = "";
                    }
                } else if (this.stage === 1) {
                //毁约阶段
                    if (this.player[this.orders[newVal]] !== 2) {
                        this.target = this.AIbreachAllyOrNot(
                            this.activeState.code, this.state[this.activeState.code].ally, this.state,
                            this.relations[this.activeState.code]
                        );
                        setTimeout(function () {
                            this.target !== "" ? this.submitBreach() : this.skipBreach();
                        }.bind(this), this.settings.delay);
                    } else {
                        this.target = "";
                    }
                } else if (this.stage === 2) {
                //运筹阶段
                    if (this.player[this.orders[newVal]] !== 2) {
                        this.target = null;
                        this.target = this.AIplanResult(
                            this.activeState.code, this.state[this.activeState.code].ally, 
                            this.state, this.cities, this.relations
                        )
                        setTimeout(function () {
                            this.$emit(
                                "updateorderofcities", this.state[this.activeState.code].occupy, 
                                this.target
                            );
                            this.info = this.activeState.name + "国完成筹备";
                            this.nextActive();
                        }.bind(this), this.settings.delay);
                    }
                } else if (this.stage === 3) {
                //劫掠阶段
                    if (this.state[this.activeState.code].orderType.indexOf(2) === -1) {
                        this.nextActive();
                    } else {
                        if (this.player[this.orders[newVal]] !== 2) {
                            var result = this.AIdecideDisturbTarget(
                                this.activeState.code, this.state, this.rank, this.cities,
                                this.relations[this.activeState.code]
                            );
                            setTimeout(function () {
                                this.disturbProcess(result);
                            }.bind(this), this.settings.delay);
                        } else {
                            this.target = {};
                        }
                    }
                } else if (this.stage === 4) {
                //行军阶段
                    if (this.state[this.activeState.code].orderType.indexOf(0) === -1) {
                        this.nextActive();
                    } else {
                        if (this.player[this.orders[newVal]] !== 2) {
                            
                        } else {
                            this.target = [];
                            this.reminder = "";
                        }
                    }
                }
            }.bind(this));
        }  
    },
    data: function() {
        return {
            active: null,
            info: null,
            target: [],
            reminder: null,
            cardStyle: {
                position: "fixed",
                left: "8pt",
                top: "8pt",
                width: "200pt",
                backgroundColor: "black",
                zIndex: "2",
                color: "white",
                borderRadius: "5pt",
                border: "2pt solid white",
                padding: "2pt 8pt"
            },
            roundStyle: {
                display: "block",
                textAlign: "center",
                fontSize: "11pt",
                fontWeight: "bold",
                padding: "3pt 0",
                width: "100%",
                borderBottom: "1pt solid lightgrey",
                marginBottom: "2pt"
            },
            descStyle: {
                display: "block",
                fontSize: "11pt",
                textAlign: "center",
                color: "lightgrey",
                marginBottom: "5pt"
            },
            flagStyle: {
                display: "block",
                textAlign: "center",
                fontSize: "10pt",
                height: "22pt"
            },
            selectStyle: {
                display: "inline-block",
                verticalAlign: "middle",
                fontSize: "10pt",
                padding: "3pt 0"
            },
            lineStyle: {
                display: "block",
                marginBottom: "5pt"
            },
            buttonStyle: {
                display: "inline-block",
                verticalAlign: "middle",
                fontSize: "9pt",
            },
            submitStyle: {
                display: "inline-block",
                verticalAlign: "middle",
                fontSize: "9pt",
                marginBottom: "5pt"
            },
            confirmStyle: {
                display: "block",
                fontSize: "9pt",
                marginBottom: "5pt"
            },
            infoStyle: {
                display: "block",
                borderTop: "1pt dashed lightgrey",
                fontSize: "9pt",
                padding: "3pt 0"
            },
            orderStyle: {
                display: "inline-block",
                verticalAlign: "middle",
                fontSize: "9pt",
                marginRight: "8pt",
                marginBottom: "5pt",
                border: "1pt solid gold",
                color: "gold",
                padding: "1pt",
                borderRadius: "2pt",
                cursor: "pointer"
            },
            setStyle: {
                display: "inline-block",
                verticalAlign: "middle",
                fontSize: "9pt",
                marginRight: "8pt",
                marginBottom: "5pt",
                border: "1pt solid darkslategrey",
                color: "darkslategrey",
                padding: "1pt",
                borderRadius: "2pt",
                cursor: "pointer"
            },
            boxStyle: {
                display: "inline-block",
                verticalAlign: "top",
                marginRight: "8pt",
                borderTop: "1pt dashed white",
                textAlign: "center",
                marginBottom: "8pt"
            },
            marchStyle: {
                display: "block",
                margin: "5pt 0",
                borderTop: "1pt solid lightgrey"
            },
            lineStyle: {
                display: "block",
                margin: "2pt 0"
            },
            forceStyle: {
                display: "inline-block",
                verticalAlign: "top",
                marginRight: "4pt",
                padding: "2pt 4pt",
                cursor: "pointer"
            },
            borderStyle: {
                border: "1pt solid lightgrey",
                borderRadius: "3pt",
            }
        };
    }
});