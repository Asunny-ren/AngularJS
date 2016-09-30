# angular�����˽���

## ��ͳ��ajax����

``` javascript
    (function () {
        var xhr = null;
        //Ϊ�˼���ie6������������ж�
        if(window.ActiveXObject) {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }else if {
            xhr = new XMLHttpRequest();
        }
        xhr.onreadystatechange = function () {
            if(xhr.readyState == 4) {
                if(xhr.readyState == 200){
                    //���ݲ���
                }
            }
        }
        xhr.open('GET', 'data/stu.php',true);
        xhr.send();
    })();
```

## ʹ��$http��ݷ��������˽���

> $http�ײ��װ��javascript��XMLHttpRequest����
  ������һ��������Ϊ�����������ռ����ɵ�HTTP�������������
  ����һ��promise����ӵ��success��error�����ص�����

``` javascript
    $http.��������(url,[data],[config])
        .success(data, status, headers, config){
            /*
            *data������
            *status����󷵻ص�״ֵ̬
            *headers����󷵻ص�ͷ������������ʾ���������ͷ����Ϣ
            *config��һ������ͨ���ö�����Ի�ȡ����HTTP����ʱ������������Ϣ
            */
            //�ɹ���Ĳ���
        }
        .error(data, status, headers, config){
            //ʧ�ܺ�Ĳ���
        }
```

�������Ͱ�����POST GET JSONP DELETE PUT HEAD

POST �� PUT ���͵��������ͨ����ѡ�����data���������ݣ����˷�������֮�⻹����ͨ����ѡ�����config����������ʱ���ݵ�����

**post����ο�ͼcode.jpg��code1.jpg**

## ʹ��$http���ö���ʽ�����˽���

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
    //method������ʽ
    //url����ַ���ַ���
    //data��������Ϊ��Ϣ���һ���ַ��͸�����ˣ�������POST��PUT����ʱʹ��
    //params���ַ������������Ƕ��󣬽��Զ���json��ʽ�������л�����׷�ӵ�URL�ĺ��棬��Ϊ�������ݵ�һ���֣����ݸ�������
    //transformRequest�����ڶ�������ͷ��Ϣ��������������л�ת����������һ�����鷢�͸������
    //transformResponse�����ڶ���Ӧ��ͷ��Ϣ����Ӧ����з����л���ת������ʵ�ʾ��ǽ����������������ı����л��������
    //cache����ʾ�Ƿ��HTTP���󷵻ص����ݽ��л���
    //timeout����ʾ�ӳٷ���HTTP�����ʱ�䣬��λΪ����
```

## angular�еĻ���

### $cacheFactory���񴴽��������

  $cacheFactory(key,[options]);

  key:������������
  options:��������ָ�����������

  $cacheFactory.get(key);

1. info����

var cache = $cacheFactory.get(key);

cache.info()

���ػ�������һЩ��Ϣ��������С�����ƣ�����

2. put����

cache.put('a','hello');

�����򻺴��������key/value����ʽ��ӻ�������

3. get����

cache.get('a');

���Ի�ȡ������Ӧ�ļ�ֵ����

4. remove����

cache.remove('a');

�����Ƴ�ָ�������Ļ���

5. removeAll��destory����

removeAll�����Ƴ�ȫ���������ݣ������û���ṹ

destory���Ǵ�$cacheFactory����ע�����ɾ�����еĻ���������Ŀ�������û������

## $resource����

���ļ�ֵ������Ϊ֧��RESTful�ķ����������޷�϶�����ݽ���

### $resource�����ʹ�úͶ����еķ���

> $resource��������һ����ѡ�Ե�ģ�飬û�а�����angular�У������Ҫʹ�ø�ģ�飬��Ҫ��ҳ����ͨ��script��ǩ�����ļ��ĵ���

Ȼ�����ע�뵽Ӧ��ģ����

angular.module('app',['ngResource']);

ע��֮��Ϳ����ڿ�������������������ֱ�ӵ���$resource����

``` javascript
    var obj = $resource(url[,paramDefaults][,actions])
```
�����������У�obj��ʾ���������ָ��url��ַ���$resource���󣬸ö����а�������������˽������ݽ�����ȫ��API

����url��ʾ����������ĵ�ַ������ʹ��ռλ�����������ñ���������":"Ϊǰ׺
``` javascript
var obj = $resource('url?action=:act');
obj.$save{ act: 'save' }
//��ִ��save����ʱ����������˷��͵�ʵ�ʵ�ַ��Ϊ"url?action=save"
```
��ѡ�����paramsDefaults��һ������������������ʱ��Ĭ�ϲ���ֵ��

�ڷ�������ʱ���ö����е�ȫ��ֵ���Զ����л�������ռλ�������Զ��滻��

���������ӵ�url����֮��

``` javascript
var obj = $resource('url?action=:act',{
    act: 'save',
    a: '1',
    b: '2'
})
//��ִ�д������������˷��͵�ʵ�ʵ�ַΪ"url?action=save&a=1&b=2"
```
��ѡ�����actionsҲ��һ�����󣬵����Ĺ�������չĬ����Դ����
``` javascript
var obj = $resource('url?action=:act'{
    //��������Ĭ��ֵ
},{
    a:{
        method: 'get'
    }
});
//ִ�д���󣬾Ϳ�����$resource������ֱ�ӵ��ÿ�ѡ�����actions���Զ���ķ���a��
//��obj.$a(),
```
### $resource�����е�GET��������

��2�����ֱ�Ϊget��query

``` javascript
var obj = $reource('url');
//get()����������ֵ�����ǵ�����Դ
obj.get(params,successFn,errorFn);
//query()����������һ������򼯺������Դ
obj.query(params,successFn,errorFn);

```

### $resource�����еķ�GET��������

��3�����ֱ�Ϊsave,delete,remove

``` javascript
var obj = $resource('url');
//save()
obj.save(params,postData,successFn,errorFn);
//delete()
obj.delete(params,postData,successFn,errorFn);
//remove()
obj.remove(params,posrData,successFn,errorFn);
```
��get��ȣ�������һ��postData����

�ò�����һ���������Ĺ���������Է�GET��ʽ�����˷��͵�������

> save�����ڷ���˱�������ʱʹ�ã�ִ��ʱ������POST��ʽ�����˷���һ������
postData��������ӵ�������Ҳ��һ�𱻷���

> delete��remove����������ɾ�����������ʱʹ��
ִ��ʱ����Я��postData��������ӵ������壬��delete��ʽ�����˷���һ������
����֮����������ڣ�remove�������Խ��IE�������delete��javascript�����ֶ����µĴ���

===============================================
## promise����

#### ���������ʹ�÷���

��Ҫ��angular�д���һ��promise���󣬱�����ģ������ע��$q���񣬲��ȵ���defer��������һ�����ڶ���

``` javascript
angular.module('app',[]);
    .controller('ctrl',function($scope, $q) {
        var defer = $q.defer();
    })
```
> defer��һ�����ڶ��󣬰���3��������Ϊnotify��resolve��reject��һ������promise
����3�������ж�����ͬ��value�������д�ֵ��
���������ڶ����"promise"������ʱ���ʹ�����һ��promise����

������promise����֮��Ϳ���ͨ������then������ִ�����ڶ���ͬ������Ļص�������then�����а�����������Ӧ��3���ص�����

promise.then(successCallback,errorCallback,notifyCallback)

> successCallback��ʾִ��resolve����ʱ�Ļص�����

> errorCallback��ʾִ��reject����ʱ�Ļص�����

> notifyCallback��ʾִ��notify����ʱ�Ļص�����

  �����еĲ���ֵ������ִ�е�ʱ����д��ݣ����ض���֧����ʽд��




