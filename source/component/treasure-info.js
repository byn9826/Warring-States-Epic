Vue.component("treasure-info", {
    props: ["occupy", "type"],
    template: `
        <div v-bind:style="cardStyle">
            <div v-bind:style="typeStyle">
                <i v-bind:style="iconStyle" class="fa" v-bind:class="getTreasureIcon" aria-hidden="true"></i>
                <div v-bind:style="titleStyle">{{getTreasureName}}</div>
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
                case 2:
                    return "张仪";
            }
        },
        getTreasureIcon: function() {
            switch (this.type) {
                case 0:
                    return "fa-bell";
                case 1:
                    return "fa-tint";
                case 2:
                    return "fa-user";
            }
        },
    },
    data: function() {
        return {
            cardStyle: {
                display: "inline-block",
                verticalAlign: "middle",
                marginRight: "20px",
                border: "1px solid saddlebrown",
                borderRadius: "3px",
                padding: "5px"
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
                fontSize: "11px"
            },
            activeStyle: {
                border: "1px solid lightgrey",
                color: "black",
                borderBottom: "1px solid darkslategrey",
                fontSize: "11px",
                textAlign: "center",
                margin: "8px 0",
                display: "inline-block",
                verticalAlign: "middle",
                fontWeight: "bold"
            }
        }  
    },
});