Vue.component('city-info', {
    props: ['definition', 'data', 'state'],
    template: `
        <div v-bind:style="cardStyle">
            <div v-bind:style="armyStyle">
                <span class="fa fa-shield" aria-hidden="true"> {{data.army.length}}</span>
                <span v-bind:style="occupyStyle">{{getStateName(data.occupy)}}</span>
            </div>
            <div v-bind:style="resourceStyle">
                <template v-for="r in definition.resource">
                    <span v-if="r===0">&#128081;</span>
                    <span v-else>&#127838;</span>
                </template>
            </div>
        </div>
    `,
    data: function() {
        return {
            cardStyle: {
                position: "absolute",
                width: "50px",
                backgroundColor: "lightgray",
                left: this.definition.position[0] + "px",
                top: this.definition.position[1] + "px",
                borderRadius: "3px",
                padding: "2px",
                border: "1px solid black",
                textAlign: "center"
            },
            armyStyle: {
                display: "block",
                fontSize: "14px",
                marginBottom: "3px"
            },
            occupyStyle: {
                display: "inline-block",
                fontSize: "11px",
                backgroundColor: this.state.color,
                borderRadius: "50%",
                color: "white",
                width: "18px",
                height: "18px",
                lineHeight: "18px",
                textAlign: "center",
                verticalAlign: "middle"
            },
            resourceStyle: {
                display: "block",
                fontSize: "10px"
            }
        }  
    },
});