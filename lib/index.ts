import * as JmHelper from './JmHelper';

/**
 *
 * @method calculatePriceInList
 * @param {{}} productData
 * @param {string} currentCurrencyCode
 * @returns {any[]}
 */
export function calculatePriceInList(productData: {}, currentCurrencyCode: string): any[] {
    let listPriceText: any[] | never[] = [];

    const retailPrice = JmHelper.getSafeValue(productData, "retailPrice", 0);
    const basePrice = JmHelper.getSafeValue(productData, "price", 0);
    const salePrice = JmHelper.getSafeValue(productData, "salePrice", 0);

    let simpleRawPrice: any;
    simpleRawPrice.retailPrice = retailPrice;
    simpleRawPrice.basePrice = basePrice;
    simpleRawPrice.salePrice = salePrice;

    const listVariant = JmHelper.getSafeValue(productData, "variants", []);
    const listOptionValueOfVariant = JmHelper.getSafeValue(listVariant[0], "optionValues", []);
    const skuIdOfVariant = JmHelper.getSafeValue(listVariant[0], "skuId", null);
    const showSimplePrice = (listVariant.length === 1) && (listOptionValueOfVariant.length === 0) && !skuIdOfVariant;


    if (showSimplePrice) {
        // console.log("Simple product", listVariant[0]);
        listPriceText = calculateSimplePrice(simpleRawPrice, currentCurrencyCode);

        return listPriceText;
    }

    return listPriceText;
}

/**
 *
 *
 * @method calculateSimplePrice
 * @param {*} simpleRawPrice
 * @param {string} currentCurrencyCode
 * @returns {any[]}
 */
export function calculateSimplePrice(simpleRawPrice: any, currentCurrencyCode: string): any[] {
    let listPriceText: any[] | never[] = [];

    let basePrice = simpleRawPrice.basePrice;
    let retailPrice = simpleRawPrice.retailPrice;
    let salePrice = simpleRawPrice.salePrice;

    const basePriceCurrency = JmHelper.convertCurrency(basePrice, currentCurrencyCode);
    const retailPriceCurrency = JmHelper.convertCurrency(retailPrice, currentCurrencyCode);
    const salePriceCurrency = JmHelper.convertCurrency(salePrice, currentCurrencyCode);

    let showBasePrice = (basePrice > 0 && salePrice === retailPrice && salePrice === 0) ||
        (retailPrice === basePrice && basePrice === salePrice) ||
        (basePrice >= retailPrice && salePrice === 0);

    let showSalePrice = (salePrice > basePrice && salePrice > retailPrice) ||
        (salePrice === basePrice && salePrice > retailPrice) ||
        (salePrice === retailPrice > basePrice);

    const onePriceText = {
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

/**
 *
 * @method getHelloWorld
 * @returns Returns string `Hello world!`.
 */
export function getHelloWorld(): string {
    return "Hello world!";
}