# Ajax



## 验证用户名是否注册，提交text，返回text

```Java
//接收客户端表单提交的数据
        String ajaxAccount = request.getParameter("ajaxAccount"); // 获取ajax传递的data
        if (ajaxAccount != null) {
            try {
                Student student = service.selectOne(ajaxAccount);
                if (student == null) {
                    response.getWriter().println("恭喜，该用户名可以注册!"); //返回字符串
                } else {
                    response.getWriter().println("用户名已被注册!");//返回字符串
                }
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
            return;
        }           
// 验证用户名是否注册
$.ajax({
                    type: 'post', //设置提交方式
                    data: {'ajaxAccount': $('#inputAccount').val()}, //设置提交的数据
                    dataType: 'text', //设置返回的数据类型
                    url: '/register', //设置提交的地址
                    success: function (data) { // 成功操作
                        $('#inputAccount').parent().parent().next().text(data);
                    },
                    error: function (res) { //失败操作
                        $('#inputAccount').parent().parent().next().text(res.responseText);
                    }
                });
```

## 不提交，返回json；需要序列化

```Java
@WebServlet(name = "ajaxSelect",urlPatterns = "/select")
public class ajaxSelect extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setCharacterEncoding("utf-8");
        response.setContentType("application/json;charset=UTF-8");

        StudentService service = new StudentServiceImpl();
        try {
            // 获取登录时的session，用户名
            String login = String.valueOf(request.getSession().getAttribute("login"));
            // 查询信息，返回对象
            Student student = service.selectOne(login);
            Gson gson = new Gson();
            // 对象序列化为json字符串
            String stuToJson = gson.toJson(student);
            System.out.println(stuToJson);
            // 响应给客户端
            response.getWriter().println(stuToJson);

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }
$.ajax({
            type: 'post',
            dataType: 'json',
            url: '/select',
            success: function (data) {
                $('#data').text(data.account);
            },
            error: function (resopnse) {
                document.write(resopnse.responseText);
            }
        });
```

## 提交json，返回json；需要序列化，反序列化

```Java
@WebServlet(name = "ajaxAdd", urlPatterns = "/ajaxAdd")
public class ajaxAdd extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");
        response.setContentType("application/json;charset=UTF-8");
        //获取json字符串
        String jsonData = request.getParameter("json");
        Gson gson = new Gson();
        // 反序列化为对象
        Student student = gson.fromJson(jsonData, Student.class);

        StudentService service = new StudentServiceImpl();
        try {
            Integer insertFlag = service.insertStudent(student);
            // 设置插入状态，拼接json字符串
            String resJson = "";
            if (insertFlag > 0) {
                resJson = "{\"status\":" + insertFlag + ",\"value\":\"添加成功!\"}";
            } else {
                resJson = "{\"status\":" + insertFlag + ",\"value\":\"添加失败!\"}";
            }
            // 响应给客户端
            response.getWriter().println(resJson);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
// 异步提交注册
        $('#ajaxSub').click(function () {
            if (flagAcc == false || flagPwd == false) {
                return false;
            }
            let inputAccount = $('#inputAccount').val();
            let inputPassword = $('#inputPassword').val();
            let sex = $('input[name="sex"]:checked').val();

            let educ = $('select[name="educ"]').val();
            let happy = $('input[name="happy"]:checked');

            let happys = "";
            $.each(happy, function (index, obj) {
                happys += $(obj).val();
                happys += ",";
            })
            happys = happys.substring(0, happys.lastIndexOf(","));
            let jsonData = "{'account':'" + inputAccount + "','pwd':'" + inputPassword + "','sex':'" + sex + "','educ':'" + educ + "','happy':'" + happys + "'}";
            $.ajax({
                type: 'post',
                data: {'json': jsonData},
                dataType: 'json',
                url: '/ajaxAdd',
                success: function (data) {
                    alert(data.value);
                    location = '/login.jsp';
                },
                error: function (res) {
                    document.write(res.responseText);
                }
            })
        });
```

- 展示数据

```Java
/*
查询所有用户
 */
@WebServlet(name = "ajaxSelectAll",urlPatterns = "/selectAll")
public class ajaxSelectAll extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");
        response.setContentType("application/json;charset=UTF-8");

        try {
            StudentService service = new StudentServiceImpl();
            List<Student> students = service.selectAll();
            Gson gson = new Gson();
            String strJson = gson.toJson(students);
            response.getWriter().println(strJson);

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
$.ajax({
            type: 'post',
            data: {},
            dataType: 'json',
            url: '/selectAll',
            success: function (dataStuList) {
                $('#ajaxTable tbody').empty();
                $.each(dataStuList, function (index, obj) {
                    let $tr = $('<tr></tr>');
                    $tr.append($('<td>' + obj.account + '</td>'));
                    $tr.append($('<td>' + obj.sex + '</td>'));
                    $tr.append($('<td>' + obj.educ + '</td>'));
                    $tr.append($('<td>' + obj.happy + '</td>'));
                    $tr.append($('<td><a href="javascript:;" name="del">删除</a></td>'));
                    $('#ajaxTable tbody').append($tr);
                });
                $("a[name='del']").on('click', function () {
                    if (!confirm('确定要删除吗？')) {
                        return false;
                    }
                    let delAcc = $(this).parent().parent().children().eq(0).text();
                    $.ajax({
                        type: 'post',
                        data: {'delAcc': delAcc},
                        dataType: 'json',
                        url: '/ajaxDel',
                        success: function (data) {
                            alert(data.value);
                        },
                        error: function (res) {
                            document.write(res.responseText);
                        }
                    });
                    $(this).parent().parent().remove();
                });
            },
            error: function (res) {
                $('#ajaxTable').after(res.responseText);
            }
        });
```

## ajax异步加载js失效问题

https://www.cnblogs.com/qlqwjy/p/7670472.html