import { IGarbageTypeItem } from "../types/GarbageTypes.js";
import * as fs from "fs";

export class Garbage {
    private garbageTypes: IGarbageTypeItem[];

    /**
     * 
     * @param jsonPath ゴミ分別方法がまとめられたJSONファイルパス
     */
    constructor(jsonPath: string) {
        const garbageTypesJSON = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        this.garbageTypes = garbageTypesJSON.types;
    }

    private GetGarbageTypeByItem(garbageItem: string): IGarbageTypeItem | undefined  {
        let garbageTypes = <IGarbageTypeItem[]>this.garbageTypes;
        let garbageType;

        for (const garbage of garbageTypes) {
            if (garbage.item === garbageItem) {
                garbageType = garbage;
                break;
            }
        }

        return garbageType;
    }

    public GenerateSpeechText(garbageItem: string): string {
        const garbageType = this.GetGarbageTypeByItem(garbageItem);
        let speechText = '';

        if (garbageType !== undefined) {
            /* ------------------------------------------
                ○○（ゴミの名前）は、
               ------------------------------------------ */
            speechText = garbageType.item + 'は';

            if (garbageType.isCannotTakeOut === false) {
                /* ------------------------------------------
                    材質に応じたゴミ種別を追加
                  ------------------------------------------ */
                let isOnlyDefault = true;
                for (const type of garbageType.types) {
                    if (type.material != 'default') {
                        isOnlyDefault = false;
                        break;
                    }
                }

                if (isOnlyDefault) {
                    speechText += garbageType.types[0].type + "です。"
                } else {
                    for (let index = 0; index < garbageType.types.length; index++) {
                        const type = garbageType.types[index];
                        if (index != garbageType.types.length - 1) {
                            speechText += type.material + "場合は" + type.type + "、"
                        } else {
                            speechText += type.material + "場合は" + type.type + "です。"
                        }
                    }
                }

                /* ------------------------------------------
                    40cmを超える場合は粗大ゴミとして出す
                  ------------------------------------------ */
                if (garbageType.isSodaigomiOver40cm) {
                    speechText += '40センチを超える場合粗大ゴミとして出してください。';
                }
            } else {
                /* ------------------------------------------
                    ゴミで出せない場合
                  ------------------------------------------ */
                speechText += 'ゴミで出せません。'
            }

            /* ------------------------------------------
                追加文字列
              ------------------------------------------ */
            if (garbageType.additionalText.length > 0) {
                speechText += garbageType.additionalText;
            }
        } else {
            speechText = 'すみません。ゴミの種類が分かりませんでした。別の言葉に言い換えてみてください。';
        }

        return speechText;
    }
}