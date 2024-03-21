import { v4 as uuidv4 } from 'uuid';
import mainjs from './main';

const getFormatedUUID = () => {
    /** 
     *  @type: function
     * 
     *  @libr: uuid 
     * 
     *  @desc:
     *  Tạo uuid với format là một chuỗi 32 ký tự liền nhau gồm số và chữ cái viết hoa
     *  (1): Tạo UUID từ thư viện
     *  (2): Biến đổi toàn bộ ký tự thường thành ký tự in hoa
     *  (3): Xoá toàn bộ dấu gạch [__dash__] 
     * 
     */
    let id = uuidv4()               // (1)
    id = id.toUpperCase()           // (2)  
    id = id.replaceAll("-", "")     // (3)
    return id
}


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

const isMobile =  () => {

    /** 
     *  @type: function
     * 
     *  @note: this may run on UI only, has no effect ot backend 
     * 
     *  @desc:
     * 
     *  check if current viewport is mobile or not
     * 
     */

    const width = window.innerWidth;
    return width <= 768;
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
        return <text>{ formatComnaSeperatedNumber(price) }<sup>₫</sup></text>
    }
    return <span>---<sup>₫</sup></span>
}

export default {
    renderPrice,
    isMobile,
    getFormatedUUID,
    mainjs
}

