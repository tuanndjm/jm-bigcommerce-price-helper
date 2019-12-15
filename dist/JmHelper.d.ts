/**
 *
 *
 * @param {*} sourceData
 * @param {*} keyItem
 * @param {*} defaultValue
 * @returns {*} safeValue
 */
export declare function getSafeValue(sourceData: {}, keyItem: string, defaultValue: any): any;
/**
 *
 *
 * @param {*} value
 * @param {*} currencyCode
 * @returns
 */
export declare function convertCurrency(value: any, currencyCode: string): string;
/**
 *
 *
 * @param {*} currencyCode
 * @returns
 */
export declare function getLocale(currencyCode: string): "nl-NL" | "en-US" | "sv-SE";
