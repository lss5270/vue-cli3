// 搜索下拉菜单


//模拟数据
var searchData =[
    {"id":"0","item":"广州市越秀区税务局办税服务厅"},
    {"id":"1","item":"广州市越秀区东风西路办税服务厅"},
    {"id":"2","item":"广州市越秀区五羊新城办税服务厅"},
    {"id":"3","item":"广州市越秀区交易广场办税服务厅"},
    {"id":"4","item":"广州市天河区岗顶办税服务厅"},
	{"id":"5","item":"广州市天河区东圃办税服务厅"},
	{"id":"6","item":"广州市增城区永宁办税服务厅"},
	{"id":"7","item":"广州市黄埔区科学城办税服务厅"},
	{"id":"8","item":"广州市白云区黄石办税服务厅"},
	{"id":"9","item":"广州市荔湾区办税服务厅"},
	{"id":"10","item":"广州市番禺区办税服务厅"},
	{"id":"11","item":"广州市花都区办税服务厅"},
	{"id":"12","item":"广州市从化区办税服务厅"},
	{"id":"13","item":"广州火车站"},
	{"id":"14","item":"广州市人民政府"},
	{"id":"15","item":"广州市番禺区帝景花园"},
	{"id":"16","item":"广州市南沙区办税服务厅"} 
];

var ItemData=[];
var ObjData=[];

$(document).ready(function(){
 
  $(".input-search-select").on("keyup",function(){
		 
	var val=$(this).val()
	var valNum=val.length;
	var WinWidth=$(this).width()+10
	var data={}
	var searchHtml='<div class="tax-search-select" style="width:'+WinWidth+'px"><ul></ul></div>';
	
    if(valNum>0){ //判断如果已经输入

	ObjData=eval($(this).attr("Obj-data"))
		
	$.each(ObjData, function(id, obj) {// 获取到数据增加到tempData
                        
				              
				 if(obj.item.indexOf(val)!=-1){

								  data["id"]=obj.id
								  data["item"]=obj.item
								  ItemData.push(data);
								  data={}
	
					 }

		  });
	  

		
	} //判断是否有搜索条件 
  
   var item=""; 

   $(".tax-search-select ul").remove();
	  
   if(ItemData.length>0){
	   var x=0;
	   $(this).after(searchHtml)
	   
	   for(var i=0; i<ItemData.length;i++){
		   
		   
		   
	   }
	   
	   
	   
	   $.each(ItemData,function(id,obj){
		 
		   item='<li><i class="iconfont fsicon-yihushichaxun"></i><span>'+obj.item+'</span></li>'
		   $(".tax-search-select ul").append(item)
		   x++
		   
	   })
	   
   } 		
   
	console.log(ItemData)
	ItemData=[]
		
	})
	

	
	
$("body").on("click",".tax-search-select ul li",function(event){
	  
	  
       // event.stopPropagation(); 
	   var text=$(this).children("span").text();
	   
	   $(this).parents(".tax-search-select").prev("input").val(text)
	   
  })	

	
  $(document).click(function(event){
		
		  $(".tax-search-select ul").remove(); 
	      return false;
});

 
	
	
	
	
})

