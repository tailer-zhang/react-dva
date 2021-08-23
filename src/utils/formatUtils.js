export function convertCurrency(money) {
  //汉字的数字
  var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
  //基本单位
  var cnIntRadice = new Array('', '拾', '佰', '仟');
  //对应整数部分扩展单位
  var cnIntUnits = new Array('', '万', '亿', '兆');
  //对应小数部分单位
  var cnDecUnits = new Array('角', '分', '毫', '厘');
  //整数金额时后面跟的字符
  var cnInteger = '整';
  //整型完以后的单位
  var cnIntLast = '元';
  //最大处理的数字
  var maxNum = 9999999999999999.9999;
  //金额整数部分
  var integerNum;
  //金额小数部分
  var decimalNum;
  //输出的中文金额字符串
  var chineseStr = '';
  //分离金额后用的数组，预定义
  var parts;
  if (money == ''||!money) { return '零元整'; }
  money = parseFloat(money);
  if (money >= maxNum) {
    //超出最大处理数字
    return '';
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  //转换为字符串
  money = money.toString();
  if (money.indexOf('.') == -1) {
    integerNum = money;
    decimalNum = '';
  } else {
    parts = money.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  //获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    var zeroCount = 0;
    var IntLen = integerNum.length;
    for (var i = 0; i < IntLen; i++) {
      var n = integerNum.substr(i, 1);
      var p = IntLen - i - 1;
      var q = p / 4;
      var m = p % 4;
      if (n == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        //归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  //小数部分
  if (decimalNum != '') {
    var decLen = decimalNum.length;
    for (var i = 0; i < decLen; i++) {
      var n = decimalNum.substr(i, 1);
      if (n != '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum == '') {
    chineseStr += cnInteger;
  }
  return chineseStr;
}

export  function fmoney(s, n)
{
    if(!s) return '';
   n = n >= 0 && n <= 20 ? n : 0;
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
   var l = s.split(".")[0].split("").reverse();
   var  r = s.split(".")[1];
   var t = '';
   for(var i = 0; i < l.length; i ++ )
   {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
   }

   if(n<=0)
    return t.split("").reverse().join("");
  else  return t.split("").reverse().join("") + "." + r;
}

export function rmoney(s)
{
   return parseFloat(s.replace(/[^\d\.-]/g, ""));
}

export function formatDate(dt,format){
  if(dt==null||dt==undefined||isNaN(dt.getMonth()))
     {
      //  dt = new Date('1970-01-01');
      return undefined;
    }
    var o = {
    "M+" : dt.getMonth()+1, //month
    "d+" : dt.getDate(), //day
    "h+" : dt.getHours(), //hour
    "m+" : dt.getMinutes(), //minute
    "s+" : dt.getSeconds(), //second
    "q+" : Math.floor((dt.getMonth()+3)/3), //quarter
    "S" : dt.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (dt.getFullYear()+"").substr(4 - RegExp.$1.length));
    }

    for(var k in o) {
      if(new RegExp("("+ k +")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
      }
    }
    var newFormat = String(format);
    if(newFormat.indexOf('NaN')!=-1)
    {
       newFormat = undefined;
    }
    return newFormat;
}
// AddDays(dt,days){
//   var nd = dt.valueOf();
//   nd = nd + days * 24 * 60 * 60 * 1000;
//   nd = new Date(nd);
//   return nd;
// }
// }
//格式化金额，增加千分位分隔符
export function formatAmount (amount) {
    return (amount.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}





//获取当月第一天
export function firstDayInMonth () {
  var date=new Date();
 return formatDate(new Date(date.setDate(1)),'yyyy-MM-dd');
}
//获取当月最后一天
export function lastDayInMonth () {
  var date=new Date();
  var currentMonth=date.getMonth();
  var nextMonth=++currentMonth;
  var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
  var oneDay=1000*60*60*24;
  return formatDate(new Date(nextMonthFirstDay-oneDay),'yyyy-MM-dd');
}

//获取当年第一天
export function firstDayInYear () {
  var date=new Date().getFullYear() + '-01-01';
 return formatDate(new Date(date),'yyyy-MM-dd');
}
//获取当年最后一天
export function lastDayInYear () {
    var date=new Date().getFullYear() + '-12-31';
  return formatDate(new Date(date),'yyyy-MM-dd');
}

//获取当前季度第一天
export function firstDayInSeason ()
{
  let date=new Date();
  let currentMonth=date.getMonth();
  let index=Math.floor(currentMonth/3);//根据月份得到是当前是第几个季度
  let seasonStartDate = new Date(date.getFullYear(),index*3,1);
  return formatDate(seasonStartDate,'yyyy-MM-dd');
}

//获取当前季度最后一天
export function lastDayInSeason()
{
  let date=new Date();
  let currentMonth=date.getMonth();
  let nextIndex=Math.floor(currentMonth/3)+1;//根据月份得到是当前的下个季度的索引
  let nextseasonStartDate = new Date(date.getFullYear(),nextIndex*3,1);
  var oneDay=1000*60*60*24;
  return formatDate(new Date(nextseasonStartDate-oneDay),'yyyy-MM-dd');
}

export function formatDuringDate(type)
{
  let nowDate = new Date();
  let endYear = nowDate.getFullYear();
  let endMonth = nowDate.getMonth();
  let endDay = nowDate.getDate();

  let month = endMonth;
  let year = endYear;

  if(type==1)//一个月
  {
    month= month -1;
  }
  else if(type==2)//三个月
  {
    month= month -3;
  }
  else if(type==3)//六个月
  {
    month= month -6;
  }
  else //一年
  {
    year = year-1;
  }
  //
  // if(type==1)//三个月
  // {
  //    month= month -3;
  // }
  // else if(type==2)//六个月
  // {
  //   month= month -6;
  // }
  // else if(type==3)//一年
  // {
  //   year = year-1;
  // }
  // else //今年
  // {
  //     month  =0;
  //     endDay = 1;
  // }

  if(month<0)
  {
    month= month+12;
    year = endYear -1;
  }

  let startDate = new Date(year,month,endDay);
  return {
    startDate:formatDate(startDate,'yyyy-MM-dd'),
    endDate:formatDate(nowDate,'yyyy-MM-dd')
  };

}

export function html_decode(str) {
  var s = "";
  if (str.length == 0) return "";
  s = str.replace(/&amp;/g, "&");
  s = s.replace(/&lt;/g, "<");
  s = s.replace(/&gt;/g, ">");
  s = s.replace(/&nbsp;/g, "");
  s = s.replace(/&#39;/g, "\'");
  s = s.replace(/&quot;/g, "\"");
  s = s.replace(/&ldquo;/g, "\"");
  s = s.replace(/&rdquo;/g, "\"");
  s = s.replace(/&amp;/g, "&");
  return s;
}

export function formatError(error){
      if(!error)
        return '输入参数非法';
      let errorKeys = Object.keys(error);
      if(errorKeys.length<=0)
        return '输入参数非法';
      let firstError = error[errorKeys[0]].errors[0];
      return firstError.message;
}

export function formatToThousand(num,ceilFlag){

    if(ceilFlag==true)
       return num?Math.ceil(num/100.0)/100.0:'';
    return num?Math.floor(num/100.0)/100.0:'';
}
// let _log = console.log;
// console.log = function(){
//   // if(process.env.NODE_ENV === 'production')
//   // {
//   //   window.webkit.messageHandlers.reactNative.postMessage(arguments);
//   // }
//   // _log.call(console,arguments);
//   // if(process.env.NODE_ENV === 'production')
//     _log.call(console,'%c'+[].slice.call(arguments).join(' '),'color: rgb(255,0,0);');
// }

// let _errorLog = console.error;
// console.error = function(){
//   _errorLog.call(console,'%c'+[].slice.call(arguments).join(' '),'color:rgb(0,0,255);');
// }
