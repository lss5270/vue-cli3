// JavaScript Document
$(document).ready(function(){
	
//定义元素	
	
var businessItem='<ul class="item-ul"><i class=""></i><a href="###"></a><div class="description">请输入功能说明</div></ul>';
var businessBtn='<div class="item-but"><i class="iconfont fsicon-btn-edit"></i><i class="iconfont fsicon-close"></i></div>';//元素操作按钮
//窗口新增
 $("#businessAdd").on("click",function(){
			layer.open({
            type: 1, area: ['710px', '500px'],
			title: '关联业务配置添加',
            content: $("#bs-add")
           ,btn: ['确定', '关闭']
           ,btnAlign: 'r' //按钮居中
           ,yes: function(){
			
			businessAdd()
		  
            layer.closeAll();
			   
           }
		    ,btn2: function(index, layero){
			//按钮【按钮二】的回调

			//return false 开启该代码可禁止点击该按钮关闭
		  }
            }); 
	 
layui.use(['form'], function(){
  var form = layui.form
//表单初始赋值
  form.val('add-business', {
    "node": "必填" //节点名称
	,"http": "" //链接地址
	,"description": ""
  })

	
});
	 
$("#bs-add .step-icon-item span").eq(0).addClass("icon-this").siblings().removeClass("icon-this")
 
        })
//修改
 $(".tax-business-box").on("click",".fsicon-btn-edit",function(){
			layer.open({
            type: 1, area: ['710px', '500px'],
			title: '关联业务配置修改',
            content: $("#bs-add")
           ,btn: ['确定', '关闭']
           ,btnAlign: 'r' //按钮居中
           ,yes: function(){
			
			businessEdit()
		  
            layer.closeAll();
			   
           }
		    ,btn2: function(index, layero){
			//按钮【按钮二】的回调

			//return false 开启该代码可禁止点击该按钮关闭
		  }

			}); 
	 
$(this).parents(".item-ul").addClass("eidt-this").siblings().removeClass("eidt-this")	 
var node=$(".tax-business-box .eidt-this").children("a").text()
var http=$(".tax-business-box .eidt-this").children("a").attr("val-href")
var description=$(".tax-business-box .eidt-this").children(".description").text()
var thisId=$(".tax-business-box .eidt-this").children("i").attr("icon-id");
$("#bs-add .step-icon-item span").eq(thisId).addClass("icon-this").siblings().removeClass("icon-this")	 
 
layui.use(['form'], function(){
  var form = layui.form
//表单初始赋值
  form.val('add-business', {
    "node": node //节点名称
	,"http": http //链接地址
	,"description":description 
  })

	
})

        })	
	
	
	
	
function businessEdit(){

	
 
var node=$('#bs-add input[name="node"]').val()
var http=$('#bs-add select[name="http"]').val()
var description=$('#bs-add input[name="description"]').val()
var Aclass=$("#bs-add .icon-this").children("i").attr("class")
var thisId=$("#bs-add .icon-this").children("i").attr("icon-id")	

$(".tax-business-box .eidt-this").children("a").text(node).attr("val-href",http);
$(".tax-business-box .eidt-this").children(".description").text(description);
$(".tax-business-box .eidt-this").children("i").removeClass();	
$(".tax-business-box .eidt-this").children("i").addClass(Aclass).attr("icon-id",thisId);
$(".tax-business-box .eidt-this").removeClass("eidt-this");
	
	
}	
	
	
	
function businessAdd(){

var node=$('#bs-add input[name="node"]').val()
var http=$('#bs-add input[name="http"]').val()
var description=$('#bs-add input[name="description"]').val()
var Aclass=$("#bs-add .icon-this").children("i").attr("class")
var thisId=$("#bs-add .icon-this").children("i").attr("icon-id")		
	$(".tax-business-box").prepend(businessItem);
	$(".tax-business-box .item-ul").eq(0).children("a").text(node).attr("val-href",http);
	$(".tax-business-box .item-ul").eq(0).children(".description").text(description);
	$(".tax-business-box .item-ul").eq(0).children("i").addClass(Aclass).attr("icon-id",thisId);
	
}
	
$("#bs-add .step-icon-item").on("click","span",function(){
	$(this).addClass("icon-this").siblings().removeClass("icon-this")
	
})	
	


//元素操作
	
$(".tax-business-box").on("mouseenter",".item-ul",function(){
		
	  $(this).append(businessBtn)
	 	
		
	})	
	
$(".tax-business-box").on("mouseleave",".item-ul",function(){
	 
	$(".item-but").remove();
 
	
})
	
$(".tax-business-box").on("click",".fsicon-close",function(){
	 
	$(this).parents(".item-ul").remove();
})		
	
	
})