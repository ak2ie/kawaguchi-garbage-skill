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
var fs = __importStar(__webpack_require__(/*! fs */ "fs"));
var Garbage = /** @class */ (function () {
    /**
     *
     * @param jsonPath ゴミ分別方法がまとめられたJSONファイルパス
     */
    function Garbage(jsonPath) {
        var garbageTypesJSON = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        this.garbageTypes = garbageTypesJSON.types;
    }
    Garbage.prototype.GetGarbageTypeByItem = function (garbageItem) {
        var garbageTypes = this.garbageTypes;
        var garbageType;
        for (var _i = 0, garbageTypes_1 = garbageTypes; _i < garbageTypes_1.length; _i++) {
            var garbage = garbageTypes_1[_i];
            if (garbage.item === garbageItem) {
                garbageType = garbage;
                break;
            }
        }
        return garbageType;
    };
    Garbage.prototype.GenerateSpeechText = function (garbageItem) {
        var garbageType = this.GetGarbageTypeByItem(garbageItem);
        var speechText = '';
        if (garbageType !== undefined) {
            /* ------------------------------------------
                ○○（ゴミの名前）は、
               ------------------------------------------ */
            speechText = garbageType.item + 'は';
            if (garbageType.isCannotTakeOut === false) {
                /* ------------------------------------------
                    材質に応じたゴミ種別を追加
                  ------------------------------------------ */
                var isOnlyDefault = true;
                for (var _i = 0, _a = garbageType.types; _i < _a.length; _i++) {
                    var type = _a[_i];
                    if (type.material != 'default') {
                        isOnlyDefault = false;
                        break;
                    }
                }
                if (isOnlyDefault) {
                    speechText += garbageType.types[0].type + "です。";
                }
                else {
                    for (var index = 0; index < garbageType.types.length; index++) {
                        var type = garbageType.types[index];
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
    };
    return Garbage;
}());
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
var ask_sdk_core_1 = __webpack_require__(/*! ask-sdk-core */ "ask-sdk-core");
var Garbage_1 = __webpack_require__(/*! ./Garbage */ "./src/Garbage.ts");
var LaunchRequestHandler = {
    canHandle: function (handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle: function (handlerInput) {
        var speechText = '川口のゴミ分別へようこそ。埼玉県川口市のゴミ分別方法をご案内します。靴下や段ボールなどゴミの名前を話しかけてください。';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('調べたいゴミの名前を教えてください。')
            .withSimpleCard('ようこそ', speechText)
            .getResponse();
    },
};
var GarbageTypeIntentHandler = {
    canHandle: function (handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'GarbageTypeIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'GarbageTypeOneWordIntent');
    },
    handle: function (handlerInput) {
        var request = handlerInput.requestEnvelope.request;
        if (typeof request !== 'undefined' && typeof request.intent.slots !== 'undefined') {
            var garbage = request.intent.slots.garbageType.value;
            var garbageInstance = new Garbage_1.Garbage('GarbageTypes.json');
            var speechText = garbageInstance.GenerateSpeechText(garbage);
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
            var speechText = 'すみません。ゴミの種類が分かりませんでした。別の言葉に言い換えてみてください。';
            return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt('調べたいゴミの名前を教えてください。')
                .withSimpleCard('ゴミ種別検索', speechText)
                .getResponse();
        }
    },
};
var HelpIntentHandler = {
    canHandle: function (handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle: function (handlerInput) {
        var speechText = '三脚は何ゴミ？というように、ゴミの名前を話しかけてみてください。';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('使い方', speechText)
            .getResponse();
    },
};
var CancelAndStopIntentHandler = {
    canHandle: function (handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle: function (handlerInput) {
        var speechText = '終了します。';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('終了', speechText)
            .getResponse();
    },
};
var SessionEndedRequestHandler = {
    canHandle: function (handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle: function (handlerInput) {
        var reason = handlerInput.requestEnvelope.request.reason;
        console.log("Session ended with reason: " + reason);
        return handlerInput.responseBuilder.getResponse();
    },
};
var ErrorHandler = {
    canHandle: function () {
        return true;
    },
    handle: function (handlerInput, error) {
        console.log("Error handled: " + error.message);
        return handlerInput.responseBuilder
            .speak('すみません。うまく聞き取れませんでした。もう一度言ってください。')
            .reprompt('すみません。うまく聞き取れませんでした。もう一度言ってください。')
            .getResponse();
    },
};
var skillBuilder = ask_sdk_core_1.SkillBuilders.custom();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pbmRleC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9pbmRleC8uL3NyYy9HYXJiYWdlLnRzIiwid2VicGFjazovL2luZGV4Ly4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2luZGV4L2V4dGVybmFsIFwiYXNrLXNkay1jb3JlXCIiLCJ3ZWJwYWNrOi8vaW5kZXgvZXh0ZXJuYWwgXCJmc1wiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxzQkFBc0IsbUJBQU8sQ0FBQyxjQUFJO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCw0QkFBNEI7QUFDbkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELGdCQUFnQjtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxrQ0FBa0M7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7Ozs7OztBQzVGYTtBQUNiO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxxQkFBcUIsbUJBQU8sQ0FBQyxrQ0FBYztBQUMzQyxnQkFBZ0IsbUJBQU8sQ0FBQyxtQ0FBVztBQUNuQztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM3R0EseUM7Ozs7Ozs7Ozs7O0FDQUEsK0IiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0W1wiZGVmYXVsdFwiXSA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGZzID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJmc1wiKSk7XHJcbnZhciBHYXJiYWdlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGpzb25QYXRoIOOCtOODn+WIhuWIpeaWueazleOBjOOBvuOBqOOCgeOCieOCjOOBn0pTT07jg5XjgqHjgqTjg6vjg5HjgrlcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gR2FyYmFnZShqc29uUGF0aCkge1xyXG4gICAgICAgIHZhciBnYXJiYWdlVHlwZXNKU09OID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoanNvblBhdGgsICd1dGY4JykpO1xyXG4gICAgICAgIHRoaXMuZ2FyYmFnZVR5cGVzID0gZ2FyYmFnZVR5cGVzSlNPTi50eXBlcztcclxuICAgIH1cclxuICAgIEdhcmJhZ2UucHJvdG90eXBlLkdldEdhcmJhZ2VUeXBlQnlJdGVtID0gZnVuY3Rpb24gKGdhcmJhZ2VJdGVtKSB7XHJcbiAgICAgICAgdmFyIGdhcmJhZ2VUeXBlcyA9IHRoaXMuZ2FyYmFnZVR5cGVzO1xyXG4gICAgICAgIHZhciBnYXJiYWdlVHlwZTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIGdhcmJhZ2VUeXBlc18xID0gZ2FyYmFnZVR5cGVzOyBfaSA8IGdhcmJhZ2VUeXBlc18xLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICB2YXIgZ2FyYmFnZSA9IGdhcmJhZ2VUeXBlc18xW19pXTtcclxuICAgICAgICAgICAgaWYgKGdhcmJhZ2UuaXRlbSA9PT0gZ2FyYmFnZUl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGdhcmJhZ2VUeXBlID0gZ2FyYmFnZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBnYXJiYWdlVHlwZTtcclxuICAgIH07XHJcbiAgICBHYXJiYWdlLnByb3RvdHlwZS5HZW5lcmF0ZVNwZWVjaFRleHQgPSBmdW5jdGlvbiAoZ2FyYmFnZUl0ZW0pIHtcclxuICAgICAgICB2YXIgZ2FyYmFnZVR5cGUgPSB0aGlzLkdldEdhcmJhZ2VUeXBlQnlJdGVtKGdhcmJhZ2VJdGVtKTtcclxuICAgICAgICB2YXIgc3BlZWNoVGV4dCA9ICcnO1xyXG4gICAgICAgIGlmIChnYXJiYWdlVHlwZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAgICAg4peL4peL77yI44K044Of44Gu5ZCN5YmN77yJ44Gv44CBXHJcbiAgICAgICAgICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gICAgICAgICAgICBzcGVlY2hUZXh0ID0gZ2FyYmFnZVR5cGUuaXRlbSArICfjga8nO1xyXG4gICAgICAgICAgICBpZiAoZ2FyYmFnZVR5cGUuaXNDYW5ub3RUYWtlT3V0ID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgICAgICAgICAg5p2Q6LOq44Gr5b+c44GY44Gf44K044Of56iu5Yil44KS6L+95YqgXHJcbiAgICAgICAgICAgICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzT25seURlZmF1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IGdhcmJhZ2VUeXBlLnR5cGVzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0eXBlID0gX2FbX2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlLm1hdGVyaWFsICE9ICdkZWZhdWx0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc09ubHlEZWZhdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpc09ubHlEZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BlZWNoVGV4dCArPSBnYXJiYWdlVHlwZS50eXBlc1swXS50eXBlICsgXCLjgafjgZnjgIJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBnYXJiYWdlVHlwZS50eXBlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHR5cGUgPSBnYXJiYWdlVHlwZS50eXBlc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPSBnYXJiYWdlVHlwZS50eXBlcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVlY2hUZXh0ICs9IHR5cGUubWF0ZXJpYWwgKyBcIuWgtOWQiOOBr1wiICsgdHlwZS50eXBlICsgXCLjgIFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVjaFRleHQgKz0gdHlwZS5tYXRlcmlhbCArIFwi5aC05ZCI44GvXCIgKyB0eXBlLnR5cGUgKyBcIuOBp+OBmeOAglwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgICAgICAgICAgNDBjbeOCkui2heOBiOOCi+WgtOWQiOOBr+eyl+Wkp+OCtOODn+OBqOOBl+OBpuWHuuOBmVxyXG4gICAgICAgICAgICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICAgICAgICAgICAgICAgIGlmIChnYXJiYWdlVHlwZS5pc1NvZGFpZ29taU92ZXI0MGNtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BlZWNoVGV4dCArPSAnNDDjgrvjg7Pjg4HjgpLotoXjgYjjgovloLTlkIjnspflpKfjgrTjg5/jgajjgZfjgablh7rjgZfjgabjgY/jgaDjgZXjgYTjgIInO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgICAgICAgICAg44K044Of44Gn5Ye644Gb44Gq44GE5aC05ZCIXHJcbiAgICAgICAgICAgICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gICAgICAgICAgICAgICAgc3BlZWNoVGV4dCArPSAn44K044Of44Gn5Ye644Gb44G+44Gb44KT44CCJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgICAgIOi/veWKoOaWh+Wtl+WIl1xyXG4gICAgICAgICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gICAgICAgICAgICBpZiAoZ2FyYmFnZVR5cGUuYWRkaXRpb25hbFRleHQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc3BlZWNoVGV4dCArPSBnYXJiYWdlVHlwZS5hZGRpdGlvbmFsVGV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc3BlZWNoVGV4dCA9ICfjgZnjgb/jgb7jgZvjgpPjgILjgrTjg5/jga7nqK7poZ7jgYzliIbjgYvjgorjgb7jgZvjgpPjgafjgZfjgZ/jgILliKXjga7oqIDokYnjgavoqIDjgYTmj5vjgYjjgabjgb/jgabjgY/jgaDjgZXjgYTjgIInO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3BlZWNoVGV4dDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gR2FyYmFnZTtcclxufSgpKTtcclxuZXhwb3J0cy5HYXJiYWdlID0gR2FyYmFnZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8qIGVzbGludC1kaXNhYmxlICBmdW5jLW5hbWVzICovXHJcbi8qIGVzbGludC1kaXNhYmxlICBuby1jb25zb2xlICovXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGFza19zZGtfY29yZV8xID0gcmVxdWlyZShcImFzay1zZGstY29yZVwiKTtcclxudmFyIEdhcmJhZ2VfMSA9IHJlcXVpcmUoXCIuL0dhcmJhZ2VcIik7XHJcbnZhciBMYXVuY2hSZXF1ZXN0SGFuZGxlciA9IHtcclxuICAgIGNhbkhhbmRsZTogZnVuY3Rpb24gKGhhbmRsZXJJbnB1dCkge1xyXG4gICAgICAgIHJldHVybiBoYW5kbGVySW5wdXQucmVxdWVzdEVudmVsb3BlLnJlcXVlc3QudHlwZSA9PT0gJ0xhdW5jaFJlcXVlc3QnO1xyXG4gICAgfSxcclxuICAgIGhhbmRsZTogZnVuY3Rpb24gKGhhbmRsZXJJbnB1dCkge1xyXG4gICAgICAgIHZhciBzcGVlY2hUZXh0ID0gJ+W3neWPo+OBruOCtOODn+WIhuWIpeOBuOOCiOOBhuOBk+OBneOAguWfvOeOieecjOW3neWPo+W4guOBruOCtOODn+WIhuWIpeaWueazleOCkuOBlOahiOWGheOBl+OBvuOBmeOAgumdtOS4i+OChOauteODnOODvOODq+OBquOBqeOCtOODn+OBruWQjeWJjeOCkuipseOBl+OBi+OBkeOBpuOBj+OBoOOBleOBhOOAgic7XHJcbiAgICAgICAgcmV0dXJuIGhhbmRsZXJJbnB1dC5yZXNwb25zZUJ1aWxkZXJcclxuICAgICAgICAgICAgLnNwZWFrKHNwZWVjaFRleHQpXHJcbiAgICAgICAgICAgIC5yZXByb21wdCgn6Kq/44G544Gf44GE44K044Of44Gu5ZCN5YmN44KS5pWZ44GI44Gm44GP44Gg44GV44GE44CCJylcclxuICAgICAgICAgICAgLndpdGhTaW1wbGVDYXJkKCfjgojjgYbjgZPjgZ0nLCBzcGVlY2hUZXh0KVxyXG4gICAgICAgICAgICAuZ2V0UmVzcG9uc2UoKTtcclxuICAgIH0sXHJcbn07XHJcbnZhciBHYXJiYWdlVHlwZUludGVudEhhbmRsZXIgPSB7XHJcbiAgICBjYW5IYW5kbGU6IGZ1bmN0aW9uIChoYW5kbGVySW5wdXQpIHtcclxuICAgICAgICByZXR1cm4gaGFuZGxlcklucHV0LnJlcXVlc3RFbnZlbG9wZS5yZXF1ZXN0LnR5cGUgPT09ICdJbnRlbnRSZXF1ZXN0J1xyXG4gICAgICAgICAgICAmJiAoaGFuZGxlcklucHV0LnJlcXVlc3RFbnZlbG9wZS5yZXF1ZXN0LmludGVudC5uYW1lID09PSAnR2FyYmFnZVR5cGVJbnRlbnQnXHJcbiAgICAgICAgICAgICAgICB8fCBoYW5kbGVySW5wdXQucmVxdWVzdEVudmVsb3BlLnJlcXVlc3QuaW50ZW50Lm5hbWUgPT09ICdHYXJiYWdlVHlwZU9uZVdvcmRJbnRlbnQnKTtcclxuICAgIH0sXHJcbiAgICBoYW5kbGU6IGZ1bmN0aW9uIChoYW5kbGVySW5wdXQpIHtcclxuICAgICAgICB2YXIgcmVxdWVzdCA9IGhhbmRsZXJJbnB1dC5yZXF1ZXN0RW52ZWxvcGUucmVxdWVzdDtcclxuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3QgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiByZXF1ZXN0LmludGVudC5zbG90cyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgdmFyIGdhcmJhZ2UgPSByZXF1ZXN0LmludGVudC5zbG90cy5nYXJiYWdlVHlwZS52YWx1ZTtcclxuICAgICAgICAgICAgdmFyIGdhcmJhZ2VJbnN0YW5jZSA9IG5ldyBHYXJiYWdlXzEuR2FyYmFnZSgnR2FyYmFnZVR5cGVzLmpzb24nKTtcclxuICAgICAgICAgICAgdmFyIHNwZWVjaFRleHQgPSBnYXJiYWdlSW5zdGFuY2UuR2VuZXJhdGVTcGVlY2hUZXh0KGdhcmJhZ2UpO1xyXG4gICAgICAgICAgICBpZiAoc3BlZWNoVGV4dCAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGVySW5wdXQucmVzcG9uc2VCdWlsZGVyXHJcbiAgICAgICAgICAgICAgICAgICAgLnNwZWFrKHNwZWVjaFRleHQgKyAn5LuW44Gr6Kq/44G544Gf44GE44KC44Gu44Gv44GC44KK44G+44GZ44GL44CCJylcclxuICAgICAgICAgICAgICAgICAgICAucmVwcm9tcHQoJ+iqv+OBueOBn+OBhOOCtOODn+OBrueorumhnuOCkuaVmeOBiOOBpuOBj+OBoOOBleOBhOOAgicpXHJcbiAgICAgICAgICAgICAgICAgICAgLndpdGhTaW1wbGVDYXJkKCfjgrTjg5/nqK7liKXmpJzntKInLCBzcGVlY2hUZXh0KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXRSZXNwb25zZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZXJJbnB1dC5yZXNwb25zZUJ1aWxkZXJcclxuICAgICAgICAgICAgICAgICAgICAuc3BlYWsoc3BlZWNoVGV4dClcclxuICAgICAgICAgICAgICAgICAgICAucmVwcm9tcHQoJ+iqv+OBueOBn+OBhOOCtOODn+OBrueorumhnuOCkuaVmeOBiOOBpuOBj+OBoOOBleOBhOOAgicpXHJcbiAgICAgICAgICAgICAgICAgICAgLndpdGhTaW1wbGVDYXJkKCfjgrTjg5/nqK7liKXmpJzntKInLCBzcGVlY2hUZXh0KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXRSZXNwb25zZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgc3BlZWNoVGV4dCA9ICfjgZnjgb/jgb7jgZvjgpPjgILjgrTjg5/jga7nqK7poZ7jgYzliIbjgYvjgorjgb7jgZvjgpPjgafjgZfjgZ/jgILliKXjga7oqIDokYnjgavoqIDjgYTmj5vjgYjjgabjgb/jgabjgY/jgaDjgZXjgYTjgIInO1xyXG4gICAgICAgICAgICByZXR1cm4gaGFuZGxlcklucHV0LnJlc3BvbnNlQnVpbGRlclxyXG4gICAgICAgICAgICAgICAgLnNwZWFrKHNwZWVjaFRleHQpXHJcbiAgICAgICAgICAgICAgICAucmVwcm9tcHQoJ+iqv+OBueOBn+OBhOOCtOODn+OBruWQjeWJjeOCkuaVmeOBiOOBpuOBj+OBoOOBleOBhOOAgicpXHJcbiAgICAgICAgICAgICAgICAud2l0aFNpbXBsZUNhcmQoJ+OCtOODn+eoruWIpeaknOe0oicsIHNwZWVjaFRleHQpXHJcbiAgICAgICAgICAgICAgICAuZ2V0UmVzcG9uc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59O1xyXG52YXIgSGVscEludGVudEhhbmRsZXIgPSB7XHJcbiAgICBjYW5IYW5kbGU6IGZ1bmN0aW9uIChoYW5kbGVySW5wdXQpIHtcclxuICAgICAgICByZXR1cm4gaGFuZGxlcklucHV0LnJlcXVlc3RFbnZlbG9wZS5yZXF1ZXN0LnR5cGUgPT09ICdJbnRlbnRSZXF1ZXN0J1xyXG4gICAgICAgICAgICAmJiBoYW5kbGVySW5wdXQucmVxdWVzdEVudmVsb3BlLnJlcXVlc3QuaW50ZW50Lm5hbWUgPT09ICdBTUFaT04uSGVscEludGVudCc7XHJcbiAgICB9LFxyXG4gICAgaGFuZGxlOiBmdW5jdGlvbiAoaGFuZGxlcklucHV0KSB7XHJcbiAgICAgICAgdmFyIHNwZWVjaFRleHQgPSAn5LiJ6ISa44Gv5L2V44K044Of77yf44Go44GE44GG44KI44GG44Gr44CB44K044Of44Gu5ZCN5YmN44KS6Kmx44GX44GL44GR44Gm44G/44Gm44GP44Gg44GV44GE44CCJztcclxuICAgICAgICByZXR1cm4gaGFuZGxlcklucHV0LnJlc3BvbnNlQnVpbGRlclxyXG4gICAgICAgICAgICAuc3BlYWsoc3BlZWNoVGV4dClcclxuICAgICAgICAgICAgLnJlcHJvbXB0KHNwZWVjaFRleHQpXHJcbiAgICAgICAgICAgIC53aXRoU2ltcGxlQ2FyZCgn5L2/44GE5pa5Jywgc3BlZWNoVGV4dClcclxuICAgICAgICAgICAgLmdldFJlc3BvbnNlKCk7XHJcbiAgICB9LFxyXG59O1xyXG52YXIgQ2FuY2VsQW5kU3RvcEludGVudEhhbmRsZXIgPSB7XHJcbiAgICBjYW5IYW5kbGU6IGZ1bmN0aW9uIChoYW5kbGVySW5wdXQpIHtcclxuICAgICAgICByZXR1cm4gaGFuZGxlcklucHV0LnJlcXVlc3RFbnZlbG9wZS5yZXF1ZXN0LnR5cGUgPT09ICdJbnRlbnRSZXF1ZXN0J1xyXG4gICAgICAgICAgICAmJiAoaGFuZGxlcklucHV0LnJlcXVlc3RFbnZlbG9wZS5yZXF1ZXN0LmludGVudC5uYW1lID09PSAnQU1BWk9OLkNhbmNlbEludGVudCdcclxuICAgICAgICAgICAgICAgIHx8IGhhbmRsZXJJbnB1dC5yZXF1ZXN0RW52ZWxvcGUucmVxdWVzdC5pbnRlbnQubmFtZSA9PT0gJ0FNQVpPTi5TdG9wSW50ZW50Jyk7XHJcbiAgICB9LFxyXG4gICAgaGFuZGxlOiBmdW5jdGlvbiAoaGFuZGxlcklucHV0KSB7XHJcbiAgICAgICAgdmFyIHNwZWVjaFRleHQgPSAn57WC5LqG44GX44G+44GZ44CCJztcclxuICAgICAgICByZXR1cm4gaGFuZGxlcklucHV0LnJlc3BvbnNlQnVpbGRlclxyXG4gICAgICAgICAgICAuc3BlYWsoc3BlZWNoVGV4dClcclxuICAgICAgICAgICAgLndpdGhTaW1wbGVDYXJkKCfntYLkuoYnLCBzcGVlY2hUZXh0KVxyXG4gICAgICAgICAgICAuZ2V0UmVzcG9uc2UoKTtcclxuICAgIH0sXHJcbn07XHJcbnZhciBTZXNzaW9uRW5kZWRSZXF1ZXN0SGFuZGxlciA9IHtcclxuICAgIGNhbkhhbmRsZTogZnVuY3Rpb24gKGhhbmRsZXJJbnB1dCkge1xyXG4gICAgICAgIHJldHVybiBoYW5kbGVySW5wdXQucmVxdWVzdEVudmVsb3BlLnJlcXVlc3QudHlwZSA9PT0gJ1Nlc3Npb25FbmRlZFJlcXVlc3QnO1xyXG4gICAgfSxcclxuICAgIGhhbmRsZTogZnVuY3Rpb24gKGhhbmRsZXJJbnB1dCkge1xyXG4gICAgICAgIHZhciByZWFzb24gPSBoYW5kbGVySW5wdXQucmVxdWVzdEVudmVsb3BlLnJlcXVlc3QucmVhc29uO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2Vzc2lvbiBlbmRlZCB3aXRoIHJlYXNvbjogXCIgKyByZWFzb24pO1xyXG4gICAgICAgIHJldHVybiBoYW5kbGVySW5wdXQucmVzcG9uc2VCdWlsZGVyLmdldFJlc3BvbnNlKCk7XHJcbiAgICB9LFxyXG59O1xyXG52YXIgRXJyb3JIYW5kbGVyID0ge1xyXG4gICAgY2FuSGFuZGxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG4gICAgaGFuZGxlOiBmdW5jdGlvbiAoaGFuZGxlcklucHV0LCBlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgaGFuZGxlZDogXCIgKyBlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICByZXR1cm4gaGFuZGxlcklucHV0LnJlc3BvbnNlQnVpbGRlclxyXG4gICAgICAgICAgICAuc3BlYWsoJ+OBmeOBv+OBvuOBm+OCk+OAguOBhuOBvuOBj+iBnuOBjeWPluOCjOOBvuOBm+OCk+OBp+OBl+OBn+OAguOCguOBhuS4gOW6puiogOOBo+OBpuOBj+OBoOOBleOBhOOAgicpXHJcbiAgICAgICAgICAgIC5yZXByb21wdCgn44GZ44G/44G+44Gb44KT44CC44GG44G+44GP6IGe44GN5Y+W44KM44G+44Gb44KT44Gn44GX44Gf44CC44KC44GG5LiA5bqm6KiA44Gj44Gm44GP44Gg44GV44GE44CCJylcclxuICAgICAgICAgICAgLmdldFJlc3BvbnNlKCk7XHJcbiAgICB9LFxyXG59O1xyXG52YXIgc2tpbGxCdWlsZGVyID0gYXNrX3Nka19jb3JlXzEuU2tpbGxCdWlsZGVycy5jdXN0b20oKTtcclxuZXhwb3J0cy5oYW5kbGVyID0gc2tpbGxCdWlsZGVyLmFkZFJlcXVlc3RIYW5kbGVycyhMYXVuY2hSZXF1ZXN0SGFuZGxlciwgSGVscEludGVudEhhbmRsZXIsIENhbmNlbEFuZFN0b3BJbnRlbnRIYW5kbGVyLCBTZXNzaW9uRW5kZWRSZXF1ZXN0SGFuZGxlciwgR2FyYmFnZVR5cGVJbnRlbnRIYW5kbGVyKVxyXG4gICAgLmFkZEVycm9ySGFuZGxlcnMoRXJyb3JIYW5kbGVyKVxyXG4gICAgLmxhbWJkYSgpO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhc2stc2RrLWNvcmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==