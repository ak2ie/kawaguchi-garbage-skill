import * as cheerio from "cheerio";
import * as axios from "axios";
import * as fs from "fs";

export async function getHTML(url: string) {
    const html = await axios.default.get(url);
    return html;
}

export async function getGarbageDataFromHTML(url: string) {
    let body = await getHTML(url);
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
        const $ = cheerio.load(body.data);
        var result: object[] = [];
        var items: object[] = [];
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
                        item = elementText;
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

        return {
            "Bunbetsu": result,
            "Items": items
        };
    } catch (e) {
        console.error(e);
    }
}

let bunbetsuGuideUrls = [
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

var BunbetsuData: { [key: string]: object[] } = {
    Bunbetsu: [],
    Items: []
};

for (const url of bunbetsuGuideUrls) {
    getGarbageDataFromHTML(url).then(response => {
        if (response !== undefined) {
            for (const item of response.Bunbetsu) {
                BunbetsuData.Bunbetsu.push(item);
            }

            for (const item of response.Items) {
                BunbetsuData.Items.push(item);
            }
        }
    })
    .then(() => {
        fs.writeFileSync('GarbageTypes.json', JSON.stringify({"types": BunbetsuData.Bunbetsu}, undefined, '\t'));

        fs.writeFileSync('ja-JP_GARBAGE_TYPE.json', JSON.stringify(BunbetsuData.Items, undefined, '\t'));
    });
}

