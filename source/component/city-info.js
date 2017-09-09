Vue.component("city-info", {
    props: ["definition"],
    template: `
        <div v-bind:style="cardStyle">
            <span v-bind:style="nameStyle">{{definition.name}}</span>
            <span v-bind:style="resourceStyle" v-html="getCityResourceIcon(r)" v-for="r in definition.resource">
            </span>
            <div v-bind:style="cityStyle" v-html="getCityTypeName(definition.type)">
            </div>
        </div>
    `,
    data: function() {
        return {
            cardStyle: {
                position: "absolute",
                left: this.definition.position[0] + "pt",
                top: this.definition.position[1] + "pt",
                textAlign: "center"
            },
            nameStyle: {
                display: "inline-block",
                verticalAlign: "middle",
                fontSize: "15pt",
                fontStyle: "italic",
                color: "darkslategrey",
                textShadow: "1pt 1pt lightgray"
            },
            resourceStyle: {
                display: "inline-block",
                verticalAlign: "middle",
                fontSize: "12pt"
            },
            cityStyle: {
                display: "inline-block",
                verticalAlign: "middle",
                fontSize: "14pt"
            }
        }  
    },
});