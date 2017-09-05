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
                padding: "3px",
                borderBottom: "3px solid black",
                borderRadius: "5px"
            },
            headerStyle: {
                display: "block",
                borderBottom: "1px dashed lightgrey",
                width: "80%",
                paddingBottom: "3px"
            },
            nameStyle: {
                display: "inline-block",
                verticalAlign: "middel",
                backgroundColor: "lightgrey",
                fontSize: "14px",
                minWidth: "20px",
                height: "20px",
                lineHeight: "20px",
                borderRadius: "50%",
                textAlign: "center"
            },
            activeStyle: {
                display: "inline-block",
                verticalAlign: "middel",
                backgroundColor: this.definition.color,
                color: "white",
                fontSize: "14px",
                minWidth: "20px",
                height: "20px",
                lineHeight: "20px",
                borderRadius: "50%",
                textAlign: "center"
            },
            occupyStyle: {
                display: "inline-block",
                verticalAlign: "middel",
                color: "lightgrey",
                fontSize: "12px",
            },
            strengthStyle: {
                display: "block"
            },
            armyStyle: {
                display: "inline-block",
                verticalAlign: "middel",
                color: "whitesmoke",
                fontSize: "12px",
            },
        }  
    },
});