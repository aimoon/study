var Common={};
//caculartor image position,acoording img,size width size...
var caculatorimage=function(img,allSize,widthSize,heightSize){
	var positions=new Array();
	var ww=img.width/widthSize;
	var hh=img.height/heightSize;
	console.log(img.width);
	var p={w:1,h:1,l:1,t:1};
	for(var i=0;i<widthSize*heightSize;i++){
		if(i==allSize){
			break;
		}
		var ll=i%widthSize*ww;
		var tt=parseInt(i/widthSize)*hh;
		if(i%widthSize)
		p.w=ww;
		p.h=hh;
		p.l=ll;
		p.t=tt;
		
		positions[i]=p;
		if(1==1){
			ll=ll;
		}
	}
	return positions;
}

//get canvas mouse position
function mouseposition(canvas, x, y) {

    var bbox =canvas.getBoundingClientRect();

    return { x: x- bbox.left *(canvas.width / bbox.width),

            y:y - bbox.top  * (canvas.height / bbox.height)

            };

}

//get xiake init  image position
// index is number,not the index
function initposition(img,allSize,widthSize,heightSize,index){
	return Common.caculatorimage(img,allSize,widthSize,heightSize)[index-1];
}

function getpositionbydirection(img,allSize,widthSize,heightSize,row){
	var ps=Common.caculatorimage(img,allSize,widthSize,heightSize);
	Common.printarray(ps);
	return ps.slice(widthSize*(row-1),widthSize*(row));
}

function printarray(arr){
	var str;
	for(var i=0;i<arr.length;i++){
		if(!arr[i])continue;
		str+='[l='+arr[i].l+',t='+arr[i].t+'],'
	}
	console.log('array:'+str);
}
Common.caculatorimage=caculatorimage;
Common.mouseposition=mouseposition;
Common.initposition=initposition;
Common.getpositionbydirection=getpositionbydirection;
Common.printarray=printarray;