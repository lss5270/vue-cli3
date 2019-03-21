// SelectItem 2018-11-22

$(document).ready(function(){
var SelectItemBox='<div class="SelectItemBox"><div class="SelectItem-input"><input type="text"><i class="dot"></i></div></div>'	
var StData=[]
var RtData=[]
var AllData=[]
var ObjData=eval();

//渲染输入框
$(".SelectItem").each(function(){
	var id=$(this).attr("filter")
	var width=$(this).width();
	$(this).after(SelectItemBox);
	$(this).next().width(width).children().attr("id",id)
	$(this).next().find("input").attr("placeholder",$(this).attr("placeholder"))
})


	$("body").on("click",".SelectItem-input",function(){
		
		
    	
		if($(this).next().length==0){
		   
		ObjData=eval($(this).attr("id"));
		var center='<div class="SelectItem-center" style="width:'+ObjData.width+'"></div>'
		var x=0;
		var y=0;
		$(this).after(center)
		
		$.each(ObjData.data, function(id, obj) {// 获取最近文件个数
                        
          
			if(obj.recent.indexOf("true")!=-1){
				
				RtData[x]=obj.info
				x++;
			}
			AllData[y]=obj.info
			
			y++;
		 
           
		  });
		
		if(RtData.length>0){

			var ListHtml='<div class="SelectItem-list01"><div class="item-btn"><a href="###" class="layui-btn layui-btn-primary layui-btn-xs btn-all">查看全部</a></div><div class="title"><li><span>近期申报</span></li></div><div class="item-list"></div></div>'
			$(this).next().append(ListHtml);
			for(var i=0;i<RtData.length;i++){
				
				$(this).next().find(".item-list").append("<li>"+RtData[i]+"</li>")
			}
		}else{
			
			var ListHtml='<div class="SelectItem-list01"> <div class="item-list"></div></div>'
			$(this).next().append(ListHtml);
			for(var i=0;i<AllData.length;i++){
				
				$(this).next().find(".item-list").append("<li>"+AllData[i]+"</li>")
			}
			
		}
		   
		   }
		
 
 
	})
	
	$("body").on("click",".SelectItemBox .SelectItem-center .item-btn .btn-all",function(){
		
		
		removeBox()	
		for(var i=0;i<AllData.length;i++){
				
				$(".SelectItem-list01 .item-list").append("<li>"+AllData[i]+"</li>")
			}
		 
	}) 
	
	$("body").on("keyup",".SelectItemBox .SelectItem-input input",function(){
	 
		var val=$(this).val()
		var x=0;
		StData=[]
		$.each(ObjData.data, function(id, obj) {// 获取最近文件个数     
          
			if(obj.info.indexOf(val)!=-1){
				
				StData[x]=obj.info
				x++;
				
			}
			
 
           
		  });
		
		removeBox()	
		
		if(StData.length==0){$(".SelectItem-list01 .item-list").append("<p>没有数据</p>")}
			for(var i=0;i<StData.length;i++){
				
				$(".SelectItem-list01 .item-list").append("<li>"+StData[i]+"</li>")
			}
		
	   
		 
	})
	
	
	function removeBox(){
		
		$(".SelectItem-list01 .item-btn").remove();
		$(".SelectItem-list01 .title").remove();
		$(".SelectItem-list01 .item-list").children().remove();
		
	}
	
	$("body").on("click",".SelectItem-list01 .item-list li",function(){
		
		var liVal=$(this).text();
		$(this).parents(".SelectItemBox").children(".SelectItem-input").children("input").val(liVal)
		$(this).parents(".SelectItemBox").prev().val(liVal).attr("value",liVal)
		$(".SelectItem-center").remove();
		
	})
	
	
	$("body").on("mouseleave",".SelectItemBox",function(){
	
		$(".SelectItem-center").remove();
		
	})
	
	
	
	
	
	
	
})