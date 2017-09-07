Vue.component("fame-info", {
    props: ["data", "player"],
    template: `
        <div v-bind:style="cardStyle">
            <div v-bind:style="typeStyle">
                <i v-bind:style="iconStyle" class="fa fa-certificate" aria-hidden="true"></i>
                <div v-bind:style="titleStyle">霸业</div>
            </div>
            <div v-for="d in data" v-bind:style="stateStyle">
                <div v-bind:style="player!==d?nameStyle:activeStyle">{{getStatesInfo()[d].name}}</div>
            </div>
        </div>
    `,
    data: function() {
        return {
            cardStyle: {
                display: "block",
                marginBottom: "5px"
            },
            typeStyle: {
                display: "inline-block",
                verticalAlign: "middle",
                borderLeft: "3px solid darkslategrey",
                paddingLeft: "10px",
                marginRight: "5px",
                borderRadius: "3px"
            },
            iconStyle: {
                display: "block",
                textAlign: "center",
                fontSize: "13x",
                color: "darkred"
            },
            titleStyle: {
                display: "block",
                textAlign: "center",
                fontSize: "11px"
            },
            stateStyle: {
                display: "inline-block",
                verticalAlign: "middle",
                backgroundColor: "darkslategrey",
                padding: "0 10px",
                color: "lightgrey",
            },
            nameStyle: {
                border: "1px solid lightgrey",
                minWidth: "20px",
                height: "20px",
                lineHeight: "20px",
                borderRadius: "50%",
                fontSize: "11px",
                textAlign: "center",
                margin: "8px 0"
            },
            activeStyle: {
                border: "1px solid lightgrey",
                backgroundColor: this.getStatesInfo()[this.player].color,
                color: "white",
                minWidth: "20px",
                height: "20px",
                lineHeight: "20px",
                borderRadius: "50%",
                fontSize: "11px",
                textAlign: "center",
                margin: "8px 0"
            }
        }  
    },
});