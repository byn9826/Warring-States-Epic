Vue.component("occupy-info", {
    props: [
        "definition", "data", "state", "player", "stage", "states",
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
                    v-if="data.army.length!==0&&data.occupy!==player&&states[player].ally.indexOf(data.occupy)===-1" 
                    class="fa fa-shield" aria-hidden="true"
                >
                    {{data.status.filter(function(a) {return a === 1}).length + "/" +  data.army.length}}
                </span>
                <template 
                    v-else-if="data.army.length!==0" v-for="(a, i) in data.army" v-bind:style="iconStyle"
                >
                    <span v-bind:style="data.status[i]===1?'color:white':'color:darkgrey'" v-html="getArmyIcon(a)"></span>
                </template>
            </div>
        </div>
    `,
    methods: {
        onDrop: function(e) {
            if (this.data.occupy === this.player) {
                this.$emit("saveitemorder", e.code, 1);
            }
        },
        clickCity: function() {
            if (
                this.data.order !== null && this.getOrdersInfo()[this.data.order].type === 0
                && this.data.occupy === this.player && this.stage === 4
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