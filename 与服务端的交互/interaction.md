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

