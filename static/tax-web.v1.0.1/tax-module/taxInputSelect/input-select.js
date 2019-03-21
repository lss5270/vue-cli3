//模拟国籍
var nationality = [{
	"id": "0",
	"item": "中国"
}, {
	"id": "1",
	"item": "蒙古国"
}, {
	"id": "2",
	"item": "朝鲜民主主义人民共和国"
}, {
	"id": "3",
	"item": "韩国"
}, {
	"id": "4",
	"item": "日本"
}, {
	"id": "5",
	"item": "越南社会主义共和国"
}, {
	"id": "6",
	"item": "老挝人民民主共和国"
}, {
	"id": "7",
	"item": "柬埔寨王国"
}, {
	"id": "8",
	"item": "缅甸联邦"
}, {
	"id": "9",
	"item": "泰国"
}, {
	"id": "10",
	"item": "马来西亚"
}, {
	"id": "11",
	"item": "新加坡共和国"
}, {
	"id": "12",
	"item": "文莱达鲁萨兰国"
}, {
	"id": "13",
	"item": "菲律宾共和国"
}, {
	"id": "14",
	"item": "印度尼西亚共和国"
}, {
	"id": "15",
	"item": "尼泊尔联邦民主共和国"
}, {
	"id": "16",
	"item": "斯里兰卡民主社会主义共和国"
}, {
	"id": "17",
	"item": "马尔代夫共和国"
}, {
	"id": "18",
	"item": "巴基斯坦伊斯兰共和国"
}, {
	"id": "19",
	"item": "阿富汗伊斯兰国"
}, {
	"id": "20",
	"item": "伊朗伊斯兰共和国"
}, {
	"id": "21",
	"item": "科威特国"
}, {
	"id": "22",
	"item": "中国香港"
}, {
	"id": "23",
	"item": "中国澳门"
}, {
	"id": "24",
	"item": "中国台湾"
}];

var ItemData = []; //临时数组
var Obj = [];
$(document).ready(function () {

	var inputHtml = $(".input-select").parent().html();


	$(".input-select").after('<div class="tax-select-inline"><i class="select-edge iconfont fsicon-xiangxia"></i>' + inputHtml + '</div>')

	$(".tax-select-inline .select-edge").each(function () {

		var h = $(this).next().height();
		$(this).css({
			"height": h + 'px',
			"line-height": h + 'px',
			"width": h + 'px'
		})

	})

	$(".tax-select-inline").prev().remove();



	$("body").on("click", ".tax-select-inline", function () {

		//event.stopPropagation();

		if (event.stopPropagation) { // 针对 Mozilla 和 Opera 		
			event.stopPropagation();
		} else if (window.event) { // 针对 IE 		
			window.event.cancelBubble = true;
		}

       if($(this).children("input").attr("placeholder")==$(this).children("input").val()){
		   
		  $(this).children("input").val("") 
	   }

		if ($(".this-input-select").length > 0) {
			$(".tax-input-select").remove();
			$(".input-select").attr("taxOpen", "false")
			$(".input-select").removeClass("this-input-select")
			$(".tax-select-inline").removeClass("zindex-100")

		}




		$(this).children("input").addClass("this-input-select")
		Obj = eval($(this).children("input").attr("Obj-data"))
		var width = $(this).children("input").attr("tax-width")
		var html;

		if (width == "100%") {

			var WinWidth = $(this).children("input").width() + 10;
			html = '<div class="tax-input-select" style="width:' + WinWidth + 'px"><ul></ul></div>';

		} else {

			html = '<div class="tax-input-select" style="width:' + width + 'px"><ul></ul></div>';

		}



		if (eval($(this).children("input").attr("taxopen"))) {} else {



			if ($(this).children("input").val().length > 0) {
				 
				var val = $(this).children("input").val()
				var valNum = val.length;
				var data = {}
				ItemData = []

				$(this).children("input").after(html);

				$.each(Obj, function (id, obj) { // 获取到数据增加到tempData


					if (obj.item.indexOf(val) != -1) {

						data["id"] = obj.id
						data["item"] = obj.item
						ItemData.push(data);
						data = {};




					};


				});
				$(this).children("input").attr("taxOpen", "true")

				addItem() //加载列表

			} else {

				$(this).children("input").after(html);
				ItemData = Obj;
				addItem() //加载列表
				$(this).children("input").attr("taxOpen", "true")


			}




		}




	})



	$(".input-select").on("keyup", function () {


		var val = $(this).val()
		var valNum = val.length;
		var data = {}
		ItemData = []
		if (valNum != " ") { //判断如果已经输入



			$.each(Obj, function (id, obj) { // 获取到数据增加到tempData


				if (obj.item.indexOf(val) != -1) {

					data["id"] = obj.id
					data["item"] = obj.item
					ItemData.push(data);
					data = {};




				};


			});

			addItem();

		} else {

			ItemData = Obj;


			addItem();
		}


		//判断是否有搜索条件 



	})


	//全部列表加载
	function addItem() {

		$(".tax-input-select ul li").remove();
		var item = "";

		$.each(ItemData, function (id, obj) {

			item = '<li><span>' + obj.item + '</span></li>'
			$(".tax-input-select ul").append(item)


		})



	}



	$("body").on("click", ".tax-input-select ul li", function (event) {


		//event.stopPropagation();

		if (event.stopPropagation) { // 针对 Mozilla 和 Opera 		
			event.stopPropagation();
		} else if (window.event) { // 针对 IE 		
			window.event.cancelBubble = true;
		}
		var text = $(this).children("span").text();
		$(".this-input-select").val(text)
		$(".input-select").attr("taxOpen", "false")
		$(".input-select").removeClass("this-input-select")
		$(".tax-input-select").remove();
		$(".tax-select-inline").removeClass("zindex-100")

	})


	$("body").on("click", ".tax-select-inline", function (event) {

		//event.stopPropagation();
		if (event.stopPropagation) { // 针对 Mozilla 和 Opera 		
			event.stopPropagation();
		} else if (window.event) { // 针对 IE 		
			window.event.cancelBubble = true;
		}

		$(this).addClass("zindex-100")

	})



	$(document).click(function (event) {


		if ($(".this-input-select").val().length > 0) {
			var text = $(".this-input-select").next(".tax-input-select").find("li").eq(0).children("span").text();
			$(".this-input-select").val(text)
		}else{
			
			$(".this-input-select").val($(".this-input-select").attr("placeholder"))
		}

		$(".tax-input-select").remove();
		$(".input-select").attr("taxOpen", "false")
		$(".input-select").removeClass("this-input-select")
		$(".tax-select-inline").removeClass("zindex-100")

     

	});






})