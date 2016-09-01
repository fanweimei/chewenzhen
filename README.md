车问诊项目小结

原型链地址：https://modao.cc/app/WFT4yEmcZDRsFhvCpbBBrYpFxs6loC4

简介：车问诊是一个为广大汽车用户提供针对汽车故障问诊和维修报价的在线答疑和专家咨询的交流平台。 主要包括故障问诊、商家发现、维修比价三大模块;主要适用于微信场景。
使用的库文件：light7.js和jquery.js库文件
语言：html+css+js
使用light7的原因：
（1）提供了很多功能强大的组件，常用的组件有20多个
（2）体积小，只有82k js和117k css大小的两个文件
（3）学习成本小，使用简单，很多时候只需要把html代码复制到自己的文件中即可。
（4）库文件已经实现了适配，不用自己考虑在不同手机尺寸下的适配问题。
（5）自身实现了js模板引擎的功能，不需要再引入template7.js模板引擎
原型链地址：https://modao.cc/app/WFT4yEmcZDRsFhvCpbBBrYpFxs6loC4
项目中用light7js中的功能有：
1.路由
实现的功能：从一个页面跳转到另一个页面，这里的页面可以是普通页面、也可以内联页面、还可以是ajax加载的新页面（内联页面：物理上来说是一个页面，对应了多个div模块，每个模块代表了一个虚拟的页面），每个页面对应一个.page容器。这样做的一个好处是如果a和b页面都可以通过链接点击到c页面，c页面有个返回按钮，不需要添加链接href地址，就可以返回到源页面（也可以添加链接url）。实现原理是Router（路由）中有个属性stack中保存了back（返回栈）关键词，每次页面跳转都记录页面的pageId，返回时，根据返回栈上一个pageId返回。Router类stack中保存了两个关键栈back和forward。当点击一个有back类的按钮时，保存当前页面的对象（包括路径，pageId，动画效果）并入栈至forward，判断back类对应的元素中是否有href属性，有则按照href地址返回，没有则弹出back栈的最后一个元素；当点击一个普通链接时，保存当前页面对象（包括路径，pageId，动画效果）并入栈至back栈中，并将链接对应的页面添加到body中，第一个page容器前（实现缓存，避免重用ajax请求上次请求过的页面），所以这里也要取出forward栈中的元素，如果存在，直接添加page-current类就可以了，不必再次使用ajax加载。（也是先取出forward栈，如果栈中有元素就调用history.forward，如果没有数据，就改变location.href的值）。如果是重载页面或者内联页面就使用replaceState方法，而不是pushState。
大概流程是：从a页面点击到b页面，此时，back栈中保存了a页面的信息；再从b页面点击到c页面，此时，back栈中保存了b页面和a页面的信息。再返回到a页面，点击两次返回按钮，第一次先回到b页面，此时forward栈中保存了c页面的信息，back栈中弹出b页面；再点击一次，返回到a页面，此时 forward栈中保存了b页面和c页面，back栈中弹出a页面，back栈此时为空。如果这时再点击跳到b页面，则forward栈弹出b页面，利用history.forward修改url地址栏，并给b页面添加page-current，显示出b模块。
有一种情况是，如果直接点击导航栏的链接，如果点击了5个tab栏按钮，因为没有返回按钮，所以此时页面实际上存在5个page容器（对应5个div模块）。
还有种情况是，从a页面点击链接跳到b页面，再刷新，再点击返回，是没法回到a页面，每次点击a链接，会把forward栈中对应的页面移除，而刷新之后back栈和forward栈都为空了，所以如果确定只有一个返回源，最好给返回按钮添加一个href地址。
Router类中有个animatePage方法用于实现页面跳转的动画效果，默认是从右向左滑动，使用了translate3d和transition实现动画效果。
$.init方法中如果page容器中不存在page-inited类，则给容器添加这个类，并且触发pageInit方法，所以在自己写的js文件中，每个page容器的事件，都写在document的pageInit事件里。
因为每次跳转页面，在animatePage方法里都会触发"pageInitInternal"事件，只要触发了这个事件，就会执行$.init方法，在这个方法中会先判断当前page容器是否还有page-init，没有则触发pageInit事件。这样就可以保证每个page页面的事件处理函数都仅且注册一次。
（小技巧：随机生成唯一的id号，使用new Date()方法）
2.适配
light7.css本身就实现了适配，所以项目中不需要考虑适配的问题，所有度量单位都使用rem
它实现的原理是：
@media only screen and (min-width:400px){html{font-size:21.33px!important}
}
@media only screen and (min-width:414px){html{font-size:22.08px!important}
}
@media only screen and (min-width:480px){html{font-size:25.6px!important}
}
light7是只适用于移动端的库文件，light7.css基本都是使用了less和sass语言，以后项目中可以考虑使用less和sass
3.modal
包括指示器、toast、pop弹出框、Picker、日历
modal主要有三个方法
(1)$.modal()初始化方法，形成弹出框内容，并给各按钮添加注册事件，其中调用了$.openModal()和$.closeModal()这两个方法
(2)$.openModal()方法：当形参弹出框，并插入到body下，就调用这个方法，完成弹出框内容的显示，并在其底层插入背景阴影（也是插在body下）
(3)$.closeModal()方法：在弹出的关闭按钮上注册了一个点击事件，点击时，调用$.closeModal()方法关闭弹出框。
以toast为例，toast主要用来提示，比如操作成功提示、操作失败提示，在调用$.openModal方法只会，显示提示内容后的30s（定时器），调用$.closeModal关闭提示框。
4.列表
（1）模块引擎：在light7.js文件中包含了template7.js的内，有个Template7的类用于解析模板，形成列表。
实现原理是：获取模板内容context，通过ajax请求获取数据data，通过正则表达式，将data每项的值替换模板中对应的占位符。
（2）滚动加载数据
初始化数据，当页面滚动时，加载下一页的数据，直到页数达到最大值。
实现方法：给列表的父级添加"infinite-scroll"类，并给该类的元素注册一个infinite事件
实现的原理：在light7.js中一个$.initInfiniteScroll()组件，第一次加载一个新页面时，都会执行这个方法，并往该方法中传入.content类的容器元素。
$.initInfiniteScroll()方法内部会先判断该元素或子元素是否有"infinite-scroll"类，只有添加了该类的元素才具有滚动加载的效果，找到该类对应的元素，
给元素添加"scroll"滚动事件，事件处理函数是handleInfiniteScroll，函数体中设置了一个distance的变量，可以通过自定义属性data-distance设置值得大小，如果没设置，就使用默认值（滚动元素的高度/10)。
只有当鼠标滚动的距离大于distance这个值，才触发infinite事件，infinite事件对应的事件处理函数是自己定义，在本项目中，每次出发这个函数，就让page+1,ajax重新加载请求数据。如果page达到了最大值或ajax请求数据时发生了错，就调用$.detachInfiniteScroll方法注销"scroll"事件。
（3）无限滚动列表在项目中我单独封装成了Infscroll类，当页面中有滚动列表时，就新建一个对应的类，该类具有是三个方：
init方法（初始化各变量值）
addItem方法（实现ajax加载数据，并使用模板引擎编译、解析字符串，得到列表内容，插入页面中）
bind方法（给"infinite-scroll"类元素注册"infinite"事件，滚动时，从新加载数据）,bind方法不是原型链上的方法，所以每次新建一个Infscroll实例，都new一个bind方法，这样做的目的是如果一个页面对应有两个以上的滚动列表，就不会导致滚动列表1，列表2也加载数据。
（注意：初始化数据后，如果列表的内容高度小于父级""infinite-scroll"的高度，不满足((scrollTop + height + distance) >= scrollHeight)就不会有滚动效果。
5.图片浏览（点击小图片，会弹出大图片列表）
用法：给图片列表的父级添加"pb-standalone"类
在js文件中传入大图片的url,如下：
var myPhotoBrowserStandalone = $.photoBrowser({
      photos : [
          '//img.alicdn.com/tps/i3/TB1kt4wHVXXXXb_XVXX0HY8HXXX-1024-1024.jpeg',
          '//img.alicdn.com/tps/i1/TB1SKhUHVXXXXb7XXXX0HY8HXXX-1024-1024.jpeg',
          '//img.alicdn.com/tps/i4/TB1AdxNHVXXXXasXpXX0HY8HXXX-1024-1024.jpeg',
      ]
  });
  
  $(document).on('click','.pb-standalone',function () {
	myPhotoBrowserStandalone.open();
  });
以上代码首先是调用$.photoBrowser()方法，并传入传入参数photos(要浏览的图片列表)，返回PhotoBrowser类的实例，在调用open()方法。
新建PhotoBrowser类，构造函数完成的任务有：首先是新建弹出框模板，然后通过正则，将参数params.photos(PhotoBrowser类中有个默认参数列表defaults,将defaults和传入参数合并，得到params)填充到模板上。最后得到图片浏览的弹出框。
调用open方法，完成的任务：先将弹出框插入container容器下（默认是在body下）。此时就可以看到大图片的弹出框了，具有功能是：可以滑动显示下一张或上一张图片，也可以通过下变的bar-tab中的前一个和后一个按钮来切换图片；单击的时候可以切换背景主题；双击可以放大当前图片，并且移动鼠标，可以显示图片的不同部位点击非图片去可以返回。
所以需要一个变量来判断图片是否被放大了，如果未放大，滑动屏幕，是实现图片列别切换的功能；如果放大了，是实现移动当前图片。它们再touchStart和touchMove阶段实现的原理是相似，只是在touchEnd事件下区别比较不一样。
都是在open方法中注册了这些事件。
6.图片上传，
引入了外部文件lrz.all.bundle.js，实现方法：
（1）给所有的需要上传文件的那个按钮元素添加'.upload-image'类，给该按钮注册一个点击事件$(document).on('click', '.upload-image', uploadImg);
（2）在uploadImg函数中，先找到图片列表的父级容器，判断容器中的图片数目是否超过了最大值，未则创建一个type为file的input元素，给input元素注册一个change事件，事件处理函数为uploadImgChange（参数是选中的图片集和父级容器），触发input的点击事件，当选中图片确定后，就会进入到uploadImgChange函数中；
（3）uploadImgChange函数里，获取第一个选中的图片，设置压缩比quality，调用lrz方法得到压缩后的图片。判断压缩后的图片大小，如果仍然大于2M,则返回，否则将图片的地址src以及base64数据以及key值（通过new Date()生成,保证唯一性）保存到数据库中；
（4）成功保存后，新建一个li元素，将图片插入li元素下，并将li元素插入到父级容器中。
7.聊天界面
有点复杂，待续

