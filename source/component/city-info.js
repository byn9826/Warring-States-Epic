Vue.component("city-info", {
    props: ["definition", "data", "state", "player"],
    template: `
        <div v-bind:style="cardStyle">
            <div v-bind:style="armyStyle">
                <span v-bind:style="nameStyle">{{definition.name}}</span>
                <span v-bind:style="occupyStyle">{{state.name}}</span>
            </div>
            <div v-bind:style="armyStyle">
                <span v-if="data.army.length!==0&&data.occupy!==player" class="fa fa-shield" aria-hidden="true">
                    {{data.army.length}}
                </span>
                <span v-else-if="data.army.length!==0">
                    &#9823;{{getPlayerArmyCount[0]}}&#9822;{{getPlayerArmyCount[1]}}
                    &#9820;{{getPlayerArmyCount[2]}}&#9818;{{getPlayerArmyCount[3]}}
                </span>
                <template v-for="r in definition.resource">
                    <span v-html="getCityResourceIcon(r)"></span>
                </template>
            </div>
            <div v-bind:style="cityStyle" v-html="getCityTypeName(definition.type)">
            </div>
        </div>
    `,
    computed: {
        getPlayerArmyCount: function() {
            var count = [0, 0, 0, 0];
            this.data.army.forEach(function(type) {
                switch (type) {
                    case 0:
                        count[0] += 1;
                        break;
                    case 8:
                        count[1] += 1;
                        break;  
                    case 9:
                        count[2] += 1;
                        break;
                    default:
                        count[3] += 1;
                        break;
                }
            })
            return count;
        }  
    },
    data: function() {
        return {
            cardStyle: {
                position: "absolute",
                width: "70pt",
                backgroundColor: "lightgray",
                left: this.definition.position[0] + "pt",
                top: this.definition.position[1] + "pt",
                borderRadius: "3pt",
                paddingTop: "2pt",
                border: "1pt solid black",
                textAlign: "center"
            },
            armyStyle: {
                display: "block",
                fontSize: "9pt",
            },
            nameStyle: {
                fontWeight: "bold"
            },
            occupyStyle: {
                display: "inline-block",
                backgroundColor: this.state.color,
                borderRadius: "50%",
                color: "white",
                minWidth: "16pt",
                height: "16pt",
                lineHeight: "16pt",
                textAlign: "center",
                verticalAlign: "middle",
                fontSize: "9pt"
            },
            cityStyle: {
                display: "block",
                fontSize: "9pt",
                backgroundColor: "darkgrey",
                color: "white"
            }
        }  
    },
});