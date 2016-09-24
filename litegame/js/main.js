	var Canvas={
		canvas:document.getElementById("canvaselement"),
		cav3:document.getElementById("canvaselement").getContext("2d"),
		cav4:document.getElementById("canvaselement").getContext("2d"),
		cav5 :document.getElementById("canvaselement").getContext("2d")
	}
	var hero = function(){
		this.left=0;
		this.height=0;
		this.walkcount=0;
		// hero walk number simple
		this.c=this.walkcount;
		this.width=58;
		this.height=105;
	};

	hero.prototype.init=function(){
		var img=new Image();
		img.src="..\\img\\fire_stand_zheng_nan\\49.jpg";
					 
		Canvas.cav3.drawImage(img,0,0);
	}
	hero.prototype.walk=function(){
		var img=new Image();
		img.src="../img/fire_stand_zheng_nan/"+(49+this.walkcount)+".jpg";
		img.onload=function(){
			Canvas.cav3.clearRect(0,0,300,200);
			Canvas.cav3.drawImage(img,0,0,58,105);
		}
		this.walkcount++;
		if(this.walkcount==8){
			this.walkcount=0;
		}
	}


var fire = new hero();

var xiake =new hero();

//jQuery("Canvas")[0].addEventListener("mousedown",function(){alert(11);},false);


(function(){
	//hero.init();
	window.onload=function(){
		//setInterval('fire.walk()',200);
		var img = new Image();
		img.src="../img/person/tianjianggongji.jpg"
		img.onload=function(){
			var pos = Common.caculatorimage(img,27,5,6);
			//console.log(pos);
			//setInterval(function(){test(img,pos,27)},100);	
		}

		//init xiake position and image
		xiake.init();

	}

//test for draw tianjianggongji loop image
	var i=1;
	function test(img,pos,maxSize){
		if(i==maxSize){
			i=1;
		}
		Canvas.cav3.clearRect(0,0,500,500);
		Canvas.cav3.drawImage(img,pos[i].l,pos[i].t,pos[i].w,pos[i].h,0,0,pos[i].w,pos[i].h);
		i++;
	}


//get mouse position
	Canvas.canvas.addEventListener("mousedown",function(){
		var p=Common.mouseposition(Canvas.canvas,event.pageX,event.pageY);
		p.x=parseInt(p.x);
		p.y=parseInt(p.y);
		p.l=p.x;
		p.t=p.y;
		//alert(p.x+','+p.y);
		
		movexiakeloop(p,xiake);

	},false);

	xiake.init=function(){
		
		var img=new Image();
		this.img=img;
		img.src="../img/person/xiake.jpg";
		img.onload=function(){
			var p=Common.initposition(img,16,4,4,8);
			this.l=Canvas.canvas.width-p.w;
			this.t=0;
			this.w=p.w;
			this.h=p.h;
			xiake.l=this.l;
			xiake.t=0;
			xiake.w=this.w;
			xiake.h=this.h;
			//draw image
			Canvas.cav3.drawImage(img,p.l,p.t,p.w,p.h,this.l,this.t,this.w,this.h);

		}
		
	}


// move xiake position,if w,h <100,not move
	function movexiake(p,xiake){
		if(Math.abs(p.l-xiake.l)<100&&Math.abs(p.t-xiake.t)<100){
			walkinterval.clearInterval();

			return;
		}
		//accroding left,top select direction
		var ps;	
		if(p.l-xiake.l>0&&p.t-xiake.t>0){
			ps=Common.getpositionbydirection(xiake.img,16,4,4,1);
		}
		if(p.l-xiake.l<0&&p.t-xiake.t>0){
			ps=Common.getpositionbydirection(xiake.img,16,4,4,2);
		}
		if(p.l-xiake.l<0&&p.t-xiake.t<0){
			ps=Common.getpositionbydirection(xiake.img,16,4,4,3);
		}
		if(p.l-xiake.l>0&&p.t-xiake.t<0){
			ps=Common.getpositionbydirection(xiake.img,16,4,4,4);
		}
		//caculate walk,with not offset to much,and correct with rate
		var offx=p.l-xiake.l;
		var offy=p.t-xiake.t;
		var peroffx;
		var peroffy;
		var ispositionwidthbigthanheight = Math.abs(p.l-xiake.l)>Math.abs(p.t-xiake.t);
		var widthheightrate=ispositionwidthbigthanheight ?offy/offx:offx/offy;
		if(ispositionwidthbigthanheight){
			if(offx<0){
				peroffx = 10;
			}else{
				peroffx = -10;
			}	
			if(offy>0){
				peroffy=10*widthheightrate;
			}else{
				peroffy=-10*widthheightrate;
			}
		}else{
			if(offx<0){
				peroffx = 10*widthheightrate;
			}else{
				peroffx = -10*widthheightrate;
			}	
			if(offy>0){
				peroffy=10;
			}else{
				peroffy=-10;
			}
		}

		if(xiake.c==ps.length){
			xiake.c=0;
		}
		Canvas.cav3.clearRect(0,0,Canvas.canvas.width,Canvas.canvas.height);
		Canvas.cav3.drawImage(xiake.img,ps[xiake.c].l,ps[xiake.c].t,ps[xiake.c].w,ps[xiake.c].h,(xiake.l+peroffx),(xiake.t+peroffy),xiake.w,xiake.h);
		xiake.l = xiake.l+peroffx;
		xiake.t = xiake.t+peroffy;
		xiake.c++;

	}

	var walkinterval;
	//walk loop 
	function movexiakeloop(p,xiake){
		walkinterval=setInterval(function(){
			movexiake(p,xiake);		
		},200);
	}

})();