import { Garbage } from "../Garbage";

const JSON_PATH = '.\\src\\__tests__\\GarbageTypesForTest.json';

describe('ゴミ', () => {
    it('HelloWorldIntent2', async () => {
        const speechText = 'アイロンは粗大ゴミです。';
        const garbage = new Garbage(JSON_PATH);
        expect(garbage.GenerateSpeechText('アイロン')).toContain(speechText);
    });

    it('HelloWorldIntent3', async () => {
        const speechText = 'アイロン台は金属製の場合は金属ゴミ、金属製以外の場合は一般ゴミです。';
        const garbage = new Garbage(JSON_PATH);
        expect(garbage.GenerateSpeechText('アイロン台')).toContain(speechText);
    });

    it('HelloWorldIntent4', async () => {
        const speechText = '石はゴミで出せません。';
        const garbage = new Garbage(JSON_PATH);
        expect(garbage.GenerateSpeechText('石')).toContain(speechText);
    });

    it('HelloWorldIntent5', async () => {
        const speechText = '油は一般ゴミです。布等に染み込ませて漏れないようにしてから出してください。';
        const garbage = new Garbage(JSON_PATH);
        expect(garbage.GenerateSpeechText('油')).toContain(speechText);
    });
});

describe('次回収集日', () => {
    it('地域設定あり', async () => {
        const garbage = new Garbage(JSON_PATH);
        expect(garbage.GetNextCollectDate('サンダル')).toEqual(new Date());
    });
});