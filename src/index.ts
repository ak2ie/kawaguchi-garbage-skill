/* eslint-disable  func-names */
/* eslint-disable  no-console */

import { HandlerInput, RequestHandler, ErrorHandler, SkillBuilders } from "ask-sdk-core";
import { SessionEndedRequest, IntentRequest } from "ask-sdk-model";
import { Garbage } from "./Garbage";

const LaunchRequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput: HandlerInput) {
    const speechText = '川口のゴミ分別へようこそ。埼玉県川口市のゴミ分別方法をご案内します。靴下や段ボールなどゴミの名前を話しかけてください。';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt('調べたいゴミの名前を教えてください。')
      .withSimpleCard('ようこそ', speechText)
      .getResponse();
  },
};

const GarbageTypeIntentHandler = {
  canHandle(handlerInput: HandlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && ( handlerInput.requestEnvelope.request.intent.name === 'GarbageTypeIntent'
      || handlerInput.requestEnvelope.request.intent.name === 'GarbageTypeOneWordIntent');
  },
  handle(handlerInput: HandlerInput) {
    const request = handlerInput.requestEnvelope.request as IntentRequest;

    if (typeof request !== 'undefined' && typeof request.intent.slots !== 'undefined') {
      const garbage = request.intent.slots.garbageType.value;
      const garbageInstance = new Garbage('GarbageTypes.json');
      const speechText = garbageInstance.GenerateSpeechText(garbage);

      if (speechText !== '') {
        return handlerInput.responseBuilder
          .speak(speechText + '他に調べたいものはありますか。')
          .reprompt('調べたいゴミの種類を教えてください。')
          .withSimpleCard('ゴミ種別検索', speechText)
          .getResponse();
      } else {
        return handlerInput.responseBuilder
          .speak(speechText)
          .reprompt('調べたいゴミの種類を教えてください。')
          .withSimpleCard('ゴミ種別検索', speechText)
          .getResponse();
      }
    } else {
      const speechText = 'すみません。ゴミの種類が分かりませんでした。別の言葉に言い換えてみてください。';

      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt('調べたいゴミの名前を教えてください。')
        .withSimpleCard('ゴミ種別検索', speechText)
        .getResponse();
    }

  },
};

const HelpIntentHandler = {
  canHandle(handlerInput: HandlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput: HandlerInput) {
    const speechText = '三脚は何ゴミ？というように、ゴミの名前を話しかけてみてください。';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('使い方', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput: HandlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput: HandlerInput) {
    const speechText = '終了します。';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('終了', speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput: HandlerInput) {
    const { reason } = handlerInput.requestEnvelope.request as SessionEndedRequest;
    console.log(`Session ended with reason: ${reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput: HandlerInput, error: Error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('すみません。うまく聞き取れませんでした。もう一度言ってください。')
      .reprompt('すみません。うまく聞き取れませんでした。もう一度言ってください。')
      .getResponse();
  },
};

const skillBuilder = SkillBuilders.custom();

export const handler = skillBuilder.addRequestHandlers(
  LaunchRequestHandler,
  HelpIntentHandler,
  CancelAndStopIntentHandler,
  SessionEndedRequestHandler,
  GarbageTypeIntentHandler
)
  .addErrorHandlers(ErrorHandler)
  .lambda();
