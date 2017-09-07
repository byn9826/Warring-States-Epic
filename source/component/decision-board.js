Vue.component("decision-board", {
    props: [
        "stage", "player", "state", "total", "relations", "rank", "orders", "settings", "addnewally",
        "addnewhistory", "tonextstage", "removeally"
    ],
    template: `
        <div v-bind:style="cardStyle">
            <header v-bind:style="roundStyle">
                {{getStageName(stage)}} 
            </header>
            <section v-if="stage === 0 && player[orders[0][active]] === 2">
                <div v-bind:style="descStyle">{{getStatesAllies(state[activeState.code]) || "无盟友"}}</div>
                <div v-bind:style="descStyle">请选择想要缔盟的国家</div>
                <div v-bind:style="lineStyle">
                    <select v-model="allyTarget" v-bind:style="selectStyle">
                        <option disabled selected value="">-国家-</option>
                        <option 
                            v-for="(s, i) in getStatesInfo()" v-bind:value="i"
                            v-if="player[i]!==0 && player[i]!==2 && state[activeState.code].ally.indexOf(s.code) === -1" 
                        >
                            {{s.name}}
                        </option>
                    </select>
                    <input 
                        v-show="allyTarget!==''" v-bind:style="buttonStyle" 
                        type="button" value="递交盟书" v-on:click="submitAlly()" 
                    />
                    <input 
                        v-bind:style="buttonStyle" 
                        type="button" value="不缔盟" v-on:click="skipAlly()" 
                    />
                </div>
            </section>
            <section v-else-if="stage === 0 && player[orders[0][active]] !== 2">
                <div v-bind:style="descStyle">{{activeState.name}}国正在进行缔盟 ...</div>
            </section>
            <section v-if="stage === 1 && player[orders[0][active]] === 2">
                <div v-bind:style="descStyle">{{getStatesAllies(state[activeState.code]) || "无盟友"}}</div>
                <div v-bind:style="descStyle">请选择想要毁约的国家</div>
                <div v-bind:style="lineStyle">
                    <select v-model="allyTarget" v-bind:style="selectStyle">
                        <option disabled selected value="">-国家-</option>
                        <option 
                            v-for="(s, i) in state[activeState.code].ally" v-bind:value="s"
                        >
                            {{getStatesInfo()[s].name}}
                        </option>
                    </select>
                    <input 
                        v-show="allyTarget!==''" v-bind:style="buttonStyle" 
                        type="button" value="撕毁盟约" v-on:click="submitBreach()" 
                    />
                    <input 
                        v-bind:style="buttonStyle" 
                        type="button" value="不毁约" v-on:click="skipBreach()" 
                    />
                </div>
            </section>
            <section v-else-if="stage === 1 && player[orders[0][active]] !== 2">
                <div v-bind:style="descStyle">{{activeState.name}}国正在密谋毁约 ...</div>
            </section>
            <div v-show="info" v-bind:style="infoStyle">{{info}}</div>
        </div>
    `,
    computed: {
        activeState: function() {
            return this.getStatesInfo()[this.orders[0][this.active]];
        },
        playerList: function() {
            var list = [];
            this.player.forEach(function(p, i) {
                if (p !== 0) {
                    list.push(i);
                } 
            });
            return list;
        }
    },
    created: function() {
        this.active = 0;
    },
    watch: {
        stage: function() {
            this.active = 0;
        },
        active: function (newVal) {
            this.$nextTick(function () {
                if (this.stage === 0) {
                //缔盟阶段
                    if (this.player[this.orders[0][newVal]] !== 2 && this.active < this.orders[0].length) {
                    //AI流程
                        this.allyTarget = this.AIrequestAllyOrNot(
                            this.activeState.code, this.state, this.total, this.relations, this.rank, 
                            this.playerList
                        );
                        if (this.allyTarget !== "") {
                        //AI选择递交盟书
                            setTimeout(function () {
                                var result;
                                if (this.player[this.allyTarget] !== 2) {
                                //缔盟目标为AI
                                    result = this.AIacceptAllyOrNot(
                                        this.activeState.code, this.allyTarget, this.state, this.total, 
                                        this.relations, this.rank
                                    );
                                } else {
                                //缔盟目标为玩家
                                    result = confirm(this.activeState.name + "国想与你结盟,是否同意?");
                                }
                                this.allyProcess(result);
                            }.bind(this), this.settings.delay);
                        } else {
                        //AI选择不缔盟
                            setTimeout(function () {
                                this.skipAlly();
                            }.bind(this), this.settings.delay);
                        }
                    } else {
                    //玩家流程
                        this.allyTarget = "";
                    }
                } else if (this.stage === 1) {
                //毁约阶段
                    if (this.player[this.orders[0][newVal]] !== 2 && this.active < this.orders[0].length) {
                    //AI流程
                        this.allyTarget = this.AIbreachAllyOrNot(
                            this.state[this.activeState.code].ally
                        );
                        console.log(this.allyTarget);
                        if (this.allyTarget !== "") {
                        //AI选择毁约
                        } else {
                        //AI选择不毁约
                            setTimeout(function () {
                                this.skipBreach();
                            }.bind(this), this.settings.delay);
                        }
                    } else {
                    //玩家流程
                        this.allyTarget = "";
                    }
                }
                
            }.bind(this));
        }  
    },
    methods: {
        submitBreach: function() {
            if (this.allyTarget === "") {
                return false;
            }
            this.info = this.activeState.name + this.getStatesInfo()[this.allyTarget].name + "联盟瓦解";
            this.$emit("addnewhistory", this.info);
            this.$emit("removeally", this.activeState.code, this.allyTarget);
            this.active += 1;
        },
        skipBreach: function() {
            this.info = this.activeState.name + "国选择不毁约";
            if (this.active < (this.playerList.length - 1)) {
                this.active += 1;
            } else {
                this.$emit("tonextstage");
            }
        },
        skipAlly: function() {
            this.info = this.activeState.name + "国选择不缔盟";
            if (this.active < (this.playerList.length - 1)) {
                this.active += 1;
            } else {
                this.$emit("tonextstage");
            }
        },
        submitAlly: function() {
            if (this.allyTarget === "") {
                return false;
            }
            var result = this.AIacceptAllyOrNot(
                this.activeState.code, this.allyTarget, this.state, this.total, this.relations, this.rank
            );
            this.allyProcess(result);
        },
        allyProcess: function(result) {
            if (result) {
                this.info = this.getStatesInfo()[this.allyTarget].name + this.activeState.name + "两国结成同盟";
                this.$emit("addnewhistory", this.info);
                this.$emit("addnewally", this.activeState.code, this.allyTarget);
            } else {
                this.info = this.getStatesInfo()[this.allyTarget].name + "国拒绝与" + this.activeState.name + "国缔盟";
            }
            if (this.active < (this.playerList.length - 1)) {
                this.active += 1; 
            } else {
                this.$emit("tonextstage");
            }
        },
    },
    data: function() {
        return {
            active: null,
            info: null,
            allyTarget: "",
            cardStyle: {
                position: "absolute",
                left: "10px",
                top: "10px",
                width: "210px",
                backgroundColor: "black",
                zIndex: "2",
                color: "white",
                borderRadius: "5px",
                border: "2px solid white",
                padding: "0 15px"
            },
            roundStyle: {
                display: "block",
                textAlign: "center",
                fontSize: "11px",
                fontWeight: "bold",
                padding: "3px 0",
                width: "100%",
                borderBottom: "1px solid lightgrey",
                marginBottom: "2px"
            },
            descStyle: {
                display: "block",
                fontSize: "11px",
                textAlign: "center",
                color: "lightgrey",
                marginBottom: "5px"
            },
            selectStyle: {
                display: "inline-block",
                verticalAlign: "middle"
            },
            lineStyle: {
                display: "block",
                marginBottom: "10px"
            },
            buttonStyle: {
                display: "inline-block",
                verticalAlign: "middle",
                cursor: "pointer",
                fontSize: "11px"
            },
            infoStyle: {
                display: "block",
                borderTop: "1px dashed lightgrey",
                fontSize: "11px",
                padding: "3px 0"
            }
        };
    }
});