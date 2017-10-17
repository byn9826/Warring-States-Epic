Vue.mixin({
    methods: {
        getEventsInfo: function() {
            return [
                {code: 0, name: "义勇兵", desc: "各国在国都免费募得满编精兵"},
                {code: 1, name: "大变法", desc: "各国获得与领土国力点数相等的国力"},
                {code: 2, name: "将请缨", desc: "各国所有将领均调整为待命状态"},
                {code: 3, name: "无为而治", desc: "无事发生"},
                {code: 4, name: "无为而治", desc: "无事发生"},
                {code: 5, name: "无为而治", desc: "无事发生"},
                {code: 6, name: "四夷扩张", desc: "四夷军力+2"},
                {code: 6, name: "四夷扩张", desc: "四夷军力+2"},
                {code: 7, name: "四夷扩张", desc: "四夷军力+2"},
                {code: 9, name: "四夷入侵", desc: "各国损失与四夷军力相等的国力,若不足,则损失相应兵力"},
                {code: 10, name: "四夷入侵", desc: "各国损失与四夷军力相等的国力,若不足,则损失相应兵力"},
                {code: 11, name: "天下太平", desc: "无事发生"},
                {code: 12, name: "夏雨连绵", desc: "下回合各国无法部署支援指令"},
                {code: 13, name: "寒冬凌冽", desc: "下回合各国无法部署劫掠指令"},
                {code: 14, name: "秋风萧瑟", desc: "下回合各国无法部署休整指令"},
                {code: 15, name: "春日平常", desc: "无事发生"},
                {code: 16, name: "春日平常", desc: "无事发生"},
                {code: 17, name: "春日平常", desc: "无事发生"}
            ];
        },
        getEventSituation: function(n) {
            if (n === null) {
                return "春日平常";
            }
        }
    }
});