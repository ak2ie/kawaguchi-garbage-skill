import { CollectionSchedule, GarbageCategory } from "../CollectionSchedule";
import { Region } from "../Region";
import * as MockDate from "mockdate";

describe("ゴミ収集日", () => {
  it("1日の曜日 > 収集曜日", () => {
    // 2021/2/1=月曜、プラスチック=毎週水曜
    MockDate.set("2021-02-01");

    const schedule = new CollectionSchedule();
    const date = schedule.GetNearestCollectionDate(Region.KanayamaCho, GarbageCategory.Plastic);

    MockDate.reset();

    // 第1水曜=2/3
    expect(date).toEqual(new Date("2021/2/3"));
  });

  it("1日の曜日 < 収集曜日", () => {
    // 2021/2/4=木曜、プラスチック=毎週水曜
    MockDate.set("2021-02-04");

    const schedule = new CollectionSchedule();
    const date = schedule.GetNearestCollectionDate(Region.KanayamaCho, GarbageCategory.Plastic);

    // 第1水曜=2/3は過ぎているので、第2水曜=2/10
    expect(date).toEqual(new Date("2021/2/10"));
  });

  it("当日", () => {
    // 2021/2/3=水曜、プラスチック=毎週水曜
    MockDate.set("2021-02-03");

    const schedule = new CollectionSchedule();
    const date = schedule.GetNearestCollectionDate(Region.KanayamaCho, GarbageCategory.Plastic);

    expect(date).toEqual(new Date("2021/2/3"));
  });

  it("来月", () => {
    // 2021/2/25=木曜、プラスチック=毎週水曜
    MockDate.set("2021-02-25");

    const schedule = new CollectionSchedule();
    const date = schedule.GetNearestCollectionDate(Region.KanayamaCho, GarbageCategory.Plastic);

    // 最終水曜=2/24を過ぎているので、3/3(水)
    expect(date).toEqual(new Date("2021/3/3"));
  });
});