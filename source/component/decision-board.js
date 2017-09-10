Vue.component("decision-board", {
    props: [
        "stage", "player", "state", "relations", "rank", "orders", "settings", "addnewally",
        "addnewhistory", "tonextstage", "removeally", "increaserelation", "decreaserelation",
        "saveitemorder", "updateorderofcities"
    ],
    template: `
        <div v-bind:style="cardStyle">
            <header v-bind:style="roundStyle">
                {{getStageName(stage)}} 
            </header>
            <section v-if="stage === 0 && player[orders[active]] === 2">
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
            <section v-else-if="stage === 1 && player[orders[active]] === 2">
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
            <section v-else-if="stage === 2 && player[orders[active]] === 2">
                <div v-bind:style="descStyle">{{getStatesAllies(state[activeState.code]) || "无盟友"}}</div>
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
            <section v-else>
                <div v-bind:style="descStyle">{{activeState.name}}国正在{{getStageDescName(stage)}} ...</div>
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
    updated: function() {
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
                        this.target = this.AIplanResult(
                            this.activeState.code, this.state[this.activeState.code].ally, this.state
                        )
                        console.log(this.target);
                    } else {
                        this.target = new Array(
                            this.state[this.activeState.code].occupy.length
                        ).fill("");
                    }
                }
            }.bind(this));
        }  
    },
    methods: {
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
            this.info = this.activeState.name + "国完成筹备"
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
    data: function() {
        return {
            active: null,
            info: null,
            target: [],
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
            }
        };
    }
});