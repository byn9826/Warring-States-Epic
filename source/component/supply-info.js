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
               if (d.supply === i && this.player[index] === 1) {
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
                marginLeft: "50px"
            },
            supplyStyle: {
                display: "inline-block",
                verticalAlign: "top",
                backgroundColor: "indianred",
                marginRight: "3px",
                padding: "8px",
                borderRadius: "3px"
            },
            iconStyle: {
                display: "block",
                textAlign: "center",
            },
            limitStyle: {
                borderTop: "2px solid lightgrey",
                paddingTop: "5px",
                marginTop: "5px",
                maxWidth: "70px",
                display: "block",
                fontSize: "12px"
            },
            maxStyle: {
                backgroundColor: "black",
                color: "white",
                marginRight: "3px",
                fontSize: "11px",
                padding: "0 5px",
                display: "inline-block",
                verticalAlign: "middle",
            }
        }  
    },
});