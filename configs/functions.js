const { v4: uuidv4 } = require('uuid');
const { ROLES, ADMIN } = require('./enum')


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



const formatDate = ( dateStr ) => {

    /** 
    *  @type: function
    * 
    *  @desc:
    * 
    *  return formatted date 
    * 
    */

   if( dateStr != undefined ){

        const date = new Date( dateStr );
        return `${ date.getDate() }/${ date.getMonth() + 1 }/${ date.getFullYear() }`

        return 
    }
   return `--/--/--`
}

const formateDateTime = ( dateStr ) => {

    /** 
    *  @type: function
    * 
    *  @desc:
    * 
    *  return formatted datetime
    * 
    */

   if( dateStr != undefined ){

        const date = new Date( dateStr );
        return `${ date.getDate() }/${ date.getMonth() + 1 }/${ date.getFullYear() } ${ date.getHours() }:${ date.getMinutes() }`
        
    }
   return `--/--/-- --:--`
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
     *  @return BOOL
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

const isAdmin = ( user = {}) => {
     /** 
     *  @type: function
     * 
     *  @params: 
     *      user: {
     *      ten_dang_nhap: <String>,
     *      role: <String> 
     *  }
     * 
     *  @desc:
     *      If 
     *          Tên đăng nhập là enum.Admin.username => true
     *      Else:
     *          - role là enum.ROLES.admin => true
     * 
     *      => Mặc định false
     *      
     * 
     *  @return BOOL
     * 
     *  
     * 
     */

     const { ten_dang_nhap, role } = user;

     if( ten_dang_nhap === ADMIN.username ){
        return true
     }else{
        if( role == ROLES.admin ){
            return true
        }
     }
     return false;
}

const intValidate = ( number ) => {

     /** 
     *  @type: function
     * 
     *  @params: 
     *      number <Any>
     * 
     *  @desc:
     * 
     *  @return BOOL
     * 
     *  
     * 
     */

    if( number != undefined){
        const numberString = number.toString()
        const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        let valid = true
        for( let i = 0; i < numberString.length ; i++ ){
            const char = numberString[i]
            if( numbers.indexOf( char ) === -1 ){
                valid = false
            }
        }
        return valid;
    }
    else{
        return false
    }
}


module.exports = {
    renderPrice,
    nullCheck,
    formatComnaSeperatedNumber,

    getFormatedUUID,
    formatDate,
    formateDateTime,
    isAdmin,

    intValidate
}

