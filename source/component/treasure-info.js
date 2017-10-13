Vue.component("treasure-info", {
    props: ["occupy", "type"],
    template: `
        <div v-bind:style="cardStyle">
            <div v-bind:style="typeStyle">
                <i v-bind:style="iconStyle" class="fa" v-bind:class="getTreasureIcon" aria-hidden="true"></i>
                <div v-bind:style="titleStyle">{{getTreasureName}}</div>
                <div style="font-size:10pt;border-top:1pt solid darkslategrey;margin-top:5pt">
                    +1 {{getTreasureBonus}}
                </div>
            </div>
            <div v-bind:style="activeStyle">{{occupy}}</div>
        </div>
    `,
    computed: {
        getTreasureName: function() {
            switch (this.type) {
                case 0:
                    return "九鼎";
                case 1:
                    return "干将";
            }
        },
        getTreasureBonus: function() {
            switch (this.type) {
                case 0:
                    return "防守";
                case 1:
                    return "进攻";
            }
        },
        getTreasureIcon: function() {
            switch (this.type) {
                case 0:
                    return "fa-bell";
                case 1:
                    return "fa-tint";
            }
        },
    },
    data: function() {
        return {
            cardStyle: {
                display: "inline-block",
                verticalAlign: "middle",
                marginRight: "20pt",
                border: "1pt solid saddlebrown",
                borderRadius: "3pt",
                padding: "5pt"
            },
            typeStyle: {
                display: "inline-block",
                verticalAlign: "middle"
            },
            iconStyle: {
                display: "block",
                textAlign: "center",
                fontSize: "13x",
                color: "saddlebrown"
            },
            titleStyle: {
                display: "block",
                textAlign: "center",
                fontSize: "11pt"
            },
            activeStyle: {
                border: "1pt solid lightgrey",
                color: "black",
                fontSize: "11pt",
                textAlign: "center",
                margin: "8pt 0",
                display: "inline-block",
                verticalAlign: "middle",
                fontWeight: "bold"
            }
        }  
    },
});