import { VirtualAlexa, SkillResponse } from "virtual-alexa";
import { handler } from "../index";

describe('helloworld skill', () => {
    let alexa: VirtualAlexa;

    beforeEach(() => {
        alexa = VirtualAlexa.Builder()
            .handler(handler)
            .interactionModelFile('./models/ja-JP.json')
            .create();
    });

    it('LaunchRequest', async () => {
        const speechText = '川口のゴミ分別へようこそ。何のゴミ分別方法を調べたいですか？';
        const payload = await alexa.launch();
        expect(payload.response.outputSpeech.ssml).toContain(speechText);
        expect(payload.response.shouldEndSession).toBeFalsy();
    });

    it('HelloWorldIntent', async () => {
        const speechText = 'Hello World!';
        let payload = await alexa.utter('hello') as SkillResponse;
        expect(payload.response.outputSpeech.ssml).toContain(speechText);
        payload = await (alexa.utter('say hello')) as SkillResponse;
        expect(payload.response.outputSpeech.ssml).toContain(speechText);
        payload = await (alexa.utter('say hello world')) as SkillResponse;
        expect(payload.response.outputSpeech.ssml).toContain(speechText);
    });

    it('LaunchRequest2', async () => {
        const speechText = 'アイスボックスは一般ゴミです。40センチを超える場合粗大ゴミとして出してください。';
        let payload = await alexa.intend("GarbageTypeIntent", {garbageType: "アイスボックス"}) as SkillResponse;
        expect(payload.response.outputSpeech.ssml).toContain(speechText);
    });
})