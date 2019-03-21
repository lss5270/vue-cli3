// JavaScript Document

$(document).ready(function(){
	//获取myform
    var myform = $(parent.document).find("#myform");
    //myform存在表示当前页为form页，只有form页才动态拼装浮框
    if(myform.length > 0){
    	//先隐藏框架页的浮框
        $(parent.parent.document).find(".table-step-box").css("display","none");

        //拼装浮框div内容
        var innerHTML = "<div class=\"table-step-main\">\n" +
            "\t\t<p class=\"float-icon\">进度</p>\n" +
            "\t\t<div class=\"table-step-center\">\n" +
            "\t\t\t<div class=\"table-step-item\">\n" +
            "\t\t\t\t<div class=\"pro-step finish-step\">\n" +
            "\t\t\t\t\t<span></span>\n" +
            "\t\t\t\t\t<i class=\"pro-line finish-line\"></i>\n" +
            "\t\t\t\t\t<p>初始化</p>\n" +
            "\t\t\t\t</div>\n" +
            "\t\t\t\t<div class=\"pro-step cur-step\">\n" +
            "\t\t\t\t\t<span>2</span>\n" +
            "\t\t\t\t\t<i class=\"pro-line\"></i>\n" +
            "\t\t\t\t\t<p>填写申请表及上传附送资料</p>\n" +
            "\t\t\t\t</div>\n" +
            "\t\t\t\t<div class=\"pro-step\">\n" +
            "\t\t\t\t\t<span>3</span>\n" +
            "\t\t\t\t\t<i class=\"pro-line\"></i>\n" +
            "\t\t\t\t\t<p>预览提交</p>\n" +
            "\t\t\t\t</div>\n" +
            "\t\t\t\t<div class=\"pro-step\">\n" +
            "\t\t\t\t\t<span>4</span>\n" +
            "\t\t\t\t\t<p>完成</p>\n" +
            "\t\t\t\t</div>\n" +
            "\t\t\t</div>\n" +
            "\t\t</div>\n" +
            "</div>";

        //创建浮框div
        var divObj = document.createElement("div");
        //设置浮框div的class
        divObj.setAttribute("class","table-step-box");
        //设置浮框div的innerHTML
        divObj.innerHTML = innerHTML;
        //得到body的第一个元素
        var first = document.body.firstChild;
        //在得到的第一个元素之前插入浮框div
        document.body.insertBefore(divObj,first);
    }

	$(".table-step-box").on("mouseenter",function(){
	 
		var width=$(window).width();
		$(".table-step-center").show();
		$(".table-step-center").stop().animate({width:width,opacity:1},300)
		 
	})
	
	$(".table-step-box").on("mouseleave",function(){
	 
		
		$(".table-step-center").stop().animate({width:"0px",opacity:0},300)
		
		setTimeout(function(){ $(".table-step-center").hide();}, 300)
		 
	})
	
})