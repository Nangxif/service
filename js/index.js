$(function(){
	// 生成第一个对话
	var now = new Date();
	$("#dialog").append('<p class="tip">'+now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日 '+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+'</p>'+
							'<p class="tip">小郎机器人正在为你服务</p>'+
							'<div class="other">'+
								'<img src="./images/avatar.png">'+
								'<div>您好！我是008号傻逼客服小guo，请问有什么可以帮您的？</div>'+
							'</div>');
	
	



	function sendInfo(){//发送信息操作
		if(/^[\s\t\n ]+$/.test($("#import").text())||$("#import").text()==""){//如果输入为空
			$("#dialog").append('<div class="other">'+
									'<img src="./images/avatar.png">'+
									'<div>您好！问题不能为空，请输入您要问的问题。</div>'+
								'</div>');//您好！问题不能为空，请输入您要问的问题。
		}else{//如果输入不为空
			// 生成自己的对话框
			$("#dialog").append('<div class="self">'+
					'<img src="./images/avatar.png">'+
					'<div>'+$("#import").html()+'</div>'+
				'</div>');
			// 请求之后，智能客服的回复
			$("#dialog").append('<div class="other">'+
									'<img src="./images/avatar.png">'+
									'<div>我是不会回答你的问题的，休想，做梦，gun……<br/>'+
									'您可能对一下问题感兴趣：<br/>'+
									'<a class="question">1.你是傻瓜吗？</a><br/>'+
									'<a class="question">2.你是傻瓜吗？</a><br/><br/>'+
									'<p>以上答案是否解决了您的问题？  <a class="dialog_yes">解决</a>    <a class="dialog_no">未解决</a></p>'+
									'</div>'+
								'</div>');

		}
		//发送信息之后清空输入框
		$("#import").text("");
		var scrollHeight = $('#dialog').prop("scrollHeight");
		$('#dialog').animate({"scrollTop":scrollHeight},200);
	}
	// 点击发送按钮
	$("#send").on("click",function(){
		sendInfo();
	})

	// 回车按钮发送
	$(document).on("keydown",function(e){
		if(e.keyCode==13){
			e.preventDefault();
			sendInfo();
		}
	})

	// 如果问题已解决
	$("#dialog").on("click",".dialog_yes",function(){
		if($(this).css("color")!="rgb(199, 195, 195)"){
			$("#dialog").append('<div class="other">'+
										'<img src="./images/avatar.png">'+
										'<div>感谢你的支持，如果还有其他问题可以继续向小傻瓜提问</div>'+
									'</div>');
			$(this).css({"color":"#c7c3c3"});
			$(this).next().css({"color":"#c7c3c3"});
			var scrollHeight = $('#dialog').prop("scrollHeight");
			$('#dialog').animate({"scrollTop":scrollHeight},200);	
		}
	})
	// 如果问题未解决
	$("#dialog").on("click",".dialog_no",function(){
		if($(this).css("color")!="rgb(199, 195, 195)"){
			$("#dialog").append('<div class="other">'+
										'<img src="./images/avatar.png">'+
										'<div>请拨打人工客服<a href="tel:400-8325-888"><em>400-8325-888</em></a></div>'+
									'</div>');
			$(this).css({"color":"#c7c3c3"});
			$(this).prev().css({"color":"#c7c3c3"});
			var scrollHeight = $('#dialog').prop("scrollHeight");
			$('#dialog').animate({"scrollTop":scrollHeight},200);
		}
	})






	// 对话栏回到顶部
	$(".content_left .to_top").on("click",function(){
		$("#dialog").animate({"scrollTop":"0px"});
	})
	$("#dialog").on("scroll",function(){
		if($("#dialog").scrollTop()>222){
			$(".content_left .to_top").fadeIn();
		}else{
			$(".content_left .to_top").fadeOut();
		}
	})



	// 问题data
	var question_data = [{
		"id":"0",
		"content":"手机丢失找回方案:1、如果丢失的手机之前打开过查找手机功能，可以访问这个网址“OPPO云服务” 登陆在丢失手机上使用的同一个OPPO账号，就可以尝试定位手机的大概位置、锁定手机及抹掉手机上的数据。2、若没有打开查找手机，无法对手机进行任何操作，建议尽快联系警方报案、挂失电话卡并修改微信、支付宝等软件的密码，避免造成不必要的损失。"
	},{
		"id":"1",
		"content":"忘记锁屏密码的处理方法：1、如果手机开启了查找手机功能，可以打开“OPPO云服务” 登陆手机中的OPPO账号，然后选择“查找手机”，点击“锁屏”，根据提示设置密码，重新设置后的密码就是手机新的锁屏密码。2：如果手机没有设置查找手机功能，可以携带购机保卡和发票（若无法提供，可以携带身份证复印件），到服务中心免费解锁。附：“网点查询”"
	}]


	$(".question_item").on("click",function(){
		for(var i=0;i<question_data.length;i++){
			if(question_data[i].id==$(this).data("question")){
				$("#dialog").append('<div class="self">'+
						'<img src="./images/avatar.png">'+
						'<div>'+$(this).text()+'<br/>'+question_data[i].content+'</div>'+
					'</div>');
				var scrollHeight = $('#dialog').prop("scrollHeight");
				$('#dialog').animate({"scrollTop":scrollHeight},200);
			}
		}
		
	})





	// 字体大小选择框
	$("#item .font").on("click",function(){
		if($("#item .font_dialog").css("display")=="block"){
			$("#item .font_dialog").css("display","none");
		}else{
			$("#item .font_dialog").css("display","block");
		}
	})

	$("#item .font_dialog p").on("click",function(e){
		e.stopPropagation();
		$("#item .font_dialog p").removeClass("active");
		$(this).addClass("active");
		$("#item .font_dialog").css("display","none");
		$("#dialog div").css({"font-size":$(this).text()});
	})



	// 选择分类弹框出现
	$(".changeModal").fadeIn();
	$(".changeModal .changeModal_content").css({"transform":"translateY(0%)"});
	//选择分类
	var selectType = [{
		typeId:"0",
		type:"学生平板问题",
		model:["G100A","G550A","G90A","G35s"]
	},{
		typeId:"1",
		type:"学习手机问题",
		model:["A1","A2"]
	},{
		typeId:"2",
		type:"儿童平板问题",
		model:["Q1"]
	},{
		typeId:"3",
		type:"早教平板问题",
		model:["Q2"]
	},{
		typeId:"4",
		type:"学习电脑问题",
		model:["Q3"]
	},{
		typeId:"5",
		type:"手表问题",
		model:["Q4"]
	},{
		typeId:"6",
		type:"点读笔问题",
		model:["Q7"]
	}];
	for(var i=0;i<selectType.length;i++){
		if(i==0){
			$("#bType").append('<div class="changeModal_content_item correct_active" data-type="'+selectType[i].typeId+'">'+selectType[i].type+'<span></span></div>')
		}else{
			$("#bType").append('<div class="changeModal_content_item" data-type="'+selectType[i].typeId+'">'+selectType[i].type+'<span></span></div>')
		}
	}
	for(var j=0;j<selectType[0].model.length;j++){
		if(j==0){
			$("#sType").append('<div class="changeModal_content_item correct_active">'+selectType[0].model[j]+'<span></span></div>');
		}else{
			$("#sType").append('<div class="changeModal_content_item">'+selectType[0].model[j]+'<span></span></div>');
		}
	}
	$(".changeModal #bType").on("click",".changeModal_content_item",function(){
		$("#bType .changeModal_content_item").removeClass("correct_active");
		$(this).addClass("correct_active");
		$("#sType").children().remove();
		for(var k=0;k<selectType.length;k++){
			if(selectType[k].typeId==$(this).data("type")){
				for(var l=0;l<selectType[k].model.length;l++){
					if(l==0){
						$("#sType").append('<div class="changeModal_content_item correct_active">'+selectType[k].model[l]+'<span></span></div>');
					}else{
						$("#sType").append('<div class="changeModal_content_item">'+selectType[k].model[l]+'<span></span></div>');
					}
				}
				break;
			}
		}
	})

	$(".changeModal #sType").on("click",".changeModal_content_item",function(){
		$("#sType .changeModal_content_item").removeClass("correct_active");
		$(this).addClass("correct_active");
	})


	$(".changeModal_content_footer a").on("click",function(){
		$(".conversation #item .type,.send_wrapper .send_wrapper_type").text("您当前咨询的服务分类是："+$("#bType .changeModal_content_item.correct_active").text()+">"+$("#sType .changeModal_content_item.correct_active").text());
		// 关闭弹框动画
		$(".changeModal").fadeOut();
		$(".changeModal .changeModal_content").css({"transform":"translateY(-300%)"});
	})

	$(".conversation #item .type,.send_wrapper .send_wrapper_type").on("click",function(){
		$(".changeModal").fadeIn();
		$(".changeModal .changeModal_content").css({"transform":"translateY(0%)"});
	})


	// 结束按钮退出网页
	$("#end").on("click",function(){
		var userAgent = navigator.userAgent;
		if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Presto") != -1) {
		    window.location.replace("about:blank");
		} else {
		    window.opener = null;
		    window.open("", "_self");
		    window.close();
		}
	})


	// 离开界面的时候提示
	function goout(e){
		var confirmationMessage = '确定离开此页吗？聊天记录将不会被保存。';
	    (e || window.event).returnValue = confirmationMessage;     // Gecko and Trident
	    return confirmationMessage;
	}
	window.addEventListener("beforeunload", goout,false);

})