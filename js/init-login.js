$(document).ready(function(){
	$(window).resize(function(){
		var Browser_Flag = View_Login_Affix_Flag = 0;
		var tempHeight, tempWidth, tempMarginTop;
		if($.browser.msie == true){
		if($.browser.versionNumber < 10){
		View_Login_Affix_Flag = 1;
		}
		if($.browser.versionNumber < 9){
		Browser_Flag = 1;
		}
		}
		tempHeight = Browser_Flag == 0 ? window.innerHeight : $(window).height();
		tempHeight = tempHeight > 650 ? tempHeight : 650;
		tempWidth = $(window).width();
		tempWidth = tempWidth > 1280 ? tempWidth : 1280;
		$("#login_wrapper").css({"height":tempHeight+"px", "width":tempWidth});
		tempHeight = tempHeight - $("#login_header").outerHeight() - $("#login_footer").outerHeight() - 12;
		$("#login_main").css({"height":tempHeight+"px"});
	
		tempMarginTop = ((tempHeight - $("#login_form").height()) / 2) - 30;
		$("#login_main").css({"padding-top":tempMarginTop+"px"});
	});
	$(window).resize();

	function draw_login_matrix_text(canvas){
	var iniX, iniY, cenX, cenY;
	iniX = $("#login_wrapper").width();
	iniY = $("#login_wrapper").height();
	cenX = iniX / 2;
	cenY = iniY / 2;
	orbR = iniY*3/10;
	canvas.clearRect(0, 0, iniX, iniY);
	canvas.restore();
	function drawText(ctx){
		var tam_letra = 18;
		var columna = new Array();
			total_columnas =  Math.round(iniX / tam_letra);
			for (var i = 0; i < total_columnas; i++) {
				columna[i] = 300;
			}
		window.setInterval(dibujar, 85);
		function dibujar(){
			ctx.fillStyle = "rgba(38, 38, 38, 0.05)";
			ctx.fillRect(0, 0, iniX, iniY);
						ctx.fillStyle = "rgb(26, 175, 93)";
						ctx.font = tam_letra + "px Arial";
						for (var i = 0; i < columna.length; i++) {
							ctx.fillText(texto_aleatorio(), (i*tam_letra), (columna[i]*tam_letra));
							if ((columna[i] * tam_letra) > iniY && Math.random() > 0.975) {
								columna[i] = 0;
							}
							columna[i]++;
						}
		}
			function texto_aleatorio(){
				return String.fromCharCode(parseInt(Math.floor((Math.random() * 94) + 33)));
			}
	}
	drawText(canvas);
	}
	$("#login_wrapper").prepend("<canvas id='canvas_login_wall' style='position:absolute;top:0;left:0;'></canvas>");
	$("#canvas_login_wall").attr({"width":$("#login_wrapper").width(), "height":$("#login_wrapper").height()});
	var canvas_wall = $("#canvas_login_wall")[0].getContext('2d');
	draw_login_matrix_text(canvas_wall);
	
	$("#login_form .form-group .view-login-input").focus(function(){
	$("#login_form .form-group .view-inner-icon-prefix").css({"color":"#737373"});
	$(this).parent().find(".view-inner-icon-prefix").css({"color":"#1aaf5d"});
	$("#login_form .form-group .view-inner-icon-affix").fadeOut(200);
	$(this).parent().find(".view-inner-icon-affix").fadeIn(200);
	});
	$("#login_form .form-group .view-login-input").blur(function(){
	$("#login_form .form-group .view-inner-icon-prefix").css({"color":"#737373"});
	$("#login_form .form-group .view-inner-icon-affix").fadeOut(200);
	});
	$("#login_form .form-group .view-inner-icon-affix").click(function(){
	$(this).parent().find(".view-login-input").val("");
	$(this).parent().find(".view-login-input").focus();
	});
});