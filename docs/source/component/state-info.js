Vue.component("state-info", {
    props: ["definition", "player", "data", "power", "hero", "relations", "rank", "mist"],
    template: `
        <div v-bind:style="cardStyle" v-on:mouseleave="leaveBoard">
            <div v-bind:style="headerStyle">
                <span v-bind:style="player?activeStyle:nameStyle"
                    v-bind:title="'国都'+getCitiesInfo()[getStatesBaseLevel()[definition.code][3]].name+',产出精兵:'+getArmyInfo()[definition.code].name+'(攻击'+getArmyInfo()[definition.code].attack+' 防御'+getArmyInfo()[definition.code].defend+')'"
                >
                    {{definition.name}}
                </span>
                <span v-bind:style="occupyStyle">
                    都会{{data.capital.length}} 城市{{data.city.length}} 国库 {{power[definition.code]}}
                </span>
            </div>
            <div v-bind:style="strengthStyle">
                <span v-bind:style="armyStyle">
                    兵力{{data.army.length}}
                    <span v-if="mist === 0 || player">
                        {{"- " + getArmyDetail}}
                    </span>
                </span>
            </div>
            <div v-bind:style="strengthStyle">
                <span v-bind:style="armyStyle">
                    主将 {{getActiveHeroCount}} / {{hero.length}} 
                    <span style="cursor:pointer" v-on:click="showBoard">[查看]</span>
                </span>
                <div 
                    v-for="(h, i) in getHerosInfo()[definition.code]" 
                    style="font-size:9pt;marginBottom:3pt;color:lightgrey"
                    v-show="showHero"
                >
                    <span style="backgroundColor:darkslategray;color:white;marginRight:3pt;text-align:center;border-radius:3pt">
                        {{hero[i]===1?"待命":"休整"}}
                    </span>
                    {{h.name}} 战力{{h.strength}} {{h.kill!==0?'斩杀'+h.kill:''}} 
                    {{h.safe!==0?'防卫'+h.safe:''}} {{getSkillsInfo()[h.skill].skill}}
                </div>
            </div>
            <div v-bind:style="strengthStyle">
                <span v-bind:style="armyStyle"
                    title = "占有城市数多的国家排名靠前,城市数相同时,占有领地数多的国家排名靠前"
                >
                    排名 {{getCurrentRank}} {{getStatesAllies(data)}}
                </span>
            </div>
        </div>
    `,
    methods: {
        showBoard: function() {
            this.showHero = true;    
        },
        leaveBoard: function() {
            this.showHero = false;
        }    
    },
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
                + this.getArmyInfo()[this.definition.code].name + d;
        }
    },
    data: function() {
        return {
            showHero: false,
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
                backgroundColor: "transparent"
            },
        }  
    },
});