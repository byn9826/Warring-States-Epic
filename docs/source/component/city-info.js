Vue.component("city-info", {
    props: ["definition"],
    template: `
        <div v-bind:style="cardStyle">
            <span v-bind:style="nameStyle">{{definition.name}}</span>
            <span 
                v-bind:style="resourceStyle" 
                v-for="r in definition.resource"
                v-html="getCityResourceIcon(r)" 
                v-bind:title="getCityResourceDesc(r)"
            >
            </span>
            <div v-bind:style="cityStyle" v-html="getCityTypeName(definition.type)"
                v-bind:title="getCityTypeDesc(definition.type)"
            >
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
                fontSize: "12pt",
                backgroundColor: "transparent"
            },
            cityStyle: {
                display: "inline-block",
                verticalAlign: "middle",
                fontSize: "14pt",
                backgroundColor: "transparent"
            }
        }  
    },
});