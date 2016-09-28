# 依赖注入

## angular控制器的注入

在angular中可以通过模块中的config函数来声明需要注入的依赖对象，而声明的方式就是通过调用provider服务；

但是，在angular内部，controller控制器并不是由provider服务来创建的，而是controllerProvider服务来创建的。因此，在创建一个控制器的时候，实际上是在config函数中调用controllerProvider服务的register方法，完成一个控制器的创建，当控制器创建完成后再调用injector注入器完成各个依赖对象的注入，这就是一个简单的控制器实现依赖注入的工作原理。

``` javascript
app.controller('mainCtrl', function ($scope) {
    ...
});

//在angular内部是这样实现的
app.config(function ($controllerProvider) {
    $controllerProvider.register('mainCtrl',function ($scope) {
        ...
    });
});

```

## $provider

通过服务创建一个自定义的依赖注入对象

``` javascript
var app = angular.module('app',[]);

//provider
app.config(function ($provider) {
    $provider.provider('show_1', function () {
        this.$get = function () {
            return {
                val: function (name) {
                    return name;
                }
            }
        }
    });
});

//factory
app.config(function ($provider) {
    $provider.factory('show_2', function () {
        return {
            val: function (name) {
                return name;
            }
        }
    });
});

//value
app.config(function ($provider) {
    $provider.value('show_3', function (name) {
        return name;
    });
});

//service
app.config(function ($provider) {
    $provider.service('show_4', function () {
        return {
            val: function (name) {
                return name;
            }
        }
    });
});

//注入,个人觉得这个写法不错
app.controller ('mainCtrl', function ($scope, show_1, show_2, show_3, show_4) {
    $scope.onclick = function (t) {
        switch (t) {
            case 1:
                $scope.text = show_1.val('早上好');
                break;
            case 2:
                $scope.text = show_2.val('中午好');
                break;
            case 3:
                $scope.text = show_3('下午好');
                break;
            case 4:
                $scope.text = show_4('晚上好');
                break;
            default:
                break;
        }
    }
});

```

## 依赖注入标记

快速定位到应用中需要注入的各种服务，在定位的过程中需要提供一些依赖的标记。

#### 推断式注入


#### 标记式注入


#### 行内式注入

# $injector 常用API

 ## has

 根据传入的名称，从注册的列表中查找相对应的服务，如果找到返回true，否则，返回false；

 injector.has(name)

 injector为获取的$injector对象，name为需要查找的服务名称；返回boolean值

 ## get

 将返回指定名称的服务实例，获取到服务的实例对象后，就可以直接调用服务中的属性和方法。

 injector.get(name)

  injector为获取的$injector对象，name为需要查找的服务名称；返回实例对象

## invoke调用

> invoke常用的场景就是执行一个自定义的函数，在执行函数的时候还可以传递变量给函数自身

``` javascript
    injector.invoke(fn,[self],[locals])
```
上述代码中，injector为获取的$injector对象，参数fn为需要执行的函数名称，可选项参数self是一个对象，表示用于函数的this变量，
可选参数locals也是一个对象，它能为函数中变量名的传递提供方法支持

>实例invoke.html分析：

> 使用factory方法定义一个名为'$custom'的服务，自定义了一个函数名为fun的函数，
并在函数中注入"$custom"服务，在调用服务中的print方法，在控制台中输出结果
为了能执行这个函数，调用$injector的invoke方法，该方法的功能不仅执行名称对应的函数代码，
而且还能返回被执行函数的返回值，示例中仅是执行fun函数，将设置的内容显示在浏览器控制台中.

### 依赖注入的应用场景

1. 构建控制器

app.controller('ctrl',function($scope, $state, $custom, $cookies){
    //控制器代码
})

2. 调用工厂方法

``` javascript
//配置
    app.config(['dep1', 'dep2',function(dep1, dep2) {
        //函数体
    }])
//服务
    .factory('serviceName',['dep1', 'dep2',function(dep1, dep2) {
        //函数体
    }])
//指令
    .directive('directName',['dep1', 'dep2',function(dep1, dep2) {
        //函数体
    }])
//过滤器
    .filter('filterName',['dep1', 'dep2',function(dep1, dep2) {
        //函数体
    }]);
```











