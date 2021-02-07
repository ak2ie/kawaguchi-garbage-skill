import axios from "axios";
import { access } from "fs";
import { CollectionSchedule } from "./CollectionSchedule";
import { Region } from "./Region";

export class CollectionScheduleManager {
  public async GetSpeechText(accessToken: string) {
    // AmazonIDを取得
    const profile = await this.getProfile(accessToken);

    // 地域を取得
    const regionResponse = await this.getRegionFromAPI(profile.user_id);
    if (this.isRegion(regionResponse)) {
      const region = Region[regionResponse];
    }

    // 収集日を取得
    const schedule = new CollectionSchedule();
    schedule.GetNearestCollectionDate()
  }

  /**
 * ユーザープロフィールを取得する
 * @param {string} accessToken アクセストークン
 */
  public async getProfile(accessToken: string) {
    try {
      // ユーザー情報取得
      // https://developer.amazon.com/ja/docs/login-with-amazon/obtain-customer-profile.html#call-profile-endpoint
      const response = await axios.get("https://api.amazon.com/user/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (this.isUserProfileResponse(response.data)) {
        return response.data;
      }
      throw new Error(
        "ユーザープロフィール取得結果が想定外：" + JSON.stringify(response.data)
      );
    } catch (error) {
      throw new Error("ユーザープロフィール取得失敗:" + error);
    }
  }

  /**
 * ユーザープロフィールのレスポンスであるか
 * @param {object} response 検証したいレスポンス
 * @return {boolean} 検証結果
 */
  private isUserProfileResponse(
    response: any
  ): response is UserProfileResponse {
    if (
      response.user_id !== undefined &&
      response.email !== undefined &&
      response.name !== undefined
    ) {
      return true;
    }
    return false;
  }

  /**
   * Webサイトで登録されたユーザーの地域を取得する
   * @param {string} userId AmazonID
   */
  private async getRegionFromAPI(userId: string) {
    const response = await axios.post("https://asia-northeast1-kawaguchi-garbage-skill.cloudfunctions.net/app/region/getFromID", {
      id: userId
    });

    return response.data.region;
  }

  private isRegion(region: any): region is Region {
    if (region === null || region === undefined || typeof region !== "string") {
      return false;
    }

    if (
    return true;
  }
}

/**
 * ユーザープロフィール取得結果
 * https://developer.amazon.com/ja/docs/login-with-amazon/obtain-customer-profile.html#customer-profile-response
 */
interface UserProfileResponse {
  /**
   * ユーザーID
   */
  // eslint-disable-next-line camelcase
  user_id: string;
  /**
   * メールアドレス
   */
  email: string;
  /**
   * 氏名
   */
  name: string;
  // postal_codeは存在しない
}