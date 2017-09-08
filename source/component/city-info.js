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
            <div v-bind:style="cityStyle" v-html="getCityTypeName(definition.type)"></div>
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
                width: "80px",
                backgroundColor: "lightgray",
                left: this.definition.position[0] + "px",
                top: this.definition.position[1] + "px",
                borderRadius: "3px",
                padding: "1px",
                border: "1px solid black",
                textAlign: "center"
            },
            armyStyle: {
                display: "block",
                fontSize: "11px",
            },
            nameStyle: {
                fontWeight: "bold"
            },
            occupyStyle: {
                display: "inline-block",
                backgroundColor: this.state.color,
                borderRadius: "50%",
                color: "white",
                minWidth: "18px",
                height: "18px",
                lineHeight: "18px",
                textAlign: "center",
                verticalAlign: "middle",
                fontSize: "11px"
            },
            cityStyle: {
                display: "block",
                fontSize: "11px",
                backgroundColor: "darkgrey",
                color: "white"
            }
        }  
    },
});