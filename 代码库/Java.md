## Java

### 九九乘法表

```java
for (int i=1;i<=9;i++){
    for(int j=1;j<=i;j++){
        System.out.print(i+"*"+j+"="+i*j+" ");
    }
    System.out.println();
}
```

### 打印菱形

```java
public static void main(String[] args) {
    printRhombus(8);
}
/**
 * @description: TODO 打印菱形
 * @author: 涂鏊飞17683866724@163.com
 * @date: 2021/7/21 17:15 
 * @Param n: 
 * @return: void
 **/
public static void printRhombus(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i; j++) {
            System.out.print(" ");
        }
        for (int k = 0; k < 2 * i + 1; k++) {
            System.out.print("*");
        }
        System.out.println();
    }
    for(int i=n-1;i>0;i--){
        for(int j=0;j<=n-i;j++){
            System.out.print(" ");
        }
        for(int k=2*i-1;k>0;k--){
             System.out.print("*");
        }
        System.out.println();
    }
}
```

### 百马百担

```java
/**
  * @description: TODO 大马可以驼2石粮食，中马驼1石粮食，两头小马驼1石粮食，现在需要100匹马,驼100石粮食，怎么分配
  * @author: 涂鏊飞17683866724@163.com
  * @date: 2021/7/21 12:38
  * @param: * @Param n:
  * @return: * @return: void
 **/
public static void horse(int n) {
    //大马最多2×50=100
    for (int d = 0; d <= 50; d++) {
        //中马最多1×100=100
        for (int m = 0; m <= 100; m++) {
            //小马最多0.5×200=100
            for (int l = 0; l <= 200; l++) {
                //三头马加起来等于100 且 大马2石，中马1石，小马0.5石加起来=100
                if (d + m + l == 100 && d * 2 + m + l * 0.5 == 100) {
                    System.out.print("大马：" + d + ",");
                    System.out.print("中马：" + m + ",");
                    System.out.println("小马：" + l);
                }
            }
        }
    }
}
```

### 买鸡

```java
/**
  * @description: TODO 3文钱可以买1只公鸡，2文钱可以买一只母鸡，1文钱可以买3只小鸡。用100文  钱买100只鸡，那么各有公鸡、母鸡、小鸡多少只?
  * @author: 涂鏊飞17683866724@163.com
  * @date: 2021/7/21 18:02
  * @return: void
  **/
 public static void buyChicken() {
     for (int i = 0; i < 33; i++) {
         for (int j = 0; j < 50; j++) {
             for (int k = 0; k < 300; k++) {
                 if (i + j + k == 100 && i * 3 + j * 2 + k/3.0 == 100) {
                     System.out.print("公鸡：" + i + "，");
                     System.out.print("母鸡：" + j + "，");
                     System.out.println("小鸡：" + k );
                 }
             }
         }
       }
    }
```

### 数组倒序

![img](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/1627729372627-6884858a-ef17-44d2-b48a-4094f6fd9074.png)

### 选择排序

```java
public class SelectSort{
  public static void main(String[] args){
    int[] arr1={12,3,5,-23,45,4,565};
    selectSortAsc(arr1);
  }
  public static void selectSortAsc(int arr[]){
    int minindex;
    for(int i=0;i<arr.length-1;i++){
      minindex=i;
      for(int j=i+1;j<arr.length;j++){
        if(arr[minindex]>arr[j]){
          minindex=j;
        }
      }
      if(minindex!=i){
        int temp=arr[minindex];
        arr[minindex]=arr[i];
        arr[i]=temp;
      }
    }
    for(int k=0;k<arr.length;k++){
      System.out.println(arr[k]);
    }
  }
}
```

### 冒泡排序

```java
public class BubbingSort{
  public static void main(String[] args){
    int[] arr1={23,34,2,46,-6,45};
    BubbSortAsc(arr1);
  }
  public static void BubbSortAsc(int[] arr){
    for(int i=0;i<arr.length-1;i++){
      for(int j=0;j<arr.length-i-1;j++){
        if(arr[j]>arr[j+1]){
          int temp=arr[j+1];
          arr[j+1]=arr[j];
          arr[j]=temp;
        }
      }
    }
    for(int k=0;k<arr.length;k++){
      System.out.println(arr[k]);
    }
  }
}
```

### 插入排序

```java
public class InsertSort{
  public static void main(String[] args){
    int[] arr1={123,34,1,-23,-454,3444};
    InsertSortAsc(arr1);
  }
  //插入排序
  public static void InsertSortAsc(int[] arr){
    int current;
    for(int i=1;i<arr.length;i++){
      current=arr[i];
      for(int j=i-1;j>=0;j--){
        if(current<arr[j]){
          arr[j+1]=arr[j];
        }else{
          arr[j+1]=current;
          break;
        }
        if(j==0){
          arr[j]=current;
        }
      }
    }
    for(int k=0;k<arr.length;k++){
      System.out.println(arr[k]);
    }
  }
}
```