Vue.component("decision-board", {
    props: ["stage", "player", "state", "total", "relations", "rank", "orders", "addnewally"],
    template: `
        <div v-bind:style="cardStyle">
            <header v-bind:style="roundStyle">
                {{getStageName(stage)}} 
            </header>
            <section v-if="stage === 0 && player[orders[0][active]] === 2">
                <div v-bind:style="descStyle">现有{{getStatesAllies(state[activeState.code])}}</div>
                <div v-bind:style="descStyle">请选择想要递交盟书的国家</div>
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
                </div>
            </section>
            <section v-else-if="stage === 0 && player[orders[0][active]] !== 2">
                <div v-bind:style="descStyle">{{activeState.name}}国正在进行缔盟 ...</div>
            </section>
            <div v-show="info" v-bind:style="infoStyle">{{info}}</div>
        </div>
    `,
    computed: {
        activeState: function() {
            return this.getStatesInfo()[this.orders[0][this.active]];
        }    
    },
    created: function() {
        this.active = 0;  
    },
    watch: {
        active: function (newVal) {
            this.$nextTick(function () {
                if (this.player[this.orders[0][newVal]] !== 2 && this.active < (this.orders[0].length - 1)) {
                    this.allyTarget = 2;
                    setTimeout(function () {
                        var result;
                        if (this.player[this.allyTarget] !== 2) {
                            result = this.AIacceptAllyOrNot(
                                this.orders[0][this.active], this.allyTarget, this.state, this.total, 
                                this.relations, this.rank
                            );
                        } else {
                            result = confirm(this.activeState.name + "国想与你结盟,是否同意?");
                        }
                        this.allyProcess(result);
                    }.bind(this), 3000);
                } else {
                    this.allyTarget = "";
                }
              //now, DOM will have been updated.
            }.bind(this));
        }  
    },
    methods: {
        submitAlly: function() {
            if (this.allyTarget === "") {
                return false;
            }
            var result = this.AIacceptAllyOrNot(
                this.orders[0][this.active], this.allyTarget, this.state, this.total, this.relations, this.rank
            );
            this.allyProcess(result);
        },
        allyProcess: function(result) {
            if (result) {
                this.info = this.getStatesInfo()[this.allyTarget].name + this.activeState.name + "两国结成同盟";
                this.$emit("addnewally", this.orders[0][this.active], this.allyTarget);
            } else {
                this.info = this.getStatesInfo()[this.allyTarget].name + "国拒绝与" + this.activeState.name + "国的同盟";
            }
            this.active += 1;
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
        }  
    },
});