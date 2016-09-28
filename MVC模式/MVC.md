# MVC模式

### model: 用于存储数据和应用逻辑处理

### view: 用于管理应用界面

### controller: 负责衔接model和view之间的交互

#### controller:

  实质是一个javascript函数

  以scope.$new的形式向控制器中添加模型属性，还可以直接添加方法

控制器中的属性和方法的继承：处在子节点的模板控制器可以继承父节点的模板控制器中的模型属性和方法，反之则不可以
(使用$emit+$on的方式需要我们将事件监听绑定在$rootScope上)


#### view:先经过浏览器加载并渲染之后，再根据视图模板和对应控制器修改后所包含的DOM元素

 通过ng-View指令加载和切换视图模板，并将视图组件通过ng-controller指令与控制器相绑定。

为了在视图模板中实现多个功能，需要在页面的局部进行刷新和切换
实现这一效果，需要在视图模板中借助ng-View指令，在控制器中引入$routeProvider服务

``` javascript
var app = angular.module('app',[]);
app.config(['$routeProvider',function($routeProvider) {
    $routeProvider
    .when('/',{
        controller:'ctrl1',
        template:'<h1>index</h1>'
    })
    .when('/book',{
        controller:'ctrl2',
        template:'<h1>book</h1>'
    })
    .when('/game/:id',{
        controller:'ctrl3',
        templateUrl:'game.html',
        publicAccess: true
    })
    .otherwise({
        redirectTo:'/'
    });
}])

```





