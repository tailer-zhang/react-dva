// var t = require('./lib');
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const phoneRegex = /^(1[3,5,8,7,4]\d{9})|(((400)-(\d{3})-(\d{4}))|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{3,7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/;
const fixedPhoneRegex = /^(((400)-(\d{3})-(\d{4}))|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{3,7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/;
const mobileRegex = /^(13|15|18|14|17)\d{9}$/;
const idcardRegex = /^\d{15}(\d{2}[A-Za-z0-9])?$/;
const ageRegex = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/;
const zipRegex = /^[0-9]\d{5}$/; 
const bankCardRegex = /^[0-9]{16,28}$/;
//验证日期格式yyyy-MM-dd或yyyy-M-d
const dateRegex = /^(?:(?!0000)[0-9]{4}([-]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-]?)0?2\2(?:29))$/;
const englishRegex = /^[A-Za-z]+$/;
const chineseLanguageRegex = /^[\u4e00-\u9fa5]+$/;
const faxRegex = /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
const exceptSpecialRegex = "~!@%^&*#;\"?><[]{}\\|:/=+?“”‘'";
const passwordRegex = /([a-z]+[A-Z]+[0-9]+){8,}/;
const integerRegex = /^[+]?[0-9]+\d*$/;
const floatRegex = /^\d+(\.\d+)?$/;
// const nameRegex = /^(([\u4e00-\u9fff]{2,50})|([a-z\.\s\,]{2,50}))$/;
// const nameRegex = /^(([\(\)（）\u4e00-\u9fa5]+)|([A-Za-z\.\s\,]+))$/;
// const VEEPIdentRegex = /^[A-Z]?[0-9]{6,11}\\(?([0-9]|[A-Z])?\\)?$/;
const VEEPIdentRegex = "^[A-Z]?[0-9]{6,11}\\(?([0-9]|[A-Z])?\\)?$";
const nameRegex = /^(([\(\)（）A-Za-z\.\s\,\u4e00-\u9fa5]+)|([A-Za-z\.\s\,]+))$/;

const lengthRegex = /^.{5,300}$/;


// //邮箱
// export const emailType = t.refinement(t.String, function (email) { return emailRegex.test(email); });
// //电话(固定电话与手机)
// export const phoneType = t.refinement(t.String, function (phone) { return phoneRegex.test(phone); });
// //手机
// export const mobileType = t.refinement(t.String, function (mobile) { return mobileRegex.test(mobile); });
// //固定电话
// export const fixedPhoneType = t.refinement(t.String, function (fixedPhone) { return fixedPhoneRegex.test(fixedPhone); });
// //身份证
// export const idcardType = t.refinement(t.String, function (idcard) { return idcardRegex.test(idcard); });
// //年龄
// export const ageType = t.refinement(t.String, function (age) { return ageRegex.test(age); });
// //邮编
// export const zipType = t.refinement(t.String, function (zip) { return zipRegex.test(zip); });
// //日期 yyyy-MM-dd或yyyy-M-d
// export const dateType = t.refinement(t.String, function (date) { return dateRegex.test(date); });
// //英文
// export const englishType = t.refinement(t.String, function (english) { return englishRegex.test(english); });
// //中文
// export const chineseLanguageType = t.refinement(t.String, function (chineseLanguage) { return chineseLanguageRegex.test(chineseLanguage); });
// //传真
// export const faxType = t.refinement(t.String, function (fax) { return faxRegex.test(fax); });
// //特殊字符
// export const exceptSpecialType = t.refinement(t.String, function(value) {for(var i=0;i<value.length;i++){if (exceptSpecialRegex.indexOf(value.charAt(i)) !=-1){return false;}}return true;});
// //整数校验
// export const integerType = t.refinement(t.String, function (integer) { return integerRegex.test(integer); });
// //浮点数校验
// export const floatType = t.refinement(t.String, function (float) { return floatRegex.test(float); });
// //姓名校验与公司名称校验
// export const nameType = t.refinement(t.String, function (name) { return nameRegex.test(name); });
// //港澳台证件校验
// export const VEEPIdentType = t.refinement(t.String, function (name) { return (new RegExp(VEEPIdentRegex)).test(name); });


// export function emailValidate(email)
// {
//   return emailRegex.test(email);
// }
//
// export function IDCardValidate(idcard)
// {
//    return idcardRegex.test(idcard);
// }
//
// export function mobileValidate(mobile)
// {
//    return mobileRegex.test(mobile);
// }
//
// export function numberValidate(number)
// {
//    return integerRegex.test(number);
// }
//
// export function passwordValidate(password)
// {
//    return passwordRegex.test(password);
// }
//
//

const TypeRegex ={
   email:emailRegex,
   phone:phoneRegex,
   mobile:mobileRegex,
   fixedPhone:fixedPhoneRegex,
   idcard:idcardRegex,
   age:ageRegex,
   zip:zipRegex,
   date:dateRegex,
   english:englishRegex,
   chineseLanguage:chineseLanguageRegex,
   fax:faxRegex,
   integer:integerRegex,
   float:floatRegex,
   name:nameRegex,
   bankCard:bankCardRegex,
   VEEPIdent:(new RegExp(VEEPIdentRegex)),
   length300:lengthRegex
 };

//正则验证是否通过
export function validateValue(type,value)
{
    let regex = TypeRegex[type];
    return regex.test(value);
}
//包含异常字符问题
export function exceptSpecialType(value) {
  for(var i=0;i<value.length;i++){
    if (exceptSpecialRegex.indexOf(value.charAt(i)) !=-1)
    {
      return false;
    }
  }
  return true;
}
