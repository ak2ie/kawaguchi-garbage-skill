export interface IGarbageTypes {
  types: IGarbageTypeItem[];
}

export interface IGarbageTypeItem {
  /**
   * ゴミの名前
   */
  item: string;
  /**
   * ゴミの種別
   */
  types: IGarbageTypesDetail[];
  /**
   * 40cmを超える場合粗大ゴミとして出す必要があるか
   * （粗大ゴミとしてのみ出せる場合は false）
   */
  isSodaigomiOver40cm: boolean;
  /**
   * 搬出不可であるか（true なら搬出不可）
   */
  isCannotTakeOut: boolean;
  /**
   * 追加の説明用文字列
   */
  additionalText: string;
}

interface IGarbageTypesDetail {
  /**
   * 材質（材質による差異がない場合は default）
   */
  material: string;
  /**
   * 材質に応じたゴミの種別
   */
  type: string;
}