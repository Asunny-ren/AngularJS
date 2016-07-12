# AngularJs学习笔记

## AngularJs Select(选择框)
``` javascript
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script src="http://apps.bdimg.com/libs/angular.js/1.4.6/angular.min.js"></script>
</head>
<body>
<div ng-app="myApp" ng-controller="myCtrl">
<select ng-model="selectedName" ng-options="x for x in names">
</select>
// ng-model必须添加，就是从names中选择的元素
</div>
<script>
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.names = ["Google", "Runoob", "Taobao"];
});
</script>
<p>该实例演示了 ng-options 指令的使用。</p>
</body>
</html>
```
