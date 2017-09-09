Vue.component("occupy-info", {
    props: ["definition", "data", "state", "player"],
    template: `
        <div v-show="state.name" v-bind:style="cardStyle">
            <div v-bind:style="armyStyle">
                <span v-bind:style="occupyStyle">{{state.name}}</span>
                <span v-bind:style="orderStyle" v-if="getOrdersInfo()[data.order]">
                    {{getOrdersInfo()[data.order].name}}
                </span>
            </div>
            <div v-bind:style="armyStyle">
                <span v-if="data.army.length!==0&&data.occupy!==player" class="fa fa-shield" aria-hidden="true">
                    {{data.army.length}}
                </span>
                <template v-else-if="data.army.length!==0" v-for="a in data.army" v-bind:style="iconStyle">
                    <span v-html="getArmyIcon(a)"></span>
                </template>
            </div>
        </div>
    `,
    data: function() {
        return {
            cardStyle: {
                position: "absolute",
                width: "55pt",
                backgroundColor: this.state.color,
                left: this.definition.location[0] + "pt",
                top: this.definition.location[1] + "pt",
                borderRadius: "3pt",
                padding: "1pt 0",
                textAlign: "center",
                borderBottom: "1px solid black",
                borderRight: "1px solid black",
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
                backgroundColor: "darkslategray",
                color: "white",
                display: "inline-block",
                verticalAlign: "middle",
            },
            occupyStyle: {
                display: "inline-block",
                verticalAlign: "middle",
                backgroundColor: this.state.color,
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