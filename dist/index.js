"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var JmHelper = __importStar(require("./JmHelper"));
/**
 *
 * @method calculatePriceInList
 * @param {{}} productData
 * @param {string} currentCurrencyCode
 * @returns {any[]}
 */
function calculatePriceInList(productData, currentCurrencyCode) {
    var listPriceText = [];
    var retailPrice = JmHelper.getSafeValue(productData, "retailPrice", 0);
    var basePrice = JmHelper.getSafeValue(productData, "price", 0);
    var salePrice = JmHelper.getSafeValue(productData, "salePrice", 0);
    var simpleRawPrice;
    simpleRawPrice.retailPrice = retailPrice;
    simpleRawPrice.basePrice = basePrice;
    simpleRawPrice.salePrice = salePrice;
    var listVariant = JmHelper.getSafeValue(productData, "variants", []);
    var listOptionValueOfVariant = JmHelper.getSafeValue(listVariant[0], "optionValues", []);
    var skuIdOfVariant = JmHelper.getSafeValue(listVariant[0], "skuId", null);
    var showSimplePrice = (listVariant.length === 1) && (listOptionValueOfVariant.length === 0) && !skuIdOfVariant;
    if (showSimplePrice) {
        // console.log("Simple product", listVariant[0]);
        listPriceText = calculateSimplePrice(simpleRawPrice, currentCurrencyCode);
        return listPriceText;
    }
    return listPriceText;
}
exports.calculatePriceInList = calculatePriceInList;
/**
 *
 *
 * @method calculateSimplePrice
 * @param {*} simpleRawPrice
 * @param {string} currentCurrencyCode
 * @returns {any[]}
 */
function calculateSimplePrice(simpleRawPrice, currentCurrencyCode) {
    var listPriceText = [];
    var basePrice = simpleRawPrice.basePrice;
    var retailPrice = simpleRawPrice.retailPrice;
    var salePrice = simpleRawPrice.salePrice;
    var basePriceCurrency = JmHelper.convertCurrency(basePrice, currentCurrencyCode);
    var retailPriceCurrency = JmHelper.convertCurrency(retailPrice, currentCurrencyCode);
    var salePriceCurrency = JmHelper.convertCurrency(salePrice, currentCurrencyCode);
    var showBasePrice = (basePrice > 0 && salePrice === retailPrice && salePrice === 0) ||
        (retailPrice === basePrice && basePrice === salePrice) ||
        (basePrice >= retailPrice && salePrice === 0);
    var showSalePrice = (salePrice > basePrice && salePrice > retailPrice) ||
        (salePrice === basePrice && salePrice > retailPrice) ||
        (salePrice === retailPrice > basePrice);
    var onePriceText = {
        text: (showBasePrice && !showSalePrice) ? basePriceCurrency : salePriceCurrency,
        fontSize: 16,
        color: "#000000",
        fontFamily: "bold"
    };
    // TODO: Case 1 - Show one price
    if (showBasePrice || showSalePrice) {
        listPriceText = [[onePriceText]];
        return listPriceText;
    }
    return listPriceText;
}
exports.calculateSimplePrice = calculateSimplePrice;
/**
 *
 * @method getHelloWorld
 * @returns Returns string `Hello world!`.
 */
function getHelloWorld() {
    return "Hello world!";
}
exports.getHelloWorld = getHelloWorld;
