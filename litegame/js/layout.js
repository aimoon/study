/**
 *ÍøÒ³Ö÷Òª²¼¾Öjs 
 */
(jQuery(function(){
	var $popuproad = $("#popuproad");
	var $block = $("#blockpopup");
	//canvas div for double click linsting event
	var $canvasdiv=$("div.canvas");
	//»î¶¯µÄ
	var ActiveModel={};	//²»»î¶¯µÄ
	var StaticModel={};
	
	var superlocation={};
	
	//canvas ²Ù×÷¶¯×÷·â×°
	var canvasObject={};
	
	//ÓÎÏ·¿ò¼ÜÍÏ×§¶¯×÷·â×°
	var GameOperation={};
	
	//»­²¼
	var canvas= document.getElementById("canvaselement").getContext("2d");
	
	//»º´æÊý¾Ý·ÀÖ¹Ã¿´ÎÖØÐÂÌá½»Êý¾Ý
	var CacheData={};
	
	//ÓÃÓÚÖØ»æÍ¼Æ¬»òÕß³·Ïú²Ù×÷»òÕß±à¼­ÊôÐÔ£¬±£´æ²Ù×÷¶¯×÷Êý¾ÝºÍ²ÎÊý
	var DrawAction={};
	
	
	function initModelPersonAndObjectAndCache(){
		canvasObject={
			drawRect:function(left,top,width,height){
				left=left/2.6;
				top=top/2.6;
				width=width/2.6;
				height=height/2.6;
				canvas.fillRect(left,top,width,height);
				var img=new Image();
				img.src="../img/fire_stand_zheng_nan/49.jpg";
				// canvas.drawImage(img,left/2.6,top/2.6);
				canvas.drawImage(img,0,30);
				console.log(left+top);
			},
			drawImage:function(img,left,top,width,height){
				img.src='../img/bg/stornbackground.jpg';
				img.src="../img/fire_stand_zheng_nan/49.jpg";
				console.log(left+":"+top+":"+img.width+":"+img.height);
//				canvas.drawImage(img,left/2.6,top/2.6,width/2.6,height/2.6);

				canvas.drawImage(img,left/2.6,top/2.6);
			}
		};
		
		CacheData={
			cache:function(key,value){
				localStorage.setItem(key,value);
			},
			loadData:function(){
				for(var i=0;i<localStorage.length-1;i++){
					$(localStorage.key(i)).val(localStorage.getItem(localStorage.key(i)));
				}
			}
		};
		
		GameOperation={
			save:function(objectnameflg){
				var $this=$("#"+objectnameflg);
				var left=$this.find("#left").val();
				var top=$this.find("#top").val();
				var width=$this.find("#width").val();
				var height=$this.find("#height").val();
				var bgcolor=$this.find("#bgcolor").val();
				
				var road = RoadDrawAction();
				road.left= left;
				road.top=top;
				road.height=height;
				road.width=width;
				if(objectnameflg=="popuproad"){
					
					canvasObject.drawRect(left, top, width, height);
					CacheData.cache("#popuproad #left",left);
					CacheData.cache("#popuproad #top",top);
					CacheData.cache("#popuproad #width",width);
					CacheData.cache("#popuproad #height",height);
					road.display="MainRoad";
					road.bgcolor="";
					localStorage.setItem(road.display,road);
				//	$.cookie(road.display,JSON.stringify(road));
				}else if(objectnameflg=="blockpopup"){
					var location=publicoperationgetdata(objectnameflg);
					var img = new Image();
					img.src="..\\img\\bg"+$block.find("#src").val().substring($block.find("#src").val().lastIndexOf("\\"));
					img.onload=function(){
						canvas.drawImage(img,location.left,location.top,location.width,location.height);
					}
					var block = RoadDrawAction();
					road.display="My Block"
//					localStorage.setItem(road.display,road);
					//$.cookie(road.display,JSON.stringfy(road));
				}
			}	
		};
		
	}
	
	
	function publicoperationgetdata(objectnameflg){
		var $this=$("#"+objectnameflg);
		var left=$this.find("#left").val();
		var top=$this.find("#top").val();
		var width=$this.find("#width").val();
		var height=$this.find("#height").val();
		CacheData.cache("#"+objectnameflg+" #left",left);
		CacheData.cache("#"+objectnameflg+" #top",top);
		CacheData.cache("#"+objectnameflg+" #width",width);
		CacheData.cache("#"+objectnameflg+" #height",height);
		superlocation={left:left,top:top,width:width,height:height};
		
		return superlocation;
	}
	
	function initCacheData(){
		//¼ÓÔØ»º´æ
		CacheData.loadData();
	}
	
	function initDrawAction(){
//		RoadDrawAction.prototype=new DrawAction();
		
	}
	
	function RoadDrawAction(){
		return this;
	}
	
	function init(){
		//¼ÓÔØ¶ÔÏó
		initModelPersonAndObjectAndCache();
		//¼ÓÔØ³õÊ¼»¯Êý¾Ý
		initCacheData();
		
		//±£´æÖØÒª×ÊÁÏÐÅÏ¢
		initDrawAction();
		$("#popuproad .cancel").click(function(){
			$popuproad.hide();
			
		});

		$("#popuproad .save").click(function(){
			$popuproad.hide();
			GameOperation.save("popuproad");
		
		});
		$("#blockpopup .cancel").click(function(){
			$block.hide();
			
		});
		$("#property .cancel").click(function(){
			$("#property").hide();
		});
		$("#blockpopup .save").click(function(){
			$block.hide();
			GameOperation.save("blockpopup");
			
		});
		
		var source=document.getElementById("road");
		var $source=$("#popup");
		 source.ondragstart=function(e){
			 $popuproad.show();
		} 
		var block = document.getElementById("block");
		block.ondragstart=function(e){
			$block.show();
			
		}
		var person = document.getElementById("person");
		/*person.ondragstart=function(e)
		{
			var img=new Image();
			img.src="../img/fire_stand_zheng_nan/49.jpg";
			img.onload=function(){
				//canvas.drawImage(img,0,0);		
			}
			
		}*/
		$canvasdiv.dblclick(function(e){
			alert(e.screenX+","+e.screenY);
			var props = ifIndomain(e.screenX,e.screenY);
			if(props.length>0){
				$("#property").show();
				$("#property #width").val(props[0].width);
				$("#property #height").val(props[0].height);
				$("#property #top").val(props[0].top);
				$("#property #left").val(props[0].left);
			}
		});
		
	}
	
	//check if is the area of the model
	function ifIndomain(x,y){
		var props=[];
		var cookies=$.cookie();
			$.each(cookies,function(name,value){
				var temp=JSON.parse(value);
				if(temp.left<=x && temp.left+temp.width>=x &&
						temp.top<=y&&temp.top+temp.height>=y){
					props.push(temp);
				}
			})
		return props;
	};
	
	$(init());
}));

