# directive指令

属性

restrict

replace

transclude

template

templateUrl

link:function(scope, iEle, iAttrs){}

如果指令属性没有scope这里的scope相当于父级作用域的scope

scope

compile(和link不共存)


### scope

包含两种类型，一种为boolean类型，一种为json对象

##### scope属性是boolean

scope属性自定义指令的时候，默认值就是布尔类型，初始值为false

如果为false，表示不创建新的作用域，指令中的作用域与指令所在的作用域相同

如果为true，则表示作用域是独立创建的，


## scope属性是对象

#### 如果是对象，作用域也是完全独立的，不存在任何关联

#### 当指令中的scope属性值为JSON对象时，如果子作用域需要添加属性，必须先添加到指令中的link函数，然后，通过函数中的scope对象进行添加

#### 如果在子作用域中，要绑定或调用父作用域中的属性和方法，则需要在scope属性对应的JSON对象中添加绑定策略

#### 在JSON对象中添加的有3中策略：@绑定、 =绑定、 &=绑定

## @绑定

功能与将scope属性置为true有许多功能相同的地方。表现为：![@绑定](https://github.com/Asunny-ren/AngularJS/blob/master/%E6%8C%87%E4%BB%A4/0FE3F426DF113173F4388AE3F66E110F.png)

![=绑定](https://github.com/Asunny-ren/AngularJS/blob/master/%E6%8C%87%E4%BB%A4/597BB3CC3D8BC22614336105A79EBAAA.png)

![实例]()


