/**
 * 消息初始化
 */
var msgInit = {
	el: '#msg-list', //消息容器
	senderAvatar: 'assets/temp/tx2.png', //发送者头像
	receiverAvatar: 'assets/temp/tx2.png', //接收者头像
}

/**
 * @description 展示消息精简版
 * @param {String} who 消息来源,可选参数: {params} 'sender','receiver'
 * @param {Object} type 消息类型,可选参数: {params} 'text','url','img'
 * @param {Object} msg ('text'和'url'类型的msg是文字，img类型的msg是img地址)
 */
var msgShow = function(who, type, msg) {
	appendMsg(who, type, {
		el: msgInit.el,
		senderAvatar: msgInit.senderAvatar,
		receiverAvatar: msgInit.receiverAvatar,
		msg: msg
	});
}

/**
 * @description 显示消息
 * @param {String} who 消息来源,可选参数: {params} 'sender','receiver'
 * @param {Object} type 消息类型,可选参数: {params} 'text','url','img'
 * @param {JSON} data 消息数据,可选参数: {params} {{el:'消息容器选择器'},{senderAvatar:'发送者头像地址'},{receiverAvatar:'接收者头像地址'},{msg:'消息内容'}}
 * ('text'和'url'类型的msg是文字，img类型的msg是img地址)
 */
var appendMsg = function(who, type, data) {
		// 生成节点
		var domCreat = function(node) {
			return document.createElement(node)
		};

		// 基本节点
		var msgItem = domCreat("li"),
			avatarBox = domCreat("div"),
			contentBox = domCreat("div"),
			avatar = domCreat("img"),
			triangle = domCreat("div");

		// 头像节点
		avatarBox.className = "chat-avatar";
		avatar.src = (who == "sender") ? data.senderAvatar : data.receiverAvatar;
		avatarBox.appendChild(avatar);

		// 内容节点
		contentBox.className = "chat-content";
		triangle.className = "chat-triangle";
		contentBox.appendChild(triangle);

		// 消息类型
		switch(type) {
			case "text":
				var msgTextNode = '<div class="msg-content_inner msg-content_txt"><i class="icon icon-duihuakuangzuo"></i>' + data.msg + '</div>';
				$(contentBox).append(msgTextNode);
				break;
			case "url":
				var msgUrlNode = domCreat("a");
				var textnode = document.createTextNode(data.msg);
				if(data.indexOf('http://') < 0) {
					data.msg = "http://" + data.msg;
				}
				msgUrlNode.setAttribute("href", data.msg);
				msgUrlNode.appendChild(textnode);
				contentBox.appendChild(msgUrlNode);
				break;
			case "img":
				var msgImgNode = domCreat("img");
				msgImgNode.src = data.msg;
				contentBox.appendChild(msgImgNode);
				break;
			default:
				break;
		}

		// 节点连接
		msgItem.className = "chat-" + who;
		msgItem.appendChild(avatarBox);
		msgItem.appendChild(contentBox);
		document.querySelector(data.el).appendChild(msgItem);
	}
	// 发送文本
var sendText = function(chatName) {
		var msg = ui.msgText.val().replace(new RegExp('\n', 'gm'), '<br/>');
		var validateReg = /^\S+$/;
		msgTextFocus();
		if(validateReg.test(msg)) {
			// 消息展示出来
			msgShow('sender', 'text', msg);
			// 发送文本消息到环信服务器
			conn.sendTextMessage({
				to: chatName, //用户登录名，SDK根据AppKey和domain组织jid，如easemob-demo#chatdemoui_**TEST**@easemob.com，中"to:TEST",下同
				msg: msg, //文本消息
				type: "chat"
					//ext :{"extmsg":"extends messages"}//用户自扩展的消息内容（群聊用法相同）
			});
			// 清空文本框
			ui.msgText.val("");
			// 这一句让内容滚动起来
			msgScrollTop();
		} else {
			$.toast("文本消息不能为空");
		}
	}
	// 获得输入框键盘焦点
var msgTextFocus = function() {
		ui.msgText.focus();
		setTimeout(function() {
			ui.msgText.focus();
		}, 150);
	}
	// 消息滚动
var msgScrollTop = function() {
	ui.msgList.scrollTop = ui.msgList.scrollHeight + ui.msgList.offsetHeight;
}
//发送图片
var sendPic=function(chatName,fileInputId) {
    //图片接收者，如“test1”
    var to = chatName;
    var fileInputId=fileInputId;
    if (to == null) {
        alert("请选择联系人");
        return;
    }
    //fileInputId：文件选择输入框的ID，SDK自动根据ID自动获取文件对象（含图片，或者其他类型文件）
    var fileObj = Easemob.im.Helper.getFileUrl(fileInputId);
    if (fileObj.url == null || fileObj.url == '') {
        alert("请选择发送图片");
        return;
    }
    var filetype = fileObj.filetype;
    var filename = fileObj.filename;
    if (filetype in  {
                    "jpg" : true,
                    "gif" : true,
                    "png" : true,
                    "bmp" : true
                    }) {
        var opt = {
            fileInputId : fileInputId,
            to : to,
            onFileUploadError : function(error) {
                //处理图片上传失败
                $.toast("上传失败")
            },
            onFileUploadComplete : function(data) {
                //处理图片上传成功，如本地消息显示
                $.toast("上传成功")
            }
           // ext:{"extmsg":"extends messages"}//用户自扩展的消息内容（群聊用法相同）
        };
        conn.sendPicture(opt);
        return;
    }
    alert("不支持此图片类型" + filetype);
};