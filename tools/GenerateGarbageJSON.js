"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var cheerio = require("cheerio");
var axios = require("axios");
var fs = require("fs");
var GarbageData = /** @class */ (function () {
    function GarbageData() {
        this.bunbetsuGuideUrls = [
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
        this.GARBAGE_DATA_JSON_FILENAME = 'GarbageTypes.json';
        /**
         * Alexa Skill model用ファイル名
         */
        this.ALEXA_SKILL_MODEL_JSON_FILENAME = 'ja-JP_GARBAGE_TYPE.json';
    }
    /**
     * プログラムのエントリポイント
     * 分別情報とアレクサスキル用modelをJSONファイルに保存する
     */
    GarbageData.prototype.getGarbageData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var garbageData, _i, _a, url, html, tempGarbageData, duplicateRemovedData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        garbageData = new BunbetsuData([], []);
                        _i = 0, _a = this.bunbetsuGuideUrls;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        url = _a[_i];
                        return [4 /*yield*/, this.getHTML(url)];
                    case 2:
                        html = _b.sent();
                        return [4 /*yield*/, this.getGarbageDataFromHTML(html.data)];
                    case 3:
                        tempGarbageData = _b.sent();
                        garbageData.addBunbetsu(tempGarbageData.Bunbetsu);
                        garbageData.addItems(tempGarbageData.Items);
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5:
                        duplicateRemovedData = this.removeDulplicate(garbageData);
                        // 記号有無チェック
                        this.isContainsOnlyCanSpeakWord(duplicateRemovedData.Items);
                        // 正しく取得できなかった情報を削除
                        this.removeInvalidData(duplicateRemovedData);
                        // JSON出力
                        this.outputJson(duplicateRemovedData);
                        console.log("\n==============================  出力完了 ===============================");
                        console.log(this.GARBAGE_DATA_JSON_FILENAME, ":", "src/直下にコピーしてください。");
                        console.log(this.ALEXA_SKILL_MODEL_JSON_FILENAME, ":", "languageModel > types > valuesを書き換えてください。\n\n");
                        return [2 /*return*/];
                }
            });
        });
    };
    GarbageData.prototype.getGarbageDataFromHTML = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var HINMOKU_TABLE_HEADER, $_1, result, items, res;
            return __generator(this, function (_a) {
                (function (HINMOKU_TABLE_HEADER) {
                    HINMOKU_TABLE_HEADER[HINMOKU_TABLE_HEADER["HINMOKU"] = 0] = "HINMOKU";
                    HINMOKU_TABLE_HEADER[HINMOKU_TABLE_HEADER["IPPANNGOMI"] = 1] = "IPPANNGOMI";
                    HINMOKU_TABLE_HEADER[HINMOKU_TABLE_HEADER["YUUGAIGOMI"] = 2] = "YUUGAIGOMI";
                    HINMOKU_TABLE_HEADER[HINMOKU_TABLE_HEADER["SIGENBUTSU"] = 3] = "SIGENBUTSU";
                    HINMOKU_TABLE_HEADER[HINMOKU_TABLE_HEADER["KANDENCHI"] = 4] = "KANDENCHI";
                    HINMOKU_TABLE_HEADER[HINMOKU_TABLE_HEADER["SODAIGOMI"] = 5] = "SODAIGOMI";
                    HINMOKU_TABLE_HEADER[HINMOKU_TABLE_HEADER["HANNYUUKINSHI"] = 6] = "HANNYUUKINSHI";
                    HINMOKU_TABLE_HEADER[HINMOKU_TABLE_HEADER["BIKO"] = 7] = "BIKO";
                })(HINMOKU_TABLE_HEADER || (HINMOKU_TABLE_HEADER = {}));
                ;
                try {
                    $_1 = cheerio.load(body);
                    result = [];
                    items = [];
                    $_1('#contents-in table tr').each(function (index, elemet) {
                        var item = "";
                        var types = [];
                        var isSodaigomiOver40cm = false;
                        var isCannotTakeOut = false;
                        var additionalText = "";
                        $_1(elemet).children('td').each(function (i, tdElement) {
                            var elementText = "";
                            for (var _i = 0, _a = tdElement.children; _i < _a.length; _i++) {
                                var element = _a[_i];
                                if (element.tagName !== 'a') {
                                    if (typeof element.data === "string") {
                                        elementText += element.data.trim();
                                    }
                                }
                                else {
                                    var innerText = element.children[0].data;
                                    elementText += innerText;
                                }
                            }
                            switch (i) {
                                case HINMOKU_TABLE_HEADER.HINMOKU:
                                    // 「（）」など、言葉に発しない文字を除く
                                    var removeWord = /.*[（\(・].*/g;
                                    elementText = elementText.trim();
                                    if (!removeWord.test(elementText)) {
                                        item = elementText;
                                    }
                                    else {
                                        // 「（）」が2つ存在する場合があるので、最短マッチ
                                        var regexpNonVerbalWord = /^(.*?)[（\(].*/;
                                        var regexpResultArray = regexpNonVerbalWord.exec(elementText);
                                        if (regexpResultArray !== null) {
                                            item = regexpResultArray[1].replace('・', '').trim();
                                        }
                                        else {
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
                                    }
                                    else if (elementText !== "" && elementText.indexOf("40センチメートルを超えるものは粗大ごみです。") !== -1) {
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
                            var removeIndex = types.indexOf("粗大ゴミ");
                            types.splice(removeIndex, 1);
                        }
                        var typesJSON = [];
                        if (types.length === 1) {
                            typesJSON = [{
                                    "material": "default",
                                    "type": types[0]
                                }];
                        }
                        else {
                            for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
                                var type = types_1[_i];
                                typesJSON.push({
                                    "material": "",
                                    "type": type
                                });
                            }
                        }
                        var garbageData = {
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
                }
                catch (e) {
                    console.error(e);
                }
                return [2 /*return*/, res];
            });
        });
    };
    /**
     * HTMLを取得する
     * @param url URL
     */
    GarbageData.prototype.getHTML = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var html;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios["default"].get(url)];
                    case 1:
                        html = _a.sent();
                        return [2 /*return*/, html];
                }
            });
        });
    };
    /**
     * ゴミ分別データとAlexa Skillのモデル用カスタムスロットデータをJSONファイルに出力する
     * @param bunbetsuData 出力するデータ
     */
    GarbageData.prototype.outputJson = function (bunbetsuData) {
        fs.writeFileSync(this.GARBAGE_DATA_JSON_FILENAME, JSON.stringify({ "types": bunbetsuData.Bunbetsu }, undefined, '\t'));
        fs.writeFileSync(this.ALEXA_SKILL_MODEL_JSON_FILENAME, JSON.stringify(bunbetsuData.Items, undefined, '\t'));
    };
    /**
     * ゴミの名前をもとに重複を削除した結果を返す
     * @param originalBunbetsuData 重複があるデータ
     */
    GarbageData.prototype.removeDulplicate = function (originalBunbetsuData) {
        // 品目名別の要素数
        var itemCount = {
            Bunbetsu: [],
            Items: []
        };
        // 分別情報について、ゴミの名前の種類を数える
        for (var _i = 0, _a = originalBunbetsuData.Bunbetsu; _i < _a.length; _i++) {
            var bunbetsuData = _a[_i];
            if (itemCount.Bunbetsu.length > 0) {
                // カウント情報1件以上が存在する場合
                var lastIndex = itemCount.Bunbetsu.length - 1;
                for (var index = 0; index < itemCount.Bunbetsu.length; index++) {
                    var element = itemCount.Bunbetsu[index];
                    if (element.name === bunbetsuData.item) {
                        // 名前がすでに登録済の場合、カウントアップ
                        itemCount.Bunbetsu[index].count++;
                        break;
                    }
                    else if (index === lastIndex) {
                        // 名前が未登録の場合、そのまま登録
                        itemCount.Bunbetsu.push({
                            name: bunbetsuData.item,
                            count: 1
                        });
                        break;
                    }
                }
            }
            else {
                // カウント情報がない場合は、そのまま追加
                itemCount.Bunbetsu.push({
                    name: bunbetsuData.item,
                    count: 1
                });
            }
        }
        // カスタムスロット
        for (var _b = 0, _c = originalBunbetsuData.Items; _b < _c.length; _b++) {
            var itemData = _c[_b];
            if (itemCount.Items.length > 0) {
                var lastIndex = itemCount.Items.length - 1;
                for (var index = 0; index < itemCount.Items.length; index++) {
                    var element = itemCount.Items[index];
                    if (element.name === itemData.name.value) {
                        itemCount.Items[index].count++;
                        break;
                    }
                    else if (index === lastIndex) {
                        itemCount.Items.push({
                            name: itemData.name.value,
                            count: 1
                        });
                        break;
                    }
                }
            }
            else {
                itemCount.Items.push({
                    name: itemData.name.value,
                    count: 1
                });
            }
        }
        // 重複を削除
        for (var index = 0; index < itemCount.Bunbetsu.length; index++) {
            var item = itemCount.Bunbetsu[index];
            if (item.count >= 2) {
                var deleteNum = item.count - 1;
                // console.log(item.name, " : ", item.count);
                while (deleteNum > 0) {
                    for (var index_1 = 0; index_1 < originalBunbetsuData.Bunbetsu.length; index_1++) {
                        var element = originalBunbetsuData.Bunbetsu[index_1];
                        if (element.item === item.name) {
                            originalBunbetsuData.Bunbetsu.splice(index_1, 1);
                            break;
                        }
                    }
                    deleteNum--;
                }
            }
        }
        for (var index = 0; index < itemCount.Items.length; index++) {
            var item = itemCount.Items[index];
            if (item.count >= 2) {
                var deleteNum = item.count - 1;
                while (deleteNum > 0) {
                    for (var index_2 = 0; index_2 < originalBunbetsuData.Items.length; index_2++) {
                        var element = originalBunbetsuData.Items[index_2];
                        if (element.name.value === item.name) {
                            originalBunbetsuData.Items.splice(index_2, 1);
                            break;
                        }
                    }
                    deleteNum--;
                }
            }
        }
        return originalBunbetsuData;
    };
    GarbageData.prototype.isContainsOnlyCanSpeakWord = function (items) {
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var isNotSpeakableWord = item.name.value.match(/[!"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~（）・]/g);
            if (isNotSpeakableWord) {
                console.error('記号エラー：', item.name.value);
                return false;
            }
        }
        return true;
    };
    GarbageData.prototype.removeInvalidData = function (bunbetsuData) {
        var result = bunbetsuData;
        for (var i = 0; i < result.Bunbetsu.length; i++) {
            var bunbetsu = result.Bunbetsu[i];
            for (var _i = 0, _a = bunbetsu.types; _i < _a.length; _i++) {
                var type = _a[_i];
                if (type.material === "") {
                    // 分別情報を削除
                    result.Bunbetsu.splice(i, 1);
                    // モデルからも削除
                    for (var j = 0; j < result.Items.length; j++) {
                        var item = result.Items[j];
                        if (item.name.value === bunbetsu.item) {
                            result.Items.splice(j, 1);
                            break;
                        }
                    }
                    break;
                }
            }
        }
        return result;
    };
    return GarbageData;
}());
exports.GarbageData = GarbageData;
var BunbetsuData = /** @class */ (function () {
    function BunbetsuData(bunbetsu, items) {
        this.Bunbetsu = bunbetsu;
        this.Items = items;
    }
    /**
     * インスタンス変数分別情報を追加する
     * @param bunbetsu 分別情報
     */
    BunbetsuData.prototype.addBunbetsu = function (bunbetsu) {
        for (var _i = 0, bunbetsu_1 = bunbetsu; _i < bunbetsu_1.length; _i++) {
            var item = bunbetsu_1[_i];
            this.Bunbetsu.push(item);
        }
    };
    BunbetsuData.prototype.addItems = function (items) {
        for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
            var item = items_2[_i];
            this.Items.push(item);
        }
    };
    return BunbetsuData;
}());
exports.BunbetsuData = BunbetsuData;
;
var garbageData = new GarbageData();
garbageData.getGarbageData();
