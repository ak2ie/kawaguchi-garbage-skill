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
function getHTML(url) {
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
}
exports.getHTML = getHTML;
function getGarbageDataFromHTML(url) {
    return __awaiter(this, void 0, void 0, function () {
        var body, HINMOKU_TABLE_HEADER, $_1, result, items;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getHTML(url)];
                case 1:
                    body = _a.sent();
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
                        $_1 = cheerio.load(body.data);
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
                                var elementData = tdElement.children[0].data;
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
                        return [2 /*return*/, {
                                "Bunbetsu": result,
                                "Items": items
                            }];
                    }
                    catch (e) {
                        console.error(e);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
var bunbetsuGuideUrls = [
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
var BunbetsuData = {
    Bunbetsu: [],
    Items: []
};
for (var _i = 0, bunbetsuGuideUrls_1 = bunbetsuGuideUrls; _i < bunbetsuGuideUrls_1.length; _i++) {
    var url = bunbetsuGuideUrls_1[_i];
    getGarbageDataFromHTML(url).then(function (response) {
        if (response !== undefined) {
            for (var _i = 0, _a = response.Bunbetsu; _i < _a.length; _i++) {
                var item = _a[_i];
                BunbetsuData.Bunbetsu.push(item);
            }
            for (var _b = 0, _c = response.Items; _b < _c.length; _b++) {
                var item = _c[_b];
                BunbetsuData.Items.push(item);
            }
        }
    })
        .then(function () {
        fs.writeFileSync('GarbageTypes.json', JSON.stringify({ "types": BunbetsuData.Bunbetsu }, undefined, '\t'));
        fs.writeFileSync('ja-JP_GARBAGE_TYPE.json', JSON.stringify(BunbetsuData.Items, undefined, '\t'));
    });
}
