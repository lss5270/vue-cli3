// JavaScript Document

$(function () {
	var leftPage = $("#leftPage")
	var rightPage = $("#rightPage")
    function getArr(){//数组统计标签个数
		tabsArr=new Array();
		pagetabs = $("#tax-app-tabs")
		taxTab = $("#tax-app-tabs #tax-tab")
		tabTitle = $("#tax-app-tabs #tax-tab .tax-tab-title li")
		taxTabLi = tabTitle.length; //titile个数
		pagetabsWidth = taxTab.width(); //获取滚动区域宽度
		tabsTitleWidth = taxTab.children("ul").outerWidth(); //获取title的总宽度		
		tabsLeft = Math.abs(taxTab.children("ul").position().left); //获取左边距离
		
		for(var i=0;i<taxTabLi;i++){

			tabsArr[i]=parseInt(tabTitle.eq(i).outerWidth())
			
		}
		
		 
	}

	getArr()

	function setVar() {
		pagetabs = $("#tax-app-tabs")
		taxTab = $("#tax-app-tabs #tax-tab")
		tabTitle = $("#tax-app-tabs #tax-tab .tax-tab-title li")
		pagetabsWidth = taxTab.width(); //获取滚动区域宽度
		tabsTitleWidth = taxTab.children("ul").outerWidth(); //获取title的总宽度		
		tabsLeft = Math.abs(taxTab.children("ul").position().left); //获取左边距离
		tabsThis=0;
        var s=0;
		
		for(var i=0;i<tabsArr.length;i++){
			
			if(s<tabsLeft){s=tabsArr[i]+s;}else{ tabsThis=i;break;}
			
		}
		
	 
	}

	rightPage.on("click", function () { //触发右边箭头
		setVar() //设置变量
		tabLeft() //执行动画


	})
	leftPage.on("click", function () { //触发左边箭头
		setVar() //设置变量
		tabRight()


	})
	$("#tax-app-tabs #tax-tab .tax-tab-title").on("click", ".tabClose", function () { //关闭单个标签
	 
	 var href = $(this).parent().attr("tab-id")
		
     delPageTabs(href)

	})

	//右边滚动效果
	function tabLeft() {
		  
		if (!taxTab.children("ul").is(":animated")) {

			var sum = 0;
		
			
			if (tabsLeft+tabsTitleWidth> pagetabsWidth) {


				for(var i=tabsThis;i<tabsArr.length;i++){
					
					if(tabsArr[i]+sum<pagetabsWidth){
						
					  sum = tabsArr[i] + sum;
					}else{
						
						tabsThis=i;
						sum = tabsLeft + sum
						taxTab.children("ul").animate({
								left: sum * -1
							}) //执行left-滚动
						break;
					}
					
				}

			}

		}




	}

	//左边滚动效果
	function tabRight() {
       
		if (!taxTab.children("ul").is(":animated")) {

			var sum = 0;
			if (tabsLeft > 0 && tabsLeft>pagetabsWidth) {
                
				for (var i = 1; i<tabsThis; ++i) {
					
  					
					if (tabsArr[tabsThis-i]+sum<pagetabsWidth) {
						 
						sum = tabsArr[tabsThis-i] + sum;
							
					}else{
						
						tabsThis=i;
						sum = tabsLeft - sum
						taxTab.children("ul").animate({
								left: sum * -1
							}) //执行left-滚动
						
						break;
					} 
					
		
					 

				}
				
			    
			}else{
				
				taxTab.children("ul").animate({
								left: 0
							}) //执行left-滚动
			}

		}


	}


	//添加tab

	$("body").on("click", "a", function () {

		var href = $(this).attr("tab-href")
		var text = $(this).attr("tab-text")
       
		if (href && text) {

			addPageTabs(href,text)

		}


	})

	//切换tab

	
	$("#tax-app-tabs #tax-tab .tax-tab-title").on("click","li",function (){
      
		var i = $(this).index();
		$("#tax-app-tabs #tax-tab .tax-tab-title li").removeClass("tab-this")
		$("#tax-app-tabs #tax-tab .tax-tab-title li").eq(i).addClass("tab-this")
		$(".tax-pagetabs-body .tax-tabsbody-item").removeClass("tax-show")
		$(".tax-pagetabs-body .tax-tabsbody-item ").eq(i).addClass("tax-show")
		
		

	})

	//关闭标签

	$(".tax-pagetabs #tab-menu").on("mouseenter", function () {

		var i = 0
		tabMenuFade = setInterval(function () {

			if (i > 3) {
				$(".tax-pagetabs #tab-menu dl").fadeIn()
				clearInterval(tabMenuFade);
			}
			i++
		}, 70)
	})

	$(".tax-pagetabs #tab-menu").on("mouseleave", function () {

		$(".tax-pagetabs #tab-menu dl").fadeOut();
		clearInterval(tabMenuFade);

	})

	$("#closeThisTabs").on("click", function () { //关闭当前

		var x = $("#tax-app-tabs #tax-tab .tax-tab-title .tab-this").index();


		if (x > 0) {
			$("#tax-app-tabs #tax-tab .tax-tab-title .tab-this").prev().addClass("tab-this")
			$("#tax-app-tabs #tax-tab .tax-tab-title li").eq(x).remove()
			$(".tax-pagetabs-body .tax-tabsbody-item").eq(x).remove()
			$(".tax-pagetabs-body .tax-tabsbody-item").eq(x - 1).addClass("tax-show");

		}



	})


	$("#closeOtherTabs").on("click", function () { //关闭其他

		var x = $("#tax-app-tabs #tax-tab .tax-tab-title .tab-this").index();
		var l = tabsArr.length;
		for (var i = 0; i < l; i++) {

			if (i !== 0) {

				if (i !== x) {

					$("#tax-app-tabs #tax-tab .tax-tab-title li").eq(i).addClass("del")
					$(".tax-pagetabs-body .tax-tabsbody-item").eq(i).addClass("del")
				}



			}


		}
		$("#tax-app-tabs #tax-tab .tax-tab-title").animate({
			left: 0
		})
		$("#tax-app-tabs #tax-tab .tax-tab-title .del").remove()
		$(".tax-pagetabs-body .del").remove()
		
        getArr()
		
		
	})


	$("#closeAllTabs").on("click", function () { //关闭所有
		var l = tabsArr.length;
        
		if (l > 1) {
			$("#tax-app-tabs #tax-tab .tax-tab-title li").eq(0).siblings().remove();
			$(".tax-pagetabs-body .tax-tabsbody-item").eq(0).siblings().remove();
			$("#tax-app-tabs #tax-tab .tax-tab-title li").eq(0).addClass("tab-this")
			$(".tax-pagetabs-body .tax-tabsbody-item").eq(0).addClass("tax-show")
			$("#tax-app-tabs #tax-tab .tax-tab-title").animate({left:0})
		}
		tabsArr.splice(1, l-1);
		

	})





})





//添加对象

function addPageTabs(href, text){

 $(function () {
	var tabUl = $("#tax-app-tabs #tax-tab .tax-tab-title");



	for (var i = 0; i < tabsArr.length; i++) {

		var liHref = $("#tax-app-tabs #tax-tab .tax-tab-title li").eq(i).attr("tab-id")


		if (liHref == href) { //当有对象时


			tabUl.children("li").removeClass("tab-this")
			$("#tax-app-tabs #tax-tab .tax-tab-title li").eq(i).addClass("tab-this")
			$(".tax-pagetabs-body .tax-tabsbody-item").removeClass("tax-show")
			$(".tax-pagetabs-body .tax-tabsbody-item ").eq(i).addClass("tax-show")

			var leftX = Math.abs($("#tax-app-tabs #tax-tab .tax-tab-title").position().left);
			var w = $("#tax-app-tabs #tax-tab").width()
			var t = $("#tax-app-tabs #tax-tab .tax-tab-title .tab-this").outerWidth();
			var lX = 0;
			var z = $("#tax-app-tabs #tax-tab .tax-tab-title .tab-this").index();

			var s = 0;
			for (var y = 0; y < z; y++) {

				s = $("#tax-app-tabs #tax-tab .tax-tab-title li").eq(y).outerWidth() + s;

			}

			if (s < leftX) {

				$("#tax-app-tabs #tax-tab .tax-tab-title").animate({
					left: (s) * -1
				})

			} else {
				if (s + t > w + leftX) {
					$("#tax-app-tabs #tax-tab .tax-tab-title").animate({
						left: (s) * -1
					})

				}
			}


			break;
		}

		if (i + 1 == tabsArr.length) {//当没有对象时
			

			var tabHtml = '<li tab-id="' + href + '" class="tab-this"><span>' + text + '</span><i class="iconfont fsicon-guanbi tabClose"></i></li>'
			var tabBody = '<div class="tax-tabsbody-item tax-show"><iframe src="' + href + '" frameborder="0" class="pagestabs-iframe" ></iframe></div>'
			tabUl.children("li").removeClass("tab-this")
			$(".tax-pagetabs-body .tax-tabsbody-item").removeClass("tax-show")
			$(".tax-pagetabs-body ").append(tabBody)
			$(".pagestabs-iframe").height($(".tax-pagetabs-body").height())
			tabUl.append(tabHtml);
				var w = tabUl.width();
				var p = $("#tax-app-tabs #tax-tab").outerWidth();
				var l = Math.abs(tabUl.position().left);
				var a = tabUl.children("li").last().outerWidth();
				var s = tabUl.children("li").length;
				var x = 0;
				var y = 0;
                tabsArr.push(a)
				if (w > p) {
					for (var i = 0; i < s; i++) {

						x = tabUl.children("li").eq(s - i - 1).outerWidth() + x;
						if (x > p) {

							y = tabUl.children("li").eq(s - i - 1).outerWidth() + y
						}

					}

					tabUl.animate({
						left: y * -1
					})
				}





			
		}
		
		
		
		
		
		

	}



})

}


//删除对象

function delPageTabs(href){
	
 $(function(){
	 var thisLi=0;
	 
	     
	    if(href=="tab-this"){
			
			thisLi=$("#tax-app-tabs #tax-tab .tax-tab-title .tab-this").index();
			
		}else{
			
			for(var i=0; i<tabsArr.length;i++){
			
			var liHref = $("#tax-app-tabs #tax-tab .tax-tab-title li").eq(i).attr("tab-id")
			if (liHref == href){
				thisLi=i
				break;
			   }
			
		   }
		}
	 
	   
	   
		var id = $("#tax-app-tabs #tax-tab .tax-tab-title li").eq(thisLi).attr("class")
        tabsArr.splice(i, 1);
	  
		if (id) {
			
			$("#tax-app-tabs #tax-tab .tax-tab-title li").eq(thisLi).prev().addClass("tab-this")
			$("#tax-app-tabs #tax-tab .tax-tab-title li").eq(thisLi).remove();
			$(".tax-pagetabs-body .tax-tabsbody-item").eq(thisLi).remove()
			$(".tax-pagetabs-body .tax-tabsbody-item").eq(thisLi - 1).addClass("tax-show");

		} else {

			$(this).parent().remove();
			$(".tax-pagetabs-body .tax-tabsbody-item").eq(thisLi).remove()
			$("#tax-app-tabs #tax-tab .tax-tab-title li").eq(thisLi).remove();
			

		}

		var w = $("#tax-app-tabs #tax-tab").width();
		var leftX = Math.abs($("#tax-app-tabs #tax-tab .tax-tab-title").position().left)
		var sum = $("#tax-app-tabs #tax-tab .tax-tab-title").width();

		if (sum - leftX == 0) {

			var s = $("#tax-app-tabs #tax-tab .tax-tab-title li").last().outerWidth()
			$("#tax-app-tabs #tax-tab .tax-tab-title").animate({
					left: (leftX - s) * -1
				}) //执行left-滚动  



		} 
	 
	 
	 
 })
	
	
}


