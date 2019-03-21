// JavaScript Document
 

function nitialization() { //初始化高度

	$(function () {

		var ieHeight = document.documentElement.clientHeight;
		var header = $(".admin-header").outerHeight();
		var side = 44;
		var tabs = $(".tax-pagetabs").outerHeight();
		//设置高度
		$(".admin-side").height(ieHeight - header);
		$(".tax-pagetabs-body").height(ieHeight - header - tabs);
		$(".pagestabs-iframe").height(ieHeight - header - tabs);
		$(".admin-main").css({
			marginLeft: side
		})
		$(".admin-side-tree>ul").height(ieHeight - header - 40);
		
		
       
	})

}
$(function () {
	 
		$(window).resize(function () {
			nitialization()
		})
	}) //监控高度

setTimeout(function () {
	nitialization()
}, 20)

//皮肤 文字大小

$(function(){
	
	
	if(sessionStorage.size){
		
		$(".admin-font dl dd").each(function(){
		
			var val=$(this).attr("size")
			if(val==sessionStorage.size){
				
				$(this).addClass("this");
			}
		 	
		})
	   
	   }else{
		  $(".admin-font dl dd").eq(1).addClass("this") 
		   
	   }
 

	
	
	//换肤

	$(".admin-skin").on("mouseenter", function () {
		var i = 0
		skinOnClink = setInterval(function () {

			if (i > 3) {
				$(".admin-skin ul").fadeIn()
				clearInterval(skinOnClink);
			}
			i++
		}, 70)

	})

	$(".admin-skin").on("mouseleave", function () {

		$(".admin-skin ul").fadeOut();
		clearInterval(skinOnClink);

	})





	$(".admin-skin dl dd").on("click", function () {

		var color = $(this).attr("skin-color");
		sessionStorage.skin = color;
		window.location.reload()

	})

//字体大小

	$(".admin-font").on("mouseenter", function () {
		var i = 0
		fontOnClink = setInterval(function () {

			if (i > 3) {
				$(".admin-font ul").fadeIn()
				clearInterval(fontOnClink);
			}
			i++
		}, 70)

	})

	$(".admin-font").on("mouseleave", function () {

		$(".admin-font ul").fadeOut();
		clearInterval(fontOnClink);

	})





	$(".admin-font dl dd").on("click", function () {
		
         var size = $(this).attr("size");
		// $(this).addClass("this").siblings().removeClass("this")
		
         sessionStorage.size= size;
		 window.location.reload()
		 
	})
	
	
	
	
})




//左侧菜单

$(function () {

	var sideMenuArr = "";//存储菜单
	var sideObj = [] //查询到菜单存到数组


	$("#menu-search").keypress(function () {  //搜索菜单 回车事件监听
		var val = $(this).val();
		sideSearch(val)

	})
   $(".admin-side-search").on("click",".btn-clear",function(){ //搜索菜单 清楚搜索内容
	   
	   var val =""
	   $(".admin-side-search input").val("")
	   sideSearch(val)
	   
   })


	function sideSearch(val) {//搜索 内容方法

		var menuItem = ""
		if ($("#SetCommon").length > 0) {
			sideObj = []
			$(".admin-side-tree a").each(function (i) {

				if ($(this).attr("tab-href") && $(this).next().attr("class") !== "del-btn iconfont fsicon-close") {

					sideMenuArr = {
							"href": $(this).attr("tab-href"),
							"text": $(this).attr("tab-text"),
							"i": $(this).next().attr("class")
						}
						
					sideObj.push(sideMenuArr)

				}

			})
		}


		if (val) {

            $(".admin-side-search").append('<i class="btn-clear iconfont fsicon-close"></i>')
			$.each(sideObj, function (id, obj) { // 获取最近文件个数     

				if (obj.text.indexOf(val) != -1) {

					menuItem = menuItem + '<dd><span><a href="javascript:;" tab-href="' + obj.href + '" tab-text="' + obj.text + '" >' + obj.text + '</a><i class="' + obj.i + '"></i></span></dd>'
						

				}
			})

			if (menuItem) {

		
				$(".admin-side-tree ul li ").remove();
				$(".admin-side-tree ul").append('<li class="admin-nav-item"><dl class="admin-nav-child" style="position:relative; width: 100%;display: block">' + menuItem + '</dl></li>')


			}
			if (menuItem == "") {

				$(".admin-side-tree ul li ").remove();
				$(".admin-side-tree ul").append('<li class="admin-nav-item"><dl class="admin-nav-child" style="position:relative; width: 100%;display: block; text-align: center; line-height: 50px; height: 50px; color:#999">查询无此菜单</dl></li>')
			}


		} else {
			//这里要修改（2019-01-30 常用功能）
			$(".admin-side-search .btn-clear").remove();
			$(".admin-side-tree ul").children().remove();
			$(".admin-side-tree ul").append('<li class="admin-nav-item" id="SetCommon"><span> <i class="nav-icon-left iconfont fsicon-sc-true"></i><a href="javascript:;">常用功能 <div class="common-number"><p>0</p></div></a>	 <i class="nav-icon-right iconfont fsicon-xiangshang"></i></span></li>')


			setCommon(menuArr) //设置功能数	
			sideMenu(menuArr, 1) //渲染菜单 初始化	
			$(".admin-nav-child").css({
				"position": "relative",
				"width": "100%"
			})

		}

	}



	$(".admin-side-tree").on("click", "span", function () {

		var open = $(this).next().css("display");
		if (open == "none") {

			$(".admin-nav-child").css({
				"position": "relative",
				"width": "100%"
			})

			$(this).next().slideDown();
			$(this).children(".nav-icon-right").removeClass("fsicon-xiangxia").addClass("fsicon-xiangshang");
			$(this).parent().siblings().children("dl").slideUp();
			$(this).parent().siblings().children("span").children(".nav-icon-right").removeClass("fsicon-xiangshang").addClass("fsicon-xiangxia");

		} else {

			$(this).next().slideUp();
			$(this).children(".nav-icon-right").removeClass("fsicon-xiangshang").addClass("fsicon-xiangxia");

		}

	})
	$(".admin-side-tree").on("click", "a", function () {

		if ($(this).attr("tab-href")) {

			$(".admin-side-tree span").removeClass("nav-this")
			$(this).parent().addClass("nav-this")

		}


	})

	//回调菜单位置
	$("#tax-app-tabs #tax-tab .tax-tab-title").on("click", "li", function () {

		var id = $(this).attr("tab-id")
		setMenu(id)


	})
	$("#tax-app-tabs #tax-tab .tax-tab-title").on("click", ".tabClose", function () {


		setTimeout(function () {
			var id = $(".tax-tab-title .tab-this").attr("tab-id")

			setMenu(id)

		}, 20)

	})


	function setMenu(id) {



		$(".admin-side-tree .nav-this").removeClass("nav-this");

		for (var i = 0; i < $(".admin-side-tree a").length; i++) {
			var a = $(".admin-side-tree a").eq(i)
			if (a.attr("tab-href") == id) {

				if (a.parents("dl").css("display") == "block") {
					a.parents("dl").slideDown();
					a.parent().addClass("nav-this");

				} else {
					a.parent().addClass("nav-this");
					$(".admin-side-tree dl").slideUp();
					a.parents("dl").slideDown();


				}



				break;
			}
		}
		var child = $(".admin-side-tree .admin-nav-child")

		child.each(function (i, val) {

			if ($(this).css("display") == "none") {

				$(this).prev().find(".nav-icon-right").removeClass("fsicon-xiangshang").addClass("fsicon-xiangxia")

			}


		})

	}


	//菜单收缩

	//设置初始化
	$(".admin-side>ul").width(268);
	var setSideSq;
	$(".admin-side").mouseenter(function () {

		clearTimeout(setSideSq)
		var id = $(".admin-side-tree .admin-nav-child");
		$(".admin-side").stop().animate({
			"width": "268px"
		});
		id.css({
			"position": "relative",
			width: "100%"
		});


	})
	$(".admin-side").mouseleave(function () {

	setSideSq=setTimeout(setSideTime,600)

	})

	function setSideTime() {

		var id = $(".admin-side-tree .admin-nav-child");
		id.css({
			"position": "absolute",
			width: "268px"
		})
		$(".admin-side").stop().animate({
			"width": "44px"
		});

	}




})




//常用功能
$(function () {


	function commonNumber() {

		var i = $("#SetCommon .admin-nav-child dd").length;

		$("#SetCommon .common-number p").text(i)


	};

	$(".admin-side-tree").on("click", "#SetCommon .fsicon-close", function () {

		var id = $(this).prev().attr("tab-href");
		$(this).parents("dd").remove();
		var si = $("#SetCommon a").length;

		for (var i = si; i < $(".admin-side-tree a").length; i++) {

			var a = $(".admin-side-tree a").eq(i)
			if (a.attr("tab-href") == id) {

				a.next().removeClass("fsicon-sc-true").addClass("fsicon-sc-false")
				break;
			}


		}

		sideDelTree(menuArr, id)
		SetCommonDel() //常用功能监听
	})






	$(".admin-side-tree").on("click", ".admin-nav-item .sc-btn", function () {


		var id = $(this).prev().attr("tab-href");
		var text = $(this).prev().attr("tab-text")
		var com = $("#SetCommon .admin-nav-child a")

		var i = 0;

		$("#SetCommon .admin-nav-child a").each(function (index, element) {

			if ($(this).attr("tab-href") == id) {
				i = index;
				return i;
			}

		})



		if ($(this).attr("class") == "sc-btn iconfont fsicon-sc-false") {


			if ($("#SetCommon .admin-nav-child").length == 0) {
				SetCommonAdd() //常用功能监听
			}

			var html = '<dd><span><a href="javascript:;" tab-href="' + id + '" tab-text="' + text + '" >' + text + '</a><i class="del-btn iconfont fsicon-close"></i></span></dd>'
			$("#SetCommon .admin-nav-child").prepend(html);
			$(this).removeClass("fsicon-sc-false").addClass("fsicon-sc-true")

			sideAddTree(menuArr, id)
			commonNumber()


		} else {

			com.eq(i).parents("dd").remove();
			$(this).removeClass("fsicon-sc-true").addClass("fsicon-sc-false");
			SetCommonDel(); //常用功能监听
			sideDelTree(menuArr, id)

		}



	})

	function SetCommonDel() { //常用功能监听

		if ($("#SetCommon .admin-nav-child dd").length == 0) {
			$("#SetCommon .admin-nav-child").remove();
			$("#SetCommon .nav-icon-right").remove();
		}


		commonNumber() //统计数字
	}

	function SetCommonAdd() { //常用功能监听

		var right = '<i class="nav-icon-right iconfont fsicon-xiangxia"></i>'
		var dl = '<dl class="admin-nav-child"></dl>'
		var ind = $("#SetCommon .admin-nav-child dd");
		$("#SetCommon span").append(right);
		$("#SetCommon").append(dl)
		commonNumber() //统计数字

	}




	//常用功能拖拽

	$("#SetCommon .admin-nav-child").sortable({
		placeholder: "ui-state-highlight",
		axis: "y"
	});

	$("#SetCommon .admin-nav-child").disableSelection();



	
	
	
	//用户菜单

	$(".admin-user").on("mouseenter", function () {
		var i = 0

		userOnClink = setInterval(function () {

			if (i > 3) {
				$(".admin-user ul").fadeIn()
				clearInterval(userOnClink);
			}
			i++
		}, 70)

	})

	$(".admin-user").on("mouseleave", function () {

		$(".admin-user ul").fadeOut();
		clearInterval(userOnClink);

	})







})




//重构左侧菜单-------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------


//构建菜单

 function sideMenu(menuArr, id) { //菜单渲染
	   
	   
	 
	$(function () {
		//1.第一层 root 深度遍历整个JSON
        var oid='#'+id

		for (var i = 0; i < menuArr.length; i++) {

			var obj = menuArr[i]
 
			if (!obj) {

				continue;
			}

			if (!obj.child) { //没有下一级处理


				$(".admin-side-tree ul li").find(oid).last().append('<dd><span><a href="' + obj.href + '" tab-href="' + obj.url + '" tab-text="' + obj.name + '" >' + obj.name + '</a><i class="sc-btn iconfont ' + obj.btn + '"></i></span></dd>')
                

			} else { //有下一级处理
                

				if (obj.dir.length==1) { //第一级处理

					$(".admin-side-tree ul").append('<li class="admin-nav-item"><span><i class="nav-icon-left iconfont ' + obj.icon + '"></i><a href="' + obj.href + '">' + obj.name + '</a><i class="nav-icon-right iconfont fsicon-xiangxia"></i></span><dl class="admin-nav-child" id="'+obj.dir+'"></dl></li>')
				

				} else { //第二级、三级 ....级处理
                    
					
					$(".admin-side-tree ul li").find(oid).append('<dd><span><a href="' + obj.href + '">' + obj.name + '</a><i class="nav-icon-right iconfont fsicon-xiangxia"></i></span><dl class="admin-nav-child" id="'+obj.dir+'"></dl></dd>')

				}


			}


			if (obj.child) {

				//递归往下找

				sideMenu(obj.child, obj.dir);


			} else {
				//跳出当前递归，返回上层递归

				continue;
			}

			
		}


	})

}



function setCommon(menuArr) { //渲染常用功能 初始化
	commonArr = eval('(' + jsonArr + ')');
	$(function () {

		common(menuArr)

		function common(menuArr) { //统计常用功能

			for (var i = 0; i < menuArr.length; i++) {
				var obj = menuArr[i]

				if (obj.btn == "fsicon-sc-true") {

					var arr = {
						"name": obj.name,
						"url": obj.url,
						"href": obj.href
					}
					commonArr.push(arr);

				}


				if (obj.child) {

					//递归往下找

					common(obj.child);


				} else {
					//跳出当前递归，返回上层递归

					continue;
				}


			}

		}

		$("#SetCommon dl").remove();

		$("#SetCommon").append('<dl class="admin-nav-child" style="display: block;"></dl>')

		$.each(commonArr, function (id, val) {
			var data = commonArr[id]
			$(".admin-side-tree li").eq(0).children("dl").append('<dd><span><a href="' + data.href + '" tab-href="' + data.url + '" tab-text="' + data.name + '" >' + data.name + '</a><i class="del-btn iconfont fsicon-close"></i></span></dd>')
		});

		$("#SetCommon .common-number p").html(commonArr.length)

		if ($("#SetCommon .admin-nav-child dd").length == 0) {
			$("#SetCommon .admin-nav-child").remove();
			$("#SetCommon .nav-icon-right").remove();
		}

	})

}



function sideDelTree(menuArr, url) { // 删除常用功能

	$(function () {

		treeArr(menuArr)

		function treeArr(menuArr) { //统计常用功能

			for (var i = 0; i < menuArr.length; i++) {
				var obj = menuArr[i]

				if (obj.url == url) {

					obj.btn = "fsicon-sc-false"

				}


				if (obj.child) {

					//递归往下找

					treeArr(obj.child);


				} else {
					//跳出当前递归，返回上层递归

					continue;
				}


			}

		}



	})

}


function sideAddTree(menuArr, url) { // 删除常用功能

	$(function () {

		treeArr(menuArr)

		function treeArr(menuArr) { //统计常用功能

			for (var i = 0; i < menuArr.length; i++) {
				var obj = menuArr[i]

				if (obj.url == url) {

					obj.btn = "fsicon-sc-true"

				}


				if (obj.child) {

					//递归往下找

					treeArr(obj.child);


				} else {
					//跳出当前递归，返回上层递归

					continue;
				}


			}

		}



	})

}

sideMenu(menuArr,"1") //渲染菜单 初始化	

setCommon(menuArr) //设置常用功能