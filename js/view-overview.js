$(document).ready(function(){
view.overview = {
	draw_world_map: function(wrapper){
    chart.map_chart = echarts.init(wrapper, echarts_theme_blue);
	var min = 0;
	var max = 100;
	var option = {
	backgroundColor:"#1a1a1a",
    tooltip : {
        trigger: 'item',
        formatter: '{b}'
    },
	dataRange: {
			        min: min,
			        max: max,
			        color: ['#ff3333', 'orange', 'yellow','lime','aqua'],
					//['#c5ff1a', '#263300'],
			        text:['高','低'],
					// itemGap: Math.floor(max / 10),
			        splitNumber:0,
					x:20,
					textStyle:{color:'#d9d9d9'}
			    },
	animation:true,
	animationDuration:3000,
	animationDurationUpdate:2500,
    series : [
        {
            type: 'map',
			roam: false,
            hoverable: false,
            mapType: 'world',
			mapLocation: {
			                x: 'center'
			            },
            itemStyle:{
                normal:{
                    borderColor:'#1aaf5d',
                    borderWidth:0.5,
                    areaStyle:{
                        color: '#595959'
                    }
                }
            },
            data:[],
            markLine : {
                smooth:true,
				effect : {
                    show: true,
                    scaleSize: 2,
                    period: 20,
                    color: '#fff',
                    shadowBlur: 10
                },
                itemStyle : {
                    normal: {
                        borderWidth:1,
						label:{show:false},
                        lineStyle: {
                            type: 'solid',
                            shadowBlur: 10
                        }
                    }
                },
                data : []
            },
			markPoint : {
                symbol:'emptyCircle',
                symbolSize : function (v){
	                    return 10 + v/10
	                },
                effect : {
                    show: true,
                    shadowBlur : 0
                },
                itemStyle:{
                    normal:{
								 label:{show:false,position:'top',
								 formatter:'{b} : {c}'
								 }
			                },
			                emphasis: {
								 label:{show:false,position:'top'}
			                }
                },
                data : []
            },
			nameMap : data.world_geo_name,
			geoCoord: data.world_geo
        },
		{
			type: 'map',
			roam: false,
            hoverable: false,
            mapType: 'world',
			mapLocation: {
			                x: 'center'
			            },
            data:[],
			markPoint : {
                symbol:'emptyCircle',
                symbolSize : 0,
                effect : {
                    show: false,
                    shadowBlur : 0
                },
                itemStyle:{
                    normal:{
								 label:{show:true,position:'top',
								 formatter:'{b} : {c}'
								 }
			                },
			                emphasis: {
								 label:{show:true,position:'top'}
			                }
                },
                data : []
            },
			nameMap : data.world_geo_name,
			geoCoord: data.world_geo
        }
    ]
	};
	chart.map_chart.setOption(option);
	},
	draw_china_map: function(wrapper){
    chart.map_chart = echarts.init(wrapper, echarts_theme_blue);
	var min = 0;
	var max = 100;
	var option = {
	backgroundColor:"#1a1a1a",
    tooltip : {
        trigger: 'item',
        formatter: '{b}'
    },
	dataRange: {
			        min: min,
			        max: max,
			        color: ['#ff3333', 'orange', 'yellow','lime','aqua'],
					//['#c5ff1a', '#263300'],
			        text:['高','低'],
					//itemGap: Math.floor(max / 10),
					splitNumber: 0,
					x:20,
					textStyle:{color:'#d9d9d9'}
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
                    borderColor:'#1aaf5d',
                    borderWidth:0.5,
                    areaStyle:{
                        color: '#595959'
                    }
                }
            },
            data:[],
            markLine : {
                smooth:true,
				effect : {
                    show: true,
                    scaleSize: 2,
                    period: 20,
                    color: '#fff',
                    shadowBlur: 10
                },
                itemStyle : {
                    normal: {
                        borderWidth:1,
						label:{show:false},
                        lineStyle: {
                            type: 'solid',
                            shadowBlur: 10
                        }
                    }
                },
                data : []
            },
			markPoint : {
                symbol:'emptyCircle',
                symbolSize : function (v){
	                    return 10 + v/10
	                },
                effect : {
                    show: true,
                    shadowBlur : 0
                },
                itemStyle:{
                    normal:{
								 label:{show:false,position:'top',
								 formatter:'{b} : {c}'
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
                symbolSize : 0,
                effect : {
                    show: false,
                    shadowBlur : 0
                },
                itemStyle:{
                    normal:{
								 label:{show:true,position:'top',
								 formatter:'{b} : {c}'
								 }
			                },
			                emphasis: {
								 label:{show:true,position:'top'}
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
	update_overview_map: function(type){
	var url = "fake-data/getRealTimeAttack.php";
 		 $.ajax({
         	type: "post",
         	url: url,
			data: {
				type:type
			},
       	 	dataType: "json",
        	success: function(data){
			var self = chart.map_chart;
			var option = self.getOption();
			var list = data.data.result;
			if(!list){
			return;
			}
			var tempMarkLine = new Array();
			var tempMarkPoint = new Array();
			// var min = 0;
			// var max = 0;
			for(var i = 0;i < list.length;++i)
			{
				var obj    = list[i];
				var target = obj.key;
				if(target == "局域网"){
					target = "中国";
				}
				var source  = obj.value;
				for(var j = 0; j < source.length; j++)
				{
					var tempObj = source[j];
					var tempValue = tempObj.value;
					var tempArray = [{name:tempObj.name, value:tempValue}, {name:target}];
					tempMarkLine.push(tempArray);
					tempMarkPoint.push(tempObj);
					// if(tempObj.value > max){
						// max = tempObj.value;
					// }
					// if(tempObj.value < min){
						// min = tempObj.value;
					// }
				}
			}
			// option.dataRange.max = max;
			// option.dataRange.min = min;
			option.series[0].markPoint.data = tempMarkPoint;
			option.series[1].markPoint.data = tempMarkPoint;
			option.series[0].markLine.data = tempMarkLine;
			self.setOption(option); 
        	}
		});
	},
	//-----------------------------------------
	draw_countLevelOfUser: function(wrapper){
	var url = "fake-data/countLevelOfUser.php";
 	$.ajax({
	type: "post",
		url: url,
		dataType: "json",
		success: function(data){
		if(data.data.result){
		var result = data.data.result;
		var nameArray = ['优良', '及格', '未巡检', '不及格'];
		var tempData = [];
		var tempCount = 0;
		for(var i = 0; i < 4; i++){
		var c = i + 1;
		tempCount += result[c];
		}
		for(var i = 0; i < 4; i++){
		var temp = {};
		var c = i + 1;
		c = c.toString();
		temp.name = nameArray[i] + " " + ((result[c] / tempCount) * 100).toFixed(2) + "%";
		temp.value = result[c];
		tempData.push(temp);
		}
		chart.chart_countLevelOfUser = echarts.init(wrapper);
		var option = {
		toolbox: {
        show : true,
        feature : {
            mark : {show: false},
            dataView : {show: false, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
			}
		},
		color: [
			'#97b552','#5ab1ef','#333','#d87a80'
		],
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		calculable : true,
		series: [
			{
				name:'半径模式',
				type:'pie',
				radius : [20, 120],
				roseType : 'radius',
				data:tempData
			}
			]
		};
		chart.chart_countLevelOfUser.setOption(option);
		}
		}
	});
	},
	//-----------------------------------------
	get_listLowScoreOfUser: function(){
	var url = "fake-data/listLowScoreOfUser.php";
	$.ajax({
	type: "post",
		url: url,
		dataType: "json",
		success: function(data){
		if(data.list){
		for(var i = 0; i < data.list.length; i++){
		var temp = $("<tr><td>"+data.list[i].groupId+"</td><td>"+data.list[i].key+"</td></tr>");
		if(data.list[i].value < 60){
		temp.append("<td style='color:red;'>"+data.list[i].value+"</td>");
		}
		else if(data.list[i].value < 80){
		temp.append("<td style='color:#3366ff;'>"+data.list[i].value+"</td>");
		}
		else if(data.list[i].value < 101){
		temp.append("<td style='color:#669900;'>"+data.list[i].value+"</td>");
		}
		else{
		temp.append("<td>"+data.list[i].value+"</td>");
		}
		$("#listLowScoreOfUser .fillin").append(temp);
		}
		}
		}
	});
	},
	//-----------------------------------------
	update_attack_log: function(){
	var tempCount = $("#overview_log_panel .fillin").find("tr").length;
	if((tempCount + 2) > 50){
	$("#overview_log_panel .fillin").find("tr").slice(0, 1).remove();
	}
	for(var i = 0; i < 20; i++){
	var temp = $("<tr><td>this is attack_log<td><td>this is attack_log<td><td>this is attack_log<td><td>this is attack_log<td><td>this is attack_log<td><tr>");
	$("#overview_log_panel .fillin").append(temp);
	temp.hide().fadeIn();
	}
	$("#overview_log_panel .fillin_wrapper").mCustomScrollbar("scrollTo","bottom",{
    scrollEasing:"easeOut"
	});
	},
	//-----------------------------------------
	get_attack_account: function(){
	$("#overview_attack_account").html("45746").hide().fadeIn();
	$("#overview_blocking_account").html("3000111").hide().fadeIn();
	$('#overview_attack_account, #overview_blocking_account').each(function () {
    $(this).prop('counter',0).animate({
        counter: $(this).text()
    }, {
        duration: 4000,
        easing: 'swing',
        step: function (now) {
			now = Math.ceil(now);
			now = now.toString();
			now = now.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            $(this).text(now);
        }
    });
	});
	}
}
});