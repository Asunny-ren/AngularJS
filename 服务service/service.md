# 服务service

> angular中的服务是一种单例对象,所谓单例，指的是服务在每一个应用中只会被实例化一次，
并且是在需要时异步进行加载。服务的主要功能是为实现应用的功能提供数据和对象，
按照功能的不同分为内置和自定义服务

## 内置服务

#### $location

``` javascript
var app = angular.module('app',[]);
app.controller('ctrl',function ($scope, $location) {
    $scope.url = $location.absUrl();
})
```

## 自定义服务

方式：

1. 使用内置的$provider服务

2. 调用模板(module)中的服务注册方法，如factory,service,constant,value.

# 创建angular服务

1. 使用factory方法自定义服务

   app.factory(name,fn);

   app为构建的模块变量，参数name表示创建服务的名称，fn表示服务实现的功能函数、
   可以返回一个能被注入对象的数组或函数，该函数在实例的时候被调用

2. 使用service方法自定义服务

   与factory不同的是可以接受一个构造函数

   app.service(name, fn);

   app为已构建的模块变量参数name表示创建服务的名称，fn表示构造函数
   当注入该服务时，通过该函数并使用new关键字来实例化服务对象

3. 使用constant和value方法自定义服务

   常用来返回一个常量

   app.constant(name, value);

   app为已构建的模块变量，参数name表示创建服务的名称，value是一个常量
   表示与服务名对应的常量值或对象，
   当注入该服务后，可以直接调用服务名对应的常量

   app.value(name,value);

#### constant和value的区别

使用constant方法创建服务返回的常量可以注入配置函数(config)中
而使用value方法创建的服务返回的值不能被注入。

根据这一现象，constant方法常用于创建配置数据，而value方法则常用于创建对象和函数

## 服务的装饰器

$provider.decorator('serviceName',fn);

* $provider表示注入后的创建服务对象
* serviceName表示将要拦截的服务名称
* fn表示服务在实例化的时候调用的函数，
  在执行该函数的时候，需要添加一个名为"$delegate"的参数，
  该参数代表服务实例化后的对象，
  服务的新功能就是通过这个对象进行扩展和优化的

  
































