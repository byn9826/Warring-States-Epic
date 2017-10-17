Vue.component("decision-board", {
    props: [
        "stage", "player", "state", "cities", "relations", "rank", "orders", "settings", "focus",
        "addnewally", "addnewhistory", "tonextstage", "removeally", "increaserelation", "decreaserelation",
        "saveitemorder", "updateorderofcities", "disturbpowerpoint", "replacecitisoccupy",
        "hero", "force", "power"
    ],
    template: `
        <div v-bind:style="cardStyle">
            <header v-bind:style="roundStyle">
                {{getStageName(stage)}}阶段
            </header>
            <section v-if="stage === 0 && player[orders[active]] === 2">
                <div v-bind:style="descStyle">{{getStatesAllies(state[activeState.code]) || "无盟友"}}</div>
                <div v-bind:style="descStyle">请选择想要缔盟的国家</div>
                <div v-bind:style="lineStyle">
                    <select v-model="target" v-bind:style="selectStyle">
                        <option disabled selected value="">-国家-</option>
                        <option 
                            v-for="(s, i) in getStatesInfo()" v-bind:value="i"
                            v-if="player[i]!==0 && player[i]!==2 && state[activeState.code].ally.indexOf(s.code) === -1" 
                        >
                            {{s.name}}
                        </option>
                    </select>
                    <input 
                        v-show="target!==''" v-bind:style="buttonStyle" 
                        type="button" value="递交盟书" v-on:click="submitAlly()" 
                    />
                    <input 
                        v-bind:style="buttonStyle" 
                        type="button" value="不缔盟" v-on:click="skipAlly()" 
                    />
                </div>
            </section>
            <section v-else-if="stage === 1 && player[orders[active]] === 2">
                <div v-bind:style="descStyle">{{getStatesAllies(state[activeState.code]) || "无盟友"}}</div>
                <div v-bind:style="descStyle">请选择想要毁约的国家</div>
                <div v-bind:style="lineStyle">
                    <select v-model="target" v-bind:style="selectStyle">
                        <option disabled selected value="">-国家-</option>
                        <option 
                            v-for="(s, i) in state[activeState.code].ally" v-bind:value="s" 
                        >
                            {{getStatesInfo()[s].name}}
                        </option>
                    </select>
                    <input 
                        v-show="target!==''" v-bind:style="buttonStyle" 
                        type="button" value="撕毁盟约" v-on:click="submitBreach()" 
                    />
                    <input 
                        v-bind:style="buttonStyle" 
                        type="button" value="不毁约" v-on:click="skipBreach()" 
                    />
                </div>
            </section>
            <section v-else-if="stage === 2 && player[orders[active]] === 2">
                <div v-bind:style="descStyle">
                    {{getStatesAllies(state[activeState.code]) || "无盟友"}}
                </div>
                <div v-bind:style="descStyle">请将指令拖拽至目标领地</div>
                <div v-bind:style="lineStyle">
                    <span 
                        v-for="order in getOrdersInfo()" 
                        draggable="true" @dragstart="recordSelectedOrder(order.code)"
                        v-bind:style="state[activeState.code].order.indexOf(order.code)===-1?orderStyle:setStyle"
                    >
                        {{order.name}}
                    </span>
                </div>
                <input 
                    v-bind:style="submitStyle" type="button" value="收回指令" 
                    v-on:click="recallPlan()"
                />
                <input 
                    v-bind:style="submitStyle" type="button" value="布局完毕" 
                    v-on:click="submitPlan()"
                />
            </section>
            <section v-else-if="stage === 3 && player[orders[active]] === 2">
                <div v-bind:style="descStyle">
                    {{getStatesAllies(state[activeState.code]) || "无盟友"}}
                </div>
                <div style="margin-bottom:5pt">
                    <select 
                        v-bind:style="selectStyle" v-model="reminder" v-on:change="target=''"
                    >
                        <option selected value="">-城市-</option>
                        <option 
                            v-for="(o, i) in state[activeState.code].order"
                            v-if="o!==null&&getOrdersInfo()[o].type===2"
                            v-bind:value="state[activeState.code].occupy[i]"
                        >
                            {{getCitiesInfo()[state[activeState.code].occupy[i]].name}}
                        </option>
                    </select>
                    <span style="font-size:11pt">劫掠</span>
                    <select v-if="reminder!==''" v-bind:style="selectStyle" v-model="target">
                        <option selected value="">无目标</option>
                        <option 
                            v-for="c in getCitiesInfo()[reminder].nearby"
                            v-show="filterTargetOptions(c, 3)" 
                            v-bind:value="c"
                        >
                            {{getCitiesInfo()[c].name}}
                        </option>
                    </select>
                </div>
                <input 
                    v-show="reminder!==''"
                    v-bind:style="confirmStyle" type="button" value="确认" 
                    v-on:click="submitDisturb()"
                />
            </section>
            <section v-else-if="stage === 4 && player[activeState.code] === 2 && !showBattle">
                <div v-bind:style="descStyle">
                    {{getStatesAllies(state[activeState.code]) || "无盟友"}}
                </div>
                <div v-bind:style="descStyle">请从地图选择出兵城市</div>
                <template v-if="focus!==null">
                    <span>自{{getCitiesInfo()[focus].name}}出兵</span>
                    <select 
                        v-bind:style="selectStyle" v-model="reminder"
                    >
                        <option selected value="">无目标</option>
                        <option 
                            v-for="c in getCitiesInfo()[focus].nearby"
                            v-if="filterTargetOptions(c, 4)" v-bind:value="getCitiesInfo()[c].code"
                        >
                            {{getCitiesInfo()[c].name}}
                        </option>
                    </select>
                    <input
                        v-bind:style="buttonStyle" type="button" value="取消战备" 
                        v-on:click="skipAttack()"
                    />
                </template>
                <section v-bind:style="marchStyle" v-if="focus!==null">
                    <div v-bind:style="lineStyle">
                        选择我军出征部队 战力:{{calAttackEnvPoint + calAttackArmyPoint + calAttackSupportPoint}}
                    </div>
                    <span 
                        v-for="(a, i) in cities[focus].army" v-if="cities[focus].status[i]===1"
                        v-bind:style="[forceStyle, target.indexOf(i)!==-1?borderStyle:'']" 
                        v-on:click="chooseArmy(i)"
                    >
                        {{getArmyInfo()[a].name}}
                    </span>
                    <div 
                        v-if="reminder!==''&&cities[reminder].occupy===activeState.code&&(cities[reminder].army.length+target.length)<=4" 
                        v-bind:style="lineStyle"
                    >
                        目标为己方城市
                    </div>
                    <div 
                        v-else-if="reminder!==''&&cities[reminder].occupy===activeState.code&&(cities[reminder].army.length+target.length)>4" 
                        v-bind:style="lineStyle"
                    >
                        {{getCitiesInfo()[reminder].name}}超过补给上限无法行军
                    </div>
                    <div v-else-if="reminder!==''" v-bind:style="lineStyle">
                        敌军军团数{{calDefendNum}} + 已知战力{{calDefendEnvPoint}}
                    </div>
                    <div 
                        v-if="!(reminder!==''&&cities[reminder].occupy===activeState.code&&(cities[reminder].army.length+target.length)>4)"
                    >
                        <input
                            v-if="target.length!==0"
                            v-bind:style="confirmStyle" type="button" value="行军" 
                            v-on:click="confirmAttack()"
                        />
                    </div>
                </section>
            </section>
            <section v-else-if="stage === 4 && showBattle">
                <div v-bind:style="descStyle">
                    {{activeState.name}}国自{{getCitiesInfo()[focus].name}}进攻{{getStatesInfo()[cities[reminder].occupy].name}}国{{getCitiesInfo()[reminder].name}}
                </div>
                <table border="1" style="font-size:9pt;font-weight:normal;text-align:center;margin-bottom:5pt">
                    <tr>
                        <th style="width:125pt;background-color:darkgrey;color:black">
                            {{activeState.name}}军进攻
                        </th>
                        <th style="width:125pt;background-color:darkgrey;color:black">
                            {{getStatesInfo()[cities[reminder].occupy].name}}军防守
                        </th>
                    </tr>
                    <tr>
                        <td>
                            进攻部队:<br />
                            <span v-if="player[cities[reminder].occupy] === 2 && defendHero === null" 
                                class="fa fa-shield" aria-hidden="true"
                            >
                                {{target.length}}
                            </span>
                            <span v-else>
                                {{
                                    target.map(function(t){
                                        return getArmyInfo()[cities[focus].army[t]].name
                                    }).join(" ")
                                }}
                            </span>
                        </td>
                        <td>
                            驻防部队:<br />
                            <span v-if="player[activeState.code] === 2 && attackHero === null" 
                                class="fa fa-shield" aria-hidden="true"
                            >
                                {{cities[reminder].status.filter(function(s){return s===1;}).length}}
                            </span>
                            <span v-else>
                                {{
                                    cities[reminder].army.map(function(a, i){
                                        if (cities[reminder].status[i] === 1) {
                                            return getArmyInfo()[a].name;
                                        }
                                    }).join(" ")
                                }}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            援军:<br />
                            <span v-if="player[cities[reminder].occupy] === 2 && defendHero === null" 
                                class="fa fa-shield" aria-hidden="true"
                            >
                                {{
                                    getCitiesInfo()[reminder].nearby.map(function(nearby) {
                                        if (
                                            (
                                                cities[nearby].occupy === activeState.code ||
                                                (
                                                    state[activeState.code].ally.indexOf(cities[nearby].occupy) !== -1 &&
                                                    state[cities[reminder].occupy].ally.indexOf(cities[nearby].occupy) === -1
                                                )
                                            ) && cities[nearby].order !== null &&
                                            getOrdersInfo()[cities[nearby].order].type === 1
                                        ) {
                                            return cities[nearby].status.filter(function(a){ 
                                                return a === 1;
                                            }).length;
                                        } else {
                                            return 0;
                                        }
                                    }).reduce(function(a, b) {
                                        return a + b;    
                                    }, 0)
                                }}
                            </span>
                            <span v-else>
                                {{
                                    getCitiesInfo()[reminder].nearby.map(function(nearby) {
                                        if (
                                            (
                                                cities[nearby].occupy === activeState.code ||
                                                (
                                                    state[activeState.code].ally.indexOf(cities[nearby].occupy) !== -1 &&
                                                    state[cities[reminder].occupy].ally.indexOf(cities[nearby].occupy) === -1
                                                )
                                            ) && cities[nearby].order !== null &&
                                            getOrdersInfo()[cities[nearby].order].type === 1
                                        ) {
                                            return cities[nearby].army.map(function(a, i){ 
                                                if (cities[nearby].status[i] === 1) {
                                                    return getArmyInfo()[a].name;
                                                }
                                            }).join(" ");
                                        } else {
                                            return "";
                                        }
                                    }).join(" ")
                                }}
                            </span>
                        </td>
                        <td>
                            援军:<br />
                            <span v-if="player[activeState.code] === 2 && attackHero === null" 
                                class="fa fa-shield" aria-hidden="true"
                            >
                                {{calDefendNum - cities[reminder].status.filter(function(s){return s===1;}).length}}
                            </span>
                            <span v-else>
                                {{
                                    getCitiesInfo()[reminder].nearby.map(function(nearby) {
                                        if (
                                            (
                                                cities[nearby].occupy === cities[reminder].occupy ||
                                                (
                                                    state[cities[reminder].occupy].ally.indexOf(cities[nearby].occupy) !== -1 &&
                                                    state[cities[focus].occupy].ally.indexOf(cities[nearby].occupy) === -1
                                                )
                                            ) && cities[nearby].order !== null && 
                                            getOrdersInfo()[cities[nearby].order].type === 1
                                        ) {
                                            return cities[nearby].army.map(function(a, i) {
                                                if (cities[nearby].status[i] === 1) {
                                                    return getArmyInfo()[a].name;
                                                }
                                            }).join(" ");
                                        } else {
                                            return "";
                                        }
                                    }.bind(this)).join(" ")
                                }}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>
                                军令{{force[0] === activeState.code ? "+干将" : ""}}  
                                : {{calAttackEnvPoint}}
                            </span>
                        </td>
                        <td>
                            <span>
                                军令+城防{{orders[0] === cities[reminder].occupy ? "+九鼎" : ""}} 
                                : {{calDefendEnvPoint}}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:3pt 0" 
                            v-if="player[activeState.code] === 2 && attackHero === null"
                        >
                            选择领兵主帅:
                            <select v-model="heroSelector">
                                <option disabled value="">- 将领 -</option>
                                <option 
                                    style="background-color:white"
                                    v-for="(h, i) in getHerosInfo()[activeState.code]"
                                    v-if="hero[activeState.code][i]===1"
                                    v-bind:value="i"
                                    v-bind:title="'斩杀: ' + h.kill + ' 防卫: '+h.safe + ' ' + getSkillsInfo()[h.skill].skill"
                                >
                                    {{h.name + " 战力: " + h.strength}}
                                </option>
                            </select>
                        </td>
                        <td v-else>
                            主帅:<br />
                            {{
                                defendHero === null ?
                                    "???" : getHerosInfo()[activeState.code][attackHero].name
                            }}
                        </td>
                        <td style="padding:3pt 0" 
                            v-if="player[cities[reminder].occupy] === 2 && defendHero === null"
                        >
                            选择领兵主帅:
                            <select v-model="heroSelector">
                                <option disabled value="">- 将领 -</option>
                                <option 
                                    style="background-color:white"
                                    v-for="(h, i) in getHerosInfo()[cities[reminder].occupy]"
                                    v-if="hero[cities[reminder].occupy][i]===1"
                                    v-bind:value="i"
                                    v-bind:title="'斩杀: ' + h.kill + ' 防卫: '+h.safe + ' ' + getSkillsInfo()[h.skill].skill"
                                >
                                    {{h.name + " 战力: " + h.strength}}
                                </option>
                            </select>
                        </td>
                        <td v-else>
                            主帅:<br />
                            {{
                                attackHero === null ?
                                    "???" : getHerosInfo()[cities[reminder].occupy][defendHero].name
                            }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span v-if="attackHero === null || defendHero === null">
                                主帅技能未计算
                            </span>
                            <span v-else>
                                {{
                                    "战力:" + getHerosInfo()[activeState.code][attackHero].strength +
                                    " 斩杀:" + getHerosInfo()[activeState.code][attackHero].kill + 
                                    " 防卫:" + getHerosInfo()[activeState.code][attackHero].safe +
                                    " " + getSkillsInfo()[getHerosInfo()[activeState.code][attackHero].skill].skill
                                }}
                            </span>
                        </td>
                        <td>
                            <span v-if="attackHero === null || defendHero === null">
                                主帅技能未计算
                            </span>
                            <span v-else>
                                {{
                                    "战力:" + getHerosInfo()[cities[reminder].occupy][defendHero].strength + 
                                    " 斩杀:" + getHerosInfo()[cities[reminder].occupy][defendHero].kill + 
                                    " 防卫:" + getHerosInfo()[cities[reminder].occupy][defendHero].safe +
                                    " " + getSkillsInfo()[getHerosInfo()[cities[reminder].occupy][defendHero].skill].skill
                                }}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            总战力:
                            <span v-if="player[cities[reminder].occupy] === 2 && defendHero === null">
                                ???
                            </span>
                            <span v-else-if="player[activeState.code] === 2 && attackHero === null && heroSelector === ''">
                                {{calAttackEnvPoint + calAttackArmyPoint + calAttackSupportPoint}}
                            </span>
                            <span v-else-if="player[activeState.code] === 2 && attackHero === null && heroSelector !== ''">
                                {{
                                    calAttackEnvPoint + calAttackArmyPoint + calAttackSupportPoint + getHerosInfo()[activeState.code][heroSelector].strength
                                }}
                            </span>
                            <span v-else>
                                {{calAttackFinal}}
                            </span>
                        </td>
                        <td>
                            总战力:
                            <span v-if="player[activeState.code] === 2 && attackHero===null">
                                ???
                            </span>
                            <span v-else-if="player[cities[reminder].occupy] === 2 && defendHero === null && heroSelector === ''">
                                {{calDefendEnvPoint + calDefendArmyPoint + calDefendSupportPoint}}
                            </span>
                            <span v-else-if="player[cities[reminder].occupy] === 2 && defendHero === null && heroSelector !== ''">
                                {{
                                    calDefendEnvPoint + calDefendArmyPoint + calDefendSupportPoint + getHerosInfo()[cities[reminder].occupy][heroSelector].strength
                                }}
                            </span>
                            <span v-else>
                                {{calDefendFinal}}
                            </span>
                        </td>
                    </tr>
                </table>
                <input 
                    v-if="attackHero === null"
                    v-bind:style="submitStyle" type="button" value="确认主帅" 
                    v-on:click="confirmCommander(0)"
                />
                <input 
                    v-else-if="defendHero === null"
                    v-bind:style="submitStyle" type="button" value="确认主帅" 
                    v-on:click="confirmCommander(1)"
                />
                <div v-else>
                    <span style="font-size:10pt">
                        {{
                            battleResult?
                                activeState.name + "国胜利!" :
                                getStatesInfo()[cities[reminder].occupy].name + "国胜利!"
                        }}
                    </span>
                    <input 
                        v-bind:style="submitStyle" type="button" value="继续" 
                        v-on:click="confirmBattle"
                    />
                </div>
            </section>
            <section v-else-if="stage === 5">
                <div v-for="(p, i) in player" v-if="p !== 0" style="font-size:11pt;color:lightgrey;margin-bottom:2pt">
                    {{getStatesInfo()[i].name}}国国库+{{target[i]}} 
                </div>
                <input type="button" v-bind:style="confirmStyle" value="继续" 
                    v-on:click="$emit('tonextstage')"
                />
            </section>
            <section v-else-if="stage === 6 && player[orders[active]] === 2">
                <div v-bind:style="descStyle">
                    最高军团数{{getStatesSupply()[state[activeState.code].supply]}} 
                    现有军团数{{state[activeState.code].army.length}}
                </div>
                <div style="margin-bottom:5pt">
                    <select v-model="reminder" v-on:change="copyArmy">
                        <option disabled value="">- 城市 -</option>
                        <option 
                            style="background-color:white"
                            v-for="c in (state[activeState.code].capital.concat(state[activeState.code].city))"
                            v-bind:value="c"
                        >
                            {{getCitiesInfo()[c].name}}
                        </option>
                    </select>
                    <input 
                        v-show="reminder === ''" v-on:click="completeRecruit" 
                        type="button" value="完成募兵" 
                    />
                </div>
                <div v-if="reminder !== null && reminder !== ''" style="margin-top:5pt;font-size:10pt;color:white">
                    <div style="margin-bottom:5pt;color:lightgrey;font-weight:bold">
                        驻扎军团: {{target.map(function(c) {return getArmyInfo()[c].name;}).join(" ")}}<br/>
                        原有国力: {{power[activeState.code]}} 耗费国力: {{heroSelector}}
                    </div>
                    <div v-bind:style="lineStyle"
                        v-show="
                            target.length < 4 
                            && getStatesSupply()[state[activeState.code].supply] > (state[activeState.code].army.length - cities[reminder].army.length + target.length)
                            && power[activeState.code] > heroSelector
                        "
                    >
                        <span 
                            v-on:click="target.push(0); heroSelector += 1" 
                            v-bind:style="orderStyle"
                        >
                            征募步兵军团
                        </span>
                        花费一点国力
                    </div>
                    <div v-bind:style="lineStyle"
                        v-show="
                            target.length < 4 
                            && getStatesSupply()[state[activeState.code].supply] > (state[activeState.code].army.length - cities[reminder].army.length + target.length)
                            && power[activeState.code] > heroSelector + 1
                        "
                    >
                        <span 
                            v-on:click="target.push(8); heroSelector += 2" 
                            v-bind:style="orderStyle"
                        >
                            征募骑兵军团
                        </span>
                        花费两点国力
                    </div>
                    <div v-bind:style="lineStyle" 
                        v-show="
                            target.length < 4 
                            && getStatesSupply()[state[activeState.code].supply] > (state[activeState.code].army.length - cities[reminder].army.length + target.length)
                            && power[activeState.code] > heroSelector + 1
                            && getCitySpecialArmy(activeState.code, reminder)
                        "
                    >
                        <span 
                            v-on:click="target.push(activeState.code); heroSelector += 2" 
                            v-bind:style="orderStyle"
                        >
                            征募{{getArmyInfo()[activeState.code].name}}军团
                        </span>
                        花费两点国力
                    </div>
                    <div v-bind:style="lineStyle"
                        v-show="
                            power[activeState.code] > heroSelector
                            && target.indexOf(0) !== -1
                        "
                    >
                        <span 
                            v-on:click="target.splice(target.indexOf(0), 1, 8); heroSelector += 1"
                            v-bind:style="orderStyle"
                        >
                            升级步兵为骑兵军团
                        </span>
                        花费一点国力
                    </div>
                    <div v-bind:style="lineStyle"
                        v-show="
                            power[activeState.code] > heroSelector
                            && target.indexOf(0) !== -1
                            && getCitySpecialArmy(activeState.code, reminder)
                        "
                    >
                        <span 
                            v-on:click="target.splice(target.indexOf(0), 1, activeState.code); heroSelector += 1" 
                            v-bind:style="orderStyle"
                        >
                            升级步兵为{{getArmyInfo()[activeState.code].name}}军团
                        </span>
                        花费一点国力
                    </div>
                    <div v-bind:style="lineStyle"
                        v-show="
                            target.indexOf(8) !== -1 
                            && getCitySpecialArmy(activeState.code, reminder)
                        "
                    >
                        <span 
                            v-on:click="target.splice(target.indexOf(8), 1, activeState.code)" 
                            v-bind:style="orderStyle"
                        >
                            升级骑兵为{{getArmyInfo()[activeState.code].name}}军团
                        </span>
                    </div>
                    <div v-bind:style="lineStyle">
                        <input 
                            v-on:click="confirmRecruit" type="button" 
                            v-bind:style="submitStyle" value="确定" 
                        />
                        <input 
                            v-on:click="emptyRecruit" type="button" 
                            v-bind:style="submitStyle" value="取消" 
                        />
                    </div>
                </div>
            </section>
            <section v-else>
                <div v-bind:style="descStyle">
                    {{activeState.name}}国正在{{getStageName(stage)}} ...
                </div>
                <div v-bind:style="flagStyle">
                    {{getHerosInfo()[activeState.code][getHeroLeaderIndex()[activeState.code]].name}}行动中
                </div>
            </section>
            <div v-show="info" v-bind:style="infoStyle">{{info}}</div>
        </div>
    `,
    created: function() {
        this.active = 0;
    },
    methods: {
        filterTargetOptions(i, stage) {
            if (stage === 3) {
                if (this.cities[i].occupy===this.activeState.code) {
                    return false;
                }
                if (this.state[this.activeState.code].ally.indexOf(this.cities[i].occupy) !== -1) {
                    return false;
                }
                if (this.cities[i].order === null) {
                    return false;
                }
                if (
                    this.getDisturbleType().indexOf(
                        this.getOrdersInfo()[this.cities[i].order].type
                    ) === -1
                ) {
                    return false;
                }
            } else if (stage === 4) {
                if (this.state[this.activeState.code].ally.indexOf(this.cities[i].occupy) !== -1) {
                    return false;
                }
            }
            return true;
        },
        completeRecruit: function() {
            this.nextActive();
        },
        confirmRecruit: function() {
            app.$data.cities[this.reminder].army = this.target;
            app.$data.cities[this.reminder].status = new Array(this.target.length).fill(1);
            app.$data.power[this.activeState.code] -= this.heroSelector;
            this.info = this.activeState.name + "在" + this.getCitiesInfo()[this.reminder].name + "募兵";
            this.$emit("addnewhistory", this.info);
            this.emptyRecruit();
        },
        emptyRecruit: function() {
            this.reminder = "";
            this.target = [];
            this.heroSelector = 0;
        },
        copyArmy: function() {
            this.target = this.cities[this.reminder].army.slice();
            this.heroSelector = 0;
        },
        confirmBattle: function() {
            this.showBattle = false;
            this.$emit(
                "decreaserelation", this.cities[this.reminder].occupy, this.activeState.code, 2
            );
            this.$emit(
                "decreaserelation", this.activeState.code, this.cities[this.reminder].occupy, 1
            );
            var attackDefine = this.getHerosInfo()[this.activeState.code][this.attackHero];
            var defendDefine = this.getHerosInfo()[this.cities[this.reminder].occupy][this.defendHero];
            if (this.battleResult) {
                if (defendDefine.skill === 8) {
                    this.info = this.activeState.name + "国" + attackDefine.name +
                        "在" + this.getCitiesInfo()[this.reminder].name +
                        "打败了" + this.getStatesInfo()[this.cities[this.reminder].occupy].name 
                        + "国" + defendDefine.name;
                    this.$emit("addnewhistory", this.info);
                } else {
                    this.info = this.activeState.name + "国" + attackDefine.name +
                        "打败" + this.getStatesInfo()[this.cities[this.reminder].occupy].name + 
                        "国" + defendDefine.name + "攻占了" + this.getCitiesInfo()[this.reminder].name;
                    this.$emit("addnewhistory", this.info);
                    if (this.state[this.cities[this.reminder].occupy].occupy.length === 1) {
                        this.info = this.getStatesInfo()[this.cities[this.reminder].occupy].name + "国灭亡";
                        this.$emit("addnewhistory", this.info);
                    }
                }
                if (
                    this.force.indexOf(this.activeState.code) > this.force.indexOf(this.cities[this.reminder].occupy)
                ) {
                    app.$data.force.splice(this.force.indexOf(this.activeState.code), 1);
                    app.$data.force.splice(
                        this.force.indexOf(this.cities[this.reminder].occupy), 0, this.activeState.code
                    );
                }
            } else {
                this.info = this.getStatesInfo()[this.cities[this.reminder].occupy].name + "国" +
                    defendDefine.name + "击退了" + this.activeState.name + "国" +
                    attackDefine.name + "对" + this.getCitiesInfo()[this.reminder].name + "的进攻";
                this.$emit("addnewhistory", this.info);
                if (
                    this.force.indexOf(this.cities[this.reminder].occupy) > this.force.indexOf(this.activeState.code)
                ) {
                    app.$data.force.splice(this.force.indexOf(this.cities[this.reminder].occupy), 1);
                    app.$data.force.splice(
                        this.force.indexOf(this.activeState.code), 0, this.cities[this.reminder].occupy
                    );
                }
            }
            this.processAfterBattle(
                this.battleResult, attackDefine, this.focus, this.target, defendDefine, this.reminder,
                this.cities[this.reminder].army, this.activeState.code, 
                this.getStatesInfo()[this.cities[this.reminder].occupy].code,
                this.attackHero, this.defendHero
            );
            this.nextActive();
        },
        confirmCommander: function(mode) {
            if (this.heroSelector !== "") {
                if (mode === 0) {
                    this.attackHero = this.heroSelector;
                } else {
                    this.defendHero = this.heroSelector;
                }
                this.heroPower = this.processBeforeBattle(
                    this.getHerosInfo()[this.activeState.code][this.attackHero],
                    this.getHerosInfo()[this.cities[this.reminder].occupy][this.defendHero],
                    this.calAttackSupportPoint, this.calDefendSupportPoint,
                    this.calDefendArmyPoint, this.reminder
                );
            } else {
                alert("请选择领兵主帅");
            }
        },
        skipAttack: function() {
            app.$data.cities[this.focus].order = null;
            this.nextActive();
        },
        confirmAttack: function() { 
            if (this.cities[this.reminder].occupy === this.activeState.code) {
                this.info = this.activeState.name + "国移兵" + this.getCitiesInfo()[this.reminder].name;
                var move = this.target.map(function(t) {
                    return this.getArmyInfo()[this.cities[this.focus].army[t]].code;
                }.bind(this));
                app.$data.cities[this.reminder].army = app.$data.cities[this.reminder].army.concat(move);
                app.$data.cities[this.reminder].status = app.$data.cities[this.reminder].status.concat(
                    new Array(move.length).fill(1)
                );
                this.target.forEach(function(t) {
                    app.$data.cities[this.focus].army[t] = null;
                    app.$data.cities[this.focus].status[t] = null;
                }.bind(this));
                app.$data.cities[this.focus].army = app.$data.cities[this.focus].army.filter(function(f) {
                    return f !== null;
                });
                app.$data.cities[this.focus].status = app.$data.cities[this.focus].status.filter(function(f) {
                    return f !== null;
                });
                app.$data.cities[this.focus].order = null;
                this.$emit("addnewhistory", this.info);
                this.nextActive();
            } else if (this.player[this.cities[this.reminder].occupy] === 0) {
                if (
                    (this.calAttackEnvPoint + this.calAttackArmyPoint + this.calAttackSupportPoint) >=
                    (this.calDefendEnvPoint + this.calDefendArmyPoint)
                ) {
                    this.info = this.activeState.name + "国攻占了" + 
                        this.getStatesInfo()[this.cities[this.reminder].occupy].name + "的" + 
                        this.getCitiesInfo()[this.reminder].name;
                    var move = this.target.map(function(t) {
                        return this.getArmyInfo()[this.cities[this.focus].army[t]].code;
                    }.bind(this));
                    this.$emit("replacecitisoccupy", this.focus, this.reminder, move);
                } else {
                    this.info = this.getStatesInfo()[this.cities[this.reminder].occupy].name +
                        "击退了" + this.activeState.name + "国对" + 
                        this.getCitiesInfo()[this.reminder].name + "的进攻";
                    this.target.forEach(function(t) {
                        app.$data.cities[this.focus].status.splice(t, 1, 0);
                    }.bind(this));
                }
                app.$data.cities[this.focus].order = null;
                this.$emit("addnewhistory", this.info);
                this.nextActive();
            } else if (this.cities[this.reminder].army.length === 0) {
                this.$emit(
                    "decreaserelation", this.cities[this.reminder].occupy, this.activeState.code, 2
                );
                this.$emit(
                    "decreaserelation", this.activeState.code, this.cities[this.reminder].occupy, 1
                );
                this.info = this.activeState.name + "国攻占了" + 
                    this.getStatesInfo()[this.cities[this.reminder].occupy].name + "国的" + 
                    this.getCitiesInfo()[this.reminder].name;
                this.$emit("addnewhistory", this.info);
                if (this.state[this.cities[this.reminder].occupy].occupy.length === 1) {
                    this.info = this.getStatesInfo()[this.cities[this.reminder].occupy].name + "国灭亡";
                    this.$emit("addnewhistory", this.info);
                }
                var move = this.target.map(function(t) {
                    return this.getArmyInfo()[this.cities[this.focus].army[t]].code;
                }.bind(this));
                this.$emit("replacecitisoccupy", this.focus, this.reminder, move);
                this.nextActive();
            } else {
                if (this.player[this.cities[this.reminder].occupy] === 2) {
                    this.attackHero = this.AIdecideBattleHero(
                        this.cities[this.reminder].occupy, this.activeState.code, 
                        this.calDefendArmyPoint + this.calDefendEnvPoint + this.calDefendSupportPoint,
                        this.calAttackEnvPoint + this.calAttackArmyPoint + this.calAttackSupportPoint,
                        this.hero
                    );
                    this.showBattle = true;
                } else {
                    this.defendHero = this.AIdecideBattleHero(
                        this.activeState.code, this.cities[this.reminder].occupy, 
                        this.calAttackEnvPoint + this.calAttackArmyPoint + this.calAttackSupportPoint,
                        this.calDefendArmyPoint + this.calDefendEnvPoint + this.calDefendSupportPoint,
                        this.hero
                    );
                    if (this.player[this.activeState.code] === 2) {
                        this.showBattle = true;
                    } else {
                        this.heroSelector = this.AIdecideBattleHero(
                            this.cities[this.reminder].occupy, this.activeState.code, 
                            this.calDefendArmyPoint + this.calDefendEnvPoint + this.calDefendSupportPoint,
                            this.calAttackEnvPoint + this.calAttackArmyPoint + this.calAttackSupportPoint,
                            this.hero
                        );
                        this.confirmCommander(0);
                        this.showBattle = true;
                    } 
                }
            }
        },
        chooseArmy: function(i) {
            if (this.target.indexOf(i) === -1) {
                this.target.push(i);
            } else {
                this.target.splice(this.target.indexOf(i), 1);
            }
        },
        submitDisturb: function() {
            if (this.target !== "") {
                var remover = [this.reminder, this.target];
                this.reminder = "";
                this.target = "";
                this.disturbProcess(remover);
            } else {
                this.$emit("updateorderofcities", [this.reminder], [null]);
                this.reminder = "";
                this.nextActive();
            }
        },
        disturbProcess: function(remover) {
            if (remover[0] !== null && remover[0] !== undefined) {
                if (this.getOrdersInfo()[this.cities[remover[1]].order].type === 3) {
                    this.$emit(
                        "disturbpowerpoint", this.activeState.code, 
                        this.getStatesInfo()[this.cities[remover[1]].occupy].code
                    );
                }
                this.info = this.activeState.name + "国劫掠了" + this.getStatesInfo()[this.cities[remover[1]].occupy].name + "国的" + this.getCitiesInfo()[remover[1]].name;
                this.$emit("addnewhistory", this.info);
                this.$emit(
                    "decreaserelation", this.getStatesInfo()[this.cities[remover[1]].occupy].code, 
                    this.activeState.code, 1
                );
                this.$emit("updateorderofcities", remover, [null, null]);
            }
            this.nextActive();
        },
        recordSelectedOrder(i) {
            this.$emit("saveitemorder", i, 0);
        },
        recallPlan: function() {
            this.$emit(
                "updateorderofcities", this.state[this.activeState.code].occupy, 
                new Array(this.state[this.activeState.code].occupy.length).fill(null)
            );
        },
        submitPlan: function() {
            this.info = this.activeState.name + "国完成筹备";
            this.nextActive();
        },
        submitBreach: function() {
            if (this.target === "") {
                return false;
            }
            this.info = this.activeState.name + this.getStatesInfo()[this.target].name + "联盟瓦解";
            this.$emit("addnewhistory", this.info);
            this.$emit("removeally", this.activeState.code, this.target);
            this.$emit("decreaserelation", this.target, this.activeState.code, 2);
            this.$emit("decreaserelation", this.activeState.code, this.target, 1);
            this.nextActive();
        },
        skipBreach: function() {
            this.info = this.activeState.name + "国选择不毁约";
            this.nextActive();
        },
        skipAlly: function() {
            this.info = this.activeState.name + "国选择不缔盟";
            this.nextActive();
        },
        submitAlly: function() {
            if (this.target === "") {
                return false;
            }
            var result = this.AIacceptAllyOrNot(
                this.activeState.code, this.target, this.state, this.relations, this.rank
            );
            this.allyProcess(result);
        },
        allyProcess: function(result) {
            if (result) {
                this.info = this.getStatesInfo()[this.target].name + this.activeState.name + "两国结成同盟";
                this.$emit("addnewhistory", this.info);
                this.$emit("addnewally", this.activeState.code, this.target);
                this.$emit("increaserelation", this.activeState.code, this.target, 2);
                this.$emit("increaserelation", this.target, this.activeState.code, 1);
            } else {
                this.info = this.getStatesInfo()[this.target].name + "国拒绝与" + this.activeState.name + "国缔盟";
                this.$emit("decreaserelation", this.activeState.code, this.target, 1);
            }
            this.nextActive();
        },
        nextActive: function() {
            if (this.active < (this.rank.length - 1)) {
                this.active += 1; 
            } else {
                if (this.stage === 3) {
                    var i = 0, loop = false;
                    for (i = 0; i < this.state.length; i++) {
                        if (this.state[i].orderType.indexOf(2) !== -1) {
                            loop = true;
                            break;
                        }
                    }
                    if (loop) {
                        this.active = 0;
                    } else {
                        this.$emit("tonextstage");
                    }
                } else if (this.stage === 4) {
                    var i = 0, loop = false;
                    for (i = 0; i < this.state.length; i++) {
                        if (this.state[i].orderType.indexOf(0) !== -1) {
                            loop = true;
                            break;
                        }
                    }
                    if (loop) {
                        this.active = 0;
                    } else {
                        this.$emit("tonextstage");
                    }
                } else {
                    this.$emit("tonextstage");
                }
            }
        }
    },
    watch: {
        attackHero: function() {
            if (
                this.attackHero !== null && this.defendHero !== null 
                && this.settings.mode === 0 && this.showBattle
            ) {
                setTimeout(function () {
                    if (
                        this.attackHero !== null && this.defendHero !== null 
                        && this.settings.mode === 0 && this.showBattle
                    ) {
                        this.confirmBattle();  
                    }
                }.bind(this), this.settings.delay);
            }    
        },
        defendHero: function() {
            if (
                this.attackHero !== null && this.defendHero !== null 
                && this.settings.mode === 0 && this.showBattle
            ) {
                setTimeout(function () {
                    if (
                        this.attackHero !== null && this.defendHero !== null 
                        && this.settings.mode === 0 && this.showBattle
                    ) {
                        this.confirmBattle();  
                    }   
                }.bind(this), this.settings.delay);
            } 
        },
        focus: function() {
            this.target = [];
            this.reminder = "";
        },
        stage: function() {
            if (this.stage === 5) {
                app.$data.focus = null;
                this.active = null;
                if (this.settings.mode === 0) {
                    setTimeout(function () {
                        if (this.stage === 5) {
                            this.$emit('tonextstage')
                        }
                    }.bind(this), this.settings.delay);
                }
            } else if (this.stage === 3) {
                this.target = "";
                this.reminder = "";
                this.active = 0;
            } else {
                this.active = 0;
            }
        },
        active: function (newVal) {
            this.$nextTick(function () {
                if (this.stage === 0) {
                //缔盟阶段
                    if (!this.state[this.orders[newVal]].live) {
                        this.nextActive();
                    } else if (this.player[this.orders[newVal]] !== 2) {
                        this.target = this.AIrequestAllyOrNot(
                            this.activeState.code, this.state, this.relations, this.rank
                        );
                        setTimeout(function () {
                            if (this.target !== "" && this.target !== undefined) {
                                var result;
                                if (this.player[this.target] !== 2) {
                                    result = this.AIacceptAllyOrNot(
                                        this.activeState.code, this.target, this.state, this.relations, this.rank
                                    );
                                } else {
                                    result = confirm(this.activeState.name + "国想与你结盟,是否同意?");
                                }
                                this.allyProcess(result);
                            } else {
                                this.skipAlly();
                            }
                        }.bind(this), this.settings.delay);
                    } else {
                        this.target = "";
                    }
                } else if (this.stage === 1) {
                //毁约阶段
                    if (!this.state[this.orders[newVal]].live) {
                        this.nextActive();
                    } else if (this.player[this.orders[newVal]] !== 2) {
                        this.target = this.AIbreachAllyOrNot(
                            this.activeState.code, this.state[this.activeState.code].ally, this.state,
                            this.relations[this.activeState.code]
                        );
                        setTimeout(function () {
                            this.target !== "" ? this.submitBreach() : this.skipBreach();
                        }.bind(this), this.settings.delay);
                    } else {
                        this.target = "";
                    }
                } else if (this.stage === 2) {
                //运筹阶段
                    if (!this.state[this.orders[newVal]].live) {
                        this.nextActive();
                    } else if (this.player[this.orders[newVal]] !== 2) {
                        this.target = null;
                        var available = this.state[this.activeState.code].occupy.filter(function(f) {
                            return this.cities[f].army.length !== 0;
                        }.bind(this));
                        var enemies = available.map(function(a) {
                            return [
                                this.getCitiesInfo()[a].nearby.map(function(n) {
                                    if (
                                        this.cities[n].occupy !== this.orders[newVal] && 
                                        this.state[this.orders[newVal]].ally.indexOf(n) === -1
                                    ) {
                                        return this.cities[n].army.length; 
                                    } else {
                                        return 0;
                                    }
                                }.bind(this)).reduce(function(i, f) {return i + f;}, 0),
                                a
                            ];
                        }.bind(this));
                        enemies = enemies.sort(function(a, b) {return b[0] - a[0];});
                        available = enemies.map(function(e) {
                            return e[1];
                        });
                        this.target = this.AIplanResult(
                            this.activeState.code, this.state[this.activeState.code].ally, 
                            this.state, this.cities, this.relations, available,
                            this.getCitiesInfo()
                        );
                        setTimeout(function () {
                            this.$emit("updateorderofcities", available, this.target);
                            this.info = this.activeState.name + "国完成筹备";
                            this.nextActive();
                        }.bind(this), 500);
                    }
                } else if (this.stage === 3) {
                //劫掠阶段
                    if (!this.state[this.orders[newVal]].live) {
                        this.nextActive();
                    } else if (this.state[this.activeState.code].orderType.indexOf(2) === -1) {
                        this.nextActive();
                    } else {
                        if (this.player[this.orders[newVal]] !== 2) {
                            var result = this.AIdecideDisturbTarget(
                                this.activeState.code, this.state, this.rank, this.cities,
                                this.relations[this.activeState.code]
                            );
                            setTimeout(function () {
                                this.disturbProcess(result);
                            }.bind(this), this.settings.delay);
                        }
                    }
                } else if (this.stage === 4) {
                //行军阶段
                    if (!this.state[this.orders[newVal]].live) {
                        this.nextActive();
                    } else if (this.state[this.activeState.code].orderType.indexOf(0) === -1) {
                        this.nextActive();
                    } else {
                        this.target = [];
                        this.reminder = "";
                        this.attackHero = null;
                        this.defendHero = null;
                        this.heroPower = [0, 0];
                        this.heroSelector = "";
                        this.showBattle = false;
                        if (this.player[this.orders[newVal]] !== 2) {
                            var focus = this.AIselectAttackOrder(
                                this.state[this.activeState.code], this.cities, 
                                this.getCitiesInfo()
                            );
                            app.$data.focus = focus;
                            Vue.nextTick(function () {
                                setTimeout(function () {
                                    this.reminder = this.AIselectMarchDestination(
                                        focus, this.cities, this.getCitiesInfo(), this.state, this.player
                                    );
                                    if (this.reminder === null || this.reminder === undefined) {
                                        this.skipAttack();
                                    } else {
                                        this.target = this.AIselectMarchForce(
                                            this.focus, this.reminder, this.getCitiesInfo(), this.cities
                                        );
                                        if (this.target.length === 0) {
                                            this.skipAttack();
                                        } else {
                                            this.confirmAttack();
                                        }
                                    }
                                }.bind(this), this.settings.delay);
                            }.bind(this));
                        } else {
                            app.$data.focus = null;
                        }
                    }
                } else if (this.stage === 5) {
                //征税阶段
                    this.target = new Array(this.player.length).fill(0);
                    this.cities.forEach(function(c) {
                        if (c.order !== null && this.getOrdersInfo()[c.order].type === 3) {
                            this.target[c.occupy] += 1;
                            this.target[c.occupy] += this.getCitiesInfo()[c.code].resource.filter(function(f) {
                                return f === 0; 
                            }).length;
                        }
                        app.$data.cities[c.code].order = null;
                        app.$data.cities[c.code].status = new Array(
                            app.$data.cities[c.code].army.length
                        ).fill(1);
                    }.bind(this));
                    this.target.forEach(function(t, i) {
                        app.$data.power[i] += t;    
                    });
                } else if (this.stage === 6) {
                //募兵阶段
                    if (!this.state[this.orders[newVal]].live) {
                        this.nextActive();
                    } else if (this.player[this.orders[newVal]] !== 2) {
                        var recruit = this.AIdecideRecruitResult(
                            this.state[this.activeState.code], this.power, this.getCitiesInfo(),
                            this.cities
                        );
                        setTimeout(function () {
                            recruit.forEach(function(r) {
                                this.info = this.activeState.name + "在" + this.getCitiesInfo()[r].name + "募兵";
                                this.$emit("addnewhistory", this.info);
                            }.bind(this));
                            this.nextActive();
                        }.bind(this), this.settings.delay);
                    } else {
                        this.target = [];
                        this.reminder = "";
                        this.heroSelector = 0;
                    }
                }
            }.bind(this));
        }  
    },
    data: function() {
        return {
            active: null,
            info: null,
            target: [],
            reminder: null,
            showBattle: false,
            heroSelector: "",
            attackHero: null,
            defendHero: null,
            heroPower: [],
            cardStyle: {
                position: "fixed",
                left: "8pt",
                top: "8pt",
                width: "200pt",
                backgroundColor: "black",
                zIndex: "2",
                color: "white",
                borderRadius: "5pt",
                border: "2pt solid white",
                padding: "2pt 8pt"
            },
            roundStyle: {
                display: "block",
                textAlign: "center",
                fontSize: "11pt",
                fontWeight: "bold",
                padding: "3pt 0",
                width: "100%",
                borderBottom: "1pt solid lightgrey",
                marginBottom: "2pt"
            },
            descStyle: {
                display: "block",
                fontSize: "11pt",
                textAlign: "center",
                color: "lightgrey",
                marginBottom: "5pt"
            },
            flagStyle: {
                display: "block",
                textAlign: "center",
                fontSize: "10pt",
                height: "22pt"
            },
            selectStyle: {
                display: "inline-block",
                verticalAlign: "middle",
                fontSize: "10pt",
                padding: "3pt 0"
            },
            lineStyle: {
                display: "block",
                marginBottom: "5pt"
            },
            buttonStyle: {
                display: "inline-block",
                verticalAlign: "middle",
                fontSize: "9pt",
                cursor: "pointer"
            },
            submitStyle: {
                display: "inline-block",
                verticalAlign: "middle",
                fontSize: "9pt",
                marginBottom: "5pt",
                cursor: "pointer"
            },
            confirmStyle: {
                display: "block",
                fontSize: "9pt",
                margin: "5pt 0",
                cursor: "pointer"
            },
            infoStyle: {
                display: "block",
                borderTop: "1pt dashed lightgrey",
                fontSize: "9pt",
                padding: "3pt 0"
            },
            orderStyle: {
                display: "inline-block",
                verticalAlign: "middle",
                fontSize: "9pt",
                marginRight: "8pt",
                marginBottom: "5pt",
                border: "1pt solid gold",
                color: "gold",
                padding: "1pt",
                borderRadius: "2pt",
                cursor: "pointer"
            },
            setStyle: {
                display: "inline-block",
                verticalAlign: "middle",
                fontSize: "9pt",
                marginRight: "8pt",
                marginBottom: "5pt",
                border: "1pt solid darkslategrey",
                color: "darkslategrey",
                padding: "1pt",
                borderRadius: "2pt",
                cursor: "pointer"
            },
            boxStyle: {
                display: "inline-block",
                verticalAlign: "top",
                marginRight: "8pt",
                borderTop: "1pt dashed white",
                textAlign: "center",
                marginBottom: "8pt"
            },
            marchStyle: {
                display: "block",
                margin: "5pt 0",
                borderTop: "1pt solid lightgrey"
            },
            lineStyle: {
                display: "block",
                margin: "2pt 0"
            },
            forceStyle: {
                display: "inline-block",
                verticalAlign: "top",
                marginRight: "4pt",
                padding: "2pt 4pt",
                cursor: "pointer"
            },
            borderStyle: {
                border: "1pt solid lightgrey",
                borderRadius: "3pt",
            }
        };
    },
    computed: {
        activeState: function() {
            return this.getStatesInfo()[this.orders[this.active]];
        },
        battleResult: function() {
            var attack = parseFloat(this.calAttackFinal.toFixed(2));
            var defend = parseFloat(this.calDefendFinal.toFixed(2));
            var aRank = this.force.indexOf(this.activeState.code);
            var bRank = this.force.indexOf(this.cities[this.reminder].occupy);
            if (attack > defend || (attack === defend && aRank < bRank)) {
                return true;
            } else {
                return false;
            }
        },
        calDefendFinal: function() {
            return this.calDefendArmyPoint + this.calDefendEnvPoint + this.calDefendSupportPoint
                + this.getHerosInfo()[this.cities[this.reminder].occupy][this.defendHero].strength
                + this.heroPower[1];
        },
        calAttackFinal: function() {
            return this.calAttackEnvPoint + this.calAttackArmyPoint + this.calAttackSupportPoint
                + this.getHerosInfo()[this.activeState.code][this.attackHero].strength
                + this.heroPower[0];
        },
        calDefendEnvPoint: function() {
            var ability = 0;
            if (this.orders[0] === this.cities[this.reminder].occupy) {
                ability += 1;
            }
            ability += 2 - this.getCitiesInfo()[this.reminder].type;
            if (
                this.cities[this.reminder].order !== null && 
                this.getOrdersInfo()[this.cities[this.reminder].order].type === 0
            ) {
                ability += this.getOrdersInfo()[this.cities[this.reminder].order].bonus;
            }
            return ability;
        },
        calDefendArmyPoint: function() {
            var total = 0;
            this.cities[this.reminder].army.forEach(function(a, i) {
                if (this.cities[this.reminder].status[i] === 1) {
                    total += this.getArmyInfo()[a].defend;
                }
            }.bind(this));
            return total;
        },
        calDefendSupportPoint: function() {
            var total = 0;
            this.getCitiesInfo()[this.reminder].nearby.forEach(function(n) {
                if (this.cities[n].order !== null && this.getOrdersInfo()[this.cities[n].order].type === 1) {
                    if (
                        this.cities[n].occupy === this.cities[this.reminder].occupy ||
                        (
                            this.state[this.cities[this.reminder].occupy].ally.indexOf(this.cities[n].occupy) !== -1 &&
                            this.state[this.activeState.code].ally.indexOf(this.cities[n].occupy) === -1
                        )
                    ) {
                        this.cities[n].army.forEach(function(a, i) {
                            if (this.cities[n].status[i] === 1) {
                                total += this.getArmyInfo()[a].defend;
                            }
                        }.bind(this));
                    }
                }
            }.bind(this));
            return total;
        },
        calDefendNum: function() {
            var num = 0;
            num += this.cities[this.reminder].status.filter(function(s) { return s === 1;}).length;
            this.getCitiesInfo()[this.reminder].nearby.forEach(function(n) {
                if (this.cities[n].order !== null && this.getOrdersInfo()[this.cities[n].order].type === 1) {
                    if (
                        this.cities[n].occupy === this.cities[this.reminder].occupy ||
                        (
                            this.state[this.cities[this.reminder].occupy].ally.indexOf(this.cities[n].occupy) !== -1 &&
                            this.state[this.activeState.code].ally.indexOf(this.cities[n].occupy) === -1
                        )
                    ) {
                        num += this.cities[n].status.filter(function(s) { return s === 1;}).length;
                    }
                }
            }.bind(this));
            return num;
        },
        calAttackEnvPoint: function() {
            var attack = 0;
            if (this.focus !== null && this.activeState.code === this.cities[this.focus].occupy) {
                if (this.force[0] === this.activeState.code) {
                    attack += 1;
                }
                attack += this.getOrdersInfo()[this.cities[this.focus].order].bonus;
            }
            return attack;
        },
        calAttackArmyPoint: function() {
            var attack = 0;
            if (this.activeState.code === this.cities[this.focus].occupy) {
                this.target.forEach(function(t) {
                    attack += this.getArmyInfo()[this.cities[this.focus].army[t]].attack;
                }.bind(this));
            }
            return attack;
        },
        calAttackSupportPoint: function() {
            var attack = 0;
            if (this.reminder !== "") {
                this.getCitiesInfo()[this.reminder].nearby.forEach(function(n) {
                    if (this.cities[n].order !== null && this.getOrdersInfo()[this.cities[n].order].type === 1) {
                        if (
                            this.cities[n].occupy === this.activeState.code ||
                            (
                                this.state[this.activeState.code].ally.indexOf(this.cities[n].occupy) !== -1 &&
                                this.state[this.cities[this.reminder].occupy].ally.indexOf(this.cities[n].occupy) === -1
                            )
                        ) {
                            this.cities[n].army.forEach(function(a, i) {
                                if (this.cities[n].status[i] === 1) {
                                    attack += this.getArmyInfo()[a].attack;
                                }
                            }.bind(this));
                        }
                    }
                }.bind(this));
            }
            return attack;
        }
    },
});