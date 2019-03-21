// 表格头部固定顶端

$(document).ready(function(){
		
		 //获取tr 生成表头
		 function loadTable(){
			  
			  var trArray=new Array();
			  var i=0;
			 
			  $("body").append('<div class="fixedTable"><ul><table width="100%" border="0" cellspacing="1" cellpadding="0" ></table></ul></div>')
			  $(".NewTableMain table tr").each(function(){
                  
				  if($(this).attr("fixed")){
					  
					 trArray[i]=$(this).html();
					 $(".fixedTable ul table").append("<tr>"+trArray[i]+"</tr>") 
					 i=i+1;
				  }  
				  
			  })
			 
			 
		 }
		
		//设置宽度
		function widthTable(){
		    
			var i=0;
			$(".NewTableMain table tr").each(function(){
                  
				  if($(this).attr("fixed")){
					  
					 $(this).children().each(function(){
						 
						$(".fixedTable ul table td").eq(i).attr("width",$(this).width()) 
						i=i+1; 
					 })				 
					 
				  }  
				
				
				
			  })
			 
		 	
		}
		
		
		//滚动页面表格操作
		 
		var tableTop=$(".NewTableMain").offset().top+10;
		$(window).scroll(function() {
			
            var scTop=$(window).scrollTop()
			
			if(scTop>tableTop){
				
				$(".fixedTable").show();
			} else{
				
				$(".fixedTable").hide();
			}
		 
        });
		

	 loadTable()//载入表格头部
	 widthTable()//设置TD宽度

	
	})