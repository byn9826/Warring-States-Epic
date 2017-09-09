Vue.component("state-info", {
    props: ["definition", "player", "data", "power", "hero", "relations", "rank"],
    template: `
        <div v-bind:style="cardStyle">
            <div v-bind:style="headerStyle">
                <span v-bind:style="player?activeStyle:nameStyle">
                    {{definition.name}}
                </span>
                <span v-bind:style="occupyStyle">
                    都会 {{data.capital.length}} 城市 {{data.city.length}} 国库 {{power[definition.code]}}
                </span>
            </div>
            <div v-bind:style="strengthStyle">
                <span v-bind:style="armyStyle">
                    兵力{{data.army.length}}
                    <span v-if="player">
                        {{"- " + getArmyDetail}}
                    </span>
                </span>
            </div>
            <div v-bind:style="strengthStyle">
                <span v-bind:style="armyStyle">
                    主将 {{getActiveHeroCount}}/{{hero.length}}
                </span>
            </div>
            <div v-bind:style="strengthStyle">
                <span v-bind:style="armyStyle">
                    排名 {{getCurrentRank}} {{getStatesAllies(data)}}
                </span>
            </div>
        </div>
    `,
    computed: {
        getCurrentRank: function() {
            var rank, i = 0;
            for (i; i < this.rank.length; i++) {
                if (this.rank[i].code === this.definition.code) {
                    rank = i;
                    break;
                }
            }
            return rank + 1;
        },
        getActiveHeroCount: function () {
            return this.hero.filter(function(value) {
                return value === 1;
            }).length;
        },
        getArmyDetail: function () {
            var a = 0, b = 0, c = 0, d = 0;
            this.data.army.forEach(function(type) {
                switch(type) {
                    case 0:
                        a += 1;
                        break;
                    case 8:
                        b += 1;
                        break;
                    case "9":
                        c += 1;
                        break;
                    default:
                        d += 1;
                        break;
                }
            }.bind(this));
            return this.getArmyInfo()[0].name + a + " " 
                + this.getArmyInfo()[8].name + b + " " 
                + this.getArmyInfo()[9].name + c + " "
                + this.getArmyInfo()[this.definition.code].name + d;
        }
    },
    data: function() {
        return {
            cardStyle: {
                display: "block",
                padding: "3pt",
                borderBottom: "3pt solid black",
                borderRadius: "5pt"
            },
            headerStyle: {
                display: "block",
                borderBottom: "1pt dashed lightgrey",
                width: "80%",
                paddingBottom: "3pt"
            },
            nameStyle: {
                display: "inline-block",
                verticalAlign: "middel",
                backgroundColor: "lightgrey",
                fontSize: "12pt",
                minWidth: "18pt",
                height: "18pt",
                lineHeight: "18pt",
                borderRadius: "50%",
                textAlign: "center",
                marginRight: "3pt"
            },
            activeStyle: {
                display: "inline-block",
                verticalAlign: "middel",
                backgroundColor: this.definition.color,
                color: "white",
                fontSize: "12pt",
                minWidth: "18pt",
                height: "18pt",
                lineHeight: "18pt",
                borderRadius: "50%",
                textAlign: "center",
                marginRight: "3pt"
            },
            occupyStyle: {
                display: "inline-block",
                verticalAlign: "middel",
                color: "lightgrey",
                fontSize: "12pt",
            },
            strengthStyle: {
                display: "block",
                marginTop: "2pt"
            },
            armyStyle: {
                display: "inline-block",
                verticalAlign: "middel",
                color: "whitesmoke",
                fontSize: "11pt",
            },
        }  
    },
});