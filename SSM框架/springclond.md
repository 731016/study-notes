### controller

```java
@RestController
public class DemoController {
    @Resource
    private RestTemplate restTemplate;
    @RequestMapping("/qq")
    public List<Product> qq(){
        String url = "http://192.168.5.110:8777/product/restful";
        List<Product> products = restTemplate.getForObject(url, List.class);
        return products;
    }
}
```

### 启动类

```java
@SpringBootApplication
public class App {

    @Bean
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}
```

