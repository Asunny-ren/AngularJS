# angular与服务端交互

## 传统的ajax交互

``` javascript
    (function () {
        var xhr = null;
        //为了兼容ie6以下浏览器做判断
        if(window.ActiveXObject) {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }else if {
            xhr = new XMLHttpRequest();
        }
        xhr.onreadystatechange = function () {
            if(xhr.readyState == 4) {
                if(xhr.readyState == 200){
                    //数据操作
                }
            }
        }
        xhr.open('GET', 'data/stu.php',true);
        xhr.send();
    })();
```

## 使用$http快捷方法与服务端交互

> $http底层封装了javascript的XMLHttpRequest对象，
  并接收一个对象作为参数，用于收集生成的HTTP请求的配置内容
  返回一个promise对象，拥有success和error两个回调方法

``` javascript
    $http.请求类型(url,[data],[config])
        .success(data, status, headers, config){
            /*
            *data返回体
            *status请求后返回的状态值
            *headers请求后返回的头函数，用来显示返回请求的头部信息
            *config是一个对象，通过该对象可以获取发送HTTP请求时完整的配置信息
            */
            //成功后的操作
        }
        .error(data, status, headers, config){
            //失败后的操作
        }
```

请求类型包括：POST GET JSONP DELETE PUT HEAD

POST 和 PUT 类型的请求可以通过可选项参数data来发送数据，除了发送数据之外还可以通过可选项参数config来设置请求时传递的数据

**post请求参考图code.jpg和code1.jpg**

## 使用$http配置对象方式与服务端交互

``` javascript
    $http({
        method:'',
        url:'',
        data:
        params:
        transformRequest:
        transformResponse:
        cache:
        timeout:
    })
    //method：请求方式
    //url：地址，字符串
    //data：对象，作为消息体的一部分发送给服务端，常用与POST和PUT数据时使用
    //params：字符串或对象，如果是对象，将自动按json格式进行序列化，并追加到URL的后面，作为发送数据的一部分，传递给服务器
    //transformRequest：用于对请求体头信息和请求体进行序列化转换，并生成一个数组发送给服务端
    //transformResponse：用于对响应体头信息和响应体进行反序列化的转换，其实质就是解析服务器发送来的被序列化后的数据
    //cache：表示是否对HTTP请求返回的数据进行缓存
    //timeout：表示延迟发送HTTP请求的时间，单位为毫秒
```

## angular中的缓存

### $cacheFactory服务创建缓存对象

  $cacheFactory(key,[options]);

  key:缓存对象的名称
  options:对象，用于指定缓存的特征

  $cacheFactory.get(key);

1. info方法

var cache = $cacheFactory.get(key);

cache.info()

返回缓存对象的一些信息，包括大小，名称，代码

2. put方法

cache.put('a','hello');

可以向缓存对象中以key/value的形式添加缓存内容

3. get方法

cache.get('a');

可以获取键名对应的键值内容

4. remove方法

cache.remove('a');

可以移除指定键名的缓存

5. removeAll和destory方法

removeAll用于移除全部缓存内容，并重置缓存结构

destory则是从$cacheFactory缓存注册表中删除所有的缓存引用条目，并重置缓存对象

