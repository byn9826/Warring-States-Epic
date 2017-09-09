Vue.component("supply-info", {
    props: ["data", "player"],
    template: `
        <div v-bind:style="cardStyle">
            <div v-for="(supply, i) in getStatesSupply()" v-bind:style="supplyStyle">
                <div v-html="getCityResourceIcon(1)+'*'+i" v-bind:style="iconStyle"></div>
                <div v-bind:style="limitStyle">
                    <span v-for="s in supply" v-bind:style="maxStyle">{{s}}</span>
                </div>
                <div v-bind:style="limitStyle">
                    {{getSupplyMatches(i)}}
                </div>
            </div>
        </div>
    `,
    methods: {
        getSupplyMatches: function(i) {
            var matches = "";
            this.data.forEach(function(d, index) {
               if (d.supply === i && (this.player[index] === 1 || this.player[index] === 2)) {
                   matches += this.getStatesInfo()[index].name + " ";
               } 
            }.bind(this));
            return matches;
        }
    },
    data: function() {
        return {
            cardStyle: {
                display: "inline-block",
                verticalAlign: "top",
                marginLeft: "50pt"
            },
            supplyStyle: {
                display: "inline-block",
                verticalAlign: "top",
                backgroundColor: "indianred",
                marginRight: "3pt",
                padding: "8pt",
                borderRadius: "3pt"
            },
            iconStyle: {
                display: "block",
                textAlign: "center",
            },
            limitStyle: {
                borderTop: "2pt solid lightgrey",
                paddingTop: "5pt",
                marginTop: "5pt",
                maxWidth: "70pt",
                display: "block",
                fontSize: "12pt"
            },
            maxStyle: {
                backgroundColor: "black",
                color: "white",
                marginRight: "3pt",
                fontSize: "11pt",
                padding: "0 5pt",
                display: "inline-block",
                verticalAlign: "middle",
            }
        }  
    },
});