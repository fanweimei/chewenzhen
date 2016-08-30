/**
 * Created by xiaosong on 2015/12/11.
 */
// 操作cookie
// 获取cookie
function getCookie(c_name) {
	if (document.cookie.length > 0) {
		var c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			var c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) {
				c_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start, c_end))
		}
	}
	return false;
}

// 设置cookie
function setCookie(c_name, value, expiredays) {
	var exdate = new Date()
	exdate.setDate(exdate.getDate() + expiredays)
	document.cookie = c_name + "=" + escape(value) +
		((expiredays == null) ? "" : ";path=/;expires=" + exdate.toGMTString())
}

// 检查cookie
function checkCookie(c_name) {
	var c_name = getCookie(c_name)
	if (c_name != null && c_name != "") {
		return true;
	} else {
		return false;
	}
}
// 清除所有cookie
function clearCookie(c_name) {
	if (c_name && c_name != null && c_name != "") {
		//c_name不为空则只清除本cookie值
		eraseCookie(c_name);
	} else {
		//c_name为空则只清除所有cookie值
		deleteSpecificCookies();
	}
}

function deleteSpecificCookies() {
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++)
		eraseCookie(cookies[i].split("=")[0]);
}

function eraseCookie(name) {
	createCookie(name, "", -1);
}

function createCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	} else var expires = "";
	document.cookie = name + "=" + value + expires + "; path=/";
}

function clearListCookies() {
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++) {
		var spcook = cookies[i].split("=");
		deleteCookie(spcook[0]);
	}

	function deleteCookie(cookiename) {
		var d = new Date();
		d.setDate(d.getDate() - 1);
		var expires = ";expires=" + d;
		var name = cookiename;
		//alert(name);
		var value = "";
		document.cookie = name + "=" + value + expires + "; path=/acc/html";
	}
	window.location = ""; // TO REFRESH THE PAGE
}

//禁止鼠标右键
document.oncontextmenu = function() {
	return false;
};
// 手机
function isMobile(text) {
	return /^((17[0-9])|(14[0-9])|(13[0-9])|(15[^4,\D])|(18[0-9]))\d{8}$/.test(text);
}

// 邮箱
function isEmail(text) {
	return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(text);
}

// 日期
function isDate(text) {
	//if (!/^(\d{4})-(\d{2})-(\d{2})$/.test(text)) {
	//	return false;
	//}
	// try {
	// 	var date = new Date(text);
	// 	return true;
	// } catch (Exception e) {
	// 	return false;
	// }
	return (new Date(text).getDate() == text.substring(text.length - 2));
}

// 密码
function isPasswprd(text) {
	return /[a-zA-Z0-9]{6,16}/.test(text);
}

// 姓名
function isName(text) {
	return text.length > 1 && text.length < 5 && /[\u4e00-\u9fa5A-Za-z.]{2,10}$/.test(text);
}
//倒计时
function time(o) {
	clearTimeout(t)
	if (wait == 0) {
		o.innerHTML = "重新发送";
		$("#j-verify_bt").removeClass("no")
	} else {
		o.innerHTML = "" + wait + "s后重发";
		wait--;
		var t = setTimeout(function() {
			time(o)
		}, 1000);
	}
}

function prompt(text, $dom, unit) {
	$dom.on('click', function() {
		var $this = $(this);
		$.prompt(text,
			function(value) {
				value = parseInt(value) ? parseInt(value) : 0;
				$this.html(value + unit);
			});
	});
}

$(document).on('refresh', '.pull-to-refresh-content', function(e) {
	//console.log("下拉了")
	//下拉刷新 无此功能，， 禁用掉了
	$.pullToRefreshDone('.pull-to-refresh-content');
});
//列表加载	
//$tDom表示template7模板，$Dom表示ul容器，$sDom具有滚动事件的元素，url路径,页面只有一无限滚动时，可设置默认值
function Infscroll(url, $tDom, $cDom, append, totalPage) {
	//参数列表
	this.url = url; //url
	this.$tDom = $tDom ? $tDom : $("#t-scroll_list"); //模板id
	this.$cDom = $tDom ? $cDom : $("#j-scroll_list"); // 内容容器id
	this.append = append ? append : false; //是否追加元素，下拉加载的时候是false
	this.totalPage = totalPage ? totalPage : 5; //最大页码
	this.page = 1;
	this.init = function() {
		//先默认加载第一页
		this.$cDom.siblings('.infinite-scroll-preloader').hide();
		var template = this.$tDom.html();
		var compiledTemplate = $.Template7.compile(template);
		this.addItem(compiledTemplate);
		this.bind(compiledTemplate);

	}
	this.addItem = function(compiledTemplate) {
		var _this = this;
		$.ajax({
			url: _this.url,
			dataType: "json",
			type: "GET",
			data: {
				"page": _this.page
			},
			success: function(data) {
				//console.log(data)
				if (data.status == "200") {
					if (data.list) {
						var context = data;
						var html = "";
						if (_this.append) {
							html = _this.$cDom.html();
						}
						html += compiledTemplate(context);
						
						sessionStorage.setItem("html"+_this.page,html)
						
						_this.$cDom.html(html);
						if ($('.buttons-tab')) {}
					} else {
						//没有数据了，，
						$.detachInfiniteScroll(_this.$cDom.parents('.infinite-scroll'));
						_this.$cDom.siblings('.infinite-scroll-preloader').remove();
						return;
					}

				} else {
					$.toast(data.msg)
				}
			},
			error: function() {
				$.toast("网络错误")
			}
		});
	};
	this.bind = function(compiledTemplate) {
		var _this = this;
		//滚动无限加载列表
		var loading = false;
		_this.$cDom.parents('.infinite-scroll').on('infinite', function(e) {
			_this.$cDom.siblings('.infinite-scroll-preloader').show();
			// 如果正在加载，则退出
			if (loading) return;
			// 设置flag
			loading = true;
			setTimeout(function() {
				_this.page++
					loading = false;
				//最多输出5页	
				if (_this.page >= _this.totalPage) {
					$.detachInfiniteScroll(_this.$cDom.parents('.infinite-scroll'));
					_this.$cDom.siblings('.infinite-scroll-preloader').remove();
					return;
				}
				_this.append = true;
				_this.addItem(compiledTemplate);
			}, 1000);
			e.preventDefault();
		});
	};
}

//公共事件
$(function() {
	//获取手机验证码
	$(document).on('input', '#j-use_name', function() {
		console.log("手机号码输入中...")
		if (isMobile($("#j-use_name").val())) {
			$("#j-verify_bt").removeClass("no")
		} else {
			$("#j-verify_bt").addClass("no")
		}
	})

	//获取短信验证码60S倒计时调用
	$(document).on('click', '#j-verify_bt', function() {
			if (!isMobile($("#j-use_name").val())) { //手机号
				$.toast('请输入正确的手机号码');
				return;
			}
			if ($(this).html() != "获取验证码" && $(this).html() != "重新发送") {
				return;
			} else {
				$(this).addClass("no")
				wait = 60;
				time(this);
			}
			$.ajax({
				type: 'POST',
				url: '/login/sendAuthCode',
				data: {
					phone: $("#user_phone").val()
				},
				timeout: 10000,
				dataType: 'json',
				success: function(data) {
					$.toast(data.result.msg);
				},
				error: function(xhr, type) {
					$.toast("网络错误");
				}
			})
		})
		//点击时打开图片浏览器
	$(document).on('click', '.pb-standalone', function() {

		/*=== 默认为 standalone ===*/
		var photos_arr = [];
		var obj = $(this).find("li img")
			//遍历获取大图地址
		for (var i = 0; i < obj.length; i++) {
			photos_arr[i] = obj.eq(i).data("bigImg");
		}
		var myPhotoBrowserStandalone = $.photoBrowser({
			photos: photos_arr
		});
		myPhotoBrowserStandalone.open();
	});

	//采纳
	$(document).on('click', '.item-zan', function() {
		$('#j-scroll_list .item-zan').addClass('hide');
		$('#j-scroll_list .item-zixun').addClass('hide');
		$('#j-scroll_list .item-thank').addClass('show');
		$(this).parents('li').find('.u-adopt').addClass('show');
	});

	//点赞
	$(document).on('click', ".praise", function() {
		var count = $(this).siblings('.praise_num').html();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			count--;
		} else {
			$(this).addClass('active');
			count++;
		}
		$(this).siblings('.praise_num').html(count);
	});

	//如果焦点图中只有一张图，则去掉下面的小圆点
	if ($('.swiper-container .swiper-slide').length < 2) {
		$('.swiper-pagination').hide();
	}
	//阻止导航栏滑动
	$(document).on('touchmove', '.bar', function() {
		return false;
	});
	$(document).on('touchmove', '.tab-bt', function() {
		return false;
	});
	$(document).on('touchmove', '.g-bar_input', function() {
		return false;
	});

	//删掉图片
	$(document).on('click', '#j-lc_ListImg span', function() {
		$(this).parents('li').remove();
	});

	//四大比价中输入公里数
	$(document).on('click', '#j-input_dis', function() {
		$.prompt("输入行驶公里数",
			function(value) {
				value = parseInt(value) ? parseInt(value) : 0;
				$('#j-input_dis input').val(value + "km");
			});
	});

	$(document).on('click', '#j-close_sure', function() {
		$('#j-input_carbrand').val($('#j-ProvinceShort').val() + ' ' + $('#j-CityABC').val());
		$('#j-input_cartype').val($('#j-car_number').val());
	});
})

//处理图片上传的函数---------------------
// 上传图片按钮点击
$(document).on('click', '.upload-image', uploadImg);
//图片上传完后操作
$(document).on('click', '#j-lc_ListImg li', imgOpera);
/**
 * 上传图片 
 */
function uploadImg() {
	console.log("upload-image click...");
	var imgs = $(this).parents('.m-lc_bts').siblings('#j-lc_ListImg').children();
	console.log(imgs.length)
	if (imgs.length >= 6) {
		console.log('max image size.');
		return;
	}

	var $uploadImgInput = $('<input class="f-dn upload-image-input" accept="image/*" type="file">');
	var $imgs = $(this).parents('.m-lc_bts').siblings('#j-lc_ListImg');
	// 处理图片上传事件
	$uploadImgInput.on('change', function() {
		uploadImgChange(this, $imgs);
	});
	$uploadImgInput.trigger('click');
};
/**
 * 上传图片事件
 */
function uploadImgChange(_this, $imgs) {
	$.showIndicator();
	console.log("upload-image-input change...");
	//var $imgs = $(this).closest('div.m-imgUp').find('ul.task-imgs');

	// 图片压缩率 0.6  width: 256,height: 256, 
	lrz(_this.files[0], {
			quality: 0.6
		})
		.then(function(rst) {
			// 处理成功会执行
			var src = rst.base64;
			var file = rst.origin;

			console.log(' image size : ' + file.size);

			// 只支持 2M以内的图片大小
			if (file.size > 2 * 1024 * 1024) {
				$.toast("图片大小已超过2M，无法上传");
				$.hideIndicator();
				return;
			}

			if (!validateImg(src)) {
				$.hideIndicator();
				$.toast('这不是一张图片');
				return;
			}

			var $_li = $('<li> <img src="' + src + '" alt="" /> </li>');
			// console.log("src = " + src);
			$imgs.prepend($_li);

			var _key = 'img' + new Date().getTime();
			var _data = {
				"key": _key,
				"type": "BASE64",
				"content": src
			};
			httpPost('/ajax/image/upload', _data, function(result) {
				handleResult(result, function() {
					console.log(' upload image succeed. ');
					$_li.attr('path', _key);
				}, function(_result) {
					$_li.remove();
					defaultAjaxFailed();
				});
			}, function(_result) {
				$_li.remove();
				defaultAjaxFailed();
			});
		});
}
/**
 * 异步ajax http post 请求
 * @param {Object} _url   请求的url
 * @param {Object} _data  请求参数
 * @param {Object} _success  请求成功回调函数
 * @param {Object} _fail   请求失败回调函数
 */
function httpPost(_url, _data, _success, _fail) {
	$.ajax({
		type: 'POST',
		url: _url,
		dataType: 'json',
		async: true,
		data: _data,
		timeout: 15000,
		beforeSend: function(xhr) {
			$.showIndicator();
			return true;
		},
		success: function(data) {
			_success && _success(data);
		},
		error: function(xhr, type) {
			if (_fail) {
				_fail();
				return;
			}
			defaultAjaxFailed();
		},
		complete: function(result) {
			$.hideIndicator();
		}
	});
};
/**
 * 处理 ajax返回的结果
 * @param {Object} result ： json对象
 * @param {function} success : 调用结果成功执行回调函数
 * @param {function} fail : 调用结果失败执行回调函数
 */
function handleResult(result,success,fail){
  if(!result || !result.code || result.code !='0000'){
    if(fail){
     fail(result);
    }else{
      defaultAjaxFailed();
    }
    return;
  }
  success && success(result.data);
}
/**
 * 校验图片 
 * @param {Object} data
 */
function validateImg(data) {
	var filters = {
		"jpeg": "/9j/4",
		"gif": "R0lGOD",
		"png": "iVBORw"
	};
	var pos = data.indexOf(",") + 1;
	for (var e in filters) {
		if (data.indexOf(filters[e]) === pos) {
			return e;
		}
	}
	return null;
}

function defaultAjaxFailed() {
	$.toast('网络错误');
}
//查看预览图片
function imgOpera() {
	if ($(this).attr('id')=='j-upload_bt') {
		return;
	}
	var _this = $(this);
	var _index = _this.index();
	var buttons1 = [{
		text: '请选择',
		label: true
	}, {
		text: '查看图片',
		bold: true,
		color: 'danger',
		onClick: function() {
			var list = [];
			console.log(_this)
			_this.parents("#j-lc_ListImg").find("li img").each(function() {
				list.push($(this).attr("src"));
			});
			var myPhotoBrowserStandalone = $.photoBrowser({
				theme: 'dark',
				photos: list
			});
			//调用图片
			myPhotoBrowserStandalone.open(_index);
			$(document).on("click", ".photo-browser .content", function() {
				$(".photo-browser .photo-browser-close-link").click();
			});
		}
	}, {
		text: '删除图片',
		onClick: function() {
			_this.remove();
		}
	}];
	var buttons2 = [{
		text: '取消',
		bg: 'white'
	}];
	var groups = [buttons1, buttons2];
	$.actions(groups);
};
//聊天记录播放音频

