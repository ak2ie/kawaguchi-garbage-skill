module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Garbage.ts":
/*!************************!*\
  !*** ./src/Garbage.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(__webpack_require__(/*! fs */ "fs"));
class Garbage {
    /**
     *
     * @param jsonPath ゴミ分別方法がまとめられたJSONファイルパス
     */
    constructor(jsonPath) {
        const garbageTypesJSON = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        this.garbageTypes = garbageTypesJSON.types;
    }
    GetGarbageTypeByItem(garbageItem) {
        let garbageTypes = this.garbageTypes;
        let garbageType;
        for (const garbage of garbageTypes) {
            if (garbage.item === garbageItem) {
                garbageType = garbage;
                break;
            }
        }
        return garbageType;
    }
    GenerateSpeechText(garbageItem) {
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
                    speechText += garbageType.types[0].type + "です。";
                }
                else {
                    for (let index = 0; index < garbageType.types.length; index++) {
                        const type = garbageType.types[index];
                        if (index != garbageType.types.length - 1) {
                            speechText += type.material + "場合は" + type.type + "、";
                        }
                        else {
                            speechText += type.material + "場合は" + type.type + "です。";
                        }
                    }
                }
                /* ------------------------------------------
                    40cmを超える場合は粗大ゴミとして出す
                  ------------------------------------------ */
                if (garbageType.isSodaigomiOver40cm) {
                    speechText += '40センチを超える場合粗大ゴミとして出してください。';
                }
            }
            else {
                /* ------------------------------------------
                    ゴミで出せない場合
                  ------------------------------------------ */
                speechText += 'ゴミで出せません。';
            }
            /* ------------------------------------------
                追加文字列
              ------------------------------------------ */
            if (garbageType.additionalText.length > 0) {
                speechText += garbageType.additionalText;
            }
        }
        else {
            speechText = 'すみません。ゴミの種類が分かりませんでした。別の言葉に言い換えてみてください。';
        }
        return speechText;
    }
}
exports.Garbage = Garbage;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable  func-names */
/* eslint-disable  no-console */
Object.defineProperty(exports, "__esModule", { value: true });
const ask_sdk_core_1 = __webpack_require__(/*! ask-sdk-core */ "ask-sdk-core");
const Garbage_1 = __webpack_require__(/*! ./Garbage */ "./src/Garbage.ts");
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = '川口のゴミ分別へようこそ。埼玉県川口市のゴミ分別方法をご案内します。食器や段ボールなどゴミの名前を話しかけてください。';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('調べたいゴミの名前を教えてください。')
            .withSimpleCard('ようこそ', speechText)
            .getResponse();
    },
};
const GarbageTypeIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'GarbageTypeIntent';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        if (typeof request !== 'undefined' && typeof request.intent.slots !== 'undefined') {
            const garbage = request.intent.slots.garbageType.value;
            const garbageInstance = new Garbage_1.Garbage('GarbageTypes.json');
            const speechText = garbageInstance.GenerateSpeechText(garbage);
            if (speechText !== '') {
                return handlerInput.responseBuilder
                    .speak(speechText + '他に調べたいものはありますか。')
                    .reprompt('調べたいゴミの種類を教えてください。')
                    .withSimpleCard('ゴミ種別検索', speechText)
                    .getResponse();
            }
            else {
                return handlerInput.responseBuilder
                    .speak(speechText)
                    .reprompt('調べたいゴミの種類を教えてください。')
                    .withSimpleCard('ゴミ種別検索', speechText)
                    .getResponse();
            }
        }
        else {
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
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = '三脚は何ゴミ？というように、ゴミの名前を話しかけてみてください。';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('使い方', speechText)
            .getResponse();
    },
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = '終了します。';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('終了', speechText)
            .getResponse();
    },
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        const { reason } = handlerInput.requestEnvelope.request;
        console.log(`Session ended with reason: ${reason}`);
        return handlerInput.responseBuilder.getResponse();
    },
};
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        return handlerInput.responseBuilder
            .speak('すみません。うまく聞き取れませんでした。もう一度言ってください。')
            .reprompt('すみません。うまく聞き取れませんでした。もう一度言ってください。')
            .getResponse();
    },
};
const skillBuilder = ask_sdk_core_1.SkillBuilders.custom();
exports.handler = skillBuilder.addRequestHandlers(LaunchRequestHandler, HelpIntentHandler, CancelAndStopIntentHandler, SessionEndedRequestHandler, GarbageTypeIntentHandler)
    .addErrorHandlers(ErrorHandler)
    .lambda();


/***/ }),

/***/ "ask-sdk-core":
/*!*******************************!*\
  !*** external "ask-sdk-core" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ask-sdk-core");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pbmRleC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9pbmRleC8uL3NyYy9HYXJiYWdlLnRzIiwid2VicGFjazovL2luZGV4Ly4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2luZGV4L2V4dGVybmFsIFwiYXNrLXNkay1jb3JlXCIiLCJ3ZWJwYWNrOi8vaW5kZXgvZXh0ZXJuYWwgXCJmc1wiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCx3QkFBd0IsbUJBQU8sQ0FBQyxjQUFJO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLGtDQUFrQztBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN6RmE7QUFDYjtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQsdUJBQXVCLG1CQUFPLENBQUMsa0NBQWM7QUFDN0Msa0JBQWtCLG1CQUFPLENBQUMsbUNBQVc7QUFDckM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxlQUFlLFNBQVM7QUFDeEIsa0RBQWtELE9BQU87QUFDekQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxzQ0FBc0MsY0FBYztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM1R0EseUM7Ozs7Ozs7Ozs7O0FDQUEsK0IiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0W1wiZGVmYXVsdFwiXSA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgZnMgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcImZzXCIpKTtcclxuY2xhc3MgR2FyYmFnZSB7XHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ganNvblBhdGgg44K044Of5YiG5Yil5pa55rOV44GM44G+44Go44KB44KJ44KM44GfSlNPTuODleOCoeOCpOODq+ODkeOCuVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihqc29uUGF0aCkge1xyXG4gICAgICAgIGNvbnN0IGdhcmJhZ2VUeXBlc0pTT04gPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhqc29uUGF0aCwgJ3V0ZjgnKSk7XHJcbiAgICAgICAgdGhpcy5nYXJiYWdlVHlwZXMgPSBnYXJiYWdlVHlwZXNKU09OLnR5cGVzO1xyXG4gICAgfVxyXG4gICAgR2V0R2FyYmFnZVR5cGVCeUl0ZW0oZ2FyYmFnZUl0ZW0pIHtcclxuICAgICAgICBsZXQgZ2FyYmFnZVR5cGVzID0gdGhpcy5nYXJiYWdlVHlwZXM7XHJcbiAgICAgICAgbGV0IGdhcmJhZ2VUeXBlO1xyXG4gICAgICAgIGZvciAoY29uc3QgZ2FyYmFnZSBvZiBnYXJiYWdlVHlwZXMpIHtcclxuICAgICAgICAgICAgaWYgKGdhcmJhZ2UuaXRlbSA9PT0gZ2FyYmFnZUl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGdhcmJhZ2VUeXBlID0gZ2FyYmFnZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBnYXJiYWdlVHlwZTtcclxuICAgIH1cclxuICAgIEdlbmVyYXRlU3BlZWNoVGV4dChnYXJiYWdlSXRlbSkge1xyXG4gICAgICAgIGNvbnN0IGdhcmJhZ2VUeXBlID0gdGhpcy5HZXRHYXJiYWdlVHlwZUJ5SXRlbShnYXJiYWdlSXRlbSk7XHJcbiAgICAgICAgbGV0IHNwZWVjaFRleHQgPSAnJztcclxuICAgICAgICBpZiAoZ2FyYmFnZVR5cGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgICAgIOKXi+KXi++8iOOCtOODn+OBruWQjeWJje+8ieOBr+OAgVxyXG4gICAgICAgICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICAgICAgICAgICAgc3BlZWNoVGV4dCA9IGdhcmJhZ2VUeXBlLml0ZW0gKyAn44GvJztcclxuICAgICAgICAgICAgaWYgKGdhcmJhZ2VUeXBlLmlzQ2Fubm90VGFrZU91dCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAgICAgICAgIOadkOizquOBq+W/nOOBmOOBn+OCtOODn+eoruWIpeOCkui/veWKoFxyXG4gICAgICAgICAgICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICAgICAgICAgICAgICAgIGxldCBpc09ubHlEZWZhdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdHlwZSBvZiBnYXJiYWdlVHlwZS50eXBlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlLm1hdGVyaWFsICE9ICdkZWZhdWx0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc09ubHlEZWZhdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpc09ubHlEZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BlZWNoVGV4dCArPSBnYXJiYWdlVHlwZS50eXBlc1swXS50eXBlICsgXCLjgafjgZnjgIJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBnYXJiYWdlVHlwZS50eXBlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IGdhcmJhZ2VUeXBlLnR5cGVzW2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9IGdhcmJhZ2VUeXBlLnR5cGVzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVjaFRleHQgKz0gdHlwZS5tYXRlcmlhbCArIFwi5aC05ZCI44GvXCIgKyB0eXBlLnR5cGUgKyBcIuOAgVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWNoVGV4dCArPSB0eXBlLm1hdGVyaWFsICsgXCLloLTlkIjjga9cIiArIHR5cGUudHlwZSArIFwi44Gn44GZ44CCXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgICAgICAgICA0MGNt44KS6LaF44GI44KL5aC05ZCI44Gv57KX5aSn44K044Of44Go44GX44Gm5Ye644GZXHJcbiAgICAgICAgICAgICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhcmJhZ2VUeXBlLmlzU29kYWlnb21pT3ZlcjQwY20pIHtcclxuICAgICAgICAgICAgICAgICAgICBzcGVlY2hUZXh0ICs9ICc0MOOCu+ODs+ODgeOCkui2heOBiOOCi+WgtOWQiOeyl+Wkp+OCtOODn+OBqOOBl+OBpuWHuuOBl+OBpuOBj+OBoOOBleOBhOOAgic7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgICAgICAgICDjgrTjg5/jgaflh7rjgZvjgarjgYTloLTlkIhcclxuICAgICAgICAgICAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgICAgICAgICAgICAgICBzcGVlY2hUZXh0ICs9ICfjgrTjg5/jgaflh7rjgZvjgb7jgZvjgpPjgIInO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAgICAg6L+95Yqg5paH5a2X5YiXXHJcbiAgICAgICAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgICAgICAgICAgIGlmIChnYXJiYWdlVHlwZS5hZGRpdGlvbmFsVGV4dC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBzcGVlY2hUZXh0ICs9IGdhcmJhZ2VUeXBlLmFkZGl0aW9uYWxUZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzcGVlY2hUZXh0ID0gJ+OBmeOBv+OBvuOBm+OCk+OAguOCtOODn+OBrueorumhnuOBjOWIhuOBi+OCiuOBvuOBm+OCk+OBp+OBl+OBn+OAguWIpeOBruiogOiRieOBq+iogOOBhOaPm+OBiOOBpuOBv+OBpuOBj+OBoOOBleOBhOOAgic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzcGVlY2hUZXh0O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuR2FyYmFnZSA9IEdhcmJhZ2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG4vKiBlc2xpbnQtZGlzYWJsZSAgZnVuYy1uYW1lcyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSAgbm8tY29uc29sZSAqL1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGFza19zZGtfY29yZV8xID0gcmVxdWlyZShcImFzay1zZGstY29yZVwiKTtcclxuY29uc3QgR2FyYmFnZV8xID0gcmVxdWlyZShcIi4vR2FyYmFnZVwiKTtcclxuY29uc3QgTGF1bmNoUmVxdWVzdEhhbmRsZXIgPSB7XHJcbiAgICBjYW5IYW5kbGUoaGFuZGxlcklucHV0KSB7XHJcbiAgICAgICAgcmV0dXJuIGhhbmRsZXJJbnB1dC5yZXF1ZXN0RW52ZWxvcGUucmVxdWVzdC50eXBlID09PSAnTGF1bmNoUmVxdWVzdCc7XHJcbiAgICB9LFxyXG4gICAgaGFuZGxlKGhhbmRsZXJJbnB1dCkge1xyXG4gICAgICAgIGNvbnN0IHNwZWVjaFRleHQgPSAn5bed5Y+j44Gu44K044Of5YiG5Yil44G444KI44GG44GT44Gd44CC5Z+8546J55yM5bed5Y+j5biC44Gu44K044Of5YiG5Yil5pa55rOV44KS44GU5qGI5YaF44GX44G+44GZ44CC6aOf5Zmo44KE5q6144Oc44O844Or44Gq44Gp44K044Of44Gu5ZCN5YmN44KS6Kmx44GX44GL44GR44Gm44GP44Gg44GV44GE44CCJztcclxuICAgICAgICByZXR1cm4gaGFuZGxlcklucHV0LnJlc3BvbnNlQnVpbGRlclxyXG4gICAgICAgICAgICAuc3BlYWsoc3BlZWNoVGV4dClcclxuICAgICAgICAgICAgLnJlcHJvbXB0KCfoqr/jgbnjgZ/jgYTjgrTjg5/jga7lkI3liY3jgpLmlZnjgYjjgabjgY/jgaDjgZXjgYTjgIInKVxyXG4gICAgICAgICAgICAud2l0aFNpbXBsZUNhcmQoJ+OCiOOBhuOBk+OBnScsIHNwZWVjaFRleHQpXHJcbiAgICAgICAgICAgIC5nZXRSZXNwb25zZSgpO1xyXG4gICAgfSxcclxufTtcclxuY29uc3QgR2FyYmFnZVR5cGVJbnRlbnRIYW5kbGVyID0ge1xyXG4gICAgY2FuSGFuZGxlKGhhbmRsZXJJbnB1dCkge1xyXG4gICAgICAgIHJldHVybiBoYW5kbGVySW5wdXQucmVxdWVzdEVudmVsb3BlLnJlcXVlc3QudHlwZSA9PT0gJ0ludGVudFJlcXVlc3QnXHJcbiAgICAgICAgICAgICYmIGhhbmRsZXJJbnB1dC5yZXF1ZXN0RW52ZWxvcGUucmVxdWVzdC5pbnRlbnQubmFtZSA9PT0gJ0dhcmJhZ2VUeXBlSW50ZW50JztcclxuICAgIH0sXHJcbiAgICBoYW5kbGUoaGFuZGxlcklucHV0KSB7XHJcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IGhhbmRsZXJJbnB1dC5yZXF1ZXN0RW52ZWxvcGUucmVxdWVzdDtcclxuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3QgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiByZXF1ZXN0LmludGVudC5zbG90cyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgY29uc3QgZ2FyYmFnZSA9IHJlcXVlc3QuaW50ZW50LnNsb3RzLmdhcmJhZ2VUeXBlLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBnYXJiYWdlSW5zdGFuY2UgPSBuZXcgR2FyYmFnZV8xLkdhcmJhZ2UoJ0dhcmJhZ2VUeXBlcy5qc29uJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwZWVjaFRleHQgPSBnYXJiYWdlSW5zdGFuY2UuR2VuZXJhdGVTcGVlY2hUZXh0KGdhcmJhZ2UpO1xyXG4gICAgICAgICAgICBpZiAoc3BlZWNoVGV4dCAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGVySW5wdXQucmVzcG9uc2VCdWlsZGVyXHJcbiAgICAgICAgICAgICAgICAgICAgLnNwZWFrKHNwZWVjaFRleHQgKyAn5LuW44Gr6Kq/44G544Gf44GE44KC44Gu44Gv44GC44KK44G+44GZ44GL44CCJylcclxuICAgICAgICAgICAgICAgICAgICAucmVwcm9tcHQoJ+iqv+OBueOBn+OBhOOCtOODn+OBrueorumhnuOCkuaVmeOBiOOBpuOBj+OBoOOBleOBhOOAgicpXHJcbiAgICAgICAgICAgICAgICAgICAgLndpdGhTaW1wbGVDYXJkKCfjgrTjg5/nqK7liKXmpJzntKInLCBzcGVlY2hUZXh0KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXRSZXNwb25zZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZXJJbnB1dC5yZXNwb25zZUJ1aWxkZXJcclxuICAgICAgICAgICAgICAgICAgICAuc3BlYWsoc3BlZWNoVGV4dClcclxuICAgICAgICAgICAgICAgICAgICAucmVwcm9tcHQoJ+iqv+OBueOBn+OBhOOCtOODn+OBrueorumhnuOCkuaVmeOBiOOBpuOBj+OBoOOBleOBhOOAgicpXHJcbiAgICAgICAgICAgICAgICAgICAgLndpdGhTaW1wbGVDYXJkKCfjgrTjg5/nqK7liKXmpJzntKInLCBzcGVlY2hUZXh0KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXRSZXNwb25zZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBzcGVlY2hUZXh0ID0gJ+OBmeOBv+OBvuOBm+OCk+OAguOCtOODn+OBrueorumhnuOBjOWIhuOBi+OCiuOBvuOBm+OCk+OBp+OBl+OBn+OAguWIpeOBruiogOiRieOBq+iogOOBhOaPm+OBiOOBpuOBv+OBpuOBj+OBoOOBleOBhOOAgic7XHJcbiAgICAgICAgICAgIHJldHVybiBoYW5kbGVySW5wdXQucmVzcG9uc2VCdWlsZGVyXHJcbiAgICAgICAgICAgICAgICAuc3BlYWsoc3BlZWNoVGV4dClcclxuICAgICAgICAgICAgICAgIC5yZXByb21wdCgn6Kq/44G544Gf44GE44K044Of44Gu5ZCN5YmN44KS5pWZ44GI44Gm44GP44Gg44GV44GE44CCJylcclxuICAgICAgICAgICAgICAgIC53aXRoU2ltcGxlQ2FyZCgn44K044Of56iu5Yil5qSc57SiJywgc3BlZWNoVGV4dClcclxuICAgICAgICAgICAgICAgIC5nZXRSZXNwb25zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn07XHJcbmNvbnN0IEhlbHBJbnRlbnRIYW5kbGVyID0ge1xyXG4gICAgY2FuSGFuZGxlKGhhbmRsZXJJbnB1dCkge1xyXG4gICAgICAgIHJldHVybiBoYW5kbGVySW5wdXQucmVxdWVzdEVudmVsb3BlLnJlcXVlc3QudHlwZSA9PT0gJ0ludGVudFJlcXVlc3QnXHJcbiAgICAgICAgICAgICYmIGhhbmRsZXJJbnB1dC5yZXF1ZXN0RW52ZWxvcGUucmVxdWVzdC5pbnRlbnQubmFtZSA9PT0gJ0FNQVpPTi5IZWxwSW50ZW50JztcclxuICAgIH0sXHJcbiAgICBoYW5kbGUoaGFuZGxlcklucHV0KSB7XHJcbiAgICAgICAgY29uc3Qgc3BlZWNoVGV4dCA9ICfkuInohJrjga/kvZXjgrTjg5/vvJ/jgajjgYTjgYbjgojjgYbjgavjgIHjgrTjg5/jga7lkI3liY3jgpLoqbHjgZfjgYvjgZHjgabjgb/jgabjgY/jgaDjgZXjgYTjgIInO1xyXG4gICAgICAgIHJldHVybiBoYW5kbGVySW5wdXQucmVzcG9uc2VCdWlsZGVyXHJcbiAgICAgICAgICAgIC5zcGVhayhzcGVlY2hUZXh0KVxyXG4gICAgICAgICAgICAucmVwcm9tcHQoc3BlZWNoVGV4dClcclxuICAgICAgICAgICAgLndpdGhTaW1wbGVDYXJkKCfkvb/jgYTmlrknLCBzcGVlY2hUZXh0KVxyXG4gICAgICAgICAgICAuZ2V0UmVzcG9uc2UoKTtcclxuICAgIH0sXHJcbn07XHJcbmNvbnN0IENhbmNlbEFuZFN0b3BJbnRlbnRIYW5kbGVyID0ge1xyXG4gICAgY2FuSGFuZGxlKGhhbmRsZXJJbnB1dCkge1xyXG4gICAgICAgIHJldHVybiBoYW5kbGVySW5wdXQucmVxdWVzdEVudmVsb3BlLnJlcXVlc3QudHlwZSA9PT0gJ0ludGVudFJlcXVlc3QnXHJcbiAgICAgICAgICAgICYmIChoYW5kbGVySW5wdXQucmVxdWVzdEVudmVsb3BlLnJlcXVlc3QuaW50ZW50Lm5hbWUgPT09ICdBTUFaT04uQ2FuY2VsSW50ZW50J1xyXG4gICAgICAgICAgICAgICAgfHwgaGFuZGxlcklucHV0LnJlcXVlc3RFbnZlbG9wZS5yZXF1ZXN0LmludGVudC5uYW1lID09PSAnQU1BWk9OLlN0b3BJbnRlbnQnKTtcclxuICAgIH0sXHJcbiAgICBoYW5kbGUoaGFuZGxlcklucHV0KSB7XHJcbiAgICAgICAgY29uc3Qgc3BlZWNoVGV4dCA9ICfntYLkuobjgZfjgb7jgZnjgIInO1xyXG4gICAgICAgIHJldHVybiBoYW5kbGVySW5wdXQucmVzcG9uc2VCdWlsZGVyXHJcbiAgICAgICAgICAgIC5zcGVhayhzcGVlY2hUZXh0KVxyXG4gICAgICAgICAgICAud2l0aFNpbXBsZUNhcmQoJ+e1guS6hicsIHNwZWVjaFRleHQpXHJcbiAgICAgICAgICAgIC5nZXRSZXNwb25zZSgpO1xyXG4gICAgfSxcclxufTtcclxuY29uc3QgU2Vzc2lvbkVuZGVkUmVxdWVzdEhhbmRsZXIgPSB7XHJcbiAgICBjYW5IYW5kbGUoaGFuZGxlcklucHV0KSB7XHJcbiAgICAgICAgcmV0dXJuIGhhbmRsZXJJbnB1dC5yZXF1ZXN0RW52ZWxvcGUucmVxdWVzdC50eXBlID09PSAnU2Vzc2lvbkVuZGVkUmVxdWVzdCc7XHJcbiAgICB9LFxyXG4gICAgaGFuZGxlKGhhbmRsZXJJbnB1dCkge1xyXG4gICAgICAgIGNvbnN0IHsgcmVhc29uIH0gPSBoYW5kbGVySW5wdXQucmVxdWVzdEVudmVsb3BlLnJlcXVlc3Q7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFNlc3Npb24gZW5kZWQgd2l0aCByZWFzb246ICR7cmVhc29ufWApO1xyXG4gICAgICAgIHJldHVybiBoYW5kbGVySW5wdXQucmVzcG9uc2VCdWlsZGVyLmdldFJlc3BvbnNlKCk7XHJcbiAgICB9LFxyXG59O1xyXG5jb25zdCBFcnJvckhhbmRsZXIgPSB7XHJcbiAgICBjYW5IYW5kbGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG4gICAgaGFuZGxlKGhhbmRsZXJJbnB1dCwgZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhgRXJyb3IgaGFuZGxlZDogJHtlcnJvci5tZXNzYWdlfWApO1xyXG4gICAgICAgIHJldHVybiBoYW5kbGVySW5wdXQucmVzcG9uc2VCdWlsZGVyXHJcbiAgICAgICAgICAgIC5zcGVhaygn44GZ44G/44G+44Gb44KT44CC44GG44G+44GP6IGe44GN5Y+W44KM44G+44Gb44KT44Gn44GX44Gf44CC44KC44GG5LiA5bqm6KiA44Gj44Gm44GP44Gg44GV44GE44CCJylcclxuICAgICAgICAgICAgLnJlcHJvbXB0KCfjgZnjgb/jgb7jgZvjgpPjgILjgYbjgb7jgY/ogZ7jgY3lj5bjgozjgb7jgZvjgpPjgafjgZfjgZ/jgILjgoLjgYbkuIDluqboqIDjgaPjgabjgY/jgaDjgZXjgYTjgIInKVxyXG4gICAgICAgICAgICAuZ2V0UmVzcG9uc2UoKTtcclxuICAgIH0sXHJcbn07XHJcbmNvbnN0IHNraWxsQnVpbGRlciA9IGFza19zZGtfY29yZV8xLlNraWxsQnVpbGRlcnMuY3VzdG9tKCk7XHJcbmV4cG9ydHMuaGFuZGxlciA9IHNraWxsQnVpbGRlci5hZGRSZXF1ZXN0SGFuZGxlcnMoTGF1bmNoUmVxdWVzdEhhbmRsZXIsIEhlbHBJbnRlbnRIYW5kbGVyLCBDYW5jZWxBbmRTdG9wSW50ZW50SGFuZGxlciwgU2Vzc2lvbkVuZGVkUmVxdWVzdEhhbmRsZXIsIEdhcmJhZ2VUeXBlSW50ZW50SGFuZGxlcilcclxuICAgIC5hZGRFcnJvckhhbmRsZXJzKEVycm9ySGFuZGxlcilcclxuICAgIC5sYW1iZGEoKTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXNrLXNkay1jb3JlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=