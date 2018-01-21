// 1.引入远程信息
// 关于城市的信息
var city;
var tianqi;
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		city=obj.data;
		console.log(city);
	}
})
// 关于天气的信息
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
	     tianqi=obj.data
		 console.log(tianqi);
	}
})
// 页面加载函数
window.onload=function(){
	
   // 加载数据
	update();

	// 页面交互
	var pos=document.getElementsByClassName("pos")[0];
	var cityBox=document.getElementsByClassName("city")[0];
	// 点击城市出现城市详情页
	pos.onclick=function(){
		cityBox.style.display="block";
	
    // 点击城市详情，跳转首页，出现该城市的天气情况
	var BOX=$(".city .citys .con .box");
	for(let i in BOX){
	    BOX[i].onclick=function(){
		var chengshi=this.innerHTML;
		// 调用AJKX函数
		AJAX(chengshi);
	    }
    }
}
    // 搜索部分
    var searchBox=document.getElementsByClassName("searchBox")[0];
    var button=document.getElementsByClassName("button")[0];
    var text;
    console.log("button");
    searchBox.onfocus=function(){
    	button.innerHTML="确认";
        text=searchBox.value;
    	// console.log(text);
    }
        button.onclick=function(){
    	var neirong=button.innerHTML;
    	if(neirong=="取消"){
    		var city3=document.getElementsByClassName("city")[0];
    		city3.style.display="none";
    	}else{
    		for(let i in city){
    			for(let j in city[i]){
    				if(text==j){
    					AJAX(text);
    					return;
    				}else{
    					alert("没有此城市的天气情况");
    					return;
    				}

    			}
    		}
    	}

    }	
    





// 获取点击城市的天气信息函数
function AJAX(str){
	$.ajax({
	url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=$ 

{str}`,
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		tianqi=obj.data;
		update();
		var city2=$(".city")[0];
		city2.style.display="none";
	}
})
}


// 获取数据的函数
function update(){
	// 当前城市
	var pos=document.getElementsByClassName("pos")[0];
	console.log(pos);
	pos.innerHTML=tianqi.city;
	// 当前空气质量
	var quality_level=document.getElementsByTagName("h5")[0];
	// console.log(quality_level);
	quality_level.innerHTML=tianqi.weather.quality_level;
	// 当前温度
	var current_temperature=document.getElementsByClassName("title1")[0];
	// console.log(current_temperature);
	current_temperature.innerHTML=tianqi.weather.current_temperature+"°";
	// 当前天气状况
	var current_condition=document.getElementsByClassName("title2")[0];
	// console.log(current_condition);
	current_condition.innerHTML=tianqi.weather.current_condition;
	// 当前风的方向
	var win_direction=document.getElementsByClassName("wind_der")[0];
	win_direction.innerHTML=tianqi.weather.wind_direction;
	// 当前风的等级
	var win_level=document.getElementsByClassName("wind_level")[0];
	win_level.innerHTML=tianqi.weather.wind_level+"级";	var today_icon=document.getElementsByClassName("conPic")[0];
	today_icon.style=`background-image:url("img/${tianqi.weather.dat_weather_icon_id}.png")`
	// 明天天气图标
	var tomorrow_icon=document.getElementsByClassName("tomorrow_icon")[0];
	tomorrow_icon.style=`background-image:url("img/${tianqi.weather.tomorrow_weather_icon_id}.png")`

	// 获取每小时天气状况
	
	// var box1=document.createElement("div");
	// box1.className="box";
	// var wrap=document.getElementsByClassName("wrap")[0];
	// wrap.appendChild(box1);
	//  动态创建div
	// var time=document.createElement("div");
    // time.className="time";
    // box1.appendChild(time);

    //var icon=document.createElement("div");
    //icon.className="icon";
    //box1.appendChild(icon);

    // var timeTem=document.createElement("div");
    // timeTem.className="timeTem";
    // box1.appendChild(timeTem);

    
    var hourlyArr=tianqi.weather.hourly_forecast;
    var wrap=document.getElementsByClassName("wrap")[0];
       for(let i in hourlyArr){
    	var box1=document.createElement("div");
	    box1.className="box";

    	var time=document.createElement("div");
        time.className="time";
        box1.appendChild(time);
        time.innerHTML=hourlyArr[i].hour+":00";

        var icon=document.createElement("div");
        icon.className="icon";
        box1.appendChild(icon);
        icon.style=`background-image:url("img/${hourlyArr[i].weather_icon_id}.png")`

        var timeTem=document.createElement("div");
        timeTem.className="timeTem";
        box1.appendChild(timeTem);
        timeTem.innerHTML=hourlyArr[i].temperature+"°";
        wrap.appendChild(box1);
    }

    var dayArr=tianqi.weather.forecast_list;
    var wrap1=document.getElementsByClassName("wrap1")[0];
        for(let i in dayArr){
    	var box2=document.createElement("div");
	    box2.className="box";

	    var date=document.createElement("div");
        date.className="date";
        box2.appendChild(date);
        date.innerHTML=dayArr[i].date;

        var wea=document.createElement("div");
        wea.className="wea";
        box2.appendChild(wea);
        wea.innerHTML=dayArr[i].condition;

        var icon=document.createElement("div");
        icon.className="icon";
        box2.appendChild(icon);
        icon.style=`background-image:url("img/${dayArr[i].weather_icon_id}.png")`;

        var icon1=document.createElement("div");
        icon1.className="icon1";
        box2.appendChild(icon1);
        icon1.innerHTML=dayArr[i].high_temperature+"°";

        var icon2=document.createElement("div");
        icon2.className="icon2";
        box2.appendChild(icon2);
        icon2.innerHTML=dayArr[i].low_temperature+"°";

        var win=document.createElement("div");
        win.className="win";
        box2.appendChild(win);
        win.innerHTML=dayArr[i].wind_direction;

        var ji=document.createElement("div");
        ji.className="ji";
        box2.appendChild(ji);
        ji.innerHTML=dayArr[i].wind_level+"级";
       
        wrap1.appendChild(box2);
    }
    // 获取城市
    var city1=document.getElementsByClassName("city")[0];
    for(let i in city){
    	var citys=document.createElement("div");
    	citys.className="citys";

    	var title=document.createElement("div");
    	title.className="title";
    	title.innerHTML=i;
    	citys.appendChild(title);

    	var con=document.createElement("div");
    	con.className="con";

    	for(let j in city[i]){
    		var box=document.createElement("div");
            box.className="box";
    	    box.innerHTML=j;
    	    con.appendChild(box);
    	}
    	citys.appendChild(con);
    	city1.appendChild(citys);
    }
}
// 今天的天气情况图标
    var today_icon=document.getElementsByClassName("conPic")[0];
    // console.log(today_icon);
    today_icon.style=`background-image:url("img/${tianqi.weather.dat_weather_icon_id}.png")`;

// 明天的天气情况图标
    var tomorrow_icon=document.getElementsByClassName("tomorrow_icon")[0];
    // console.log(today_icon);
    tomorrow_icon.style=`background-image:url("img/${tianqi.weather.tomorrow_weather_icon_id}.png")`;

// 今天的天气情况
    var today_icon=document.getElementsByClassName("con")[0];
    today_icon.innerHTML=tianqi.weather.current_condition;

// 今天最高温度
    var today_temperature=document.getElementsByClassName("heigher")[0];
    today_temperature.innerHTML=tianqi.weather.dat_high_temperature+"°/";

// 今天最低温度
    var today_temperature=document.getElementsByClassName("lower")[0];
    today_temperature.innerHTML=tianqi.weather.dat_low_temperature+"°";

// 明天的天气情况
    var tomorrow_icon=document.getElementsByClassName("con2")[0];
    tomorrow_icon.innerHTML=tianqi.weather.tomorrow_condition;

// 明天最高温度
    var tomorrow_temperature1=document.getElementsByClassName("heigher2")[0];
    tomorrow_temperature1.innerHTML=tianqi.weather.tomorrow_high_temperature+"°/";

// 明天最低温度
    var tomorrow_temperature2=document.getElementsByClassName("lower2")[0];
    tomorrow_temperature2.innerHTML=tianqi.weather.tomorrow_low_temperature+"°";

}