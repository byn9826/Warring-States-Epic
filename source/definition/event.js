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
                {code: 6, name: "四夷扩张", desc: "四夷军力+1"},
                {code: 7, name: "四夷扩张", desc: "四夷军力+1"},
                {code: 8, name: "四夷扩张", desc: "四夷军力+1"},
                {code: 9, name: "四夷入侵", desc: "各国损失与四夷战力相等的国力,国库亏空时损失加倍"},
                {code: 10, name: "天下太平", desc: "无事发生"},
                {code: 11, name: "天下太平", desc: "无事发生"},
                {code: 12, name: "夏雨连绵", desc: "下回合进攻方战力-1"},
                {code: 13, name: "秋风萧瑟", desc: "下回合防守方战力-1"},
                {code: 14, name: "寒冬凌冽", desc: "下回合战斗失败伤亡+1"},
                {code: 15, name: "春日平常", desc: "无事发生"},
                {code: 16, name: "春日平常", desc: "无事发生"},
                {code: 17, name: "春日平常", desc: "无事发生"}
            ];
        },
        getEventSituation: function(n) {
            switch (n) {
                case 0:
                    return "春日平常";
                case 1:
                    return "夏雨连绵";
                case 2:
                    return "秋风萧瑟";
                case 3:
                    return "寒冬凌冽";
            }
        }
    }
});