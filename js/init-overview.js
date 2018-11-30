$(document).ready(function(){
var disabled_overview = false;
var tempWidth = $("#right_content_load").width();
$(".chart_wrapper").eq(0).css({"height":((tempWidth / 2) + "px"), "width": (tempWidth+"px")});
$("#overview_disable_panel").css({"height":((tempWidth / 2) + "px"), "width": (tempWidth+"px")});
$("#overview_disable_panel_fixed_margin").css({"margin-top":((tempWidth / 4) - 90) + "px"});
function toggle_map(flag){
if(flag == 'world'){
view.overview.draw_world_map($(".chart_wrapper").get(0));
}
else if(flag == 'china'){
view.overview.draw_china_map($(".chart_wrapper").get(0));
}
view.overview.update_overview_map(flag);
$("#overview_map_countdown_fill").text("30");
timer.overview.map_chart = window.setInterval(function(){
var temp = parseInt($("#overview_map_countdown_fill").text());
temp = (temp - 1) < 0 ? 30 : temp - 1;
$("#overview_map_countdown_fill").hide().text(temp).fadeIn(800);
if(temp == 30){
view.overview.update_overview_map(flag);
}
}, 1000);
$("#right_content_main .chart_wrapper, #overview_attack_account_panel").hide().fadeIn();
}
timer.overview.rotate_countdown = window.setInterval(function(){
data.overview.attack_log_rotate_angle = data.overview.attack_log_rotate_angle + 2;
$("#overview_map_countdown_2").rotate(data.overview.attack_log_rotate_angle);
}, 30);
$('#overview_map_toggle input').unbind().bootstrapToggle({
      on: '世界地图',
      off: '中国地图'
}).change(function(){
if(disabled_overview == true){
dispatcher.dispatch_timer(timer.overview);
dispatcher.dispatch_chart(chart.map_chart);
view.overview.draw_world_map($(".chart_wrapper").get(0));
$("#overview_disable_panel").show();
}
else{
dispatcher.dispatch_timer(timer.overview.map_chart);
dispatcher.dispatch_chart(chart.map_chart);
if($(this).is(":checked") == true){
toggle_map('world');
}
else{
toggle_map('china');
}
$("#overview_disable_panel").hide();
}
}).prop('checked', true).change();
$(".content_float_wrapper").css({width:(tempWidth+"px")});
tempWidth = tempWidth *(3 / 7);
$(".content_float_wrapper").find(".content_float").css({"width":(tempWidth+"px"), "height":((tempWidth - 50) +"px"), "margin-right":"20px"});
tempWidth = ($("#right_content_load").width() *(4 / 7)) - 25;
$(".content_float_wrapper").find(".content_float").eq(1).css({"width":(tempWidth+"px"), "margin-right":"0px"});
tempWidth = $("#right_content_load").width();
tempWidth = tempWidth *(3 / 7);
$(".content_float_wrapper").find(".chart_wrapper").eq(0).css({"width":(tempWidth - 30)+"px", "height":(((tempWidth - 30)*3 / 4) + "px")});
view.overview.draw_countLevelOfUser($(".content_float_wrapper").find(".chart_wrapper").get(0));
view.add_scrollbar($("#listLowScoreOfUser").parent());
view.overview.get_listLowScoreOfUser();
view.add_scrollbar($("#overview_log_panel .fillin_wrapper"), {
scrollbarPosition:"inside",
autoHideScrollbar:false
});
//timer.overview.attack_log = window.setInterval(function(){
view.overview.update_attack_log();
view.overview.update_attack_log();
view.overview.update_attack_log();
//}, 5000);
view.overview.get_attack_account();
});