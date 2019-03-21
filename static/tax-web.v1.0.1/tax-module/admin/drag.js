$(function(){
	
	//定制栏目

		 
	$( ".drag-box" ).sortable(
	   {revert: true,
		placeholder: "ui-state-highlight",
		sort:function(){
		  
		  $(".ui-state-highlight").width($(this).find(".ui-sortable-helper").outerWidth()-2)
		 
		}
	   
	   }
	);
 
		
		//拖动窗口
    $( ".drag-box" ).disableSelection(
	 
		 
	
	);//拖动窗口排序
	
		
	//设置下拉	
    $(".win-menu").on("mouseenter",function(){
		
		$(this).children("ul").show()
		
	 })
	
	 $(".win-menu").on("mouseleave",function(){
		
		$(this).children("ul").hide()
		
	 })	
		
	//获取大中小	
		
	 $(".win-box").each(function(){
		 
		 var i=0
		 $(this).find(".center-box .center-div").each(function(){
			 
			 if($(this).attr("className")=="box-big"){
				 
				 if($(this).attr("state")=="active"){
					 
					 $(this).parents(".win-box").find(".win-menu ul").prepend('<li className="box-big" class="active">大</li>')
				 }else{
					 
					$(this).parents(".win-box").find(".win-menu ul").prepend('<li className="box-big">大</li>') 
				 }
				 
				 
			 }
			 if($(this).attr("className")=="box-mid"){
				 
				 
				 if($(this).attr("state")=="active"){
					 
					 $(this).parents(".win-box").find(".win-menu ul").prepend('<li className="box-mid" class="active">中</li>')
				 }else{
					 
					$(this).parents(".win-box").find(".win-menu ul").prepend('<li className="box-mid">中</li>')
				 }
				 
				 
				 
				 
			 }
			 if($(this).attr("className")=="box-small"){
				 
				 
				 if($(this).attr("state")=="active"){
					 
					 $(this).parents(".win-box").find(".win-menu ul").prepend('<li className="box-small" class="active">小</li>')
				 }else{
					 
					$(this).parents(".win-box").find(".win-menu ul").prepend('<li className="box-small">小</li>')
				 }
				 
				 
				 
			 }
		 })
		  
		 
	 })
		
	
	//设置窗口大小
		
	
	$(".win-menu ul").on("click","li",function(){
		
		var xid=$(this).attr("className")
		var jid=$(this).siblings(".active").attr("className")
		$(this).addClass("active").siblings().removeClass("active")
		$(this).parents(".win-box").removeClass(jid).addClass("win-box "+xid)
		resizeChart()
	})
	
	$(function(){$(window).resize(function(){resizeChart() })}) //监控高度
	
	function resizeChart(){
		 
        dsjfx01.resize();
		dsjfx02.resize();
		dsjfx03.resize();
		yjk01.resize();
		yjk02.resize();
		yjk03.resize();
		myChart.resize();
		myChart05.resize();
		myChart04.resize();
		
		
	}
		
		
	//删除窗口
		
		
    $(".win-box .title .del").on("click",function(){
		
		$(this).parents(".win-box").remove();
		
	})
	
})

