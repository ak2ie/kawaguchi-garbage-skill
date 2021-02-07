import { Region } from "./Region";
import { regions } from "./Regions.json";
import { patterns } from "./CollectionPatterns.json";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo');

/**
 * ごみ収集日パターン
 */
export class CollectionSchedule {
  /**
   * 直近のゴミ収集日を取得する
   * @param {Region} region 地域
   * @param {GarbageCategory} garbageCategory ゴミ種別
   */
  public GetNearestCollectionDate(region: Region, garbageCategory: GarbageCategory) {
    // 地域 => 収集日パターン番号
    const regionCollectionPattern = regions.filter(x => x.name === region.toString());
    if (regionCollectionPattern === undefined || regionCollectionPattern.length === 0) {
      throw new Error("収集パターン取得失敗")
    }
    const collectionPatternNumber = regionCollectionPattern[0].collectionPatternNumber;

    // 収集日パターン番号 => 収集パターン
    const garbageAllCollectionPattern = patterns.filter(x => x.patternNumber === collectionPatternNumber);
    if (garbageAllCollectionPattern === undefined || garbageAllCollectionPattern.length === 0) {
      throw new Error("ゴミの収集日バターン取得失敗")
    }
    const garbageCollectionPatterns = garbageAllCollectionPattern[0].schedules.filter(x => x.category === garbageCategory.toString());

    // 収集パターン => 収集日リスト
    let collectionDays: Date[] = [];
    garbageCollectionPatterns[0].days.forEach(x => {
      const today = dayjs().tz();

      const targetDayOfWeek = x.dayOfWeek;
      if (targetDayOfWeek === "Sunday" || targetDayOfWeek === "Monday" || targetDayOfWeek === "Tuesday" || targetDayOfWeek === "Wednesday" || targetDayOfWeek === "Thursday" || targetDayOfWeek === "Friday" || targetDayOfWeek === "Saturday") {
        // 今月の収集日を取得
        const date = this.GetDate(today.year(), today.month() + 1, DayOfWeek[targetDayOfWeek], x.ordinalNum);
        if (date !== "") {
          collectionDays.push(dayjs(date).toDate());
        }
        // 今月の全収集日を過ぎている可能性があるため、来月分も取得
        const nextMonthDate = this.GetDate(today.year(), today.month() + 2, DayOfWeek[targetDayOfWeek], x.ordinalNum);
        if (nextMonthDate !== "") {
          collectionDays.push(dayjs(nextMonthDate).tz().toDate());
        }
      }
    });

    // 直近の日付を取得
    let nearestCollectionDay = dayjs().tz().add(-1, "month");
    collectionDays.forEach(day => {
      if (dayjs(day).diff(dayjs().tz()) >= 0) {
        // 未来の日付の場合
        const diff = Math.abs(dayjs().tz().diff(day));
        const minDiff = Math.abs(dayjs().tz().diff(nearestCollectionDay));
        if (diff < minDiff) {
          nearestCollectionDay = dayjs(day);
        }
      }
    });

    return nearestCollectionDay.toDate();
  }

  /**
   * 対象月の第N X曜日の日付を取得
   * @param {number} year 年
   * @param {number} month 月(1始まり)
   * @param {DayOfWeek} targetDayOfWeek 曜日
   * @return {string} 日付(yyyy/mm/dd)。存在しない場合は空文字（2021/2の第5火曜など）
   */
  private GetDate(year: number, month: number, targetDayOfWeek: DayOfWeek, num: number) {
    const firstDay = dayjs(`${year}/${month}/1`).utc().local();
    const firstDayOfWeek = firstDay.day();

    // 求める日付は、第1 X曜日 + N週間後
    let firstTargetDayOfWeek = firstDay.clone();
    if (firstDayOfWeek !== targetDayOfWeek) {
      // 第1 X曜日の日付を求める
      let addDays = 0;
      if (firstDayOfWeek < targetDayOfWeek) {
        // 1日の曜日 < 指定の曜日の場合
        addDays = targetDayOfWeek - firstDayOfWeek;
      } else {
        // 1週間後(=7日後) - 指定の曜日
        addDays = 7 - (firstDayOfWeek - targetDayOfWeek);
      }
      firstTargetDayOfWeek = firstDay.add(addDays, "days");
    }
    let target = firstTargetDayOfWeek.add(num - 1, "weeks");

    if (target.month() === month - 1) {
      return target.format("YYYY/MM/DD");
    } else {
      return "";
    }
  }

  // private dayOfWeek: DayOfWeek;
}
// function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
//   return o.reduce((res, key) => {
//     res[key] = key;
//     return res;
//   }, Object.create(null));
// }

// /** Create a K:V */
// const DayOfWeek = strEnum([
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday"
// ]);

// /** Create a Type */
// type DayOfWeek = keyof typeof DayOfWeek;

/**
 * ゴミ種別
 */
export enum GarbageCategory {
  /**
   * 一般ゴミ
   */
  Regular = "Regular",
  /**
   * 有害
   */
  Toxic = "Toxic",
  /**
   * プラスチック
   */
  Plastic = "Plastic",
  /**
   * ペットボトル
   */
  PetBottles = "PetBottles",
  /**
   * 繊維
   */
  Textiles = "Textiles",
  /**
   * びん
   */
  Bottles = "Bottles",
  /**
   * かん
   */
  Can = "Can",
  /**
   * 金属
   */
  Metal = "Metal",
  /**
   * 紙
   */
  Paper = "Paper",
}

/**
 * 曜日
 */
export enum DayOfWeek {
  /**
   * 日曜
   */
  Sunday = 0,
  /**
   * 月曜
   */
  Monday,
  /**
   * 火曜
   */
  Tuesday,
  /**
   * 水曜
   */
  Wednesday,
  /**
   * 木曜
   */
  Thursday,
  /**
   * 金曜
   */
  Friday,
  /**
   * 土曜
   */
  Saturday
}

/**
 * 曜日
 */
// export const DayOfWeek = {
//   /**
//    * 日曜
//    */
//   Sunday: 0,
//   /**
//    * 月曜
//    */
//   Monday: 1,
//   /**
//    * 火曜
//    */
//   Tuesday: 2,
//   /**
//    * 水曜
//    */
//   Wednesday: 3,
//   /**
//    * 木曜
//    */
//   Thursday: 4,
//   /**
//    * 金曜
//    */
//   Friday: 5,
//   /**
//    * 土曜
//    */
//   Saturday: 6
// }