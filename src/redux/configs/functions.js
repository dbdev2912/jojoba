function formatComnaSeperatedNumber(number) {
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

const isMobile =  () => {
    const width = window.innerWidth;
    return width <= 768;
}


const renderPrice = ( price ) => {
    if( price ){
        return <text>{ formatComnaSeperatedNumber(price) }<sup>₫</sup></text>
    }
    return <span>---<sup>₫</sup></span>
}

export default {
    renderPrice,
    isMobile
}

