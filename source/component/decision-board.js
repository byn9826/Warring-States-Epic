Vue.component("decision-board", {
    props: ["stage", "active", "player", "state"],
    template: `
        <div v-bind:style="cardStyle">
            <header v-bind:style="roundStyle">{{getStageName(stage)}}</header>
            <div v-bind:style="descStyle">请选择想要向其递交盟书的国家</div>
            <div v-bind:style="lineStyle">
                <select v-model="allyState" v-bind:style="selectStyle">
                    <option disabled selected value="">-国家-</option>
                    <option v-for="(s, i) in getStatesInfo()" v-bind:value="i" v-if="player[i]!==0 && player[i]!==2" key="i">
                        {{s.name}}
                    </option>
                </select>
                <select v-model="allyLocation" v-if="allyState!==''" v-bind:style="selectStyle">
                    <option disabled selected value="">选择需要援军的地区</option>
                    <option v-for="(s, i) in state[allyState].occupy" key="i" v-bind:value="s">
                        {{getCitiesInfo()[s].name}}
                    </option>
                </select>
            </div>
            <div v-bind:style="descStyle" v-if="allyLocation!==''">
                用一点国力换取{{getStatesInfo()[allyState].name}}在{{getCitiesInfo()[allyLocation].name}}的援军
            </div>
            <div v-bind:style="lineStyle">
                <input v-bind:style="buttonStyle" type="button" value="递交盟书" v-on:click="submitAlly()" />
            </div>
        </div>
    `,
    updated: function() {
        console.log(this.allyLocation);
    },
    watch:{
        allyState: function() {
            this.allyLocation = "";
        }
    },
    methods: {
        submitAlly: function() {
            if (this.allyLocation === "") {
                return false;
            }
            console.log(this.AIacceptAllyOrNot());
        }
    },
    data: function() {
        return {
            allyState: "",
            allyLocation: "",
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
                cursor: "pointer"
            }
        }  
    },
});