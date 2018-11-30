$(document).ready(function(){

	function supportsTransitions() {
    var b = document.body || document.documentElement,
        s = b.style,
        p = 'transition';

    if (typeof s[p] == 'string') { return true; }

    // Tests for vendor specific prop
    var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
    p = p.charAt(0).toUpperCase() + p.substr(1);

    for (var i=0; i<v.length; i++) {
        if (typeof s[v[i] + p] == 'string') { return true; }
    }
    return false;
	}
	
	$(window).resize(function(){
	var Browser_Flag = 0;
	var tempHeight, tempWidth;
	if($.browser.msie == true){
	if($.browser.versionNumber < 9){
	Browser_Flag = 1;
	}
	}
	tempHeight = Browser_Flag == 0 ? window.innerHeight : $(window).height();
	$("#left_content, #right_content").css("height", tempHeight+"px");
	tempWidth = $(window).width();
	tempWidth = tempWidth > 1200 ? tempWidth : 1200;
	
	$("#right_content").css("width", (tempWidth - 200)+"px");
	tempWidth = $("#left_content_inner").width();
	$("#left_bottom_dec").css("width", tempWidth+"px");
	tempHeight = tempHeight - 30;
	$("#left_content_inner").css({"min-height":tempHeight+"px"});
	tempHeight = Browser_Flag == 0 ? window.innerHeight : $(window).height();
	$("#right_content_preload").css({"height":(tempHeight - 64)+"px", "width":($("#right_content_header").width()), "top":56+"px", "left":6+"px"});
	$("#right_content_preload_svg_holder").css({"left":(($("#right_content_header").width() - 120) / 2) + "px"});
	});
	$(window).resize();
	
	var tempArray = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
	var tempDate = new Date();
	var tempOutput = tempDate.getFullYear() + "-" + (tempDate.getMonth() + 1) + "-" + tempDate.getDate() + " " + tempArray[tempDate.getDay() - 1];
	$("#header_activity_panel .header_activity_panel_content").eq(0).find(".fillin").text(tempOutput);
	
	var transition_flag = supportsTransitions();
	
	var slider = $('#activity_slider').bxSlider({
    mode: 'vertical',
    slideWidth: 370,
    minSlides: 1,
    slideMargin: 0,
	moveSlides: 1,
	speed: transition_flag ? 500 : 300,
	pause: 5000,
	useCSS: transition_flag,
	easing: transition_flag ? 'cubic-bezier(.46,-0.91,.45,1.61)' : 'linear',
	infiniteLoop: true,
	controls: false,
	pager: false,
	auto: true,
	autoHover: true
	});
  
	view.add_scrollbar($("#left_content"));
	if(data.left_menu_list){
	binder.bind_menu_effect();
	binder.bind_left_menu(data.left_menu_list, function(){view.show_preloader();}, function(){
	view.update_breadcrumb();
	view.show_load_content();
	});
	binder.update_left_menu(function(){view.show_preloader();}, function(){
	view.update_breadcrumb();
	view.show_load_content();
	});
	}
});