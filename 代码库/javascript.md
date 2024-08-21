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