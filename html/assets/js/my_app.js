$(function() {
	//登录页
	$(document).on("pageInit", "#page-login", function(e, pageId, $page) {
		console.log("登录页面初始化")
		$($page).on("input", ".m-login_input input", function(e, pageId, $page) {
			var userName = $("#j-use_name").val()
			var userPass = $("#j-use_pas").val()
			if(userName && userPass) {
				$("#j-btn").removeClass("no");
			} else {
				$("#j-btn").addClass("no");
			}
		});

		//提交登录表单
		$($page).on("click", "#j-btn", function(e, pageId, $page) {
			if($(this).hasClass("no")) {
				$.toast("表单信息填写错误");
				return;
			}
			var userName = $("#j-use_name").val()
			var userPass = $("#j-use_pas").val()
				//提交登录数据
				//code ...........
				//登录成功
			window.location.href = "personal-me.html"

		});
	});

	//注册页
	$(document).on("pageInit", "#page-register", function(e, pageId, $page) {
		console.log("注册页面初始化")
		var userName, userPass, userVerify;
		$($page).on("click", "#j-check_agr", function(e, pageId, $page) {
			$(this).toggleClass("active");
			if($(this).hasClass("active") && userName && userPass && userVerify) {
				$("#j-btn").removeClass("no");
			} else {
				$("#j-btn").addClass("no");
			}
		});
		$($page).on("input", ".m-register_input input", function(e, pageId, $page) {
			userName = $("#j-use_name").val()
			userPass = $("#j-use_pas").val()
			userVerify = $("#j-use_verify").val();
			if(userName && userPass && userVerify && $("#j-check_agr").hasClass("active")) {
				$("#j-btn").removeClass("no");
			} else {
				$("#j-btn").addClass("no");
			}
		});
		//提交注册表单
		$($page).on("click", "#j-btn", function(e, pageId, $page) {
			if($(this).hasClass("no")) {
				$.toast("表单信息填写错误");
				return;
			}
			userName = $("#j-use_name").val();
			userPass = $("#j-use_pas").val();
			userVerify = $("#j-use_verify").val();
			//提交注册数据
			//code ...........
			//登录成功
			window.location.href = "pc-my.html"
		});
	});
	//忘记密码页
	$(document).on("pageInit", "#page-forgetpass", function(e, pageId, $page) {
		var userName, newPass, userVerify;
		$($page).on("input", ".m-forgetpass_input input", function(e, pageId, $page) {
			userName = $("#j-use_name").val()
			userPass = $("#j-use_pas").val()
			userVerify = $("#j-use_verify").val();
			if(userName && userPass && userVerify) {
				$("#j-btn").removeClass("no");
			} else {
				$("#j-btn").addClass("no");
			}
		});
		//提交重设密码表单
		$($page).on("click", "#j-btn", function(e, pageId, $page) {
			if($(this).hasClass("no")) {
				$.toast("表单信息填写错误");
			}
			userName = $("#j-use_name").val();
			userPass = $("#j-use_pas").val();
			userVerify = $("#j-use_verify").val();
			//提交重设密码数据
			//code ...........
			//登录成功
			//window.location.href = "pc-my.html"
		});
	});

	//绑定手机
	$(document).on("pageInit", "#page-bindphone", function(e, pageId, $page) {
		var userName, newPass, userVerify;
		$($page).on("input", ".m-bindphone_input input", function(e, pageId, $page) {
			userName = $("#j-use_name").val()
			userVerify = $("#j-use_verify").val();
			if(userName && userVerify) {
				$("#j-btn").removeClass("no");
			} else {
				$("#j-btn").addClass("no");
			}
		});
		//提交绑定手机表单
		$($page).on("click", "#j-btn", function(e, pageId, $page) {
			if($(this).hasClass("no")) {
				$.toast("表单信息填写错误");
			}
			userName = $("#j-use_name").val();
			userVerify = $("#j-use_verify").val();
			//提交绑定手机数据
			//code ...........

		});
	});

	//个人中心-问题列表/我的比价
	$(document).on("pageInit", "#page-inquriy", function(e, pageId, $page) {

		console.log("问诊核单页面初始化");
		var tab1 = null,
			tab2 = null;
		//根据页面隐藏域 判断是进入哪一个tab；解决初始化两个 tab 导致接口卡顿的问题，
		var curIndex = $("#curIndex").val();
		//初始化...
		initTab(curIndex)

		function initTab(index) {
			if(index == '1' && tab1 == null) {
				tab1 = new Infscroll("assets/temp/inquiry-wz.json", $("#t-wz-list"), $("#j-wz_list"));
				tab1.init();
			} else if(index == '2' && tab2 == null) {
				tab2 = new Infscroll("assets/temp/inquiry-bj.json", $("#t-bj-list"), $("#j-bj_list"));
				tab2.init();
				$(".buttons-tab .button").eq(1).click();
			}
		}
		//Tab点击切换
		$(".buttons-tab .button").click(function() {
			var index = $(this).index() + 1;
			initTab(index)
		})

	});

	//首页
	$(document).on("pageInit", "#page-index", function(e, pageId, $page) {
		var tab = new Infscroll("assets/temp/index.json", $("#t-scroll_list"), $("#j-scroll_list"), false);
		tab.init();
		
		//新闻列表
		if ($('#j-news_list li').length>1) {
			var lastLi=$('#j-news_list li').eq(0).clone();
			$('#j-news_list').append(lastLi);
			var cur=0;
			var ceilH=lastLi.height();
			setInterval(function(){
				cur++;
				$('#j-news_list').animate({top: -cur*ceilH},200,function(){
					if (cur==$('#j-news_list li').length-1) {
						$('#j-news_list').css('top',0);
						cur=0;
					}
				});
			},2000);
		}
	});

	/////////////////////////////// 饭饭  star////////////////////////////////////////
	//四大比价--首页
	$(document).on("pageInit", "#page-bjIndex", function(e, pageId, $page) {
		$img = $('.m-bj_nav img').each(function() {
			$(this).width($(this).width() / 40 + 'rem');
		});
		//json中type_class是表示比价的类名，'s-ysj'表示易碎件比价、's-by'表示保养比价、's-wx'表示维修比价、's-jz'表示加装或改装
		var tab = new Infscroll("assets/temp/bj-index.json");
		tab.init();
	});

	//四大比价--查看全部比价
	$(document).on("pageInit", "#page-bjLookup", function(e, pageId, $page) {
		var tab = new Infscroll("assets/temp/bj-index.json");
		tab.init();
		$("#bjList li").on("click", function() {
			$(this).find('span').addClass('show');
			$(this).siblings().find('span').removeClass('show');
		});
	});

	//清单核查--首页
	$(document).on("pageInit", "#page-lcIndex", function(e, pageId, $page) {
		prompt('请输入行驶公里数：', $('#lc-disBt'), '公里');
		//金额模块，点击按钮选中金额数目
		$($page).on('click', '.money-num a', function() {
			$(this).addClass('active').siblings().removeClass('active');
		});
	});

	//个人中心--我的预约
	$(document).on("pageInit", "#page-appointment", function(e, pageId, $page) {
		var tab = new Infscroll("assets/temp/appointment.json");
		tab.init();
	});

	//汽车快报
	$(document).on("pageInit", "#page-aeIndex", function(e, pageId, $page) {
		var tab = new Infscroll("assets/temp/ae-index.json");
		tab.init();
	});

	//核单--首页
	$(document).on("pageInit", "#page-hdIndex", function(e, pageId, $page) {
		console.log("核单首页页面初始化");
		var tab1 = new Infscroll("assets/temp/wz-index.json", $("#t-wz_list"), $("#j-wz_list"));
		tab1.init();
		var tab2 = new Infscroll("assets/temp/hs-index.json", $("#t-hs_list"), $("#j-hs_list"));
		tab2.init();

		//切换打开关闭按钮
		$($page).on('click', '#j-bm_menu .bm-menu_bt', function() {
			$('#j-bm_menu').toggleClass('active');
		});
	});

	//核单--问诊详情页
	$(document).on("pageInit", "#page-wzDetail", function(e, pageId, $page) {
		var tab = new Infscroll("assets/temp/wzdetail.json");
		tab.init();
	});

	//核单--问诊详情页
	$(document).on("pageInit", "#page-hsDetail", function(e, pageId, $page) {
		//json参数，hasadopted表示列表答案中是否有被采纳的，adopted表示当前答案li是否被采纳了，只有有一个li的adopted为1，所有li的hasadopted则为1
		var tab = new Infscroll("assets/temp/hsdetail.json");
		tab.init();
	});

	//核单--感谢专家
	$(document).on("pageInit", "#page-thankzj", function(e, pageId, $page) {
		//打赏专家
		$($page).on('click', '.money-num a', function() {
			$(this).addClass('active').siblings().removeClass('active');
			$('#j-th_reward').html($(this).html());
		});
	});

	//发现--排行榜
	$(document).on("pageInit", "#page-fxRanking", function(e, pageId, $page) {
		//打赏专家
		$($page).on('click', '#j-tab_bt a', function() {
			if($(this).index() == "0") {
				$('#j-rank_tt').html("专家排行榜");
			} else {
				$('#j-rank_tt').html("顾问排行榜");
			}
		});
		//加载列表
		var tab1 = new Infscroll("assets/temp/r-expert.json", $("#t-expert_list"), $("#j-expert_list"));
		tab1.init();
		var tab2 = new Infscroll("assets/temp/r-adviser.json", $("#t-adviser_list"), $("#j-adviser_list"));
		tab2.init();
		//点击进入详情页
		$($page).on('click', '.item-info dl', function() {
			$.router.loadPage($(this).attr('href'));
		})
	});

	//热门问题
	$(document).on("pageInit", "#page-hotIssue", function(e, pageId, $page) {
		var tab = new Infscroll("assets/temp/index.json");
		tab.init();
	});

	//商家排行榜
	$(document).on("pageInit", "#page-bussiness", function(e, pageId, $page) {
		var tab = new Infscroll("assets/temp/fx-bussiness.json");
		tab.init();
	});

	//保养比价--提交成功
	$(document).on("pageInit", "#page-byok", function(e, pageId, $page) {
		var tab = new Infscroll("assets/temp/by-ok.json");
		tab.init();
	});

	//保养比价--详情
	$(document).on("pageInit", "#page-byDetail", function(e, pageId, $page) {
		//json参数，hasadopted表示列表答案中是否有被采纳的，adopted表示当前答案li是否被采纳了，只有有一个li的adopted为1，所有li的hasadopted则为1
		//total表示总费用
		var tab = new Infscroll("assets/temp/bydetail.json");
		tab.init();
	});

	//比价--评论
	$(document).on("pageInit", "#page-comment", function(e, pageId, $page) {
		$($page).on('click', '#j-score span', function() {
			var i = $(this).index();
			$('#j-score span').each(function() {
				if($(this).index() <= i) {
					$(this).addClass('active');
				} else {
					$(this).removeClass('active');
				}
			});
			$('#j-score_txt').val(i + 1);
		});
		$($page).on('click', '#j-send', function() {
			if($('#j-score_txt').val() < 1) {
				$.alert('请填写评价');
			} else {
				$("#j-open_pop").trigger('click');
			}
		});
	});

	//加装/改装--首页
	$(document).on("pageInit", "#page-jzIndex", function(e, pageId, $page) {
		var tab1 = new Infscroll("assets/temp/jzindex.json", $("#t-bycity-list"), $("#j-bycity_list"));
		tab1.init();
		var tab2 = new Infscroll("assets/temp/jzindex2.json", $("#t-bycar-list"), $("#j-bycar_list"));
		tab2.init();
		//点击进入详情页
		$($page).on('click', '.m-by_list li', function() {
			$.router.loadPage($(this).attr('href'));
		});
	});

	//加装/改装--商品详情
	$(document).on("pageInit", "#page-jzDetail", function(e, pageId, $page) {
		//点击进入详情页
		$($page).on('click', '.prod-con li', function() {
			$.router.loadPage($(this).attr('href'));
		});
		$($page).on('click', '.comment-con li', function() {
			$.router.loadPage($(this).attr('href'));

		});
	});

	//加装/改装--所有评论
	$(document).on("pageInit", "#page-jzComments", function(e, pageId, $page) {
		var tab = new Infscroll("assets/temp/jz-comments.json");
		tab.init();
		//点击进入详情页
		$($page).on('click', '.prod-con li', function() {
			$.router.loadPage($(this).attr('href'));
		});
	});

	//产品介绍
	$(document).on("pageInit", "#page-proList", function(e, pageId, $page) {
		var tab1 = new Infscroll("assets/temp/procList.json", $('#t-jz-list'), $('#j-jz_list'));
		tab1.init();
		var tab2 = new Infscroll("assets/temp/procList.json", $('#t-ysj-list'), $('#j-ysj_list'));
		tab2.init();
		var tab3 = new Infscroll("assets/temp/procList.json", $('#t-by-list'), $('#j-by_list'));
		tab3.init();
		var tab4 = new Infscroll("assets/temp/procList.json", $('#t-wx-list'), $('#j-wx_list'));
		tab4.init();
		var tab5 = new Infscroll("assets/temp/procList.json", $('#t-other-list'), $('#j-other_list'));
		tab5.init();
		//点击进入详情页
		$($page).on('click', '.prod-con li', function() {
			$.router.loadPage($(this).attr('href'));
		});
	});

	//产品详情
	$(document).on("pageInit", "#page-procDetail", function(e, pageId, $page) {
		var w = parseInt($('html').css('fontSize')) * 5.7;
		var l = $('#j-proc_show li').length;
		$('#j-proc_show').width(w * l + 8);
	});

	//易损件比价--详情
	$(document).on("pageInit", "#page-ysjDetail", function(e, pageId, $page) {
		//json参数，hasadopted表示列表答案中是否有被采纳的，adopted表示当前答案li是否被采纳了，只有有一个li的adopted为1，所有li的hasadopted则为1
		//total表示预计报价
		var tab = new Infscroll("assets/temp/ysjdetail.json");
		tab.init();
	});
	//易损件比价--提交成功
	$(document).on("pageInit", "#page-ysjok", function(e, pageId, $page) {
		var tab = new Infscroll("assets/temp/by-ok.json");
		tab.init();
	});

	//维修比价--详情
	$(document).on("pageInit", "#page-wxDetail", function(e, pageId, $page) {
		//json参数，hasadopted表示列表答案中是否有被采纳的，adopted表示当前答案li是否被采纳了，只有有一个li的adopted为1，所有li的hasadopted则为1
		//total表示预计报价
		var tab = new Infscroll("assets/temp/wxdetail.json");
		tab.init();
	});
	//维修比价--提交成功
	$(document).on("pageInit", "#page-wxok", function(e, pageId, $page) {
		var tab = new Infscroll("assets/temp/by-ok.json");
		tab.init();
	});

	//我的预约--首页
	$(document).on("pageInit", "#page-yyIndex", function(e, pageId, $page) {
		$("#datetime-picker").datetimePicker({
			toolbarTemplate: '<header class="bar bar-nav">\
		    <button class="button button-link pull-right close-picker" >确定</button>\
		    <h1 class="title" style="background: #fff;">选择日期和时间</h1>\
		    </header>'
		});
		$($page).on('click', '#j-input_name', function() {
			$.prompt("请输入联系人的名字",
				function(value) {
					$('#j-input_name input').val(value);
				});
		});
		$($page).on('click', '#j-input_tel', function() {
			$.prompt("请输入联系电话",
				function(value) {
					$('#j-input_tel input').val(value);
				});
		});
	});
	//继续咨询
	$(document).on("pageInit", "#page-chat", function(e, pageId, $page) {
		$($page).on('click', '#j-yuyinwriting', function() {
			$('#j-input_txt').toggle();
			$('#j-input_bt').toggle();
			$('#j-yyw_icon').toggleClass('icon-yuyin');
			$('#j-yyw_icon').toggleClass('icon-writing');
		});
	});

	//选择主修品牌
	$(document).on("pageInit", "#page-majoCar", function(e, pageId, $page) {
		console.log("选择主修品牌初始化")
			//点击索引跳转
		$($page).on('click', '.index-list-bar li strong', function() {
			console.log($(this).html())
			var href = '#' + $(this).html();
			window.location.href = href;
		});
		var cur_lenght = 0;
		$($page).on('click', '.m-alphabet2 li', function() {

			if($(this).hasClass("cur")) {
				$(this).removeClass("cur");
				
				cur_lenght--;
			} else {
				if(cur_lenght >= 3) {
					$.alert("最多可选择三个擅长品牌")
					return false;
				}
				
			
				$(this).addClass("cur");
				cur_lenght++;
			}
			var html="";
			for(var i=0;i<$(".m-cho_car li").length;i++){
				if($(".m-cho_car li").eq(i).hasClass("cur")){
						html+='<li>'+$(".m-cho_car li").eq(i).find("p").html()+'</li>';
				}
			
			}
			
			$(".m-zhuxiupinpai ul").html(html)
		});
	});

	$.init();
})