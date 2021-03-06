Vue.component("occupy-info", {
    props: [
        "definition", "data", "state", "player", "stage", "states", "mist",
        "saveitemorder", "updatefocusvariable"
    ],
    template: `
        <div 
            v-show="state.name" @dragover.prevent @drop="onDrop(definition)"
            v-on:click="clickCity" v-bind:style="[cardStyle, {backgroundColor: state.color}]"
        >
            <div v-bind:style="armyStyle">
                <span v-bind:style="[occupyStyle, {backgroundColor: state.color}]">{{state.name}}</span>
                <span v-bind:style="orderStyle" v-if="getOrdersInfo()[data.order]">
                    {{stage === 2&&data.occupy!==player?" ? ":getOrdersInfo()[data.order].name}}
                </span>
            </div>
            <div v-bind:style="armyStyle">
                <span 
                    v-if="
                        player !== -1 && data.army.length !== 0 && data.occupy !== player 
                        && states[player].ally.indexOf(data.occupy) === -1 && mist === 1
                    " 
                    class="fa fa-shield" aria-hidden="true"
                    style="background-color: transparent"
                    title="可战斗军团数 / 总军团数"
                >
                    {{data.status.filter(function(a) {return a === 1}).length + "/" +  data.army.length}}
                </span>
                <span 
                    v-else-if="data.army.length !== 0" v-for="(a, i) in data.army"
                >
                    <span 
                        v-bind:style="data.status[i]===1?'color:white;background-color:transparent':'color:darkgrey;background-color:transparent'" 
                        v-html="getArmyIcon(a)"
                        v-bind:title="data.status[i] === 1 ? getArmyInfo()[a].name + '军团,可战斗' : getArmyInfo()[a].name + '军团,休整中'"
                    >
                    </span>
                </span>
            </div>
        </div>
    `,
    methods: {
        onDrop: function(e) {
            if (this.data.occupy === this.player && this.data.army.length !== 0) {
                this.$emit("saveitemorder", e.code, 1);
            }
        },
        clickCity: function() {
            if (
                this.data.order !== null && this.getOrdersInfo()[this.data.order].type === 0
                && this.data.occupy === this.player && this.stage === 4
                && app.$refs.board.activeState.code === this.player
            ) {
                this.$emit("updatefocusvariable", this.data.code);
            }
        }
    },
    data: function() {
        return {
            cardStyle: {
                position: "absolute",
                width: "55pt",
                left: this.definition.location[0] + "pt",
                top: this.definition.location[1] + "pt",
                borderRadius: "3pt",
                padding: "1pt 0",
                textAlign: "center",
                borderBottom: "1pt solid black",
                borderRight: "1pt solid black",
                cursor: this.stage===4&&this.data.occupy===this.player&&this.data.order!==null&&this.getOrdersInfo()[this.data.order].type===0?"pointer":"default"
            },
            armyStyle: {
                display: "block",
                fontSize: "11pt",
                color: "white"
            },
            iconStyle: {
                fontSize: "13pt",
            },
            orderStyle: {
                fontSize: "9pt",
                padding: "1pt",
                borderRadius: "5pt",
                backgroundColor: "red",
                color: "white",
                display: "inline-block",
                verticalAlign: "middle",
            },
            occupyStyle: {
                display: "inline-block",
                verticalAlign: "middle",
                borderRadius: "50%",
                color: "white",
                minWidth: "16pt",
                height: "16pt",
                lineHeight: "16pt",
                textAlign: "center",
                fontSize: "9pt"
            }
        }  
    },
});