## JavaScript

### 判断是否为整数，是返回`true`，不是返回`false`

```javascript
//判断是否为整数
function isInteger(num) {
    let str = num + '';
    if (str.indexOf('.') == -1) {
    return true;
    } else {
        return false;
    }
}
```

### 输入年份，得到当年的二月天数

```javascript
//输入年份得到二月天数
function getFebruaryDay(day) {
    if (day % 4 == 0 && day % 100 != 0 || day % 400 == 0) {
        document.writeln(day + '是闰年，二月有29天' + '<br>');
    } else {
        document.writeln(day + '是平年，二月有28天' + '<br>');
    }
}

// 输入年份得到二月天数
function acquireFebruaryDay(year) {
    var date1 = new Date(year + '/02/01');
    var date2 = new Date(year + '/03/01');
    var time1 = date1.getTime();
    var time2 = date2.getTime();
    console.log((time2 - time1) / 1000 / 60 / 60 / 24 + '天');
}
acquireFebruaryDay(2008);
```

### 输入三角形行数，打印该行数的三角形

```javascript
//输入行数，打印三角形
function triangle(rowCount) {
    rowCount = parseInt(rowCount);
    for (let i = 1; i <= rowCount; i++) {
    for (let x = rowCount - i - 1; x >= 0; x--) {
            document.write('&nbsp;');
        }
        for (let y = 1; y <= 2 * i - 1; y++) {
            document.write('<span style="font-weight:700">*</span>');
        }
        document.write('<br>');
    }
}
triangle(10);
```

### 输入最小值min和最大值max，输出该范围内的素数，范围：[min,max]

```javascript
//打印指定范围内的素数
function primrNumber(mix, max) {
    for (let i = mix; i <= max; i++) {
        let flag = true;
        for (let j = 2; j < i; j++) {
            if (i % j == 0) {
                flag = false;
                break;
            }
        }
        if (flag) {
            document.writeln(i);
        }
    }
}
primrNumber(1, 100);
```

### 计算表达式1-2+3-4+5-6+...+n的值,输入n的值

```javascript
//计算表达式1-2+3-4+5-6+...+n的值
function cal(n) {
    n = parseInt(n);
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        let num = i;
        if (i % 2 == 0) {
            num = (-1) * i;
        }
        sum += num;
    }
    document.write(sum);
}
cal(prompt('请输入n的值：'));
```

### 求4位数的前2位数和后两位数相等，且能开方的4位数

```javascript
//4位数 前2位和后两位相等 且4位数能开方
function fourFigures() {
    for (let i = 1000; i <= 9999; i++) {
                // let kilobit = i / 1000;
                // let hundreds = i / 100 % 10;
                // let decade = i / 10 % 10;
                // let unit = i % 10;
        let beforeNum = parseInt(i / 100);
        let afterNum = i % 100;
        if (isInteger(i) && beforeNum == afterNum) {
            console.log(i);
        }
    }
};
fourFigures();
```

### 随机数

```javascript
// 返回了一个在指定值之间的随机数。这个值不小于 min（有可能等于），并且小于（不等于）max
function  getRandom(min,  max)  {   
    return  Math.floor(Math.random()  * (max  - min +  1))  +  min; 
}

// 返回了一个在指定值之间的随机数。包含min和max
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
}

// 生成包含最大值和最小值的随机数
function getRandomNum(min, max) {
    return parseInt(Math.random() * (max - min + 1)) + min;
}
```

### [斐波那契数列](https://baike.baidu.com/item/斐波那契数列/99145)

count为数列的第几位

```javascript
//递归
function frog(count) {
    if (count == 1) {
        return 1;
    } else if (count == 2) {
        return 2;
    } else {
        return frog(count - 2) + frog(count - 1);
    }
}

//循环
let result = 0,
    n1 = 1,
    n2 = 2;
for (let i = 3; i <= 20; i++) {
    result = n1 + n2;
    n1 = n2;
    n2 = result;
    console.log(i + '->' + result);
}
document.writeln(result);
```

### 返回当前日期

```javascript
function getDateTime() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // [0-11]
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let senconds = date.getSeconds();
    hour = (hour < 10 ? ('0' + hour) : hour);
    minutes = (minutes < 10 ? ('0' + minutes) : minutes);
    senconds = (senconds < 10 ? ('0' + senconds) : senconds);
    // return year + '年' + month + '月' + day + '日' + hour + '时' + minutes + '分' + senconds + '秒';
    return year + '年' + month + '月' + day + '日' + hour + ':' + minutes + ':' + senconds;
}
```

### 计算指定日期到现在日期的天数

```javascript
function setDateTime(birday) {
    let bti = parseInt((new Date(birday).getTime()) / 1000 / 60 / 60 / 24);
    let now = parseInt(Date.now() / 1000 / 60 / 60 / 24);
    return now - bti + '天';
}
console.log(setDateTime('2000/1/11'));
```

### 数组排序

```text
0 升序
1 降序
/***
* 数组排序
* arr 传入数组
* flag 0升序 1降序 
* 对原数组操作返回新数组
***/
function sort(arr, flag) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
           // 升序
           if (flag == 0) {
                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
            //降序
            if (flag == 1) {
                if (arr[j] < arr[j + 1]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
    return arr;
}
```

### 数组去重

```javascript
//去除数组重复数据
function  Delete_Duplicate_Elements(arr) {
    var  newarr = [];
    for (var  i = 0; i < arr.length; i++) {
        if (newarr.indexOf(arr[i]) == -1)
            newarr.push(arr[i]);
    }
    return  newarr;
}
```


### JavaSript API | 腾讯位置服务
[https://lbs.qq.com/webApi/javascriptGL/glGuide/glOverview](https://lbs.qq.com/webApi/javascriptGL/glGuide/glOverview)

### 获取URL参数
```javascript
QueryString: function (item, href) {
            var str = location.search;
            if (arguments.length == 2) str = href;
            var svalue = str.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
            return svalue ? unescape(svalue[1]) : svalue;
        }
        //获取url中"?"符后的字串
        GetAllQueryString: function () {
            var url = location.search;
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                return str;
            }
            return null;
        }
```

### 判断对象是否是NULL或者时undefined
```javascript
IsEmpty: function (val) {//判断对象是否是NULL或者时undefined
            if (typeof (val) == 'undefined') return true;
            if (val == null || val == "null" || val == "undefined") return true;
            if ((val + "").replace(/　/g, "").trim() == "") return true;
            return false;
        }
```

### 数值相加
```javascript
numberValueAdd: function (arg1, arg2) {
            var r1, r2, m;
            try { r1 = arg1.toString().split(".")[1].length; } catch (e) { r1 = 0; }
            try { r2 = arg2.toString().split(".")[1].length; } catch (e) { r2 = 0; }
            m = Math.pow(10, Math.max(r1, r2));
            var r = this.numberValueMultiply(arg1, m) + this.numberValueMultiply(arg2, m);
            var result = this.numberValueDivide(r, m);
            if (isNaN(result)) {
                result = 0;
            }
            return result;
        }
```

### 数值相减
```javascript
numberValueSubtract: function (arg1, arg2) {
            var r1, r2, m;
            try { r1 = arg1.toString().split(".")[1].length; } catch (e) { r1 = 0; }
            try { r2 = arg2.toString().split(".")[1].length; } catch (e) { r2 = 0; }
            m = Math.pow(10, Math.max(r1, r2));
            var r = this.numberValueMultiply(arg1, m) - this.numberValueMultiply(arg2, m);
            var result = this.numberValueDivide(r, m);
            if (isNaN(result)) {
                result = 0;
            }
            return result;
        },
```

### 数值相除
```javascript
numberValueDivide: function (arg1, arg2) {
            if (arg2 === 0) return 0;
            var t1 = 0, t2 = 0, r1, r2;
            if (IsEmpty(arg1)) arg1 = 0;
            if (IsEmpty(arg2)) {
                arg2 = 1;
                arg1 = 0;
            };
            try { t1 = arg1.toString().split(".")[1].length; } catch (e) { }
            try { t2 = arg2.toString().split(".")[1].length; } catch (e) { }
            with (Math) {
                r1 = Number(arg1.toString().replace(".", ""));
                r2 = Number(arg2.toString().replace(".", ""));
                return (r1 / r2) * pow(10, t2 - t1);
            }
        }
```

### 数值相乘
```javascript
numberValueMultiply: function (arg1, arg2) {
            if (IsEmpty(arg1)) arg1 = 0;
            if (IsEmpty(arg2)) arg2 = 0;
            var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
            try { m += s1.split(".")[1].length; } catch (e) { }
            try { m += s2.split(".")[1].length; } catch (e) { }
            var result = Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
            if (isNaN(result)) {
                result = 0;
            }
            return result;
        }
```

### 数值相保留几位小数乘
```javascript
//保留几位小数
        ChangeDp: function (val, dp) {
            var f_x = parseFloat(val);
            if (isNaN(f_x)) {
                return 0;
            }
            var dpVal = Math.pow(10, dp);
            f_x = this.numberValueDivide(Math.round(this.numberValueMultiply(f_x, dpVal)),dpVal);
            return f_x;
        }
```

### 四舍六入，5看前，奇进偶不进
```javascript
//四舍六入，5看前，奇进偶不进
        NumberValueRevision : function(val,length){
            var carry = 0; //存放进位标志
            var num,multiple; //num为原浮点数放大multiple倍后的数，multiple为10的length次方
            var str = val + ''; //将调用该方法的数字转为字符串
            var dot = str.indexOf("."); //找到小数点的位置
            //找到要进行舍入的数的位置，手动判断奇偶，满足条件进位标志置为1
            if(str.substr(dot+length+1,1)>5){ //>5进位
                carry=1;
            }else if(str.substr(dot+length+1,1)==5){
                //看前一位奇偶
                if(str.substr(dot+length,1) && str.substr(dot+length,1)%2==1){
                    carry=1;
                }
                if(str.substr(dot+length,1)=="."){
                    if(str.substr(dot+length-1,1) && str.substr(dot+length-1,1)%2==1){
                        carry=1;
                    }
                }
            }
            multiple = Math.pow(10,length); //设置浮点数要扩大的倍数
            num = Math.floor(this * multiple) + carry; //去掉舍入位后的所有数，然后加上我们的手动进位数
            var result = num/multiple + ''; //将进位后的整数再缩小为原浮点数
            /*
            * 处理进位后无小数
            */
            dot = result.indexOf(".");
            if(dot < 0 && length!=0){
                result += '.';
                dot = result.indexOf(".");
            }
            /*
            * 处理多次进位
            */
            var len = result.length - (dot+1);
            if(len < length){
                for(var i = 0; i < length - len; i++){
                    result += 0;
                }
            }
            return result;
        },
```

### 校验是否为日期
```javascript
//校验是否为日期
        CheckIsDate: function (s) {
            var rg = new RegExp("^((((1[6-9]|[2-9]\\d)\\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\\d)\\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\\d|30))|(((1[6-9]|[2-9]\\d)\\d{2})-0?2-(0?[1-9]|1\\d|2[0-8]))|(((1[6-9]|[2-9]\\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29))$");
            return this.CheckByRegex(s, rg);
        }
        CheckByRegex: function (s, rg) {
            if (rg) {
                if (s && s.match(rg)) {
                    return true;
                }
            }
            return false;
        }
```

### 日期转字符串
```javascript
//校验是否为日期
        CheckIsDate: function (s) {
            var rg = new RegExp("^((((1[6-9]|[2-9]\\d)\\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\\d)\\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\\d|30))|(((1[6-9]|[2-9]\\d)\\d{2})-0?2-(0?[1-9]|1\\d|2[0-8]))|(((1[6-9]|[2-9]\\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29))$");
            return this.CheckByRegex(s, rg);
        }
        CheckByRegex: function (s, rg) {
            if (rg) {
                if (s && s.match(rg)) {
                    return true;
                }
            }
            return false;
        }
```

### 字符串转日期
```javascript
stringToDate: function (DateStr, format) {
            if (IsEmpty(DateStr)) return "";
            if (DateStr instanceof Date) {
                return DateStr;
            }
            if (format == "yyyyMM") {
                if (DateStr.length != 6) return "";
                DateStr = DateStr.substring(0, 4) + "-" + DateStr.substring(4, 6);
            }
            var converted = Date.parse(DateStr);
            var myDate = new Date(converted);
            if (isNaN(myDate)) {
                if (DateStr.indexOf(':') > 0 || (!IsEmpty(format) && format.toLowerCase().indexOf("h") > -1)) {
                    var two = DateStr.split(' ');
                    if (two.length != 2) {
                        two = DateStr.split('T');
                    }
                    var nowDate = new Date();
                    if (two.length == 1) {
                        var tempValue = new Array();
                        tempValue.push(nowDate.toString("yyyy-MM-dd"));
                        tempValue.push(two[0]);
                        two = tempValue;
                    }
                    if (two.length != 2) {
                        return nowDate;
                    }
                    var d = two[0].split('-');
                    var t = two[1].replace("Z", "").split(':');
                    if (t.length == 3) {
                        myDate = new Date(d[0], --d[1], d[2], t[0], t[1], t[2]);
                    }
                    else if (t.length == 2) {
                        myDate = new Date(d[0], --d[1], d[2], t[0], t[1], "00");
                    }
                    else if (t.length == 1) {
                        myDate = new Date(d[0], --d[1], d[2], t[0], "00", "00");
                    }
                    else if (t.length == 1) {
                        myDate = new Date(d[0], --d[1], d[2], "00", "00", "00");
                    }
                }
                else {
                    var arys = DateStr.split('-');
                    switch (arys.length) {
                        case 1:
                            if (!IsEmpty(format)) {
                                var dn = new Date();
                                if (format == "yyyyMM" && arys[0].length == 6) {
                                    var temMonth = 0;
                                    if (arys[0].substring(4, 5) == "0") {
                                        temMonth = arys[0].substring(5, 6);
                                    }
                                    else {
                                        temMonth = arys[0].substring(4, 6);
                                    }
                                    if (temMonth > 0) {
                                        temMonth = parseInt(temMonth) - 1;
                                    }
                                    myDate = new Date(arys[0].substring(0, 4), temMonth, "01");
                                }
                                else if (format.indexOf("y") > -1) {
                                    myDate = new Date(arys[0], 0, "01");
                                } else if (format.indexOf("M") > -1) {
                                    myDate = new Date(dn.getYear(), --arys[0], "01");
                                } else if (format.toLowerCase().indexOf("h") > -1) {
                                    myDate = new Date(dn.getYear(), dn.getMonth(), dn.getDate(), arys[0], "00", "00");
                                } else if (format.indexOf("m") > -1) {
                                    myDate = new Date(dn.getYear(), dn.getMonth(), dn.getDate(), "00", arys[0], "00");
                                } else if (format.toLowerCase().indexOf("s") > -1) {
                                    myDate = new Date(dn.getYear(), dn.getMonth(), dn.getDate(), "00", "00", arys[0]);
                                }
                            }
                            break;
                        case 2:
                            if (CheckIsDate(DateStr + "-01")) {
                                myDate = new Date(arys[0], --arys[1], "01");
                            }
                            else {
                                return null;
                            }
                            break;
                        default:
                            if (CheckIsDate(DateStr)) {
                                myDate = new Date(arys[0], --arys[1], arys[2]);
                            }
                            else {
                                return null;
                            }
                            break;
                    }
                }
            }
            return myDate;
        },
```

### 获取日期的当月第一天
```javascript
getFirstMonthDay: function (date) {
            if (IsEmpty(date)) date = new Date();
            return new Date(date.getFullYear(), date.getMonth(), 1);
        }
```

### 获取日期的当月最后一天
```javascript
getLastMonthDay: function (date) {
            if (IsEmpty(date)) date = new Date();
            return new Date(date.getFullYear(), date.getMonth() + 1, 0);
        }
```

### 操作时间，加1天，1小时，1分钟
```javascript
addDay: function (date, num) {
            if (date == null) date = new Date();
            var newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
            newDate.setDate(newDate.getDate() + num);
            return newDate;
        },
        addHour: function (date, num) {
            if (date == null) date = new Date();
            var newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
            newDate.setHours(newDate.getHours() + num);
            return newDate;
        },
        addMinute: function (date, num) {
            if (date == null) date = new Date();
            var newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
            newDate.setMinutes(newDate.getMinutes() + num);
            return newDate;
        },
```

### js判断值是否为空
```js
/**
 * 判断值是否为空
 * @param {*} value               待判断的值
 * @param {Object} [opt]          可选配置
 * @param {boolean} [opt.trimNullish=true]  是否把 'null'/'NULL' 视为空
 * @param {boolean} [opt.trimBlank=false]   是否把纯空白字符串视为空
 * @returns {boolean}             为空返回 true，否则 false
 */
function isEmpty(value, opt = {}) {
  const { trimNullish = true, trimBlank = false } = opt;

  // 1. null / undefined
  if (value == null) return true;

  // 2. 字符串特殊处理
  if (typeof value === 'string') {
    // 2.1 空串
    if (value === '') return true;
    // 2.2 'null' 串
    if (trimNullish && value.toLowerCase() === 'null') return true;
    // 2.3 纯空白
    if (trimBlank && value.trim() === '') return true;
    // 其他字符串一律不为空
    return false;
  }

  // 3. 数组 / 类数组 / Map / Set
  if (Array.isArray(value) || value instanceof Map || value instanceof Set) {
    return value.length === 0 || value.size === 0;
  }

  // 4. 普通对象
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  // 5. 其余情况（数字、布尔、函数、Symbol...）统一视为非空
  return false;
}

/* ====== 测试用例 ====== */
console.log(isEmpty(null));               // true
console.log(isEmpty('null'));             // true
console.log(isEmpty('NULL'));             // true
console.log(isEmpty(''));                 // true
console.log(isEmpty('   '));              // false（默认）
console.log(isEmpty('   ', {trimBlank: true})); // true
console.log(isEmpty(0));                  // false
console.log(isEmpty(false));              // false
console.log(isEmpty(NaN));                // false
console.log(isEmpty([]));                 // true
console.log(isEmpty({}));                 // true
console.log(isEmpty(new Map()));          // true
console.log(isEmpty(new Set([1])));       // false

```