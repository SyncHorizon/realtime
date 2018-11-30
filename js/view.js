$(document).ready(function(){
view = {
	add_pager: function(maxResults, totalResults, currentPage, url, holder){
		holder = holder ? holder : $("#right_content_load");
		var totalPage = ((totalResults % maxResults) == 0) ? (totalResults / maxResults) : (Math.floor(totalResults / maxResults) + 1);
		var nextPage = (parseInt(currentPage) + 1) > totalPage ? parseInt(currentPage) : (parseInt(currentPage) + 1);
		var previousPage = (parseInt(currentPage) - 1) > 0 ? (parseInt(currentPage) - 1) : parseInt(currentPage);
		var tempPager = $("<div class='clearfix general_footer'>\
		<p style='width:500px;font-size:15px;padding-top: 6px;' class='pull-left'>共计查询 <span class='text-success'>"+totalResults+"</span> 条记录，当前 <input class='jump_page' style='width:36px;text-align:center;color:#1aaf5d;padding:2px 4px;' value="+currentPage+" maxlength='3' > 页 \/  "+totalPage+" 页</p>\
		<button type='button' class='btn btn-default pull-right btn-sm last_page'>尾页</button>\
		<button type='button' class='btn btn-default pull-right btn-sm next_page'>下一页</button>\
		<button type='button' class='btn btn-default pull-right btn-sm previous_page'>上一页</button>\
		<button type='button' class='btn btn-default pull-right btn-sm first_page'>首页</button>\
		</div>");
		var tempForm = $("<form class='pager_form' action='' method='post'>\
		<input type='hidden' class='currentPage' name='currentPage' value="+currentPage+" >\
		<input type='hidden' id='maxResults' name='maxResults' value="+maxResults+" >\
		<input type='hidden' id='typecode' name='typecode' value='' >\
		</form>");
		holder.append(tempPager);
		tempPager.append(tempForm);
		tempPager.find(".first_page").unbind().bind("click", function(){
		tempForm.find(".currentPage").val(1);
		loader.load_pager(holder, tempForm, url);
		});
		tempPager.find(".last_page").unbind().bind("click", function(){
		tempForm.find(".currentPage").val(totalPage);
		loader.load_pager(holder, tempForm, url);
		});
		tempPager.find(".previous_page").unbind().bind("click", function(){
		tempForm.find(".currentPage").val(previousPage);
		loader.load_pager(holder, tempForm, url);
		});
		tempPager.find(".next_page").unbind().bind("click", function(){
		tempForm.find(".currentPage").val(nextPage);
		loader.load_pager(holder, tempForm, url);
		});
		tempPager.find(".jump_page").unbind().bind('keypress', function(e){
		if(e.keyCode==13){
			try{
			var tempValue = parseInt($(this).val());
				if((typeof tempValue == "number") && (tempValue >= 0) && (tempValue <= totalPage)){
				tempForm.find(".currentPage").val(tempValue);
				loader.load_pager(holder, tempForm, url);
				}
			}
			catch(e){
			}
		}
		});
		if(currentPage == 1){
		tempPager.find(".first_page, .previous_page").attr("disabled", "disabled");
		}
		if(currentPage == totalPage){
		tempPager.find(".last_page, .next_page").attr("disabled", "disabled");
		}
	},
	add_scrollbar: function(holder, para){
		var temp = (holder instanceof jQuery) ? holder : $(holder);
		if($.browser.msie == true){
		if($.browser.versionNumber < 8){
		temp.css({"overflow-y":"scroll"});
		}
		else{
		if(para){
		temp.mCustomScrollbar(para);
		}
		else{
		temp.mCustomScrollbar({
		scrollbarPosition:"inside",
		autoHideScrollbar:true
		});
		}
		}
		}
		else{
		if(para){
		temp.mCustomScrollbar(para);
		}
		else{
		temp.mCustomScrollbar({
		scrollbarPosition:"inside",
		autoHideScrollbar:true
		});
		}
		}
	},
	button_restart_with_timer: function(object){
	view.get_modal("template/modal/confirm.html",
	function(){
	$("#confirm_modal_wrapper").find(".fillin").eq(0).html("确认要重启吗？");
	$("#confirm_modal_wrapper").find(".button_confirm").unbind().bind("click", function(){
	$("#modal_general").modal('hide');
		//----------
		var unique_id = object.attr("id");
		var tempHTML = object.html();
		$("#"+unique_id).attr("disabled", "disabled").html("正在启动...<img src='image/preloader_239.gif' style='width:20px;padding:0px;margin:0px;border:none;margin-top:-4px;' />");
		timer_restart[unique_id] = window.setInterval(function(){
		//---ajax success
		$.ajax({
		type: "post",
		url: "fake-data/restart.php",
		data:{
		newMachineIds:unique_id
		},
		dataType: "json",
		success: function(data){
			switch(true){
			//----重启成功
			case data.status == "success":
			$("#"+unique_id).removeAttr("disabled").html(tempHTML);
			$.notify({
			icon: 'glyphicon glyphicon-ok-circle text-success',
			title:'<span class="text-success" style="padding-left:10px;">重启成功</span>',
			message:'<br>SJKD-DJKF-56 Apache：v2.2 64-bit 已完成重启'
			}, {
			type:'success',
			offset:{x:30, y:65},
			placement: {from: "top", align: "right"},
			delay: 6000,
			timer: 1000
			});
			dispatcher.dispatch_timer(timer_restart[unique_id]);
			break;
			//----重启失败
			case data.status == "fail":
			$("#"+unique_id).removeAttr("disabled").html(tempHTML);
			$.notify({
			icon: 'glyphicon glyphicon-exclamation-sign text-danger',
			title:'<span class="text-danger" style="padding-left:10px;">重启失败</span>',
			message:'<br>SJKD-DJKF-56 Apache：v2.2 64-bit 重启失败'
			}, {
			type:'success',
			offset:{x:30, y:65},
			placement: {from: "top", align: "right"},
			delay: 6000,
			timer: 1000
			});
			dispatcher.dispatch_timer(timer_restart[unique_id]);
			break;
			default:
			break;
			}
		}
		});
		}, 10000);
		//---强制清除
		window.setTimeout(function(){
		dispatcher.dispatch_timer(timer_restart[unique_id]);
		$("#"+unique_id).removeAttr("disabled").html(tempHTML);
		$.notify({
		icon: 'glyphicon glyphicon-exclamation-sign text-danger',
		title:'<span class="text-danger" style="padding-left:10px;">重启失败</span>',
		message:'<br>SJKD-DJKF-56 Apache：v2.2 64-bit 重启失败'
		}, {
		type:'success',
		offset:{x:30, y:65},
		placement: {from: "top", align: "right"},
		delay: 6000,
		timer: 1000
		});
		}, 10*60*1000);
	});
	});
	},
	button_restart: function(object){
	view.get_modal("template/modal/confirm.html",
	function(){
	$("#confirm_modal_wrapper").find(".fillin").eq(0).html("确认要重启吗？");
	$("#confirm_modal_wrapper").find(".button_confirm").unbind().bind("click", function(){
		$("#modal_general").modal('hide');
		var unique_id = object.attr("id");
		var tempHTML = object.html();
		$("#"+unique_id).attr("disabled", "disabled").html("正在启动...<img src='image/preloader_239.gif' style='width:20px;padding:0px;margin:0px;border:none;margin-top:-4px;' />");
		$.ajax({
		type: "post",
		url: "fake-data/restart.php",
		data:{
		newMachineIds:unique_id
		},
		dataType: "json",
		success: function(data){
			switch(true){
			case data.status == "success":
			$("#"+unique_id).removeAttr("disabled").html(tempHTML);
			$.notify({
			icon: 'glyphicon glyphicon-ok-circle text-success',
			title:'<span class="text-success" style="padding-left:10px;">重启成功</span>',
			message:'<br>SJKD-DJKF-56 Apache：v2.2 64-bit 已完成重启'
			}, {
			type:'success',
			offset:{x:30, y:65},
			placement: {from: "top", align: "right"},
			delay: 6000,
			timer: 1000
			});
			break;
			default:
			$("#"+unique_id).removeAttr("disabled").html(tempHTML);
			$.notify({
			icon: 'glyphicon glyphicon-exclamation-sign text-danger',
			title:'<span class="text-danger" style="padding-left:10px;">重启失败</span>',
			message:'<br>SJKD-DJKF-56 Apache：v2.2 64-bit 重启失败'
			}, {
			type:'success',
			offset:{x:30, y:65},
			placement: {from: "top", align: "right"},
			delay: 6000,
			timer: 1000
			});
			break;
			}
		}
		});
	});
	});
	},
	query_restart: function(table){
		//-----发送重启请求
		view.get_modal("template/modal/confirm.html",
		function(){
		$("#confirm_modal_wrapper").find(".fillin").eq(0).html("确认要重启吗？<br><span class='text-muted'>离线状态、重启中的服务器无法重启。</span>");
		$("#confirm_modal_wrapper").find(".button_confirm").unbind().bind("click", function(){
		view.modal_confirm_delay_show();
		if(table.find(".custom_checkbox[data-status-restart='no-restart']:checked").not(".checkall").length < 1){
		var checkbox = table.find(".custom_checkbox:checked").not(".checkall");
		var newMachineIds;
		checkbox.each(function(){
		newMachineIds = newMachineIds + $(this).attr("id") + ",";
		});
		// $.ajax({
			 // type: "post",
			 // url:"fake-data/restart.php",
			 // data:{"newMachineIds" : newMachineIds},
			// data{
			// newMachineIds:parameter
			// },
			 // dataType: "json",
			 // success: function(data){
				// if(data.flag == "false"){
					// view.modal_message("<span class='glyphicon glyphicon-exclamation-sign text-danger'></span>&nbsp;请求失败，请尝试重新操作。");
				// }else{
					//-----请求成功后
					// view.query_restart_checking(checkbox);
				// }
			 // }
		 // });
		 //下面是模拟
		 window.setTimeout(function(){
		 view.query_restart_checking(checkbox);
		 }, 1000);
		}
		else{
		view.modal_message("离线状态、重启中的服务器无法重启，请选择在线服务器。");
		}
		});
		});
	},
	query_restart_checking: function(checkbox){
		$("#modal_general").modal('hide');
		checkbox.each(function(){
			$(this).attr("data-status-restart", "no-restart");
			$(this).parent().parent().parent().find("td.server_status").removeClass("text-success").addClass("text-muted").html("").html("正在启动.........<img src='image/preloader_239.gif' style='width:20px;padding:0px;margin:0px;border:none;margin-top:-4px;margin-left:4px;' />");
			var tempId = $(this).attr("id");
			if(timer_query_stack.indexOf(tempId) < 0){
			timer_query_stack.push(tempId);
			}
		});
		dispatcher.dispatch_timer(timer_restart.query_restart);
		timer_restart.query_restart = window.setInterval(function(){
		var newMachineIds;
		for(var i = 0; i < timer_query_stack.length; i++){
		newMachineIds = newMachineIds + timer_query_stack[i] + ",";
		}
		$.ajax({
			 type: "post",
			 url:"fake-data/restart-query.php",
			 data:{"newMachineIds" : newMachineIds},
			 dataType: "json",
			 success: function(data){
			 if(data.star && (data.star != "") && (data.star != ",")){
			 var temp = data.star;
			 var tempRestarted = temp.split(",");
				for(var i = 0; i < tempRestarted.length; i++){
				if(timer_query_stack.indexOf(tempRestarted[i]) >= 0){
				timer_query_stack.splice(timer_query_stack.indexOf(tempRestarted[i]), 1);
				var tempMessage = "<br>" + data.starinformation[i] + " 已完成重启";
				$.notify({
				icon: 'glyphicon glyphicon-ok-circle text-success',
				title:'<span class="text-success" style="padding-left:10px;">重启成功</span>',
				message:tempMessage
				}, {
				type:'success',
				offset:{x:30, y:65},
				placement: {from: "top", align: "right"},
				delay: 6000,
				timer: 1000
				});
				$("#"+tempRestarted[i]).removeAttr("data-status-restart");
				$("#"+tempRestarted[i]).parent().parent().parent().find("td.server_status").removeClass("text-muted").addClass("text-success").html("").html("在线");
				}
				}
			 }
			 if(timer_query_stack.length == 0){
			 dispatcher.dispatch_timer(timer_restart.query_restart);
			 }
			 }
		 });
		}, 10000);
		//---强制清除
		window.setTimeout(function(){
		dispatcher.dispatch_timer(timer_restart.query_restart);
		}, 10*60*1000);
	},
	custom_checkbox: function(checkbox, paremeter){
		checkbox = checkbox ? checkbox : $(".data-view-custom .custom_checkbox");
		paremeter = paremeter ? paremeter : "checkbox-success checkbox-inline";
		checkbox.each(function(){
		$(this).parent().addClass("custom_checkbox_holder");
		$(this).wrap("<div class='checkbox "+paremeter+"'</div>");
		$(this).after("<label></label>");
		});
	},
	custom_radio: function(radio, paremeter){
		radio = radio ? radio : $(".data-view-custom .custom_radio");
		paremeter = paremeter ? paremeter : "radio-success radio-inline";
		radio.each(function(){
		$(this).wrap("<div class='radio "+paremeter+"'</div>");
		$(this).after("<label></label>");
		});
	},
	custom_checkbox_inline: function(holder, paremeter){
		var temp = (holder instanceof jQuery) ? holder : $(holder);
		paremeter = paremeter ? paremeter : "checkbox-success checkbox-inline";
		temp.wrap("<div class='checkbox "+paremeter+"'</div>");
		temp.after("<label></label>");
	},
	show_preloader: function(type){
		type = type ? type : 'default';
		switch(true){
		case type == 'default':
		$("#right_content_load").hide().html("");
		$("#right_content_preload").hide().css({"background-color":"transparent"}).fadeIn();
		if(svg_preloader.destroy){
		svg_preloader.destroy();
		}
		svg_preloader = {};
		$("#right_content_preload_svg_holder").html("").load("image/jowto.svg", function(){
		svg_preloader = new Vivus('preloader_svg', {duration: 200, type: ""}, function(){
		});
		});
		break;
		case type == 'semitransparent':
		$("#right_content_load").animate({"opacity":0.6}, 500);
		break;
		default:
		break;
		}
	},
	show_load_content: function(type){
		type = type ? type : 'default';
		switch(true){
		case type == 'default':
		window.setTimeout(function(){
		$("#right_content_preload").hide().css({"background-color":"transparent"});
		if(svg_preloader.destroy){
		svg_preloader.destroy();
		}
		svg_preloader = {};
		$("#right_content_preload_svg_holder").html("");
		$("#right_content_load").fadeIn();
		}, 300);
		break;
		case type == 'semitransparent':
		$("#right_content_load").stop().css({"opacity":0.0}).animate({"opacity":1.0}, 800);
		break;
		default:
		break;
		}
	},
	update_breadcrumb: function(extra_content){
		$("#right_content_load #header_breadcrumb").html("").remove();
		var tempPrimary = $(".left_content_header.active");
		var tempSecondary = $(".left_content_secondary_header.active");
		var temp;
		$("#right_content_load").prepend("<div id='header_breadcrumb'></div>");
		if((tempPrimary.text()) && (tempPrimary.text() != "") && (tempPrimary.text() != " ")){
		temp = $("<div class='header_breadcrumb'>" + tempPrimary.text().replace(/\u00a0/g, "") + "</div>");
		temp.click(function(){
		tempPrimary.addClass("noToggle");
		tempPrimary.click();
		});
		$("#header_breadcrumb").append(temp);
		}
		if((tempSecondary.text()) && (tempSecondary.text() != "") && (tempSecondary.text() != " ")){
		temp = $("<div class='header_breadcrumb'>" + tempSecondary.text().replace(/\u00a0/g, "") + "</div>");
		temp.click(function(){
		tempSecondary.click();
		});
		$("#header_breadcrumb").append(temp);
		}
		if(extra_content){
		$("#header_breadcrumb").append("<div class='header_breadcrumb header_breadcrumb_extra'>" + extra_content + "</div>");
		}
		$("#header_breadcrumb .header_breadcrumb").not($("#header_breadcrumb .header_breadcrumb").last()).after("<div style='float:left;'>&gt;</div>");
		$("#header_breadcrumb .header_breadcrumb").last().css({"color":"#1aaf5d"});
		$("#header_breadcrumb .header_breadcrumb").last().unbind();
		$("#header_breadcrumb").append("<div class='spclear'></div>");
	},
	checkbox_init_button_status: function(checkall, checkbox, button_holder){
		checkall = checkall ? checkall : $("#right_content_load .checkall");
		checkbox = checkbox ? checkbox : $("#right_content_load .custom_checkbox").not(".checkall");
		button_holder = button_holder ? button_holder : $("#right_content_load");
		var tempLength = checkbox.length;
		checkbox.each(function(){
		$(this).change(function(){
		temp_get_checked_length_and_imply_status();
		});
		});
		checkall.change(function(){
		temp_get_checked_length_and_imply_status();
		});
		function temp_get_checked_length_and_imply_status(){
		var tempCheckedLength = 0;
		for(var i = 0; i < tempLength; i++){
		if(checkbox.eq(i).is(':checked')){
		tempCheckedLength++;
		}
		}
		switch(true) {
		case tempCheckedLength == 0:
			button_holder.find("[data-view-status='select-only-one']").attr("disabled", "disabled");
			button_holder.find("[data-view-status='select-more-than-or-one']").attr("disabled", "disabled");
		   break;
		case tempCheckedLength == 1:
			button_holder.find("[data-view-status='select-only-one']").removeAttr("disabled");
			button_holder.find("[data-view-status='select-more-than-or-one']").removeAttr("disabled");
			break;
		case tempCheckedLength > 1:
			button_holder.find("[data-view-status='select-only-one']").attr("disabled", "disabled");
			button_holder.find("[data-view-status='select-more-than-or-one']").removeAttr("disabled");
			break;
		default:
		break;
		}
		}
		temp_get_checked_length_and_imply_status();
	},
	checkbox_toggle: function(checkall, checkbox){
		checkall = checkall ? checkall : $("#right_content_load .checkall");
		checkbox = checkbox ? checkbox : $("#right_content_load .custom_checkbox").not(".checkall");
		var tempLength = checkbox.length;
		var tempCheckedLength = 0;
		for(var i = 0; i < tempLength; i++){
		if(checkbox.eq(i).is(':checked')){
		tempCheckedLength++;
		}
		}
		if((tempLength > 0) && (tempLength == tempCheckedLength)){
		checkall.prop("checked", true);
		}
		checkbox.each(function(){
		$(this).change(function(){
		var tempCheckedLength = 0;
		for(var i = 0; i < tempLength; i++){
		if(checkbox.eq(i).is(':checked')){
		tempCheckedLength++;
		}
		}
		if((tempLength > 0) && (tempLength == tempCheckedLength)){
		checkall.addClass("passiveMode").prop("checked", true);
		}
		else{
		checkall.prop("checked", false).removeClass("passiveMode");
		}
		});
		});
		checkall.change(function(){
		if(!checkall.hasClass("passiveMode")){
		if((checkall.is(':checked')) == true){
		checkbox.prop("checked", true);
		}
		else{
		checkbox.prop("checked", false);
		}
		}
		});
	},
	table_sortable: function(target, exclusives){
		target = target ? target : $("#right_content_load table.data-view-sortable");
		exclusives = exclusives ? exclusives : $("#right_content_load table.data-view-sortable thead th").eq(0);
		target.attr("data-sortable", "");
		exclusives.attr("data-sortable", "false").addClass("no-sortable");
		target = target.get(0);
		Sortable.initTable(target);
	},
	color_text: function(object, volume, capacity, palette){
		palette = palette ? palette : ["red", "yellow", "grey", "#1aaf5d"];
		var tempIndex = palette.length;
		var index = Math.floor((volume / capacity) * (tempIndex));
		if(index > (tempIndex - 1)){
		index = tempIndex - 1;
		}
		object.css({"color":palette[index]});
	},
	count_number: function(object, duration, callback){
	duration = duration ? duration : 4000;
    object.prop('counter',0).animate({
        counter: object.text()
    }, {
        duration: duration,
        easing: 'swing',
        step: function (now) {
			now = Math.ceil(now);
			now = now.toString();
			now = now.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            object.text(now);
        },
		complete: function(){
		if(typeof callback == "function"){
		callback();
		}
		}
    });
	},
	modal_message: function(text, callback){
		$("#modal_general").modal('hide');
		$("#modal_message .modal-body").html(text);
		$("#modal_message").modal({backdrop: "static"});
		if(typeof callback == "function"){
		callback();
		}
	},
	get_modal: function(url, parameter, callback){
		$("#modal_message").modal('hide');
		var tempHTML = "<div class='modal-header'><span class='view-modal-header-logo'></span></div><div class='modal-body' style='text-align:center;padding:16px 8px;'><div style='position:relative;margin:32px auto;width:48px;height:48px;background:transparent url(image/preloader_719.gif) top left no-repeat;'></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button></div></div>";
		$("#modal_general .modal-content").html("").html(tempHTML);
		$("#modal_general").modal({backdrop: "static"});
		loader.load_general($("#modal_general .modal-content"), url, parameter, callback);
	},
	modal_confirm_delay_show: function(){
		var tempHTML = "<div class='modal-header'><span class='view-modal-header-logo'></span></div><div class='modal-body' style='text-align:center;padding:16px 8px;'><div style='position:relative;margin:32px auto;width:48px;height:48px;background:transparent url(image/preloader_719.gif) top left no-repeat;'></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal' disabled>正在等待响应</button></div></div>";
		$("#modal_message").modal('hide');
		$("#modal_general .modal-content").html(tempHTML);
		$("#modal_general").modal({backdrop: "static"});
	},
	modal_confirm_delay_confirm: function(string, url, parameter){
		switch(true){
		case string == 'success':
		string = "<p style='font-size:15px;'><span class='glyphicon glyphicon-ok-sign' style='color:#1aaf5d;'></span>&nbsp;&nbsp;保存成功</p>";
		break;
		case string == 'fail':
		string = "<p style='font-size:15px;'><span class='glyphicon glyphicon-remove-sign' style='color:#ff3333;'></span>&nbsp;&nbsp;保存失败，请尝试重新操作</p>";
		break;
		}
		this.modal_message(string);
		if(url){
		if(url == 'refresh'){
		cookie.get_cookie_and_click_left_menu();
		}
		else if(typeof url == "string"){
		view.show_preloader();
		loader.load_general("#right_content_load", url, parameter, function(){
		view.show_load_content();
		});
		}
		}
	},
	load_error: function(parameter){
	$("#right_content_load").stop().css({"opacity":0.0}).animate({"opacity":1.0}, 800);
	var string = "<p style='font-size:15px;' class='text-muted'><span class='glyphicon glyphicon-question-sign' ></span>&nbsp;&nbsp;加载资源失败，请尝试重新操作</p>";
	this.modal_message(string);
	}
};
});