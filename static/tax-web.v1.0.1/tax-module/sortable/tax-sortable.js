// 拖动排序

$(document).ready(function(){

	$(".tax-sortable .sortable-box").sortable({
	placeholder: "ui-state-highlight",
	axis: "y"	
	});
	
	var sortableName="";
	var index;
	var data=""

	$(".item-box").on("click",".action-btn",function(){
		
		sortableName=$(this).prev("span").text();
		index=$(this).parent().index();
		data="data-interface="+$(this).prev().attr("data-interface");
		addSortable();//添加到右边
		delItemLi();//删除当前
		animateItemLi();//消失动画
	})
	$(".item-box").on("dblclick","span",function(){
		sortableName=$(this).text();
		index=$(this).parent().index();
		data="data-interface="+$(this).attr("data-interface");
		addSortable();//添加到右边
		delItemLi();//删除当前
		animateItemLi();//消失动画
	})
	//添加到右边sortable区
	function addSortable(){
    var addHtml="<li class='names-item' style='opacity:0'><span "+data+">"+sortableName+"</span><i class='action-btn iconfont fsicon-close'></i></li>"
	$(".sortable-box").append(addHtml)
	$(".sortable-box li").animate({opacity:'1'},800)
	}
	//Item删除remove
	function delItemLi(){
		setTimeout(function(){$(".item-box li").eq(index).remove()},500)
	}
	//Item删除动画效果
    function animateItemLi(){
		$(".item-box li").eq(index).animate({opacity:'0',height:'0'},500)
	}
	
	
	$(".sortable-box").on("click",".action-btn",function(){
		sortableName=$(this).prev("span").text();
		index=$(this).parent().index();
		data="data-interface="+$(this).prev().attr("data-interface");
	    addItem();
		delSortable();
		animateSortableLi();
	})
	
	//添加到右边item-box区
	function addItem(){
    var addHtml="<li class='names-item' style='opacity:0'><span "+data+">"+sortableName+"</span><i class='action-btn iconfont fsicon-Set-arrow'></i></li>"
	$(".item-box").prepend(addHtml);
	$(".item-box li").animate({opacity:'1'},800);
	}
	//sortableName删除remove
	function delSortable(){
		setTimeout(function(){$(".sortable-box li").eq(index).remove()},500)
	}
	//Item删除动画效果
    function animateSortableLi(){
		$(".sortable-box li").eq(index).animate({opacity:'0',height:'0'},500)
	}
	
})
