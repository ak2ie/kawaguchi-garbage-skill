import * as cheerio from "cheerio";
import * as axios from "axios";
import * as fs from "fs";

export class GarbageData {
    bunbetsuGuideUrls = [
        "https://www.city.kawaguchi.lg.jp/soshiki/01100/040/4/3/3469.html",
        "https://www.city.kawaguchi.lg.jp/soshiki/01100/040/4/3/3470.html",
        "https://www.city.kawaguchi.lg.jp/soshiki/01100/040/4/3/3471.html",
        "https://www.city.kawaguchi.lg.jp/soshiki/01100/040/4/3/3472.html",
        "https://www.city.kawaguchi.lg.jp/soshiki/01100/040/4/3/3473.html",
        "https://www.city.kawaguchi.lg.jp/soshiki/01100/040/4/3/3474.html",
        "https://www.city.kawaguchi.lg.jp/soshiki/01100/040/4/3/3475.html",
        "https://www.city.kawaguchi.lg.jp/soshiki/01100/040/4/3/3476.html",
        "https://www.city.kawaguchi.lg.jp/soshiki/01100/040/4/3/3477.html",
        "https://www.city.kawaguchi.lg.jp/soshiki/01100/040/4/3/3478.html"
    ];

    /**
     * ゴミ分別データJSONファイル名
     */
    GARBAGE_DATA_JSON_FILENAME = 'GarbageTypes.json';

    /**
     * Alexa Skill model用ファイル名
     */
    ALEXA_SKILL_MODEL_JSON_FILENAME = 'ja-JP_GARBAGE_TYPE.json';

    /**
     * プログラムのエントリポイント
     * 分別情報とアレクサスキル用modelをJSONファイルに保存する
     */
    public async getGarbageData() {
        var garbageData = new BunbetsuData([], []);

        // データ生成
        for (const url of this.bunbetsuGuideUrls) {
            let html = await this.getHTML(url);
            let tempGarbageData = await this.getGarbageDataFromHTML(html.data);
            garbageData.addBunbetsu(tempGarbageData.Bunbetsu);
            garbageData.addItems(tempGarbageData.Items);
        }

        // 重複削除
        let duplicateRemovedData = this.removeDulplicate(garbageData);

        // 記号有無チェック
        this.isContainsOnlyCanSpeakWord(duplicateRemovedData.Items);

        // JSON出力
        this.outputJson(duplicateRemovedData);
    }

    async getGarbageDataFromHTML(body: string) {
        /**
         * インデックス（品目）
         */
        enum HINMOKU_TABLE_HEADER {
            HINMOKU,
            IPPANNGOMI,
            YUUGAIGOMI,
            SIGENBUTSU,
            KANDENCHI,
            SODAIGOMI,
            HANNYUUKINSHI,
            BIKO
        };

        try {
            const $ = cheerio.load(body);
            var result: IBunbetsu[] = [];
            var items: IItems[] = [];
            var res!: BunbetsuData;
            $('#contents-in table tr').each((index, elemet) => {
                var item = "";
                var types: string[] = [];
                var isSodaigomiOver40cm = false;
                var isCannotTakeOut = false;
                var additionalText = "";

                $(elemet).children('td').each((i, tdElement) => {
                    var elementText = "";
                    const elementData = tdElement.children[0].data;
                    if (typeof elementData === "string") {
                        elementText = elementData.trim();
                    }

                    switch (i) {
                        case HINMOKU_TABLE_HEADER.HINMOKU:
                            // 「（）」など、言葉に発しない文字を除く
                            const removeWord = /.*[（\(・].*/g;

                            elementText = elementText.trim();
                            if (!removeWord.test(elementText)) {
                                item = elementText;
                            } else {
                                // 「（）」が2つ存在する場合があるので、最短マッチ
                                const regexpNonVerbalWord = /^(.*?)[（\(].*/;
                                const regexpResultArray = regexpNonVerbalWord.exec(elementText);
                                if (regexpResultArray !== null) {
                                    item = regexpResultArray[1].replace('・', '').trim();
                                } else {
                                    new Error("品目の取得に失敗:" + elementText);
                                }
                            }
                            break;

                        case HINMOKU_TABLE_HEADER.IPPANNGOMI:
                            if (elementText === '該当する') {
                                types.push("一般ゴミ");
                            }
                            break;

                        case HINMOKU_TABLE_HEADER.YUUGAIGOMI:
                            if (elementText === '該当する') {
                                types.push("有害ゴミ");
                            }
                            break;

                        case HINMOKU_TABLE_HEADER.SIGENBUTSU:
                            if (elementText !== "") {
                                types.push(elementText + "ゴミ");
                            }
                            break;

                        case HINMOKU_TABLE_HEADER.KANDENCHI:
                            if (elementText === '該当する') {
                                types.push("乾電池");
                            }
                            break;

                        case HINMOKU_TABLE_HEADER.SODAIGOMI:
                            if (elementText === '該当する') {
                                types.push("粗大ゴミ");
                            }
                            break;

                        case HINMOKU_TABLE_HEADER.HANNYUUKINSHI:
                            if (elementText === '該当する') {
                                isCannotTakeOut = true;
                            }
                            break;

                        case HINMOKU_TABLE_HEADER.BIKO:
                            if (elementText !== "" && elementText !== "40センチメートルを超えるものは粗大ごみです。") {
                                additionalText = elementText.replace("40センチメートルを超えるものは粗大ごみです。", "");
                            } else if (elementText !== "" && elementText.indexOf("40センチメートルを超えるものは粗大ごみです。") !== -1) {
                                isSodaigomiOver40cm = true;
                            }
                            break;
                    }
                });

                if (item.length === 0) {
                    return;
                }

                /**
                 * 40cmを超える場合粗大ゴミとしてだすときは、
                 * isSodaigomiOver40cmで設定し、types（ゴミ種別）には粗大ゴミを設定しない
                 */
                if (types.indexOf("粗大ゴミ") !== -1 && isSodaigomiOver40cm) {
                    const removeIndex = types.indexOf("粗大ゴミ");
                    types.splice(removeIndex, 1);
                }

                let typesJSON = [];
                if (types.length === 1) {
                    typesJSON = [{
                        "material": "default",
                        "type": types[0]
                    }];
                } else {
                    for (const type of types) {
                        typesJSON.push({
                            "material": "",
                            "type": type
                        });
                    }
                }

                const garbageData = {
                    item: item,
                    types: typesJSON,
                    isSodaigomiOver40cm: isSodaigomiOver40cm,
                    isCannotTakeOut: isCannotTakeOut,
                    additionalText: additionalText
                };

                result.push(garbageData);
                items.push({ name: { value: item } });
            });

            res = new BunbetsuData(result, items);

        } catch (e) {
            console.error(e);
        }

        return res;
    }

    /**
     * HTMLを取得する
     * @param url URL
     */
    public async getHTML(url: string) {
        let html = await axios.default.get(url);
        return html;
    }

    /**
     * ゴミ分別データとAlexa Skillのモデル用カスタムスロットデータをJSONファイルに出力する
     * @param bunbetsuData 出力するデータ
     */
    outputJson(bunbetsuData: BunbetsuData) {
        fs.writeFileSync(this.GARBAGE_DATA_JSON_FILENAME, JSON.stringify({ "types": bunbetsuData.Bunbetsu }, undefined, '\t'));

        fs.writeFileSync(this.ALEXA_SKILL_MODEL_JSON_FILENAME, JSON.stringify(bunbetsuData.Items, undefined, '\t'));
    }

    /**
     * ゴミの名前をもとに重複を削除した結果を返す
     * @param originalBunbetsuData 重複があるデータ
     */
    public removeDulplicate(originalBunbetsuData: BunbetsuData) {
        // 品目名別の要素数
        var itemCount: { [key: string]: ICount[] } = {
            Bunbetsu: [],
            Items: []
        };

        // 分別情報について、ゴミの名前の種類を数える
        for (const bunbetsuData of originalBunbetsuData.Bunbetsu) {
            if (itemCount.Bunbetsu.length > 0) {
                // カウント情報1件以上が存在する場合
                var lastIndex = itemCount.Bunbetsu.length - 1;

                for (let index = 0; index < itemCount.Bunbetsu.length; index++) {
                    const element = itemCount.Bunbetsu[index];
                    if (element.name === bunbetsuData.item) {
                        // 名前がすでに登録済の場合、カウントアップ
                        itemCount.Bunbetsu[index].count++;
                        break;
                    } else if (index === lastIndex) {
                        // 名前が未登録の場合、そのまま登録
                        itemCount.Bunbetsu.push({
                            name: bunbetsuData.item,
                            count: 1
                        });
                        break;
                    }
                }
            } else {
                // カウント情報がない場合は、そのまま追加
                itemCount.Bunbetsu.push({
                    name: bunbetsuData.item,
                    count: 1
                });
            }
        }

        // カスタムスロット
        for (const itemData of originalBunbetsuData.Items) {
            if (itemCount.Items.length > 0) {
                var lastIndex = itemCount.Items.length - 1;

                for (let index = 0; index < itemCount.Items.length; index++) {
                    const element = itemCount.Items[index];
                    if (element.name === itemData.name.value) {
                        itemCount.Items[index].count++;
                        break;
                    } else if (index === lastIndex) {
                        itemCount.Items.push({
                            name: itemData.name.value,
                            count: 1
                        });
                        break;
                    }
                }
            } else {
                itemCount.Items.push({
                    name: itemData.name.value,
                    count: 1
                });
            }
        }

        // 重複を削除
        for (let index = 0; index < itemCount.Bunbetsu.length; index++) {
            const item = itemCount.Bunbetsu[index];
            if (item.count >= 2) {
                let deleteNum = item.count - 1;
                // console.log(item.name, " : ", item.count);

                while (deleteNum > 0) {
                    for (let index = 0; index < originalBunbetsuData.Bunbetsu.length; index++) {
                        const element = originalBunbetsuData.Bunbetsu[index];
                        if (element.item === item.name) {
                            originalBunbetsuData.Bunbetsu.splice(index, 1);
                            break;
                        }
                    }
                    deleteNum--;
                }
            }
        }

        for (let index = 0; index < itemCount.Items.length; index++) {
            const item = itemCount.Items[index];
            if (item.count >= 2) {
                let deleteNum = item.count - 1;

                while (deleteNum > 0) {
                    for (let index = 0; index < originalBunbetsuData.Items.length; index++) {
                        const element = originalBunbetsuData.Items[index];
                        if (element.name.value === item.name) {
                            originalBunbetsuData.Items.splice(index, 1);
                            break;
                        }
                    }
                    deleteNum--;
                }
            }
        }

        return originalBunbetsuData;
    }

    public isContainsOnlyCanSpeakWord(items: IItems[]) {
        for (const item of items) {
            let isNotSpeakableWord = item.name.value.match(/[!"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~（）・]/g);
            if (isNotSpeakableWord) {
                console.error('記号エラー：', item.name.value);
                return false;
            }
        }
        return true;
    }
}

export class BunbetsuData {
    public Bunbetsu: IBunbetsu[];
    public Items: IItems[];

    constructor(bunbetsu: IBunbetsu[], items: IItems[]) {
        this.Bunbetsu = bunbetsu;
        this.Items = items;
    }

    /**
     * インスタンス変数分別情報を追加する
     * @param bunbetsu 分別情報
     */
    public addBunbetsu(bunbetsu: IBunbetsu[]) {
        for (const item of bunbetsu) {
            this.Bunbetsu.push(item);
        }
    }

    public addItems(items: IItems[]) {
        for (const item of items) {
            this.Items.push(item);
        }
    }


};

interface IBunbetsu {
    item: string;
    types: ITypes[];
    isSodaigomiOver40cm: boolean;
    isCannotTakeOut: boolean;
    additionalText: string;
}

interface ITypes {
    material: string;
    type: string;
}

interface IItems {
    name: IItemValue
}

interface IItemValue {
    value: string;
}

// async function getGarbageData() {
//     for (const url of bunbetsuGuideUrls) {
//         let html = await getGarbageDataFromHTML(url)
//             .then(response => {
//                 if (response !== undefined) {
//                     for (const item of response.Bunbetsu) {
//                         bunbetsuData.Bunbetsu.push(item);
//                     }

//                     for (const item of response.Items) {
//                         bunbetsuData.Items.push(item);
//                     }
//                 }
//             });
//     }
// };


// 重複削除

interface ICount {
    name: string;
    count: number;
}


let garbageData = new GarbageData();
garbageData.getGarbageData();