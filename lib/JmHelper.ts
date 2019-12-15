import _ from 'lodash';
import { NumberFormat } from "intl";

export const KEY_USD = "USD";
export const SYMBOL_USD = "$";
export const KEY_AUD = "AUD";
export const SYMBOL_AUD = "AU$";
export const KEY_GBP = "GBP";
export const SYMBOL_GBP = "UK£";
export const KEY_EUR = "EUR";
export const SYMBOL_EUR = "€";
export const KEY_CNY = "CNY";
export const SYMBOL_CNY = "CN¥";
export const KEY_BDT = "BDT";
export const SYMBOL_BDT = "Tk";
export const KEY_SYP = "SYP";
export const KEY_SEK = "SEK";
export const SYMBOL_SEKL = "kr";
export const KEY_SAR = "SAR";
export const SYMBOL_SAR = "SR";
export const KEY_XOF = "XOF";
export const SYMBOL_XOF = "CFA";

/**
 *
 *
 * @method getSafeValue
 * @param {{}} sourceData
 * @param {string} keyItem
 * @param {*} defaultValue
 * @returns {*}
 */
export function getSafeValue(sourceData: {}, keyItem: string, defaultValue: any): any {
    var safeValue = _.get(sourceData, keyItem, defaultValue);

    if (safeValue === null) {
        safeValue = defaultValue;
    }

    if (safeValue === "") {
        safeValue = defaultValue;
    }

    if (
        safeValue !== null &&
        defaultValue !== null &&
        (typeof safeValue !== typeof defaultValue ||
            safeValue.constructor !== defaultValue.constructor)
    ) {
        safeValue = defaultValue;
    }

    return safeValue;
};

/**
 *
 *
 * @method convertCurrency
 * @param {*} value
 * @param {string} currencyCode
 * @returns {*}
 */
export function convertCurrency(value: any, currencyCode: string): any {
    const val = safeParseFloat(value);
    const valueRound = Math.round(val * 100) / 100;
    const currencyDefault = KEY_USD;

    const locale = getLocale(currencyCode || currencyDefault);

    return new NumberFormat(locale, {
        style: "currency",
        currency: currencyCode || currencyDefault,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(valueRound);
};

/**
 *
 *
 * @param {*} currencyCode
 * @returns
 */
export function getLocale(currencyCode: string) {
    if (currencyCode.toUpperCase() === KEY_EUR.toUpperCase()) {
        return "nl-NL";
    } else if (currencyCode.toUpperCase() === KEY_SAR.toUpperCase()) {
        return "en-US";
    } else if (currencyCode.toUpperCase() === KEY_SEK.toUpperCase()) {
        return "sv-SE";
    } else if (currencyCode.toUpperCase() === KEY_USD.toUpperCase()) {
        return "en-US";
    } else {
        return "en-US";
    }
};


/**
 *
 *
 * @method safeParseFloat
 * @param {(string | null | undefined)} strNumber
 * @returns
 */
export function safeParseFloat(strNumber: string | null | undefined) {
    var numParse = 0;
    if (strNumber === "" || strNumber === null || strNumber === undefined) {
        return numParse;
    }

    numParse = parseFloat(strNumber);
    if (numParse === null) {
        numParse = 0;
    }

    return numParse;
};
