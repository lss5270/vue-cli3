// 电子税务局 v1.0.1 2018.11.23


 function setHeight(){
			 			
				 $(document).ready(function(){
					 var iframeH=$("#center-iframe").contents().find("body").height();
					 var setH=700;
				     var cLeft=$(".left-menu").height()+40;
				      
				     if(cLeft>setH){
						 setH=cLeft+20;

					 }
			
					if(iframeH>setH){
						

					   $(".subpage-center-left").height(iframeH);
					   $(".subpage-center-right").height(iframeH);
						
					   }else{
						   
					   $(".subpage-center-left").height(setH);
					   $(".subpage-center-right").height(setH);
					   
					   }

			})
			 
			 
}

$(document).ready(function(){
	

//Tax-tab标签
	
$("body").on("click",".tax-tab .tax-tab-title li",function(){
	$(this).addClass("tax-this").siblings().removeClass("tax-this");
	$(this).parent().next().children().eq($(this).index()).addClass("tax-show").siblings().removeClass("tax-show");
})	

//初始化左菜单
	
	var arrowUp='<i class="iconfont fsicon-xiangshang"></i>'
	var arrowDown='<i class="iconfont fsicon-xiangxia"></i>'
	
	$(".left-menu ul li").each(function(){
		
		var dl=$(this).children("dl").length;
		
		if(dl>0){
			
			$(this).children("a").attr("submenu","true").append(arrowDown);
		}
		
	})
	
	function setArrow(){
		
		$(".left-menu .left-menu-active").children("a").children("i").removeClass("fsicon-xiangxia").addClass("fsicon-xiangshang");
		$(".left-menu .left-menu-active").children("dl").slideDown();
	}
	
	setArrow();
	
	$(".left-menu>ul>li>a").on("click",function(){
		
		
		if($(this).next("dl").length>0){
		   
		   if($(this).attr("submenu")=="true"){
			
			$(".left-menu .left-menu-active").children("a").children("i").removeClass("fsicon-xiangshang").addClass("fsicon-xiangxia"); 
			$(".left-menu .left-menu-active").removeClass("left-menu-active")
			$(this).parent().addClass("left-menu-active") 
			$(this).children("i").remove();
			$(this).append(arrowUp)
			$(this).next().fadeIn();
			$(this).parent().siblings().children(".left-menu-child").hide();
			setHeight()
			$(this).attr("submenu","false")
		    $(this).parent().siblings().children("a").attr("submenu","true")
		}else{
			$(this).children("i").removeClass("fsicon-xiangshang").addClass("fsicon-xiangxia");
			$(this).attr("submenu","true");
			$(this).next().slideUp();
			setHeight()
		}
		
		   
		   }else{
			  $(".left-menu-this").removeClass("left-menu-this");
			  $(this).addClass("left-menu-this"); 
		   }
		
		
	})
	 

	$(".left-menu>ul>li>dl a").on("click",function(){
		
		$(".left-menu-this").removeClass("left-menu-this");
		$(this).addClass("left-menu-this");
	})
	
//layui-tab-hover 鼠标划入切换标签
	
$(".layui-tab-hover>.layui-tab-title>li").on("mouseenter",function(){
	
	 $(this).addClass("layui-this").siblings().removeClass("layui-this");
	$(this).parent().next().children().eq($(this).index()).addClass("layui-show").siblings().removeClass("layui-show");
	
})	

	
$("body").on("mouseleave",".layui-layer.layui-layer-tips.layui-table-tips",function(){
	
	$(".layui-layer.layui-layer-tips.layui-table-tips").remove();
	
})	
	

//切换用户脚本		
		var iSum;
	    var userAwidth=$(".user-item .user-name").width();
	    if(userAwidth<150){
			$(".user-item").width(userAwidth)
		   
		}else{
			$(".user-item .user-name").width(150)
		}
	    
		$(".user-item").on("mouseenter",function(){
			var i=0
			iSum=setInterval(function(){
				
			if(i>3){
				$(".user-item ul").fadeIn()
				clearInterval(iSum);
			}
			i++	
			},70)
				
			} )

		$(".user-item").on("mouseleave",function(){
					 
					$(".user-item ul").fadeOut();
                    clearInterval(iSum);
 
				})
//切换用户脚本结束
	
})//document加载完毕


//扩展laydate周六日红色文字

function taxlaydate(){ 

  
	$(function(){
      
		$(".layui-laydate-content table tbody tr").each(function(){
			
			$(this).children("td").eq(0).addClass("numRed")
			$(this).children("td").eq(6).addClass("numRed")
		})
		
		$(".laydate-day-prev").removeClass("numRed")
		$(".laydate-day-next").removeClass("numRed")
		
    })

}





