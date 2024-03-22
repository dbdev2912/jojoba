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

    if( price ){
        return `<text>${ formatComnaSeperatedNumber(price) }<sup>₫</sup></text>`
    }
    return `<span>---<sup>₫</sup></span>`
}

module.exports = {
    renderPrice
}

