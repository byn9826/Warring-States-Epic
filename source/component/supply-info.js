Vue.component("supply-info", {
    props: ["data", "player"],
    template: `
        <div v-bind:style="cardStyle">
            <div v-for="(supply, i) in getStatesSupply()" v-if="i<8" v-bind:style="supplyStyle">
                <div v-html="getCityResourceIcon(1)+'*'+i" v-bind:style="iconStyle"></div>
                <div v-bind:style="limitStyle">
                    <span v-bind:style="maxStyle">兵力上限{{supply}}</span>
                    <span v-bind:style="maxStyle">区域上限4</span>
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
               if ((d.supply === i || (d.supply > 7 && i === 7)) && this.player[index] !== 0) {
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
                padding: "4pt",
                borderRadius: "3pt",
                textAlign: "center"
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