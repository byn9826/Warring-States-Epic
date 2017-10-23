Vue.component("fame-info", {
    props: ["data", "player", "type"],
    template: `
        <div v-bind:style="cardStyle">
            <div v-bind:style="typeStyle">
                <i 
                    v-bind:style="iconStyle" aria-hidden="true"
                    v-bind:class="['fa', type===1?'fa-flag':'fa-certificate']" 
                ></i>
                <div v-bind:style="titleStyle"
                    v-bind:title="
                        type === 1 ? 
                            '战斗胜利后,若胜利方军威排名低于失败方，则胜利方军威排名移至失败方军威之前,军威排名第一国家获得干将' : 
                            '每回合结束后,根据国家领地数量对霸业进行重新排序,霸业排名第一国家获得九鼎'
                    "
                >
                    {{type === 1 ? "军威" : "霸业"}}
                </div>
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
                marginBottom: "5pt"
            },
            typeStyle: {
                display: "inline-block",
                verticalAlign: "middle",
                borderLeft: "3pt solid darkslategrey",
                paddingLeft: "10pt",
                marginRight: "5pt",
                borderRadius: "3pt"
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
                fontSize: "11pt",
                backgroundColor: "transparent"
            },
            stateStyle: {
                display: "inline-block",
                verticalAlign: "middle",
                backgroundColor: "darkslategrey",
                padding: "0 10pt",
                color: "lightgrey",
            },
            nameStyle: {
                border: "1pt solid lightgrey",
                minWidth: "20pt",
                height: "20pt",
                lineHeight: "20pt",
                borderRadius: "50%",
                fontSize: "11pt",
                textAlign: "center",
                margin: "8pt 0"
            },
            activeStyle: {
                border: "1pt solid lightgrey",
                backgroundColor: this.player !== -1 ? this.getStatesInfo()[this.player].color : '',
                color: "white",
                minWidth: "20pt",
                height: "20pt",
                lineHeight: "20pt",
                borderRadius: "50%",
                fontSize: "11pt",
                textAlign: "center",
                margin: "8pt 0"
            }
        }  
    },
});