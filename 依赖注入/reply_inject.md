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
