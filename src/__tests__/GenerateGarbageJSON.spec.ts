import { GarbageData, BunbetsuData } from "../../tools/GenerateGarbageJSON";

describe('JSON生成', () => {
    it('分別情報重複', () => {
        let garbageData = new GarbageData();

        let input = new BunbetsuData([{
            item: "アイロン",
            types: [{
                material: "",
                type: "可燃ゴミ"
            }],
            additionalText: "",
            isCannotTakeOut: false,
            isSodaigomiOver40cm: false
        },
        {
            item: "アイロン",
            types: [{
                material: "",
                type: "可燃ゴミ"
            }],
            additionalText: "",
            isCannotTakeOut: false,
            isSodaigomiOver40cm: false
        }], []);

        let expected = new BunbetsuData([
            {
                item: "アイロン",
                types: [{
                    material: "",
                    type: "可燃ゴミ"
                }],
                additionalText: "",
                isCannotTakeOut: false,
                isSodaigomiOver40cm: false
            }
        ], []);

        let res = garbageData.removeDulplicate(input);

        expect(res.Bunbetsu).toEqual(expected.Bunbetsu);
    });

    it('分別情報重複・重複無し混在', () => {
        let garbageData = new GarbageData();

        let input = new BunbetsuData([{
            item: "アイロン",
            types: [{
                material: "",
                type: "可燃ゴミ"
            }],
            additionalText: "",
            isCannotTakeOut: false,
            isSodaigomiOver40cm: false
        },
        {
            item: "アイロン",
            types: [{
                material: "",
                type: "可燃ゴミ"
            }],
            additionalText: "",
            isCannotTakeOut: false,
            isSodaigomiOver40cm: false
        },
        {
            item: "パソコン",
            types: [{
                material: "",
                type: "可燃ゴミ"
            }],
            additionalText: "",
            isCannotTakeOut: false,
            isSodaigomiOver40cm: false
        }], []);

        let expected = new BunbetsuData([
            {
                item: "アイロン",
                types: [{
                    material: "",
                    type: "可燃ゴミ"
                }],
                additionalText: "",
                isCannotTakeOut: false,
                isSodaigomiOver40cm: false
            },
            {
                item: "パソコン",
                types: [{
                    material: "",
                    type: "可燃ゴミ"
                }],
                additionalText: "",
                isCannotTakeOut: false,
                isSodaigomiOver40cm: false
            }
        ], []);

        let res = garbageData.removeDulplicate(input);

        expect(res.Bunbetsu).toEqual(expected.Bunbetsu);
    });

    it('分別情報重複', () => {
        let garbageData = new GarbageData();

        let input = new BunbetsuData([], [
            {
                name: {
                    value: "アイロン"
                }
            },
            {
                name: {
                    value: "アイロン"
                }
            }
        ]);

        let expected = new BunbetsuData([], [
            {
                name: {
                    value: "アイロン"
                }
            }
        ]);

        let res = garbageData.removeDulplicate(input);

        expect(res.Items).toEqual(expected.Items);
    });

    it('記号チェック（ひらがな）', () => {
        let garbageData = new GarbageData();

        let input = [
            {
                name: {
                    value: "あ"
                }
            }
        ];

        expect(garbageData.isContainsOnlyCanSpeakWord(input)).toBe(true);
    });

    it('記号チェック（漢字）', () => {
        let garbageData = new GarbageData();

        let input = [
            {
                name: {
                    value: "漢"
                }
            }
        ];

        expect(garbageData.isContainsOnlyCanSpeakWord(input)).toBe(true);
    });

    it('記号チェック（カタカナ）', () => {
        let garbageData = new GarbageData();

        let input = [
            {
                name: {
                    value: "ア"
                }
            }
        ];

        expect(garbageData.isContainsOnlyCanSpeakWord(input)).toBe(true);
    });

    it('記号チェック（括弧）', () => {
        let garbageData = new GarbageData();

        let input = [
            {
                name: {
                    value: "（"
                }
            }
        ];

        expect(garbageData.isContainsOnlyCanSpeakWord(input)).toBe(false);
    });

    it('記号チェック（混合）', () => {
        let garbageData = new GarbageData();

        let input = [
            {
                name: {
                    value: "アイロン台（金属製）"
                }
            }
        ];

        expect(garbageData.isContainsOnlyCanSpeakWord(input)).toBe(false);
    });

    it('記号チェック（混合2）', () => {
        let garbageData = new GarbageData();

        let input = [
            {
                name: {
                    value: "アイロン台・金属製"
                }
            }
        ];

        expect(garbageData.isContainsOnlyCanSpeakWord(input)).toBe(false);
    });
});