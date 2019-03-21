// JavaScript Document

$(document).ready(function(e) {
	
	 
	
	
	
	
	//普通用户的高度
	var ieHeight=$(window).height();
	var headHeight=$(".juz02").height();
	$(".user .biao_leftmenubox").height(ieHeight-headHeight);
	$(".user .tableDiv").height(ieHeight-headHeight-4);	 
	
	
	
	
	//获取高度

	    $(window).resize(function() {
	  	 var ieHeight=$(window).height();
		 var ieWidth=$(window).width();
		 var footHeight=$(".developer .FootEdit").height();
		 var headHeight=$(".juz02").height();
        
		 $(".developer .biao_leftmenubox").height(ieHeight-footHeight-headHeight);
		 $(".developer .tableDiv").height(ieHeight-footHeight-headHeight-4);
		
	     $(".user .biao_leftmenubox").height(ieHeight-headHeight);
		 $(".user .tableDiv").height(ieHeight-headHeight-4);
		 $(".developer .line").height(ieHeight-footHeight-headHeight);
		 $(".developer .line").css({"marginTop":headHeight})
		 var tableDiv=$(".tableDiv").height();
		 var footedit=ieHeight-headHeight-tableDiv
		 $(".developer .FootEdit").css({height:footedit});
		 $(".developer .TableMain").height(ieHeight-footHeight-headHeight);
		 $(".developer .boxStyle").height(ieHeight-footHeight-headHeight);
		  //重复计算
		 $(".developer .TableMain").css({"width":"80%"});
		 $(".developer .RightEdit").css({"width":"20%"});
		 $(".developer .linefoot").css({top:headHeight+tableDiv});
		 $(".developer .linefoot").css({width:ieWidth});
		 var linew=$(".TableMain").width();
		 $(".developer .line").css({left:linew})
		});
		
		
		
	//开发者切换
	var clikBtnI=0;
	$("#clikBtn").click(function(){
		if (clikBtnI==0){
		 $("body").removeClass("user");
		 $("body").addClass("developer");
		 var rightEdit="<div class='RightEdit' id='divRight'><div class='boxStyle'><h1>开发者模式</h1></div></div>";
		 var footEdit="<div class='FootEdit'><h1>开发者模式</h1></div>";
		 var line="<div class='line' id='line'></div>";
		 var linefoot="<div class='linefoot' id='linefoot'></div>";
         $("body").append(rightEdit);
	     $("body").append(footEdit);
		 $("body").append(line);
		 $("body").append(linefoot);
	   
	   //加载高度
	     var ieWidth=$(window).width();
	     var ieHeight=$(window).height();
		 var footHeight=$(".developer .FootEdit").height();
		 var headHeight=$(".juz02").height();
		 
		 //加载宽度
		 $(".developer .linefoot").css({width:ieWidth});
		 $(".developer .TableMain").css({"width":"80%"});
		 $(".developer .rightEdit").css({"width":"20%"});
		 
		 //加载高度
         $(".developer .TableMain").height(ieHeight-footHeight-headHeight);
		 $(".developer .biao_leftmenubox").height(ieHeight-footHeight-headHeight);
		 $(".developer .tableDiv").height(ieHeight-footHeight-headHeight-4);
		 $(".developer .boxStyle").height(ieHeight-footHeight-headHeight);
		 $(".developer .line").height(ieHeight-footHeight-headHeight);
		 $(".developer .line").css({"marginTop":headHeight})
		 var tableDiv=$(".tableDiv").height();
		 $(".developer .linefoot").css({top:headHeight+tableDiv});
		 var linew=$(".TableMain").width();
		 $(".developer .line").css({left:linew})
		 var btnheight=$(".tableDiv").height();
         $(".close_btn").height(btnheight)
			
		//加载宽度
		
		$("#clikBtn").text("普通用户")
		clikBtnI++;	
		//切换结束
		
		//x拖动
		
		$(function(){
              //是否移动
              var mFlag=false;
            //鼠标与div左上角相对位置
              var divX
             $(".line").bind("click mousedown", function(e){
              if (event.type == 'click') {
				 
                }else if(event.type == 'mousedown') {
					 
                   mFlag=true;
                   divX = e.pageX - parseInt($(".line").css("left"));
                    
                    
               }
 
 
              });
            $(document).mousemove(function(e){
            if(mFlag){
           //画出新坐标
		           if(e.pageX<$(window).width() - 100){
			   
			        var rightw=$(window).width() - e.pageX
		   
		              $(".line").css({left:e.pageX-divX});
                      $(".TableMain").css({width:e.pageX});
		              $(".RightEdit").css({width:rightw});
			                                          }
		                                       
                     }
            })
			
			
			.mouseup(function(){
             mFlag=false;
           //松开鼠标后停止移动并恢复成不透明
             });

           })
		
		
		
		$(function(){
              //是否移动
              var mFlag=false;
            //鼠标与div左上角相对位置
              var divY
             $(".linefoot").bind("click mousedown", function(e){
              if (event.type == 'click') {
				 
                }else if(event.type == 'mousedown') {
					 
                   mFlag=true;
                   divY = e.pageY - parseInt($(".linefoot").css("top"));
                    
                    
               }
 
 
              });
            $(document).mousemove(function(e){
            if(mFlag){
           //画出新坐标
		           if(e.pageY<$(window).height()-42){

			        var Fh=$(window).height() - e.pageY
		            var headHeight=$(".juz02").height(); 
		              $(".linefoot").css({top:e.pageY-divY});
                      $(".developer .biao_leftmenubox").css({height:e.pageY-headHeight});
		              $(".developer .tableDiv").css({height:e.pageY-headHeight});
					  $(".developer .TableMain").css({height:e.pageY-headHeight});
					  $(".developer .boxStyle").css({height:e.pageY-headHeight});
					  $(".developer .line").css({height:e.pageY-headHeight});
					  $(".developer .FootEdit").css({height:Fh});
				    var btnheight=$(".tableDiv").height();
		              $(".close_btn").height(btnheight)
					  
					  
			              }
		                                       
                     }
            })
			
			
			.mouseup(function(){
             mFlag=false;
           //松开鼠标后停止移动并恢复成不透明
             });

           })
		
			
			
			}else{
				
		window.location.reload();//刷新当前页面

				}
				
				
		
	})
		
//左边菜单切换

var btnfixed=true

 $(".biao_leftmenubox .btnfixed").live("click",function(){
	 
	 
	 if(btnfixed){  
	                $(".btnfixed span").removeClass("icon-on").addClass("icon-off")
					$(".leftBox01").removeClass().addClass("leftBox02");		 
					$(".biao_leftmenu").width(0)
	                 btnfixed=false
	             }else{
		
						$(".btnfixed span").removeClass("icon-off").addClass("icon-on")
						$(".leftBox02").removeClass().addClass("leftBox01");
					 
						$(".biao_leftmenu").width(350)
		                 btnfixed=true
		               }
    
	
  });
  

  
  
		 
		 



          var  btnheight=$(".tableDiv").height();
		  $(".close_btn").height(btnheight)
	      $(window).resize(function(){
		  var btnheight=$(".tableDiv").height();
		   $(".close_btn").height(btnheight)
		
		});
		
//0525修改问题		
		
		var closebtn=0;
	$(".leftBox01 .close_btn1").click(function(){
		
		var menu=$(".leftBox01 .biao_leftmenubox");
		var TableManW=$(".TableMain").width();
		var rightEditW=$(".rightEdit").width();	
			
		if(closebtn==0){
			
			
			$(".TableMain").width(TableManW)
			$(".rightEdit").width(rightEditW)
			menu.fadeOut()
			$(".leftBox01 .close_btn span").text(">")
	 
			closebtn++;
	 
     		}else{
				
			$(".TableMain").width(TableManW)
			$(".rightEdit").width(rightEditW)	
			menu.fadeIn()
			
			
			$(".leftBox01 .close_btn span").text("<")
			
		 
			closebtn=0;	
				}
		
		
		})
//0525修改问题结束			
	  	
//左边菜单切换02
    
   $(".leftBox02").live("mouseenter",function(){
	   var menu=$(".leftBox02 .biao_leftmenubox");
	   menu.show()
	   });	
	   
	$(".leftBox02").live("mouseleave",function(){
	   
	   var menu=$(".leftBox02 .biao_leftmenubox");
	   menu.fadeOut()
	   
	   });   	
			
//填表说明

$(".tabmenu .title").on("click",function(){
	
	  $(".tabmenu .title").removeClass("active");
	  $(".tabmenu .listbox ul").slideUp();
	  $(this).addClass("active");
	  $(this).next().slideDown();
	})		

$(".leftTab li").on("click",function(){
	   $(".leftTab li").removeClass("active")
	   $(this).addClass("active")
	   var tab=$(this).index();

	   $(".biao_leftmenubox").children("ul").hide();
	   $(".biao_leftmenubox").children("ul").eq(tab).fadeIn();
	 //  $(".biao_leftmenubox>ul").index(tab).fadeIn();
	})		

});