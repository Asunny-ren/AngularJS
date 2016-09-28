# MVCģʽ

### model: ���ڴ洢���ݺ�Ӧ���߼�����

### view: ���ڹ���Ӧ�ý���

### controller: �����ν�model��view֮��Ľ���

#### controller:

  ʵ����һ��javascript����

  ��scope.$new����ʽ������������ģ�����ԣ�������ֱ����ӷ���

�������е����Ժͷ����ļ̳У������ӽڵ��ģ����������Լ̳и��ڵ��ģ��������е�ģ�����Ժͷ�������֮�򲻿���
(ʹ��$emit+$on�ķ�ʽ��Ҫ���ǽ��¼���������$rootScope��)


#### view:�Ⱦ�����������ز���Ⱦ֮���ٸ�����ͼģ��Ͷ�Ӧ�������޸ĺ���������DOMԪ��

 ͨ��ng-Viewָ����غ��л���ͼģ�壬������ͼ���ͨ��ng-controllerָ�����������󶨡�

Ϊ������ͼģ����ʵ�ֶ�����ܣ���Ҫ��ҳ��ľֲ�����ˢ�º��л�
ʵ����һЧ������Ҫ����ͼģ���н���ng-Viewָ��ڿ�����������$routeProvider����

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





