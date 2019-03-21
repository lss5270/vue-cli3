// JavaScript Document


$(document).ready(function(){
setLeftBtn()
itemNumber()	
var index="";
var rightNum="";	
var type="";
var leftAdd=""
var lengthNum=""
var dtIndex=""
var tt;
var winSetSelect=$("#htmlbox .win-set-select").html()	
var winSetValue=$("#htmlbox .win-set-value").html()
var winBallot=$("#htmlbox .win-ballot").html()
var foatDtBtn=$("#htmlbox .float-dt-btn").html()
var itemRadio=$("#htmlbox .item-radio").html()
var itemSelect=$("#htmlbox .item-select").html()
var itemValue=$("#htmlbox .item-value").html()
var itemText=$("#htmlbox .item-text").html()
var dtRadio='<dt number-data="0" weight-data="0" ><i class="iconfont fsicon-btn-radio dot-input"></i><input type="text" name="topic" required lay-verify="required" value="请输入单选项" class="item-input"></dt>'
var dtSelect='<dt number-data="0" weight-data="0"><i class="iconfont fsicon-btn-checkbox dot-input"></i><input type="text" name="topic" required lay-verify="required" value="请输入多选项" class="item-input"></dt>'
$("#htmlbox").remove();
	
//统计item个数
	
function itemNumber(){
	
	var num=$(".questionnaire-center .drag-item").length
	$("#item-number").text(num)
	
}	
	
	
// 添加选题
	

	
	$(".box-left .layui-btn ").on("mouseup",function(){
		
	setLeftBtn()

	
	})
	$(".box-left .layui-btn").on("mousedown",function(){
		$(this).children(".sortableL").width(500).height(200).css({"overflow":"inherit"}); 
		$(this).children(".sortableL").css({"opacity":"1"});
		leftAdd=$(this).children(".sortableL").html();
		index=$(this).index();
	    rightNum=$(".questionnaire-center .drag-item").length;
		
	})
//初始化按钮
	
function setLeftBtn(){
	
	$(".box-left .layui-btn").find(".sortableL").css({"opacity":"0"}).width(80).height(30).css({"overflow":"hidden"});
	
}	
	
function leftApp(){
	
	$(".box-left .layui-btn").eq(index).find(".sortableL").append(leftAdd);
	
	
} 
	

  $( ".sortableL,.questionnaire-center" ).sortable({
      connectWith: ".connectedSortable",
	  placeholder: "ui-state-highlight",
	  stop: function() {
	     var newNum=$(".questionnaire-center .drag-item").length;
		 
		 if(rightNum<newNum){
			
			leftApp()
			} 
         sortItem()//排序
		 setLeftBtn()//初始化左边隐藏图层
		 dtSortale()//重新加载dt排序 
		  
		
      }
    })
	
	
	
//操作提示
	
$(".questionnaire-center").on("mouseenter",".drag-item .left-btn .btn-p",function(){
	
	$(this).children(".notice").fadeIn();
	clearTimeout(tt);
	timeNotice()
	
})
	
$(".questionnaire-center").on("mouseleave",".drag-item .left-btn .btn-p",function(){
	
	$(this).children(".notice").fadeOut();
	
})	
	
	
function timeNotice()
{
var tt=setTimeout(function(){
		
		$(".questionnaire-center .drag-item .left-btn .btn-p .notice").fadeOut();
	
	},1500)
}	
	
//set 设置
	
$(".questionnaire-center").on("click",".type-select .left-btn .fsicon-btn-set",function(){
	 
	$(this).parent().append(winSetSelect)

})	
	
$(".questionnaire-center").on("click",".type-value .left-btn .fsicon-btn-set",function(){

	 $(this).parent().append(winSetValue)
 
})


	
//点击 float-dt-btn del-dt

$(".questionnaire-center").on("click",".drag-item .item-main .item-topic .del-dt",function(){
	
   lengthNum=$(this).parents("dt").siblings().length;
   index=$(this).parents(".drag-item").index();
   dtIndex=$(this).parents("dt").index();

	
	 
	
	if(lengthNum>0){
	layer.open({
            type: 1, area: ['280px', '200px'],
			title: '提醒',
            content: "是否确认删除？"
           ,btn: ['确定', '关闭']
           ,btnAlign: 'r' //按钮居中
           ,yes: function(){
			 
		    delDt() 
			   
            layer.closeAll();
 
           }
		    ,btn2: function(index, layero){
			//按钮【按钮二】的回调
         
		
			//return false 开启该代码可禁止点击该按钮关闭
		     }
            });
	    
	 }
	
	

})
function delDt(){
	
	
	
	
	   $(".questionnaire-center .drag-item").eq(index).find("dl").find("dt").eq(dtIndex).remove(); 
	
	
}	
	
	
//点击 float-dt-btn set-ballot	

$(".questionnaire-center").on("click",".drag-item .item-main .item-topic .set-ballot",function(){
	
   
	 $(this).parents("dt").append(winBallot)
	 

})	

//点击 float-dt-btn add-dt	

$(".questionnaire-center").on("click",".type-radio .item-main .item-topic .add-dt",function(){
	
   
	 $(this).parents("dt").after(dtRadio)


})
//点击 float-dt-btn add-dt	

$(".questionnaire-center").on("click",".type-select .item-main .item-topic .add-dt",function(){
	
   
	 $(this).parents("dt").after(dtSelect)
	 

})	
	
//移入dt 	type-radio
	
$(".questionnaire-center").on("mouseenter",".type-radio .item-main .item-topic dt",function(){

	 $(this).append(foatDtBtn)

}) 
$(".questionnaire-center").on("mouseleave",".type-radio .item-main .item-topic dt",function(){

	 $(".item-topic dt .dt-btn").remove();

})

	
//移入dt 	type-select
$(".questionnaire-center").on("mouseenter",".type-select .item-main .item-topic dt",function(){

	 $(this).append(foatDtBtn)

}) 
$(".questionnaire-center").on("mouseleave",".type-select .item-main .item-topic dt",function(){

	 $(".item-topic dt .dt-btn").remove();

})	
	
	
//排序-item
	
	$(".questionnaire-center").sortable({
	delay: 300,
	placeholder: "ui-state-highlight",
	axis: "y",
	stop: function() {sortItem()}	
		
		
	});
	
	
//排序-dt
function dtSortale(){
	
    $(".type-radio .item-main dl").sortable({
	delay: 200,
	placeholder: "ui-state-highlight",
	axis: "y",
	stop: function(){}	
		
		
	});	
	$(".type-select .item-main dl").sortable({
	delay: 200,
	placeholder: "ui-state-highlight",
	axis: "y",
	stop: function(){}	
		
		
	});		
	
}	
dtSortale()	//加载dt排序 
	
//copy添加题目事件
	
$(".questionnaire-center").on("click",".drag-item .left-btn .fsicon-btn-copy",function(){
	
	index=$(this).parents(".drag-item").index();
	type=$(this).parents(".drag-item").attr("type")
    copyDragItem()
	dtSortale()//重新加载dt排序 
})	
	
	
//删除题目块事件
	
$(".questionnaire-center").on("click",".drag-item .left-btn .close-drag",function(){
	
 
	index=$(this).parents(".drag-item").index();
	
	layer.open({
            type: 1, area: ['280px', '200px'],
			title: '提醒',
            content: "是否确认删除？"
           ,btn: ['确定', '关闭']
           ,btnAlign: 'r' //按钮居中
           ,yes: function(){
			
		    delDragItem()
			   
            layer.closeAll();
 
           }
		    ,btn2: function(index, layero){
			//按钮【按钮二】的回调
         
		
			//return false 开启该代码可禁止点击该按钮关闭
		     }
            });
	
	
})
	
     //删除题目块
function delDragItem(){
	
	$(".questionnaire-center .drag-item").eq(index).animate({"opacity":"0","height":"0","marginBottom":"0"},500)
	setTimeout(function(){$(".questionnaire-center .drag-item").eq(index).remove();},500)
	setTimeout(function(){sortItem();},501);
  	 
}	
	
   //id重新排序
function sortItem(){
	
	var num=$(".box-right .drag-item").length;
	
 	for(var i=0; i<num; i++){
		$(".box-right .drag-item").eq(i).find(".id").find("span").text(i+1)
		
	}
	itemNumber()
   
}	
	
	

    //增加题目块
	
function copyDragItem(){
	 
	var html='<div class="drag-item '+type+'" style="opacity:0">'+$(".questionnaire-center .drag-item").eq(index).html()+'</div>'
	$(".questionnaire-center .drag-item").eq(index).after(html)
    $(".questionnaire-center .drag-item").eq(index).next().animate({"opacity":"1"},500)
	setTimeout(function(){sortItem()},501);
  		
}	
	
	
 
	//关闭设置窗口
	
	
	$(".questionnaire-center").on("click",".set-box .set-btn-box .btn-close",function(){
  
		$(this).parents(".set-box").remove();

		
	})//关闭设置规则
	
	
	$(".questionnaire-center").on("click",".drag-item .dt-ballot .btn-close",function(){
   
		$(this).parents(".dt-ballot").remove();

		
	})//关闭设置票数
	
	
	
})