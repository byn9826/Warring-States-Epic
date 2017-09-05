Vue.component("decision-board", {
    props: ["stage", "active", "player", "state", "total", "relations", "rank"],
    template: `
        <div v-bind:style="cardStyle">
            <header v-bind:style="roundStyle">
                {{getStageName(stage)}} {{getStatesAllies(state[player.indexOf(2)])}}
            </header>
            <div v-bind:style="descStyle">请选择想要向其递交盟书的国家</div>
            <div v-bind:style="lineStyle">
                <select v-model="allyState" v-bind:style="selectStyle">
                    <option disabled selected value="">-国家-</option>
                    <option 
                        v-for="(s, i) in getStatesInfo()" v-bind:value="i"
                        v-if="player[i]!==0 && player[i]!==2 && state[player.indexOf(2)].ally.indexOf(s.code) === -1" 
                    >
                        {{s.name}}
                    </option>
                </select>
                <input 
                    v-show="allyState!==''" v-bind:style="buttonStyle" 
                    type="button" value="递交盟书" v-on:click="submitAlly()" 
                />
            </div>
        </div>
    `,
    methods: {
        submitAlly: function() {
            if (this.allyState === "") {
                return false;
            }
            var result = this.AIacceptAllyOrNot(
                this.player.indexOf(2), this.allyState, this.state, this.total, this.relations, this.rank
            );
            console.log(result);
        }
    },
    data: function() {
        return {
            allyState: "",
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
                marginBottom: "5px"
            },
            buttonStyle: {
                display: "inline-block",
                verticalAlign: "middle",
                cursor: "pointer",
                fontSize: "11px"
            }
        }  
    },
});