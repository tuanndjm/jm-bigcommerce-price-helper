"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var intl_1 = require("intl");
var KEY_USD = "USD";
var SYMBOL_USD = "$";
var KEY_AUD = "AUD";
var SYMBOL_AUD = "AU$";
var KEY_GBP = "GBP";
var SYMBOL_GBP = "UK£";
var KEY_EUR = "EUR";
var SYMBOL_EUR = "€";
var KEY_CNY = "CNY";
var SYMBOL_CNY = "CN¥";
var KEY_BDT = "BDT";
var SYMBOL_BDT = "Tk";
var KEY_SYP = "SYP";
var KEY_SEK = "SEK";
var SYMBOL_SEKL = "kr";
var KEY_SAR = "SAR";
var SYMBOL_SAR = "SR";
var KEY_XOF = "XOF";
var SYMBOL_XOF = "CFA";
/**
 *
 *
 * @param {*} sourceData
 * @param {*} keyItem
 * @param {*} defaultValue
 * @returns {*} safeValue
 */
function getSafeValue(sourceData, keyItem, defaultValue) {
    var safeValue = lodash_1.default.get(sourceData, keyItem, defaultValue);
    if (safeValue === null) {
        safeValue = defaultValue;
    }
    if (safeValue === "") {
        safeValue = defaultValue;
    }
    if (safeValue !== null &&
        defaultValue !== null &&
        (typeof safeValue !== typeof defaultValue ||
            safeValue.constructor !== defaultValue.constructor)) {
        safeValue = defaultValue;
    }
    return safeValue;
}
exports.getSafeValue = getSafeValue;
;
/**
 *
 *
 * @param {*} value
 * @param {*} currencyCode
 * @returns
 */
function convertCurrency(value, currencyCode) {
    var val = safeParseFloat(value);
    var valueRound = Math.round(val * 100) / 100;
    var currencyDefault = KEY_USD;
    var locale = getLocale(currencyCode || currencyDefault);
    return new intl_1.NumberFormat(locale, {
        style: "currency",
        currency: currencyCode || currencyDefault,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(valueRound);
}
exports.convertCurrency = convertCurrency;
;
/**
 *
 *
 * @param {*} currencyCode
 * @returns
 */
function getLocale(currencyCode) {
    if (currencyCode.toUpperCase() === KEY_EUR.toUpperCase()) {
        return "nl-NL";
    }
    else if (currencyCode.toUpperCase() === KEY_SAR.toUpperCase()) {
        return "en-US";
    }
    else if (currencyCode.toUpperCase() === KEY_SEK.toUpperCase()) {
        return "sv-SE";
    }
    else if (currencyCode.toUpperCase() === KEY_USD.toUpperCase()) {
        return "en-US";
    }
    else {
        return "en-US";
    }
}
exports.getLocale = getLocale;
;
function safeParseFloat(strNumber) {
    var numParse = 0;
    if (strNumber === "" || strNumber === null || strNumber === undefined) {
        return numParse;
    }
    numParse = parseFloat(strNumber);
    if (numParse === null) {
        numParse = 0;
    }
    return numParse;
}
;
// function getListVariant(productData) {
//     return get(['variants'], productData);
// };
// const get = (p, o) => p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o);
