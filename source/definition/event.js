Vue.mixin({
    methods: {
        getEventsInfo: function() {
            return [
                {code: 0, name: "义勇兵", desc: "各国可在国都免费募兵"},
                {code: 1, name: "义勇兵", desc: "各国可在国都免费募兵"},
                {code: 2, name: "大变法", desc: "各国根据领土资源获得国力"},
                {code: 3, name: "大变法", desc: "各国根据领土资源获得国力"},
                {code: 4, name: "主动请缨", desc: "所有将领均调整为待命状态"},
                {code: 5, name: "四夷扩张", desc: "四夷军力+1"},
                {code: 6, name: "四夷扩张", desc: "四夷军力+2"},
                {code: 7, name: "四夷扩张", desc: "四夷军力+4"},
                {code: 8, name: "四夷入侵", desc: "各国减少与四夷军力相等的国力,若不足,则损失相应兵力"},
                {code: 9, name: "四夷入侵", desc: "各国减少与四夷军力相等的国力,若不足,则损失相应兵力"},
                {code: 10, name: "夏雨连绵", desc: "下回合各国无法部署支援指令"},
                {code: 11, name: "寒冬凌冽", desc: "下回合各国无法部署劫掠指令"},
                {code: 12, name: "秋风萧瑟", desc: "下回合各国无法部署休整指令"},
            ];
        },
        getEventSituation: function(n) {
            if (n >=0 && n <= 9) {
                return "春日平常";
            } else {
                return this.getEventsInfo()[n].name;
            }
        }
    }
});