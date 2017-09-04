Vue.component("city-info", {
    props: ["definition", "data", "state"],
    template: `
        <div v-bind:style="cardStyle">
            <div v-bind:style="armyStyle">
                <span v-bind:style="nameStyle">{{definition.name}}</span>
                <span v-bind:style="occupyStyle">{{state.name}}</span>
            </div>
            <div v-bind:style="armyStyle">
                <span v-show="data.army.length!==0" class="fa fa-shield" aria-hidden="true">
                    {{data.army.length}}
                </span>
                <template v-for="r in definition.resource">
                    <span v-html="getCityResourceIcon(r)"></span>
                </template>
            </div>
            <div v-bind:style="cityStyle" v-html="getCityTypeName(definition.type)"></div>
        </div>
    `,
    data: function() {
        return {
            cardStyle: {
                position: "absolute",
                width: "65px",
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
                fontSize: "12px",
                backgroundColor: "darkgrey",
                color: "white"
            }
        }  
    },
});