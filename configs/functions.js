const formatComnaSeperatedNumber = (number) => {
    /**
     * @type: function
     * 
     * @libr: uuid 
     * 
     * @desc: translate 1000 to 1,000
     * 
     */


    let numString = number.toString();
    let formattedNumber = '';
    let count = 0;

    for (let i = numString.length - 1; i >= 0; i--) {
        count++;
        formattedNumber = numString[i] + formattedNumber;
        if (count % 3 === 0 && i !== 0) {
            formattedNumber = ',' + formattedNumber;
        }
    }
    
    return formattedNumber;
}



const renderPrice = ( price ) => {

     /** 
     *  @type: function
     * 
     *  @relatedFunctions 
     *      - formatComnaSeperatedNumber( price: Int )
     * 
     * 
     *  @desc:
     * 
     *  return pricing formated number
     * 
     */

    if( price != undefined ){
        return `<text>${ formatComnaSeperatedNumber(price) }<sup>₫</sup></text>`
    }
    return `<span>---<sup>₫</sup></span>`
}

const nullCheck = ( data, keys ) => {
    /** 
     *  @type: function
     * 
     *  @params: 
     *      data: <Object>
     *      keys: <String>[]
     * 
     *  @desc:
     * 
     *  return if all keys return at least one data
     * 
     */
    if( data && keys && Array.isArray(keys)){
        let valid = true;
        for( let i = 0; i < keys.length; i++ ){
            const key = keys[i];
            if( data[key] == undefined ){
                valid = false;
            }
        }
        return valid;
    }
    return false   
}

module.exports = {
    renderPrice,
    nullCheck,
}

