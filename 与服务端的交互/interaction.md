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

## $resource服务

核心价值在于能为支持RESTful的服务器进行无缝隙的数据交互

### $resource服务的使用和对象中的方法

> $resource服务本身是一个可选性的模块，没有包含在angular中，如果需要使用该模块，需要在页面中通过script标签进行文件的导入

然后可以注入到应用模型中

angular.module('app',['ngResource']);

注入之后就可以在控制器或者其他服务中直接调用$resource服务

``` javascript
    var obj = $resource(url[,paramDefaults][,actions])
```
在上述代码中，obj表示请求服务器指定url地址后的$resource对象，该对象中包含的与服务器端进行数据交互的全部API

参数url表示请求服务器的地址，允许使用占位符变量，但该变量必须以":"为前缀
``` javascript
var obj = $resource('url?action=:act');
obj.$save{ act: 'save' }
//在执行save动作时，向服务器端发送的实际地址就为"url?action=save"
```
可选项参数paramsDefaults是一个对象，用于设置请求时的默认参数值，

在发送请求时，该对象中的全部值将自动序列化，如遇占位符变量自动替换，

并将结果添加到url请求之后

``` javascript
var obj = $resource('url?action=:act',{
    act: 'save',
    a: '1',
    b: '2'
})
//在执行代码后向服务器端发送的实际地址为"url?action=save&a=1&b=2"
```
可选项参数actions也是一个对象，但它的功能是扩展默认资源动作
``` javascript
var obj = $resource('url?action=:act'{
    //定义请求默认值
},{
    a:{
        method: 'get'
    }
});
//执行代码后，就可以在$resource对象中直接调用可选项参数actions中自定义的方法a，
//即obj.$a(),
```
### $resource对象中的GET类型请求

有2个，分别为get和query

``` javascript
var obj = $reource('url');
//get()方法，返回值可以是单个资源
obj.get(params,successFn,errorFn);
//query()方法，返回一个数组或集合类的资源
obj.query(params,successFn,errorFn);

```

### $resource对象中的非GET类型请求

有3个，分别为save,delete,remove

``` javascript
var obj = $resource('url');
//save()
obj.save(params,postData,successFn,errorFn);
//delete()
obj.delete(params,postData,successFn,errorFn);
//remove()
obj.remove(params,posrData,successFn,errorFn);
```
与get相比，增加了一个postData参数

该参数是一个对象，它的功能是添加以非GET方式向服务端发送的数据体

> save方法在服务端保存数据时使用，执行时，将以POST方式向服务端发送一个请求，
postData参数中添加的数据体也将一起被发送

> delete和remove方法都是在删除服务端数据时使用
执行时，将携带postData参数中添加的数据体，以delete方式向服务端发送一个请求
两者之间的区别在于，remove方法可以解决IE浏览器中delete是javascript保留字而导致的错误

===============================================
## promise对象

#### 基本概念和使用方法

想要在angular中创建一个promise对象，必须在模板中先注入$q服务，并先调用defer方法创建一个延期对象

``` javascript
angular.module('app',[]);
    .controller('ctrl',function($scope, $q) {
        var defer = $q.defer();
    })
```
> defer是一个延期对象，包括3个方法，为notify，resolve，reject和一个属性promise
在这3个方法中都可以同过value参数进行传值，
当调用延期对象的"promise"的属性时，就创建了一个promise对象

创建了promise对象之后就可以通过调用then方法来执行延期对象不同操作后的回调函数，then方法中包含与操作相对应的3个回调函数

promise.then(successCallback,errorCallback,notifyCallback)

> successCallback表示执行resolve方法时的回调函数

> errorCallback表示执行reject方法时的回调函数

> notifyCallback表示执行notify方法时的回调函数

  函数中的参数值可以在执行的时候进行传递，返回对象支持链式写法




