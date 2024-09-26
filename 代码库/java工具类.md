#### JSON格式处理

[Maven Repository: com.alibaba » fastjson (mvnrepository.com)](https://mvnrepository.com/artifact/com.alibaba/fastjson)

```Java
String jsonString = JSON.toJSONString(records);
List<CheckhouseRecord> checkhouseRecordList = (List<CheckhouseRecord>) JSON.parseObject(jsonString);
```

#### commons工具类

[Apache commons（Java常用工具包）简介 - 俄而123 - 博客园 (cnblogs.com)](https://www.cnblogs.com/eer123/p/9120120.html)

#### commons-lang3工具类

[Maven Repository: org.apache.commons » commons-lang3 (mvnrepository.com)](https://mvnrepository.com/artifact/org.apache.commons/commons-lang3)

[Overview (Apache Commons Lang 3.11 API)](http://commons.apache.org/proper/commons-lang/javaapi-release/index.html)

[commons常用工具包的使用&guava工具类使用 - QiaoZhi - 博客园 (cnblogs.com)](https://www.cnblogs.com/qlqwjy/p/9467178.html)

![image-20211124221558400](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124221558400.png)

```Java
// 判断是否包含 空格 ""(空字符串) null 不能判断"null"字符串
if (StringUtils.isBlank(acc) || "null".equals(acc)) {
    acc = null;
}

isBlank()  可以验证空格、null、""，如果是好几个空格也返回true
isEmpty验证不了空格，只有值为null和""返回true 
两者都验证不了"null"字符串，所以如果验证"null"还需要自己用equals进行验证。


isEmpty     ""(空字符串) null 不能判断"null"字符串
isNotEmpty  !isEmpty
isAnyEmpty  任何一个匹配，可判断对象
isNoneEmpty 都不匹配

isBlank 空格 ""(空字符串) null 不能判断"null"字符串
isNotBlank  !isBlank 
isAnyBlank  任何一个匹配，可判断对象
isNoneBlank 都不匹配
```

#### commons-Beanutils.ConvertUtils

[Maven Repository: commons-beanutils » commons-beanutils » 1.9.3 (mvnrepository.com)](https://mvnrepository.com/artifact/commons-beanutils/commons-beanutils/1.9.3)

```Java
String[] delChecks = request.getParameterValues("delCheck");
// 字符串数组转换为其他包装类数组
Integer[] delChecksInteger = (Integer[]) ConvertUtils.convert(delChecks, Integer.class);
```

#### 返回格式化的日期字符串
```java
yyyy-MM-dd HH:mm:ss

public static String dateToStr(Date date, String format)
    {
    	if (date == null) {
    		return null;
    	}
        DateFormat df = new SimpleDateFormat(format);
        return df.format(date);
    }
```

#### 将字符串转换为日期
```java
public static Date strToDate(String dateStr, String format)
    {
    	if (dateStr == null) {
    		return null;
    	}
        DateFormat df = new SimpleDateFormat(format);
        return df.parse(dateStr);
    }
```

#### 判断字符串是否为日期类型("yyyy-MM-dd")
```java
public static boolean isDate(String dateStr) {
        return dateStr.matches("^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)$");
    }
```

#### 判断字符串是否为日期带时间类型("yyyy-MM-dd HH:mm:ss")
```java
public static boolean isDateTime(String dateStr) {
        return dateStr.matches("^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)) (([01]{1}\\d{1}|2[0-3]{1}):[0-5]{1}\\d{1}:[0-5]{1}\\d{1})$");
    }
```

#### 判断字符串是否为时间类型("HH:mm:ss")
```java
public static boolean isTime(String dateStr) {
        return dateStr.matches("^([01]{1}\\d{1}|2[0-3]{1}):[0-5]{1}\\d{1}:[0-5]{1}\\d{1}$");
    }
```

#### 返回日期是星期几
```java
Calendar.SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY
public static int getDayOfWeek(Date dt){
		Calendar cal = Calendar.getInstance();
		cal.setTime(dt);
		return cal.get(Calendar.DAY_OF_WEEK);
	}
```

#### 获得当前日期的周一日期
```java
public static Date getCurrentMonday(Date dt) {  
        int mondayPlus = WsdDateUtils.getMondayPlus(dt);  
        GregorianCalendar currentDate = new GregorianCalendar();  
        currentDate.add(GregorianCalendar.DATE, mondayPlus); 
        return currentDate.getTime();  
    }
```

#### 获得当前日期的周日日期
```java
public static Date getPreviousSunday(Date dt) {  
        int mondayPlus = WsdDateUtils.getMondayPlus(dt);  
        GregorianCalendar currentDate = new GregorianCalendar();  
        currentDate.add(GregorianCalendar.DATE, mondayPlus +6); 
        return currentDate.getTime();  
    }  
```

#### 返回一个日期的月份
```java
public static int getDayOfMonth(Date dt){
		Calendar cal = Calendar.getInstance();
		cal.setTime(dt);
		return cal.get(Calendar.DAY_OF_MONTH);
	 }
```

#### 获取日期的年份
```java
public static int getYearOfDate(Date dt) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(dt);
		int yearInt = cal.get(Calendar.YEAR);
    	return yearInt;
    }
```


#### 判断两个日期区间是否有交集
```java
 /**
     * 判断两个日期区间是否有交集
     * 
     * @param a1 第一个日期区间的首日日期
     * @param a2 第一个日期区间的末日日期
     * @param b1 第二个日期区间的首日日期
     * @param b2 第二个日期区间的末日日期
     * 
     * @return  有交集返回true, 没交集返回false
     */
public static boolean hasIntersection(Date a1, Date a2, Date b1, Date b2) {
    	if ((a1.before(b1) && (a2.after(b1) || a2.equals(b1))) || 
    			((a1.after(b1) || a1.equals(b1))) && ((a1.before(b2)) || (a1.equals(b2)))) {
			return true;
		}
		return false;
    }
```

#### 返回月份所在季度
```java
/**
	 * 返回月份所在季度 
	 */
	public static String getQuarterByMonth(String mon) {
		int month = Integer.parseInt(mon);
		return String.valueOf((month-1) / 3 + 1); 
	}
```

#### 返回两个日期的分钟数差
```java
public static long getMinute(Date d1, Date d2) {
		if (d1 == null || d2 == null) {
			return 0;
		}
		long ms = getMilliSecond(d1, d2);
		return ms/1000/60;
	}
```

#### 返回两个日期小时差
```java
public static double getHour(Date d1, Date d2) {
		if (d1 == null || d2 == null) {
			return 0;
		}
		long ms = getMilliSecond(d1, d2);
		return ms/1000.00/60/60;
	}
```

#### 返回两个日期天数差
```java
public static long getDay(Date d1, Date d2){
		if (d1 == null || d2 == null) {
			return 0;
		}
		long ms = getMilliSecond(d1, d2);
		return ms/1000/60/60/24;
	}
```

#### 返回两个日期毫秒差
```java
public static long getMilliSecond(Date d1, Date d2) {
		long d1MS = d1.getTime();
		long d2MS = d2.getTime();
		return Math.abs(d1MS - d2MS);
	}
```

#### 获得递增数秒后的时间
```java
/**
	 * 获得递增数秒后的时间
	 * @param date
	 * @param amount 可以为任意整数
	 * @return
	 */
	public static Date addSeconds(Date date,int amount){
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.SECOND, amount);
		return cal.getTime();
	}
```

#### 获得递增数分钟后的时间
```java
/**
	 * 获得递增数分钟后的时间
	 * @param date
	 * @param amount 可以为任意整数
	 * @return
	 */
	public static Date addMinutes(Date date,int amount){
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.MINUTE, amount);
		return cal.getTime();
	}
```

#### 获得递增数小时后的时间
```java
/**
	 * 获得递增数小时后的时间
	 * @param date
	 * @param amount 可以为任意整数
	 * @return
	 */
	public static Date addHours(Date date,int amount){
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.HOUR, amount);
		return cal.getTime();
	}
```

#### 获得递增数天后的时间
```java
/**
	 * 获得递增数天后的时间
	 * @param date
	 * @param amount 可以为任意整数
	 * @return
	 */
	public static Date addDays(Date date,int amount){
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.DATE, amount);
		return cal.getTime();
	}
```

#### 获得递增数月后的时间
```java
/**
	 * 在日期上加月数
	 * @param sDate
	 * @param num
	 * @return
	 */
	public static Date addMonths(Date sDate,int num){
		Calendar cal = Calendar.getInstance();
		cal.setTime(sDate);
		cal.add(Calendar.MONTH, num);
		return cal.getTime();
	}
```

#### 获得递增数年后的时间
```java
/**
	 * 获得递增数年后的时间
	 * @param date
	 * @param amount 可以为任意整数
	 * @return
	 */
	public static Date addYears(Date date,int amount){
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.YEAR, amount);
		return cal.getTime();
	}
```

#### 获取某月的天数
```java
/**
	 * 获取某月的天数
	 * 
	 * @param year
	 *        年份
	 * @param month
	 *        月份
	 * @return 天数
	 */
	public static int getDaysByMonth(int year, int month) {
		Calendar c = Calendar.getInstance();
		c.set(year, month, 0);
		return c.getActualMaximum(Calendar.DAY_OF_MONTH);
	}
```

#### 获取本月第一天
```java
/**
	 * 获取本月第一天
	 *
	 * @param date
	 * @return
	 */
	public static Date firstOfMonth(Date date) {
		return firstOfMonth(date, 0);
	}
    /**
	 * 获取基于当前时间的月初
	 *
	 * @param date 当前时间
	 * @param i    1 下月 -1 上月
	 * @return
	 */
	public static Date firstOfMonth(Date date, int i) {
		if (i != 0) {
			date = addMonths(date, i);
		}
		return strToDate(dateToStr(date, "yyyy-MM") + "-01", "yyyy-MM-dd");
	}
```

#### 获取本月最后一天
```java
/**
	 * 获取本月最后一天
	 *
	 * @param date
	 * @return
	 */
	public static Date lastOfMonth(Date date) {
		return lastOfMonth(date, 0);
	}
/**
	 * 获取基于当前时间的月末
	 *
	 * @param date 当前时间
	 * @param i    1 下月 -1 上月
	 * @return
	 */
	public static Date lastOfMonth(Date date, int i) {
		if (i != 0) {
			date = addMonths(date, i);
		}
		date = date2SimpleDate(date);
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		int days = c.getActualMaximum(Calendar.DAY_OF_MONTH);
		return strToDate(dateToStr(date, "yyyy-MM") + "-" + days, "yyyy-MM-dd");
	}
```

#### 字符串转BigDecimal数值
```java
/**
	 * 字符串转数值
	 * @param val
	 * @return
	 */
	public static BigDecimal StrConvertDecimal(String val) {
		if(WsdStringUtils.isNotBlank(val)) {
			 val = val.replaceAll("\\,", "");
			 return new BigDecimal(val);
		}
		return null;
	}
```

#### object转数值型
```java
	/**
	 * 转数值型
	 * @param val
	 * @return
	 */
	public static BigDecimal convertDecimal(Object val) {
		if(val != null) {
			 return new BigDecimal(val.toString().replaceAll("\\,", ""));
		}
		return null;
	}
```


#### 集合增加
```java
public static void addAll(Collection collection, Iterator iterator) {
        while(iterator.hasNext()) {
            collection.add(iterator.next());
        }
    }
    public static void addAll(Collection collection, Enumeration enumeration) {
        while(enumeration.hasMoreElements()) {
            collection.add(enumeration.nextElement());
        }
    }
    public static void addAll(Collection collection, Object[] elements) {
        int i = 0;

        for(int size = elements.length; i < size; ++i) {
            collection.add(elements[i]);
        }
    }
```

#### 获取集合大小
```java
public static int size(Object object) {
        int total = 0;
        if (object instanceof Map) {
            total = ((Map)object).size();
        } else if (object instanceof Collection) {
            total = ((Collection)object).size();
        } else if (object instanceof Object[]) {
            total = ((Object[])((Object[])object)).length;
        } else if (object instanceof Iterator) {
            Iterator it = (Iterator)object;

            while(it.hasNext()) {
                ++total;
                it.next();
            }
        } else if (object instanceof Enumeration) {
            Enumeration it = (Enumeration)object;

            while(it.hasMoreElements()) {
                ++total;
                it.nextElement();
            }
        } else {
            if (object == null) {
                throw new IllegalArgumentException("Unsupported object type: null");
            }

            try {
                total = Array.getLength(object);
            } catch (IllegalArgumentException var3) {
                throw new IllegalArgumentException("Unsupported object type: " + object.getClass().getName());
            }
        }

        return total;
    }
```

#### 判断接环是否为空
```java
public static boolean isEmpty(Collection coll) {
        return coll == null || coll.isEmpty();
    }

    public static boolean isNotEmpty(Collection coll) {
        return !isEmpty(coll);
    }
```

#### 按指定长度分割数组
```java
/**
     * 按指定长度分割数组
     *
     * @param list
     * @param groupSize
     * @param <T>
     * @return
     */
    public static <T> List<List<T>> splitList(List<T> list, int groupSize) {
        int length = list.size();
        // 计算可以分成多少组
        int num = (length + groupSize - 1) / groupSize;
        List<List<T>> newList = new ArrayList<>(num);
        for (int i = 0; i < num; i++) {
            // 开始位置
            int fromIndex = i * groupSize;
            // 结束位置
            int toIndex = Math.min((i + 1) * groupSize, length);
            newList.add(list.subList(fromIndex, toIndex));
        }
        return newList;
    }
```

#### 判断字符串是否为空
```java
public static boolean isEmpty(String str) {
		return str == null || str.length() == 0;
	}

	public static boolean isNotEmpty(String str) {
		return !isEmpty(str);
	}

	public static boolean isBlank(String str) {
		int strLen;
		if (str != null && (strLen = str.length()) != 0) {
			for(int i = 0; i < strLen; ++i) {
				if (!Character.isWhitespace(str.charAt(i))) {
					return false;
				}
			}

			return true;
		} else {
			return true;
		}
	}
    public static boolean isNotBlank(String str) {
		return !isBlank(str);
	}
```

#### 字符串转集合，根据分割符
```java
public static List<String> strToList(String source, String split) {
		if (StringUtils.isNotEmpty(source)) {
			return arrToList(source.split(split));
		} else {
			return new ArrayList<String>();
		}
	}

	public static <T> List<T> arrToList(T[] source) {
		List<T> result;
		if (source != null) {
			result = new ArrayList<T>(source.length << 1);
			for (T t : source) {
				result.add(t);
			}
		} else {
			result = new ArrayList<T>();
		}
		return result;
	}
```

#### 集合转sql in语句
```java
/**
	 * 生成in语句
	 * @param coll 值列表
	 * @return 形如('a','b')或(1,2,3)的语句
	 */
	public static String getInString(Collection<?> coll) {
		if(null == coll || coll.size()==0){
			return "('-1')"; //避免语法错误
		}
		StringBuilder sb = new StringBuilder();
		sb.append("(");
		for(Object obj : coll) {
			if(obj == null) continue;
			
			sb.append(',');
			if (obj instanceof Date) {
				DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				sb.append("'").append(df.format((Date)obj)).append("'");
			} else if (obj instanceof String) {
				if (!((String) obj).startsWith("'")) {
					sb.append("'");
				}
				sb.append(obj);
				if (!((String) obj).endsWith("'")) {
					sb.append("'");
				}
			} else if (obj instanceof WsdBasicDto) {
				sb.append("'").append(((WsdBasicDto)obj).getId()).append("'");
			} else if (obj instanceof WsdEntity) {
				sb.append("'").append(((WsdEntity)obj).getId()).append("'");
			} else {
				sb.append(obj);
			}
		}
		sb.delete(1, 2);		//删除多加的","
		sb.append(")");
		String s = sb.toString();
		if ("()".equals(s)) {	// 避免语法错误
			s = "('-1')";
		}
		return s;
	}

    /**
	 * 生成in语句
	 * @param coll 值列表
	 * @param field 字段名
	 * @return 形如('a','b')或(1,2,3)的语句
	 */
	public static String getInString(Collection<?> coll,String field) {
		if(null == coll || coll.size()==0){
			return field + " in ('-1')"; //避免语法错误
		}
		StringBuilder sb = new StringBuilder();
		ArrayList<Object> list =new ArrayList<Object>(coll);
		for (int i = 0; i < list.size(); i++) {
			Object obj = list.get(i);
			String val = "";
			if(obj != null){
				if (obj instanceof Date) {
					DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					val += "'" + df.format((Date)obj) + "'";
				} else if (obj instanceof String) {
					if (!((String) obj).startsWith("'")) {
						val += "'";
					}
					val += obj.toString();
					if (!((String) obj).endsWith("'")) {
						val += "'";
					}
				} else if (obj instanceof WsdBasicDto) {
					val += "'" + ((WsdBasicDto)obj).getId() + "'";
				} else if (obj instanceof WsdEntity) {
					val += "'" + ((WsdEntity)obj).getId() + "'";
				} else {
					val += (String)obj;
				}
			}
			else{
				val = "'-1'";
			}
			if (i != 0 && (i % 500) == 0) {
				sb.append(") or "+ field +" in (" + val);
			} else {
				if(i == 0){
					sb.append("("+ field +" in(");
				}
				else{
					sb.append(",");
					if(sb.toString().lastIndexOf("(") != (sb.toString().length() - 1)){
						
					}
				}
				sb.append(val);
			}
		}
		sb.append("))");
		String s = sb.toString();
		if ("))".equals(s)) {	// 避免语法错误
			s = "('-1')"; 
		}
		return s;
	}
```

#### 生成分隔符拼接的字符串
```java
/**
	 * 生成分隔符拼接的字符串
	 * @param coll 对象列表
	 * @param propName 对象属性名称
	 * @param separator 分隔符
	 * @return 
	 */
	public static String getSeparatorString(Collection<?> coll, String propName, String separator) {
		StringBuilder sb = new StringBuilder();
		for(Object obj : coll){
			try {
				sb.append(separator).append(WsdBeanUtils.getProperty(obj, propName));
			} catch (Exception e) {
				WsdExceptionUtils.ignoreException(logger, e);
			}
		}
		sb.delete(0, separator.length());
		return sb.toString();
	}


    	/**
	 * 将字符数组拼接成由 separator 分隔开的字符串
	 * @author ChenWen 2010-12-09
	 */
	public static String joinToString(final String[] src, String separator){
		if(src == null) return "";
		if(separator == null) separator = ",";
		StringBuffer dest = new StringBuffer();
		for(String s : src) {
			dest.append(s).append(separator).append(" ");
		}
		dest.delete(dest.lastIndexOf(separator), dest.length());
		return dest.toString();
	}


	/**
	 * 将字符集拼接成由 separator 分隔开的字符串
	 * @author ChenWen 2010-12-09
	 */
	public static String joinToString(final Collection<String> src, String separator){
		if(WsdCollectionUtils.isEmpty(src)) return "";
		if(separator == null) separator = ",";
		StringBuffer dest = new StringBuffer();
		for(String s : src) {
			dest.append(s).append(separator).append("");
		}
		dest.delete(dest.lastIndexOf(separator), dest.length());
		return dest.toString();
	}
	
	/**
	 * 将键值对数组拼接成由 entrySeparator和kvSeparator 分隔开的字符串
	 * @author ChenWen 2010-12-29
	 */
	public static String joinToString(final Object[] keys, Object[] values, 
		String entrySeparator, String kvSeparator){
		if(WsdArrayUtils.isEmpty(keys)) return "";
		
		/* 如果值数组（values）为空，则新构造一个长度和键数组（keys）相等的数据 */
		if(WsdArrayUtils.isEmpty(values)) {
			values = new Object[keys.length];
//			Arrays.fill(values, null);
		
		/* 如果值数组（values）不为空，但长度小于键数组（keys），则新构造一个长度和键数组（keys）相等的数据，在保留原有值的基础上让其他元素为null */
		} else if(values.length < keys.length) {
			Object[] temp = new Object[keys.length];
			System.arraycopy(values, 0, temp, 0, values.length);
//			for(int i = values.length; i < temp.length; i ++) {
//				temp[i] = null;
//			}
			values = temp;
		}
		
		if(kvSeparator == null) kvSeparator = "=";
		if(entrySeparator == null) entrySeparator = ",";
		
		StringBuffer dest = new StringBuffer();
		dest.append(keys[0]).append(kvSeparator).append(values[0]);
		for(int i = 1; i < keys.length; i ++) {
			dest.append(entrySeparator).append(keys[i]).append(kvSeparator).append(values[i]);
		}
		return dest.toString();
	}
```

#### 判断两个字符串是否相等
```java
	/**
	 * 比较两个字符串的相等性。
	 * @return true:相等 , false:不等 .
	 * @author ChenWen 2010-12-21
	 */
	public static boolean equals(String str1, String str2) {
	     return equals(str1, str2, false, false);
	}
	/**
	 * 比较两个字符串的相等性。
	 * @param ignoreCase 是否忽略大小写
	 * @param trim 是否截取首尾的空白符
	 * @return true:相等 , false:不等 .
	 * @author ChenWen 2010-12-21
	 */
	public static boolean equals(String str1, String str2, boolean ignoreCase, boolean trim) {
		if(str1 == null && str2 == null) return true;
		if(str1 == null || str2 == null) return false;
		
		if(trim) {
			str1 = str1.trim();
			str2 = str2.trim();
		}
		
		if(ignoreCase) {
			return str1.equalsIgnoreCase(str2);
		}
		return str1.equals(str2);
	}
```