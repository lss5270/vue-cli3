//  办税地图 2018-09-08

	


$(document).ready(function(){
	
setWin()

function setWin(){
var mapWinH=document.documentElement.clientHeight	//获取浏览窗口高度

	$(".map_bg").height(mapWinH)
	$(".mapLeftMenu").height(mapWinH)
	$(".map-left-menu-box .left-menu").height(mapWinH-$(".map-left-menu-box .left-title").height())
} 
	

$(".left-menu .left-menu-child dd>a").on("click",function(){
	
	$(".left-menu .left-menu-child dd .office").hide()
	$(this).next().fadeIn()
	
})	
	
	
})

function mapWin(top,left,name){
	
	layer.open({
		     id:"mapwin"
            ,type: 1
		    ,area: ['468px', 'auto']
		    ,offset:[top,left]
			,title: name
		    ,shade: 0
            ,content:$('#winmain')
             
            }); 
	
	 $(".layui-layer-page .layui-layer-content").css({ "overflow": "inherit","paddingTop":"10px" })
	
}


