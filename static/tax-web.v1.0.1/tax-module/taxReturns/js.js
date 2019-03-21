$(document).ready(function(){
	//-----------------总控页面宽度--------------------------------
	var winwidth=$(window).width()
	if(winwidth<1240){
		$(".juz").css({width:1000})
		}
	//-------------------界面所有左菜单------------------------------
	//var imgurl2=$(".leftmenuul>li").eq(0).children("a").children("img").attr("alt")
	$(".leftmenuul>li").eq(0).children("ul").slideDown()
	$(".leftmenuul>li").eq(0).children("a").addClass("inactive").children("img")//.attr("src",'../images/icons/icons/'+imgurl2+'.png')

	$(".leftmenuul>li>a").on("click",function(){
	    //var imgurl=$(this).children("img").attr("alt")
	    //$(".leftmenuul>li>a").children("img").attr("src",'../images/icons/'+imgurl+'.png')
		//$(this).children("img").attr("src",'../images/icons/icons/'+imgurl+'.png')
		
		$(".unactive").removeClass(".unactive").addClass("noerj")
		$(this).toggleClass("inactive")
		$(this).next("ul").slideToggle().parent("li").siblings().children("ul").slideUp()
		$(this).parent("li").siblings().children("a").removeClass("inactive")
		})
		$(".leftmenuul>li>ul>li>a").on("click",function(){//mouseover
		$(".unactive").removeClass("unactive").addClass("noerj")
		$(this).addClass("sonover")
		$(this).next("div").fadeIn().parent("li").siblings().children("div").fadeOut()
		$(this).parent("li").siblings().children("div").fadeOut()
		$(this).parent("li").siblings().children("a").removeClass("sonover")
		})
		$(".noerj").on("click",function(){
		    $(".noerj").removeClass("unactive").addClass("noerj")
			$(this).removeClass("noerj").addClass("unactive")
			$(".sonover").removeClass("sonover")
			})
		
		$(".leftmenuul>li>ul>li>div").on('mouseleave',function(){
		//$(this).prev().removeClass("sonover")
		$(this).css({"display":"none"})
		})
		$(".leftmenu_sondiv li>a").on('click',function(){
		$(this).parent().parent().parent("div").fadeOut()
		})//左侧菜单效果结束
		
		
	//更多操作按钮---------------------------------
	
	$(".btn_more").mouseover(function(){
		$(".btn_more ul").fadeIn()
		})	
			
    $(".btn_more").mouseleave(function(){
		$(".btn_more ul").fadeOut(100)
		})
		
		$(".btn_more li a").click(function(){
		$(".btn_more ul").fadeOut(100)
		}) 
	
	//内容TABS----------------------------------------	
 $(".tabs_01 li").click(function(){
	 var indexdq=$(this).index()
	 $(this).addClass("active").siblings().removeClass()
	 $(".show01").children().eq(indexdq).show().siblings().hide()
	  }) 
	  
 $(".tabs_02 li").click(function(){
	 var indexdq=$(this).index()
	 $(this).addClass("active").siblings().removeClass()
	 $(".show02").children().eq(indexdq).show().siblings().hide()
	  }) 	
	  
 $(".mapTab li").click(function(){
	 var indexdq=$(this).index()
	 $(this).addClass("hover").siblings().removeClass()
	 $(".show03").children().eq(indexdq).show().siblings().hide()
	  }) 	
	    
	  
	  
//翻页脚本----------------------------------------	
var pageA=$(".page_box a").length;//页数

//下一页
$(".page_box .down").click(function(){
	var activeB=$(".page_box .active").index();
	
     $(".page_box span").eq(0).show();
	 
	       
		   
		   if(activeB<pageA-2){  
		   
		   if(activeB<4){$(".page_box a").eq(activeB).removeClass();
	       $(".page_box a").eq(activeB+1).addClass("active")}else{$(".page_box a").hide();
								 $(".page_box a").eq(activeB+1).show();
		                         $(".page_box a").eq(activeB+2).show();
		                         $(".page_box a").eq(activeB).show();
		                         $(".page_box a").eq(activeB-1).show();
		                         $(".page_box a").eq(activeB-2).show();}
		                         
			       }
           if(activeB<pageA){ 
		   
		   $(".page_box a").eq(activeB).removeClass();
	       $(".page_box a").eq(activeB+1).addClass("active")}   
		   
		   if(activeB==pageA-2){$(".page_box .down").hide();} 
	
	})
	
//上一页
$(".page_box .up").click(function(){
	//var activeB=$(".page_box a").eq(".active").index();
	var activeB=$(".page_box .active").index();
     $(".page_box .down").show();
	  
	  
	  if(activeB<4){
        
				              $(".page_box a").hide();
				              $(".page_box a").eq(0).show();
							  $(".page_box a").eq(1).show();
							  $(".page_box a").eq(2).show();
							  $(".page_box a").eq(3).show();
							  $(".page_box a").eq(4).show();
							 
				              $(".page_box a").eq(activeB).removeClass();
	                          $(".page_box a").eq(activeB-1).addClass("active");
				
				              if(activeB==1){$(".page_box .up").hide();}
		    						  
		  }else{
			  
			  
			  
			    if(activeB<pageA-4){
					
					             
					             $(".page_box a").hide();
								 $(".page_box a").eq(activeB+1).show();
		                         $(".page_box a").eq(activeB+2).show();
		                         $(".page_box a").eq(activeB).show();
		                         $(".page_box a").eq(activeB-1).show();
		                         $(".page_box a").eq(activeB-2).show();
					
					             $(".page_box a").eq(activeB).removeClass();
	                             $(".page_box a").eq(activeB-1).addClass("active")
					
					}else{ $(".page_box a").eq(activeB).removeClass();
	                             $(".page_box a").eq(activeB-1).addClass("active")}
			    
				
				
				
				}

				   
				  
	                	
				   	    
	  
	if(activeB==0){$(".page_box .down").eq(0).hide();}   
	  
	  
	      
	})	
	
	
	
	
	
//var pageC=1;//左边累计
var pageRight=0;//左右判断
    if(pageA>5){
		for(i=5;i<pageA;i++){
			$(".page_box a").eq(i).hide();
			$(".page_box span").eq(0).hide();
			}
		
		}else{
			$(".page_box span").hide();
			}
  
 $(".page_box a").click(function(){
	// var activeE=$(".page_box a").eq(".active").index();
	 var activeA=$(this).index();
 //    if(activeA==1){$(".page_box span").eq(0).hide();}
	
     if(activeA>3){
		 if(pageA-activeA>4){
			  
			  $(".page_box a").hide();
		      $(this).show();
		      $(".page_box a").eq(activeA).show();
		      $(".page_box a").eq(activeA+1).show();
		      $(".page_box a").eq(activeA-1).show();
		      $(".page_box a").eq(activeA-2).show();
		      $(".page_box a").eq(activeA-3).show();
		                     }else{
								 $(".page_box a").hide();
		                         $(".page_box a").eq(pageA-1).show();
		                         $(".page_box a").eq(pageA-2).show();
		                         $(".page_box a").eq(pageA-3).show();
		                         $(".page_box a").eq(pageA-4).show();
		                         $(".page_box a").eq(pageA-5).show();
								 
								 }
		   	 
			 }else{
				 
				                 $(".page_box a").hide();
				                 $(".page_box a").eq(0).show();
		                         $(".page_box a").eq(1).show();
		                         $(".page_box a").eq(2).show();
		                         $(".page_box a").eq(3).show();
		                         $(".page_box a").eq(4).show();
				 
				 
				 }
			
						
	
		               

       if(activeA==pageA-1){$(".page_box .down").hide(); }
  
       if(activeA<pageA-1){$(".page_box .down").show();}
   
       if(activeA>0){$(".page_box .up").show();}
	   if(activeA<1){$(".page_box .up").hide();}
  // if(activeA==0){$(".page_box .down").hide();}
   
		 $(".active").removeClass();
	     $(this).addClass("active");
		 $(".page_box .active").removeClass();
	     $(this).addClass("active");
        
	 })

if(pageA>1){$(".page_box .down").show();}


//脚本 地图
$(".sondiv01 a").click(function(){
	
	$(".mapMenu").slideUp()
	$(".mapBtn").fadeIn()
	})
	
$(".mapBtn li").click(function(){
	
	$(".mapMenu").slideDown()
	$(".mapBtn").fadeOut()
	
	})
	
	
$('.anima').mouseenter(function(){
	$(this).find('ul').fadeIn(1)
	
	})	
	
$('.anima').mouseleave(function(){
	
	$(this).find('ul').fadeOut()
	})	

	
	
 
});


	
	
	