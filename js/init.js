//--------------------------------------------------------------------
var realtime = {};
var attack_map_stack = [];
var realtime_configuration = {
high_effect:false,
attack_account_today:0,
attack_account_total:0,
attack_log_stack_limit:50,
attack_map_stack_limit:30,
country_panel_limit:5
};
var province = "浙江_fix";
var laterality = ['济南', '福建', '武都', '周口', '麻阳'];
var animateAttackLog = true;
var country_code = {"安道尔":"AD",
"阿联酋":"AE",
"阿富汗":"AF",
"安提瓜和巴布达":"AG",
"安圭拉":"AI",
"阿尔巴尼亚":"AL",
"亚美尼亚":"AM",
"安哥拉":"AO",
"南极洲":"AQ",
"阿根廷":"AR",
"美属萨摩亚":"AS",
"奥地利":"AT",
"澳大利亚":"AU",
"阿鲁巴":"AW",
"奥兰群岛":"AX",
"阿塞拜疆":"AZ",
"波黑":"BA",
"巴巴多斯":"BB",
"孟加拉":"BD",
"比利时":"BE",
"布基纳法索":"BF",
"保加利亚":"BG",
"巴林":"BH",
"布隆迪":"BI",
"贝宁":"BJ",
"圣巴泰勒米岛":"BL",
"百慕大":"BM",
"文莱":"BN",
"玻利维亚":"BO",
"荷兰加勒比区":"BQ",
"巴西":"BR",
"巴哈马":"BS",
"不丹":"BT",
"布韦岛":"BV",
"博茨瓦纳":"BW",
"白俄罗斯":"BY",
"伯利兹":"BZ",
"加拿大":"CA",
"科科斯群岛":"CC",
"中非":"CF",
"瑞士":"CH",
"智利":"CL",
"喀麦隆":"CM",
"哥伦比亚":"CO",
"哥斯达黎加":"CR",
"古巴":"CU",
"佛得角":"CV",
"圣诞岛":"CX",
"塞浦路斯":"CY",
"捷克":"CZ",
"德国":"DE",
"吉布提":"DJ",
"丹麦":"DK",
"多米尼克":"DM",
"多米尼加":"DO",
"阿尔及利亚":"DZ",
"厄瓜多尔":"EC",
"爱沙尼亚":"EE",
"埃及":"EG",
"西撒哈拉":"EH",
"厄立特里亚":"ER",
"西班牙":"ES",
"芬兰":"FI",
"斐济群岛":"FJ",
"马尔维纳斯群岛":"FK",
"密克罗尼西亚联邦":"FM",
"法罗群岛":"FO",
"法国":"FR",
"加蓬":"GA",
"格林纳达":"GD",
"格鲁吉亚":"GE",
"法属圭亚那":"GF",
"加纳":"GH",
"直布罗陀":"GI",
"格陵兰":"GL",
"几内亚":"GN",
"瓜德罗普":"GP",
"赤道几内亚":"GQ",
"希腊":"GR",
"南乔治亚岛和南桑威奇群岛":"GS",
"危地马拉":"GT",
"关岛":"GU",
"几内亚比绍":"GW",
"圭亚那":"GY",
"香港":"HK",
"赫德岛和麦克唐纳群岛":"HM",
"洪都拉斯":"HN",
"克罗地亚":"HR",
"海地":"HT",
"匈牙利":"HU",
"印尼":"ID",
"爱尔兰":"IE",
"以色列":"IL",
"马恩岛":"IM",
"印度":"IN",
"英属印度洋领地":"IO",
"伊拉克":"IQ",
"伊朗":"IR",
"冰岛":"IS",
"意大利":"IT",
"泽西岛":"JE",
"牙买加":"JM",
"约旦":"JO",
"日本":"JP",
"柬埔寨":"KH",
"基里巴斯":"KI",
"科摩罗":"KM",
"科威特":"KW",
"开曼群岛":"KY",
"黎巴嫩":"LB",
"列支敦士登":"LI",
"斯里兰卡":"LK",
"利比里亚":"LR",
"莱索托":"LS",
"立陶宛":"LT",
"卢森堡":"LU",
"拉脱维亚":"LV",
"利比亚":"LY",
"摩洛哥":"MA",
"摩纳哥":"MC",
"摩尔多瓦":"MD",
"黑山":"ME",
"法属圣马丁":"MF",
"马达加斯加":"MG",
"马绍尔群岛":"MH",
"马其顿":"MK",
"马里":"ML",
"缅甸":"MM",
"澳门":"MO",
"马提尼克":"MQ",
"毛里塔尼亚":"MR",
"蒙塞拉特岛":"MS",
"马耳他":"MT",
"马尔代夫":"MV",
"马拉维":"MW",
"墨西哥":"MX",
"马来西亚":"MY",
"纳米比亚":"NA",
"尼日尔":"NE",
"诺福克岛":"NF",
"尼日利亚":"NG",
"尼加拉瓜":"NI",
"荷兰":"NL",
"挪威":"NO",
"尼泊尔":"NP",
"瑙鲁":"NR",
"阿曼":"OM",
"巴拿马":"PA",
"秘鲁":"PE",
"法属波利尼西亚":"PF",
"巴布亚新几内亚":"PG",
"菲律宾":"PH",
"巴基斯坦":"PK",
"波兰":"PL",
"皮特凯恩群岛":"PN",
"波多黎各":"PR",
"巴勒斯坦":"PS",
"帕劳":"PW",
"巴拉圭":"PY",
"卡塔尔":"QA",
"留尼汪":"RE",
"罗马尼亚":"RO",
"塞尔维亚":"RS",
"俄罗斯":"RU",
"卢旺达":"RW",
"所罗门群岛":"SB",
"塞舌尔":"SC",
"苏丹":"SD",
"瑞典":"SE",
"新加坡":"SG",
"斯洛文尼亚":"SI",
"斯瓦尔巴群岛和扬马延岛":"SJ",
"斯洛伐克":"SK",
"塞拉利昂":"SL",
"圣马力诺":"SM",
"塞内加尔":"SN",
"索马里":"SO",
"苏里南":"SR",
"南苏丹":"SS",
"圣多美和普林西比":"ST",
"萨尔瓦多":"SV",
"叙利亚":"SY",
"斯威士兰":"SZ",
"特克斯和凯科斯群岛":"TC",
"乍得":"TD",
"多哥":"TG",
"泰国":"TH",
"托克劳":"TK",
"东帝汶":"TL",
"突尼斯":"TN",
"汤加":"TO",
"土耳其":"TR",
"图瓦卢":"TV",
"坦桑尼亚":"TZ",
"乌克兰":"UA",
"乌干达":"UG",
"美国":"US",
"乌拉圭":"UY",
"梵蒂冈":"VA",
"委内瑞拉":"VE",
"英属维尔京群岛":"VG",
"美属维尔京群岛":"VI",
"越南":"VN",
"瓦利斯和富图纳":"WF",
"萨摩亚":"WS",
"也门":"YE",
"马约特":"YT",
"南非":"ZA",
"赞比亚":"ZM",
"津巴布韦":"ZW",
"中国":"CN",
"刚果（布）":"CG",
"刚果（金）":"CD",
"莫桑比克":"MZ",
"根西岛":"GG",
"冈比亚":"GM",
"北马里亚纳群岛":"MP",
"埃塞俄比亚":"ET",
"新喀里多尼亚":"NC",
"瓦努阿图":"VU",
"法属南部领地":"TF",
"纽埃":"NU",
"美国本土外小岛屿":"UM",
"库克群岛":"CK",
"英国":"GB",
"特立尼达和多巴哥":"TT",
"圣文森特和格林纳丁斯":"VC",
"台湾":"TW",
"新西兰":"NZ",
"沙特阿拉伯":"SA",
"老挝":"LA",
"朝鲜":"KP",
"韩国":"KR",
"葡萄牙":"PT",
"吉尔吉斯斯坦":"KG",
"哈萨克斯坦":"KZ",
"塔吉克斯坦":"TJ",
"土库曼斯坦":"TM",
"乌兹别克斯坦":"UZ",
"圣基茨和尼维斯":"KN",
"圣皮埃尔和密克隆":"PM",
"圣赫勒拿":"SH",
"圣卢西亚":"LC",
"毛里求斯":"MU",
"科特迪瓦":"CI",
"肯尼亚":"KE",
"蒙古国 蒙古":"MN"
};

var view=dispatcher=data=binder=loader=preloader=cookie=validator=chart={};
var timer={};
var timer_restart = {query_restart: 0};
var timer_query_stack = [];
var echarts_theme_green, echarts_theme_blue, echarts_theme_dark, echarts_theme_macarons;
var svg_preloader = {};
var init_login = init_main = {};
var manifest_main = [];
function receiveMessage(data) {
// var msg = decodeURIComponent(data.msg.replace(/\+/g, "%20"));
// var tempObj = jQuery.parseJSON(msg);
tempObj = jQuery.parseJSON(data);
var attack_origin_data = {
source:tempObj.attack_origin_data.ipAddress,
target:tempObj.attack_origin_data.machineIpAddress,
value:10,
lifetime:5+ Math.floor(Math.random() * 10)
};
if(tempObj.attack_source_list && tempObj.attack_target_list){
var attack_panel = {
attack_source_list:tempObj.attack_source_list,
attack_target_list:tempObj.attack_target_list
};
realtime.update_country_panel(attack_panel);
}
realtime.update_realtime_map(attack_origin_data);
if(tempObj.attack_daycount && tempObj.attack_allcount){
realtime.update_attack_account(tempObj.attack_daycount, tempObj.attack_allcount);
}
realtime.update_attack_log(tempObj.attack_origin_data);
}
//--------------------------------------------------------------------
$(document).ready(function(){
	dispatcher = {
		dispatch_property: function(obj, callback){
		if(!obj) return true;
		try{
		delete obj;
		}
		catch(e){
		obj = null;
		}
		if(callback){
		callback();
		}
		return true;
		},
		dispatch_timer: function(){
		for(var i = 0; i < arguments.length; i++){
		if(typeof arguments[i] == "object"){
		for(var prop in arguments[i]){
		window.clearInterval(arguments[i][prop]);
		arguments[i][prop] = function(){};
		}
		}
		else{
		window.clearInterval(arguments[i]);
		arguments[i] = function(){};
		}
		}
		},
		dispatch_chart: function(obj, callback){
		if(!obj) return true;
		if((typeof obj.dispose) == "function"){
		obj.dispose();
		this.dispatch_property(obj, callback);
		}
		},
		dispatch_jquery_dom: function(dom){
		dom.remove();
		}
	};
	//------------------------------resize
	$(window).resize(function(){
	var Browser_Flag = 0;
	var tempHeight, tempWidth;
	if($.browser.msie == true){
	if($.browser.versionNumber < 9){
	Browser_Flag = 1;
	}
	}
	tempHeight = Browser_Flag == 0 ? window.innerHeight : $(window).height();
	tempHeight = tempHeight > 600 ? tempHeight : 600;
	$("#main_wrapper").css("height", tempHeight+"px");
	tempWidth = $(window).width();
	tempWidth = tempWidth > 1200 ? tempWidth : 1200;
	$("#main_wrapper").css("width", tempWidth+"px");
	
	$("#main_middle").css("width", (tempWidth - ($("#main_left").width() + $("#main_left").width() + 40)) + "px");
	
	$("#main_middle .chart_wrapper, #main_chart_border").css({"width": $("#main_middle").width() + "px", "height":((tempWidth - ($("#main_left").width() + $("#main_left").width() + 80))*(4/8)) + "px"});
	
	$("#main_left .chart_wrapper").css({"width":"300px", "height":"200px"});
	});
	$(window).resize();
	//---------------------------------
	$("#main_left .background-grid").css({"top":$("#main_left p").eq(0).outerHeight(true)+"px"});
	$("#top_10_attacked .table").css({"height":(50* realtime_configuration.country_panel_limit) + "px"});
	$("#top_10_attacker .table").css({"height":(50* realtime_configuration.country_panel_limit) + "px"});
	$("#province_ranking .table").css({"height":(50* 11) + "px"});
	
	$("#model_select .model_select[data-type=china]").click(function(){
	$("#model_select .model_select").removeClass("active");
	$(this).addClass("active");
	$("#main_middle .chart_wrapper").eq(1).hide();
	$("#main_middle .chart_wrapper").eq(0).fadeIn(500);
	$("#province_ranking").hide();
	$("#top_10_attacked, #top_10_attacker").fadeIn(500);
	});
	$("#model_select .model_select[data-type=province]").click(function(){
	$("#model_select .model_select").removeClass("active");
	$(this).addClass("active");
	$("#main_middle .chart_wrapper").eq(0).hide();
	$("#main_middle .chart_wrapper").eq(1).fadeIn(500);
	$("#province_ranking").fadeIn(500);
	$("#top_10_attacked, #top_10_attacker").hide();
	realtime.draw_province_realtime_map($("#main_middle .chart_wrapper").get(1), province);
	realtime.update_province_panel();
	});
	//--------------------------------------时间日期
	var tempArray = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
	var tempDate = new Date();
	var tempOutput = tempDate.getFullYear() + "-" + (tempDate.getMonth() + 1) + "-" + tempDate.getDate() + " " + tempArray[tempDate.getDay() - 1];
	$("#header_date .header_date").eq(0).html(tempOutput);
	
	var tempTime,tempH,tempM,tempS;
	tempH = tempDate.getHours() > 9 ? tempDate.getHours() : "0" + tempDate.getHours();
	tempM = tempDate.getMinutes() > 9 ? tempDate.getMinutes() : "0" + tempDate.getMinutes();
	tempS = tempDate.getSeconds() > 9 ? tempDate.getSeconds() : "0" + tempDate.getSeconds();
	tempTime = tempH + " : " + tempM + " : " + tempS;
	$("#header_date .header_time").eq(0).html(tempTime);
	//-----------------------------------------------天气
	function requestWeather(){
	$.ajax({
	type: "GET",
	beforeSend: function (request)
	{
		request.setRequestHeader("apikey", '05fbb3a62e5d4d5de6535169f326ba02');
	},
	url: "http://apis.baidu.com/apistore/weatherservice/weather?citypinyin=beijing",
	dataType: "json",
	success: function(data){
	var temp = data.retData;
	var tempHTML = $("<span>"+temp.city+"</span>"+"<span> "+temp.temp+" &#8451;</span>"+"<span> "+temp.weather+"</span>"+"<span>&nbsp;&nbsp;&nbsp;</span>"+"<span>  "+temp.l_tmp+" &#8451;</span>"+"<span> ~ "+temp.h_tmp+" &#8451;</span>");
	$("#header_weather p").html("").html(tempHTML);
	}
	});
	}
	//-----------------------------------------scrollbar
	function add_scrollbar(holder, para){
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
	}
	add_scrollbar($("#overview_log_panel .fillin_wrapper"), {
	scrollbarPosition:"inside",
	autoHideScrollbar:false
	});
	//-----------------------------------------
	realtime = {
	//--------------------------------------------draw_realtime_map
	draw_realtime_map: function(wrapper){
    chart.map_chart = echarts.init(wrapper, echarts_theme_blue);
	window.onresize = chart.map_chart.resize;
	var min = 0;
	var max = 100;
	var option = {
    tooltip : {
        trigger: 'item',
        formatter: '{b}'
    },
	animation:true,
	animationDuration:3000,
	animationDurationUpdate:2500,
    series : [
        {
            type: 'map',
			roam: false,
            hoverable: false,
            mapType: 'china',
			mapLocation: {
			                x: 'center'
			            },
            itemStyle:{
                normal:{
                    borderColor:'#101e3c',
                    borderWidth:0.5,
                    areaStyle:{
                        color: '#6084d2'
                    }
                }
            },
            data:[],
            markLine : {
                effect: {
                color: 'rgba(204, 246, 255, 1)',
                show: true,
                period: 20
            },
            bundling: {
                enable: false
            },
            //large: true,
            smooth: true,
            smoothness: 0,
            symbol: ['none', 'none'],
            itemStyle: {
                normal: {
					label:{show:false,position:'top',
						 formatter:'{b}',
						 },
                    lineStyle: {
                        color: 'rgba(2, 166, 253, 0.05)',
                        type: 'solid',
                        width: 0.5,
                        opacity: 0.2
                    }
                }
            },
                data : []
            },
			markPoint : {
                symbol:'emptyCircle',
				symbolSize:10,
                effect : {
                    show: true,
                    shadowBlur : 0,
					color : 'rgba(69,110,197,0.3)'
                },
                itemStyle:{
                    normal:{
								 label:{show:false,position:'top',
								 formatter:'{b}'
								 }
			                },
			                emphasis: {
								 label:{show:false,position:'top'}
			                }
                },
                data : []
            },
			geoCoord: data.china_geo
        },
		{
			type: 'map',
			roam: false,
            hoverable: false,
            mapType: 'china',
			mapLocation: {
			                x: 'center'
			            },
            data:[],
			markPoint : {
                symbol:'circle',
                symbolSize : 3,
                effect : {
                    show: false,
                    shadowBlur : 0
                },
                itemStyle:{
                    normal:{
								color:'#FF9900',
								 label:{show:false,position:'top',
								 formatter:'{b}'
								 }
			                },
			                emphasis: {
								 label:{show:false,position:'top'}
			                }
                },
                data : []
            },
			geoCoord: data.china_geo
        },
		{
			type: 'map',
			roam: false,
            hoverable: false,
            mapType: 'china',
			mapLocation: {
			                x: 'center'
			            },
            data:[],
			markPoint : {
                symbol:'emptyCircle',
				symbolSize:10,
                effect : {
                    show: true,
                    shadowBlur : 0,
					color : 'rgba(69,110,197,0.3)'
                },
                itemStyle:{
                    normal:{
								 label:{show:false,position:'top',
								 formatter:'{b}'
								 }
			                },
			                emphasis: {
								 label:{show:false,position:'top'}
			                }
                },
                data : []
            },
			// markPoint : {
                // symbol:'emptyCircle',
                // symbolSize : 10,
                // effect : {
                    // show: false,
                    // shadowBlur : 0
                // },
                // itemStyle:{
                    // normal:{
								// color:'#fff',//fde602
								 // label:{show:false,position:'top',
								 // formatter:'{b}'
								 // }
			                // },
			                // emphasis: {
								 // label:{show:false,position:'top'}
			                // }
                // },
                // data : []
            // },
			geoCoord: data.china_geo
        },
		{
			type: 'map',
			roam: false,
            hoverable: false,
            mapType: 'china',
			mapLocation: {
			                x: 'center'
			            },
            data:[],
			markPoint : {
                symbol:'circle',
                symbolSize : 3,
                effect : {
                    show: false,
                    shadowBlur : 0
                },
                itemStyle:{
                    normal:{
								color: function(node){
								if(node.data && node.data.name && (laterality.indexOf(node.data.name) != -1)){
								return '#ff0000';
								}
								else{
								return '#99CC00';
								}
								},
								 label:{show:false,position:'top',
								 formatter:'{b}'
								 }
			                },
			                emphasis: {
								 label:{show:false,position:'top'}
			                }
                },
                data : []
            },
			geoCoord: data.china_geo
        }
    ]
	};
	chart.map_chart.setOption(option);
	},
	draw_province_realtime_map: function(wrapper, province){
	dispatcher.dispatch_chart(chart.map_chart_province);
    chart.map_chart_province = echarts.init(wrapper, echarts_theme_blue);
	window.onresize = chart.map_chart_province.resize;
	var option = {
    tooltip : {
        trigger: 'item',
        formatter: '{b} : {c}'
    },
	dataRange: {
        min: 0,
        max: 1000,
        color:['#ffff00','#99ff33'],
        text:['高','低'],           // 文本，默认为数值文本
        calculable : false,
		show: false
    },
    series : [
        {
            type: 'map',
			roam: false,
            hoverable: false,
            mapType: province,
			 mapLocation: {
                x: 'left'
            },
			mapLocation: {
			                x: 'center'
			            },
            itemStyle:{
                normal:{
					label:{show:true,
					textStyle: {
					color: '#101e3c'
					}
					},
                    borderColor:'#101e3c',
                    borderWidth:0.5,
                    areaStyle:{
                        color: '#6084d2'
                    }
                }
            },
            data:[
           {name: '杭州市',value: Math.round(Math.random()*1000)},
            {name: '温州市',value: Math.round(Math.random()*1000)},
            {name: '宁波市',value: Math.round(Math.random()*1000)},
            {name: '舟山市',value: Math.round(Math.random()*1000)},
            {name: '台州市',value: Math.round(Math.random()*1000)},
            {name: '金华市',value: Math.round(Math.random()*1000)},
            {name: '衢州市',value: Math.round(Math.random()*1000)},
            {name: '绍兴市',value: Math.round(Math.random()*1000)},
            {name: '嘉兴市',value: Math.round(Math.random()*1000)},
            {name: '湖州市',value: Math.round(Math.random()*1000)},
			{name: '丽水市',value: Math.round(Math.random()*1000)},
        ],
			geoCoord: data.china_geo
        }
    ]
	};
	chart.map_chart_province.setOption(option);
	},
	//-------------------------------------------left 1
	draw_left_1: function(wrapper){
	dispatcher.dispatch_chart(chart.draw_left_1);
 
	var url = "fake-data/left-1.php";
 		 $.ajax({
         	type: "post",
         	url: url,
       	 	dataType: "json",
        	success: function(data){
			chart.draw_left_1 = echarts.init(wrapper);
				var option = {
					grid:{
					x:0,
					y:0,
					x2:30,
					y2:30,
					borderWidth:0
					},
					color: ['#999999', '#fde602'],
					tooltip : {
					formatter: '{c}',
					},
					calculable : false,
					xAxis : [
						{
							type : 'category',
							axisLine:{
							lineStyle:{
							color: '#666689',
							width: 0,
							type: 'solid'
							}     
							},
							axisLabel:{
							textStyle:{color:'#666689'}
							},
							splitLine : {
							show:false,
							lineStyle: {
							color: '#666689',
							width: 0
							}
							},
							data: []
						}
					],
					yAxis : [
						{
							type : 'value',
							axisLine:{
							lineStyle:{
							color: '#666689',
							width: 0,
							type: 'solid'
							}     
							},
							splitLine : {
							show:false,
							lineStyle: {
							color: '#666689',
							width: 0
							}
							},
						}
					],
					series : [
						{
							type:'bar',
							barWidth:6,
							barCategoryGap:'55%',
							data:[]
						},
						{
							type:'bar',
							barWidth:6,
							barCategoryGap:'55%',
							data:[]
						}
					]
				};
			var temp = data.data;
			option.xAxis[0].data = temp.key;
			option.series[0].data = temp.value1;
			option.series[1].data = temp.value2;
			chart.draw_left_1.setOption(option);
			}
			});
	},
	//-------------------------------------------left 2
	draw_left_2: function(wrapper){
	dispatcher.dispatch_chart(chart.draw_left_2);
	var labelTop = {
		normal : {
			label : {
				show : false,
				position : 'center',
				formatter : '{b}',
				textStyle: {
					color:'#fff',
					baseline : 'bottom'
				}
			},
			labelLine : {
				show : false
			}
		}
	};
	var labelTop_hidden = {
		normal : {
			label : {
				show : true,
				position : 'center',
				formatter : '{b}',
				textStyle: {
					baseline : 'bottom',
					color:'#6486ce'
				}
			},
			labelLine : {
				show : false
			}
		}
	};
	var labelBottom = {
		normal : {
		color: '#14326b',
			label : {
				show : true,
				position : 'center'
			},
			labelLine : {
				show : false
			}
		},
		emphasis: {
			color: 'rgba(0,0,0,0)'
		}
	};
	var labelFromatter = {
		normal : {
			label : {
				formatter : function (params){
					return 100 - params.value + '%';
				},
				textStyle: {
					color: '#fde602',
					baseline : 'middle'
				}
			}
		},
	};
	var radius = [20, 30];
			
	var url = "fake-data/left-2.php";
 		 $.ajax({
         	type: "post",
         	url: url,
       	 	dataType: "json",
        	success: function(data){
			chart.draw_left_2 = echarts.init(wrapper);
			var option = {
			    legend: {
					show:false,
					x : 'center',
					y : 'center',
					data:[
					]
				},
				color: [
					'#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
					'#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
					'#59678c','#c9ab00','#7eb00a','#6f5553','#c14089','#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80'],
				series : [
				]
			};
			var temp = data.data;
			var tempSum = 0;
			var tempRatio = [];
			for(var i = 0; i < temp.key.length; i++){
			tempSum = tempSum + temp.value[i];
			}
			for(var i = 0; i < temp.key.length; i++){
			tempRatio[i] = Math.round(((temp.value[i]) / tempSum) * 100);
			}
			for(var i = 0; i < 3; i++){
			var tempX = 15+(i*30);
			option.series[i] = {
				type : 'pie',
				center : [15+(i*30)+'%', '20%'],
				clockWise:true,
				radius : radius,
				x: '0%',
				itemStyle : labelFromatter,
				data : [
				{name:temp.key[i], value:tempRatio[i], itemStyle : labelTop},
				{name:'other', value:(100 - tempRatio[i]), itemStyle : labelBottom}
				]
			};
			}
			for(var i = 3; i < 6; i++){
			option.series[i] = {
				type : 'pie',
				center : [15+((i-3)*30)+'%', '65%'],
				clockWise:true,
				radius : radius,
				x: '0%',
				itemStyle : labelFromatter,
				data : [
				{name:temp.key[i], value:tempRatio[i], itemStyle : labelTop},
				{name:'other', value:(100 - tempRatio[i]), itemStyle : labelBottom}
				]
			};
			}
			for(var i = 6; i < 9; i++){
			option.series[i] = {
				type : 'pie',
				center : [15+((i-6)*30)+'%', '45%'],
				clockWise:true,
				radius : radius,
				x: '0%', // for funnel
				itemStyle : {
				normal:{
				color:['rgba(0,0,0,0)']
				}
				},
				data : [
					{name:temp.key[i-6], value:50, itemStyle : labelTop_hidden}
				]
			};
			}
			for(var i = 9; i < 12; i++){
			option.series[i] = {
				type : 'pie',
				center : [15+((i-9)*30)+'%', '90%'],
				clockWise:true,
				radius : radius,
				x: '0%', // for funnel
				itemStyle : {
				normal:{
				color:['rgba(0,0,0,0)']
				}
				},
				data : [
					{name:temp.key[i-6], value:50, itemStyle : labelTop_hidden}
				]
			};
			}
			chart.draw_left_2.setOption(option);
			$("#attack_type_table").html("");
			for(var i = 0; i < 6; i++){
			var tempHTML = $("<tr><td class='text-blue' style='width:70%;'>"+temp.key[i]+"</td><td class='text-gold' style='width:30%;'>"+temp.value[i]+"</td></tr>");
			$("#attack_type_table").append(tempHTML);
			}
			}
			});
	},
	//-----------------------------------------上面拦截次数
	update_attack_account: function(para_attack_account_today, para_attack_account_total){
	var odometer = $("#attack_account_today .fillin").get(0);
	odometer.innerHTML = para_attack_account_today;
	$('#attack_account_total .fillin').prop('counter', realtime_configuration.attack_account_total).animate({
        counter: para_attack_account_total
    }, {
        duration: 2000,
        easing: 'swing',
        step: function (now) {
			now = Math.ceil(now);
			now = now.toString();
			now = now.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            $(this).text(now);
        }
    });
	realtime_configuration.attack_account_today = para_attack_account_today;
	realtime_configuration.attack_account_total = para_attack_account_total;
	},
	//-----------------------------------------下面攻击面板
	update_attack_log: function(attack_origin_data){
	window.clearTimeout(timer.animateAttackLogFlag);
	animateAttackLog = false;
	timer.animateAttackLogFlag = window.setTimeout(function(){
	animateAttackLog = true;
	}, 30 * 1000);
	var tempCount = $("#overview_log_panel .fillin").find("tr").length;
	if((tempCount + 1) > realtime_configuration.attack_log_stack_limit){
	$("#overview_log_panel .fillin").find("tr").slice(0, 1).remove();
	}
	// var tempHTML = $("<tr>"+"<td style='width:15%;'>"+attack_origin_data.time+"</td>"+"<td style='width:20%;'>"+attack_origin_data.machineIp+" ("+attack_origin_data.machineIpAddress+")</td>"+"<td style='width:20%;'>"+attack_origin_data.ip+" ("+attack_origin_data.ipAddress+")</td>"+"<td style='width:15%;'>"+attack_origin_data.typeDesc+"</td>"+"<td style='width:30%;'>"+attack_origin_data.desc+"</td>"+"</tr>");
	var tempHTML = $("<tr>"+"<td style='width:25%;'>"+attack_origin_data.time+"</td>"+"<td style='width:25%;'>"+attack_origin_data.machineIp+" ("+attack_origin_data.machineIpAddress+")</td>"+"<td style='width:25%;'>"+attack_origin_data.ip+" ("+attack_origin_data.ipAddress+")</td>"+"<td style='width:25%;'>"+attack_origin_data.typeDesc+"</td></tr>");
	tempHTML.find("td").addClass("animate_td");
	$("#overview_log_panel .fillin").append(tempHTML);
	tempHTML.hide().fadeIn();
	$("#overview_log_panel .fillin_wrapper").mCustomScrollbar("scrollTo", "bottom", {
	scrollEasing:"easeOut"
	});
	},
	//-----------------------------------------中间地图
	update_realtime_map: function(realtime_item){
	//0为划线和攻击源标记
	//1为攻击源另一标记
	//2为被攻击标记
	//3为被攻击另一标记
	attack_map_stack.push(realtime_item);
	var self = chart.map_chart;
	if(attack_map_stack.length > realtime_configuration.attack_map_stack_limit){
	var tempRemoved = attack_map_stack.shift();
	self.delMarkPoint(0, tempRemoved.source);
	self.delMarkLine(0, tempRemoved.source+ " > " +tempRemoved.target);
	self.delMarkPoint(1, tempRemoved.source);
	self.delMarkPoint(2, tempRemoved.target);
	self.delMarkPoint(3, tempRemoved.target);
	}
	var temp = {
	data:[{name:realtime_item.source, "value":realtime_item.value}],
	pointName:realtime_item.source
	};
	self.addMarkPoint(0, temp);
	var temp = {
	data:[
	[{name:realtime_item.source, value:realtime_item.value}, {name:realtime_item.target}]
	],
	lineName:realtime_item.source+ " > " +realtime_item.target
	};
	self.addMarkLine(0, temp);
	var temp = {
	data:[{name:realtime_item.source, "value":realtime_item.value}],
	pointName:realtime_item.source
	};
	self.addMarkPoint(1, temp);
	var temp = {
	data:[{name:realtime_item.target, "value":realtime_item.value}],
	pointName:realtime_item.target
	};
	self.addMarkPoint(2, temp);
	var temp = {
	data:[{name:realtime_item.target, "value":realtime_item.value, symbol: ((laterality.indexOf(realtime_item.target) === -1) ? 'circle' : 'star'), symbolSize: ((laterality.indexOf(realtime_item.target) === -1) ? 3 : 6)}],
	pointName:realtime_item.target
	};
	self.addMarkPoint(3, temp);
	},
	degrade_realtime_map: function(toggle){
	//0为划线和攻击源标记
	//1为攻击源另一标记
	//2为被攻击标记
	//3为被攻击另一标记
	var self = chart.map_chart;
	for(var i = 0; i < attack_map_stack.length; i++){
	attack_map_stack[i].lifetime-=2;
	if(attack_map_stack[i].lifetime <= 0){
	self.delMarkPoint(0, attack_map_stack[i].source);
	self.delMarkLine(0, attack_map_stack[i].source+ " > " +attack_map_stack[i].target);
	self.delMarkPoint(1, attack_map_stack[i].source);
	self.delMarkPoint(2, attack_map_stack[i].target);
	self.delMarkPoint(3, attack_map_stack[i].target);
	attack_map_stack.splice(i, 1);
	i--;
	}
	}
	//--------------------
	},
	refresh_realtime_map: function(){
	realtime.draw_realtime_map($("#main_middle .chart_wrapper").get(0));
	for(var i = 0; i < attack_map_stack.length; i++){
	realtime.update_realtime_map(attack_map_stack[i]);
	}
	},
	//-----------------------------------------右侧Top 10
	update_country_panel: function(country_array){
	function move(object, slot, count){
	panel_count_number(object.find(".panel_count"), count);
	//object.find(".country_name_fillin .country_rank").text(slot+1);
	object.find(".progress-bar").css({"width": count === 0 ? '5%' : (100 - slot*(Math.ceil(100 / realtime_configuration.country_panel_limit)))+"%"});
	object.animate({"top":(slot*50)+"px"}, 300);
	}
	function add(attr, key, slot, count){
	var tempHolder = attr == "data-view-attacker" ? $("#top_10_attacker tbody") : $("#top_10_attacked tbody");
	var tempStyle = attr == "data-view-attacker" ? "progress-bar-warning" : "progress-bar-success";
	var tempFlag = "<span class='flag flag-icon flag-icon-"+country_code[key].toLowerCase()+"'></span>";
	// var tempHTML = $("<tr "+attr+"="+key+"><td>"+tempFlag+"<p class='country_name_fillin'>No.<span class='country_rank'>"+(slot+1)+"</span> "+key+"</p></td><td><div class='progress'><div class='progress-bar "+tempStyle+" progress-bar-striped' role='progressbar' aria-valuemin='0' aria-valuemax='100' style='width:1%'></div></div><p class='panel_count' style='text-align:right;'>0</p></td></tr>");
	var tempHTML = $("<tr "+attr+"="+key+"><td>"+tempFlag+"<p class='country_name_fillin'>"+key+"</p></td><td><div class='progress'><div class='progress-bar "+tempStyle+" progress-bar-striped' role='progressbar' aria-valuemin='0' aria-valuemax='100' style='width:1%'></div></div><p class='panel_count' style='text-align:right;'>0</p></td></tr>");
	tempHolder.append(tempHTML);
	tempHTML.hide().fadeIn(200);
	tempHTML.find(".progress-bar").css({"width": count === 0 ? '5%' : (100 - slot*(Math.ceil(100 / realtime_configuration.country_panel_limit)))+"%"});
	panel_count_number(tempHTML.find(".panel_count"), count);
	tempHTML.animate({"top":(slot*50)+"px"}, 300);
	}
	function remove(object){
	object.fadeOut(200).remove();
	}
	function panel_count_number(object, countTo){
	if(typeof countTo == "string"){
	countTo = parseInt(countTo);
	}
	object.prop('counter', parseInt(object.text())).animate({
        counter: countTo
    }, {
        duration: 2000,
        easing: 'swing',
        step: function (now) {
			now = Math.ceil(now);
			now = now.toString();
            $(this).text(now);
        }
    });
	}
	var removeArray_attacker = [];
	var removeArray_attacked = [];
	$("#top_10_attacker tbody tr, #top_10_attacked tbody tr").stop();
	//------------------------------
	for(var i = 0; i < $("#top_10_attacked tbody tr").length; i++){
	removeArray_attacked.push($("#top_10_attacked tbody tr").eq(i).attr("data-view-attacked"));
	}
	for(var i = 0; i < realtime_configuration.country_panel_limit; i++){
	if($("#top_10_attacked tbody tr[data-view-attacked="+country_array.attack_target_list[i].key+"]").length > 0){
	removeArray_attacked.splice(removeArray_attacked.indexOf(country_array.attack_target_list[i].key), 1);
	move($("#top_10_attacked tbody tr[data-view-attacked="+country_array.attack_target_list[i].key+"]"), i, country_array.attack_target_list[i].value);
	}
	else{
	add("data-view-attacked", country_array.attack_target_list[i].key, i, country_array.attack_target_list[i].value);
	}
	}
	for(var w = 0; w < removeArray_attacked.length; w++){
	remove($("#top_10_attacked tbody tr[data-view-attacked="+removeArray_attacked[w]+"]"));
	}
	//-------------------------------
	for(var i = 0; i < $("#top_10_attacker tbody tr").length; i++){
	removeArray_attacker.push($("#top_10_attacker tbody tr").eq(i).attr("data-view-attacker"));
	}
	for(var i = 0; i < realtime_configuration.country_panel_limit; i++){
	if($("#top_10_attacker tbody tr[data-view-attacker="+country_array.attack_source_list[i].key+"]").length > 0){
	removeArray_attacker.splice(removeArray_attacker.indexOf(country_array.attack_source_list[i].key), 1);
	move($("#top_10_attacker tbody tr[data-view-attacker="+country_array.attack_source_list[i].key+"]"), i, country_array.attack_source_list[i].value);
	}
	else{
	add("data-view-attacker", country_array.attack_source_list[i].key, i, country_array.attack_source_list[i].value);
	}
	}
	for(var w = 0; w < removeArray_attacker.length; w++){
	remove($("#top_10_attacker tbody tr[data-view-attacker="+removeArray_attacker[w]+"]"));
	}
	},
	update_province_panel: function(province_array){
	function panel_count_number(object, countTo){
	if(typeof countTo == "string"){
	countTo = parseInt(countTo);
	}
	object.prop('counter', parseInt(object.text())).animate({
        counter: countTo
    }, {
        duration: 2000,
        easing: 'swing',
        step: function (now) {
			now = Math.ceil(now);
			now = now.toString();
            $(this).text(now);
        }
    });
	}
	 var province_array = [
           {name: '杭州市',value: Math.round(Math.random()*1000)},
            {name: '温州市',value: Math.round(Math.random()*1000)},
            {name: '宁波市',value: Math.round(Math.random()*1000)},
            {name: '舟山市',value: Math.round(Math.random()*1000)},
            {name: '台州市',value: Math.round(Math.random()*1000)},
            {name: '金华市',value: Math.round(Math.random()*1000)},
            {name: '衢州市',value: Math.round(Math.random()*1000)},
            {name: '绍兴市',value: Math.round(Math.random()*1000)},
            {name: '嘉兴市',value: Math.round(Math.random()*1000)},
            {name: '湖州市',value: Math.round(Math.random()*1000)},
			{name: '丽水市',value: Math.round(Math.random()*1000)},
        ];
	var tempHolder = $("#province_ranking tbody");
	var tempStyle = "progress-bar-info";
	tempHolder.html("");
	for(var i = 0; i < province_array.length; i++){
	var tempHTML = $("<tr><td><p class='country_name_fillin'>"+province_array[i].name+"</p></td><td><div class='progress'><div class='progress-bar "+tempStyle+" progress-bar-striped' role='progressbar' aria-valuemin='0' aria-valuemax='100' style='width:1%;background-color:#ffff00;'></div></div><p class='panel_count' style='text-align:right;'>0</p></td></tr>");
	tempHTML.find(".progress-bar").css({"width": province_array[i].value === 0 ? '5%' : (100 - i*(Math.ceil(80 / 11)))+"%"});
	tempHolder.append(tempHTML);
	panel_count_number(tempHTML.find(".panel_count"), province_array[i].value);
	tempHTML.css({"top":(i*50)+"px"});
	}
	}
	};
	//--------init
	var now = new Date();
	var night = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate() + 1,
		0, 0, 0
	);
	window.setTimeout(function(){
	realtime.update_attack_account(0, 0);
	timer.reset = window.setInterval(function(){
	realtime.update_attack_account(0, 0);
	}, (24 * 60 * 60 * 1000));
	}, (night.getTime() - now.getTime()));
	timer.toggleMap = window.setInterval(function(){
	$("#model_select .model_select").not(".active").click();
	}, 15*60*1000);
	timer.animateAttackLog = window.setInterval(function(){
	if(!animateAttackLog) return;
	if($("#overview_log_panel .fillin").find("tr").length > 20){
	$("#overview_log_panel .fillin").find("tr").eq(0).find("td").removeClass("animate_td");
	var clone = $("#overview_log_panel .fillin").find("tr").eq(0);
	$("#overview_log_panel .fillin").find("tr").eq(0).remove();
	clone.find("td").addClass("animate_td");
	$("#overview_log_panel .fillin").append(clone);
	clone.hide().fadeIn();
	$("#overview_log_panel .fillin_wrapper").mCustomScrollbar("scrollTo", "bottom", {
	scrollEasing:"easeOut"
	});
	}
	}, 5*1000);
	
	// timer.animateAttackLog = window.setInterval(function(){
	// $("#overview_log_panel .fillin").find("td").removeClass("animate_td");
	// $("#overview_log_panel .fillin").find("tr").each(function(i){
	// var self = $(this);
	// window.setTimeout(function(){
	// self.find("td").addClass("animate_td");
	// }, (50 + i*100));
	// });
	// }, 10*1000);
	timer.updateProvinceMap = window.setInterval(function(){
	realtime.draw_province_realtime_map($("#main_middle .chart_wrapper").get(1), province);
	realtime.update_province_panel();
	}, 30*1000);
	timer.update_clock = window.setInterval(function(){
	var tempArray = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
	var tempDate = new Date();
	var tempOutput = tempDate.getFullYear() + "-" + (tempDate.getMonth() + 1) + "-" + tempDate.getDate() + " " + tempArray[tempDate.getDay() - 1];
	$("#header_date .header_date").eq(0).html(tempOutput);
	
	var tempTime,tempH,tempM,tempS;
	tempH = tempDate.getHours() > 9 ? tempDate.getHours() : "0" + tempDate.getHours();
	tempM = tempDate.getMinutes() > 9 ? tempDate.getMinutes() : "0" + tempDate.getMinutes();
	tempS = tempDate.getSeconds() > 9 ? tempDate.getSeconds() : "0" + tempDate.getSeconds();
	tempTime = tempH + " : " + tempM + " : " + tempS;
	$("#header_date .header_time").eq(0).html("").html(tempTime);
	}, 1000);
	timer.request_weather = window.setInterval(requestWeather, 15*60*1000);
	requestWeather();
	
	
	realtime.draw_realtime_map($("#main_middle .chart_wrapper").get(0));
	realtime.draw_province_realtime_map($("#main_middle .chart_wrapper").get(1), province);
	realtime.update_province_panel();
	
	realtime.draw_left_1($("#main_left .chart_wrapper").get(0));
	timer.update_left_2 = window.setInterval(function(){
	realtime.draw_left_2($("#main_left .chart_wrapper").get(1));
	}, 60*1000);
	realtime.draw_left_2($("#main_left .chart_wrapper").get(1));
	timer.degrade_realtime = window.setInterval(function(){
	realtime.degrade_realtime_map();
	}, 2000);
	timer.refresh_realtime_map = window.setInterval(function(){
	realtime.refresh_realtime_map();
	}, 20*60*1000);
	
	$("#main_middle").css({"opacity":0});
	$("#header").css({"top":"-300px", "opacity":0}).animate({"top":"0px","opacity":1}, 1500);
	$("#main_left").css({"left":"-300px", "opacity":0}).animate({"left":"0px","opacity":1}, 1500);
	$("#main_right").css({"right":"-300px", "opacity":0}).animate({"right":"0px","opacity":1}, 1500, function(){
	$("#main_middle").animate({"opacity":1}, 800, function(){});
	});
	// dwr.engine.setActiveReverseAjax(true);
	// dwr.engine.setNotifyServerOnPageUnload(true);
  	// WebLogMessageService.onPageLoad("admin2");
	//-----------------------------***以下为测试
	var temp = '{\
		"attack_origin_data": {\
			"desc": "远程登录，用户名：Administrator,IP：192.168.1.3(局域网 对方和您在同一内部网)， 登录结果：失败。",\
			"ip": "255.255.234.3",\
			"ipAddress": "波密",\
			"machineIp": "202.127.167.255",\
			"machineIpAddress": "开县",\
			"newMachineId": "66b6051919f2f0332e380df5c70a85b6",\
			"time": "2016-03-22 12:56:48",\
			"type": 0,\
			"typeDesc": "cc攻击"\
		}\
	}';
	//window.setInterval(function(){
	receiveMessage(temp);
	//}, 100);
	realtime_configuration.attack_account_total = 1117882964;
	realtime_configuration.attack_account_today = 3745032;
	var fake = [{"name":"上海","value":5},{"name":"麻阳","value":17},{"name":"石家庄","value":99},{"name":"获鹿","value":4},{"name":"济南","value":13},{"name":"绍兴","value":27},{"name":"淄博","value":38},{"name":"吴川","value":5},{"name":"阳春","value":15},{"name":"周口","value":45},{"name":"定远","value":5},{"name":"丰顺","value":5},{"name":"中江","value":20},{"name":"化隆","value":5},{"name":"蒙山","value":88},{"name":"界首","value":10},{"name":"启东","value":10},{"name":"察哈尔右翼后旗","value":10},{"name":"法国","value":5},{"name":"武都","value":1},{"name":"香河","value":5},{"name":"福建","value":5},{"name":"太白","value":5},{"name":"上思","value":5},{"name":"宁武","value":5},{"name":"余庆","value":5},{"name":"齐齐哈尔","value":5}];

	var fake_panel = [{"name":"中国","value":15},{"name":"英国","value":45},{"name":"澳大利亚","value":5},{"name":"法国","value":5},{"name":"也门","value":5},{"name":"巴西","value":5}];
	
	window.setInterval(function(){
	var temp_attack_source_list = [];
	var temp_attack_target_list = [];
	var  temp_attack_source_list_array = [];
	var temp_attack_target_list_array = [];
	while(temp_attack_target_list_array.length < 5){
	var tempItem = fake_panel[Math.floor(Math.random() * fake_panel.length)].name;
	if(temp_attack_target_list_array.indexOf(tempItem) < 0){
	temp_attack_target_list_array.push(tempItem);
	}
	}
	while(temp_attack_source_list_array.length < 5){
	var tempItem = fake_panel[Math.floor(Math.random() * fake_panel.length)].name;
	if(temp_attack_source_list_array.indexOf(tempItem) < 0){
	temp_attack_source_list_array.push(tempItem);
	}
	}
	for(var i = 0; i < 5; i++){
	var tempObject = {
	key:temp_attack_target_list_array[i],
	value:((5 - i) * 200) + Math.floor(Math.random() * 100)
	};
	temp_attack_target_list.push(tempObject);
	}
	for(var i = 0; i < 5; i++){
	var tempObject = {
	key:temp_attack_source_list_array[i],
	value:((5 - i) * 200) + Math.floor(Math.random() * 100)
	};
	temp_attack_source_list.push(tempObject);
	}
	var temp_attack_panel = {
	attack_source_list:temp_attack_source_list,
	attack_target_list:temp_attack_target_list
	};
	realtime.update_country_panel(temp_attack_panel);
	}, 10000);
	window.setInterval(function(){
	var tempToday = realtime_configuration.attack_account_today + Math.floor(Math.random() * 200);
	var tempTotal = realtime_configuration.attack_account_total + Math.floor(Math.random() * 200);
	realtime.update_attack_account(tempToday, tempTotal);
	}, 3000);
	window.setInterval(function(){
	for(var i = 0; i < 2; i++){
	var temp_attack_origin_data = {
	source:fake[Math.floor(Math.random() * fake.length)].name,
	target:fake[Math.floor(Math.random() * fake.length)].name,
	value:10,
	lifetime:8+ Math.floor(Math.random() * 10)
	}
	realtime.update_realtime_map(temp_attack_origin_data);
	}
	}, 5000);
	window.setInterval(function(){
	var temp = {
        "desc": "远程登录，用户名：Administrator,IP：192.168.1.3(局域网 对方和您在同一内部网)， 登录结果：失败。",
        "ip": "255.255.234.3",
        "ipAddress": "石屏",
        "machineIp": "202.127.167.255",
        "machineIpAddress": "弥勒",
        "newMachineId": "66b6051919f2f0332e380df5c70a85b6",
        "time": "2016-03-22 12:56:48",
        "type": 0,
        "typeDesc": "cc攻击"
    };
	realtime.update_attack_log(temp);
	}, 1500);
	//-----------------------------***
});