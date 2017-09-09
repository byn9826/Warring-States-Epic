Vue.component("decision-board", {
    props: [
        "stage", "player", "state", "relations", "rank", "orders", "settings", "addnewally",
        "addnewhistory", "tonextstage", "removeally", "increaserelation", "decreaserelation",
        "updateorderofcities"
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
            <section v-else-if="stage === 1 && player[orders[active]] === 2">
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
            <section v-else-if="stage === 2 && player[orders[active]] === 2">
                <div v-bind:style="descStyle">{{getStatesAllies(state[activeState.code]) || "无盟友"}}</div>
                <div v-bind:style="descStyle">请进行战略布局</div>
                <div v-bind:style="lineStyle">
                    <div 
                        v-for="(city, i) in state[activeState.code].occupy" 
                        v-bind:style="occupyStyle"
                    >
                        <div>{{getCitiesInfo()[city].name}}</div>
                        <select v-model="orderPlan[i]" v-bind:style="optionStyle">
                            <option selected value="">无指令</option>
                            <option 
                                v-for="order in getOrdersInfo()" v-bind:value="order.code"
                                v-show="orderPlan.indexOf(order.code)===-1"
                            >
                                {{order.name}}
                            </option>
                        </select>
                    </div>
                    <input 
                        v-bind:style="buttonStyle" type="button" value="布局完毕" 
                        v-on:click="submitPlan()"
                    />
                </div>
                <div v-bind:style="descStyle">可用指令</div>
                <div v-bind:style="lineStyle">
                    <span 
                        v-for="order in getOrdersInfo()" 
                        v-bind:style="orderPlan.indexOf(order.code)===-1?orderStyle:setStyle"
                    >
                        {{order.name}}
                    </span>
                </div>
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
                        this.allyTarget = this.AIrequestAllyOrNot(
                            this.activeState.code, this.state, this.relations, this.rank
                        );
                        setTimeout(function () {
                            if (this.allyTarget !== "") {
                                var result;
                                if (this.player[this.allyTarget] !== 2) {
                                    result = this.AIacceptAllyOrNot(
                                        this.activeState.code, this.allyTarget, this.state, this.relations, this.rank
                                    );
                                } else {
                                    result = confirm(this.activeState.name + "国想与你结盟,是否同意?");
                                }
                                this.allyProcess(result);
                            } else {
                                setTimeout(function () {
                                    this.skipAlly();
                                }.bind(this), this.settings.delay);
                            }
                        }.bind(this), this.settings.delay);
                    } else {
                        this.allyTarget = "";
                    }
                } else if (this.stage === 1) {
                //毁约阶段
                    if (this.player[this.orders[newVal]] !== 2) {
                        this.allyTarget = this.AIbreachAllyOrNot(
                            this.activeState.code, this.state[this.activeState.code].ally, this.state,
                            this.relations[this.activeState.code]
                        );
                        setTimeout(function () {
                            if (this.allyTarget !== "") {
                                this.submitBreach();
                            } else {
                                this.skipBreach();
                            }
                        }.bind(this), this.settings.delay);
                    } else {
                        this.allyTarget = "";
                    }
                } else if (this.stage === 2) {
                //运筹阶段
                    if (this.player[this.orders[newVal]] !== 2) {
                        this.orderPlan = this.AIplanResult(
                            this.activeState.code, this.state[this.activeState.code].ally, this.state
                        )
                        console.log(this.orderPlan);
                    } else {
                        this.orderPlan = new Array(
                            this.state[this.activeState.code].occupy.length
                        ).fill("");
                    }
                }
            }.bind(this));
        }  
    },
    methods: {
        submitPlan: function() {
            this.info = this.activeState.name + "国完成筹备"
            this.$emit("updateorderofcities", this.state[this.activeState.code].occupy, this.orderPlan);
            this.nextActive();
        },
        submitBreach: function() {
            if (this.allyTarget === "") {
                return false;
            }
            this.info = this.activeState.name + this.getStatesInfo()[this.allyTarget].name + "联盟瓦解";
            this.$emit("addnewhistory", this.info);
            this.$emit("removeally", this.activeState.code, this.allyTarget);
            this.$emit("decreaserelation", this.allyTarget, this.activeState.code, 2);
            this.$emit("decreaserelation", this.activeState.code, this.allyTarget, 1);
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
            if (this.allyTarget === "") {
                return false;
            }
            var result = this.AIacceptAllyOrNot(
                this.activeState.code, this.allyTarget, this.state, this.relations, this.rank
            );
            this.allyProcess(result);
        },
        allyProcess: function(result) {
            if (result) {
                this.info = this.getStatesInfo()[this.allyTarget].name + this.activeState.name + "两国结成同盟";
                this.$emit("addnewhistory", this.info);
                this.$emit("addnewally", this.activeState.code, this.allyTarget);
                this.$emit("increaserelation", this.activeState.code, this.allyTarget, 2);
                this.$emit("increaserelation", this.allyTarget, this.activeState.code, 1);
            } else {
                this.info = this.getStatesInfo()[this.allyTarget].name + "国拒绝与" + this.activeState.name + "国缔盟";
                this.$emit("decreaserelation", this.activeState.code, this.allyTarget, 1);
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
            allyTarget: "",
            orderPlan: [],
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
                padding: "0 8pt"
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
                marginBottom: "8pt"
            },
            buttonStyle: {
                display: "inline-block",
                verticalAlign: "middle",
                cursor: "pointer",
                fontSize: "9pt"
            },
            infoStyle: {
                display: "block",
                borderTop: "1pt dashed lightgrey",
                fontSize: "9pt",
                padding: "3pt 0"
            },
            occupyStyle: {
                display: "inline-block",
                verticalAlign: "middle",
                fontSize: "9pt",
                marginRight: "5pt",
                marginBottom: "5pt",
                border: "1pt solid lightgrey",
                padding: "1pt",
                textAlign: "center",
                borderRadius: "3pt"
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
                borderRadius: "2pt"
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
                borderRadius: "2pt"
            },
            optionStyle: {
                fontSize: "9pt",
                backgroundColor: "lightgrey"
            },
        };
    }
});