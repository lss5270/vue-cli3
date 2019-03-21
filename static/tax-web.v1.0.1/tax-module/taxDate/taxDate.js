// 办税日历 2018-09-18

$(document).ready(function () {


	//点击日历

	var myDate = new Date();
	var taxYear = $("#year").val();
	var taxMonth = myDate.getMonth() + 1;

	//数据加载
	var myData;



	$(".date-box").on("click", ".date li p", function () {

		var date = $(this).attr("id-num")

		$(".date-box .date li p").removeClass("tax-this")
		$(this).addClass("tax-this")
		for (var i = 0; i < myData.month.length; i++) {

			if (myData.month[i].date == date) {

				$(".taxDate-title").text(myData.month[i].info)
			}
		}

	})



	taxDate(taxYear, taxMonth)

	function taxDate(year, month) {

		month = parseInt(month, 10);
		var date = new Date(year, month, 0); //获取当前月
		var num = date.getDate(); //当前月多少天
		date.setDate(1); //设置1号
		var week = date.getDay() //获取1号周几
		if(week==0){week=7}//周末
		
		myData = {
			"month": [{
				"date": "16",
				"info": ["申报期：2018年9月1日至2018年9月17日"]
			}, {
				"date": "19",
				"info": ["申报期：2018年9月1日至2018年9月19日"]
			}, {
				"date": "26",
				"info": ["申报期：2018年9月1日至2018年9月26日"]
			}]
		};




		for (var i = 1; i <= num; i++) {


			var liHtml = '<li><p id-num="' + i + '">' + i + '</p></li>'

			$(".date-item .date").append(liHtml)

		};


		for (var i = 0; i < myData.month.length; i++) {

			var date = myData.month[i].date - 1;

			$(".date-box .date li").eq(date).find("p").prepend('<i class="iconfont fsicon-yuandianxiao"></i>')
			if (i == 0) {
				$(".date-box .date li").eq(date).find("p").addClass("tax-this")
			}

		}


		$(".taxDate-title").text(myData.month[0].info);
		$(".tax-title .year").text(year)
		$(".tax-title .month").text(month)

        
		for (var i = 1; i < week; i++) {

			var liHtml = '<li class="iconfont fsicon-prohibit"></li>'
			$(".date-item .date").prepend(liHtml)

		}


		$(".month-item li").eq(month - 1).addClass("tax-this").siblings().removeClass("tax-this")



	}

	//日期

	$(".month-item li").on("click", function () {
		taxYear = $("#year").val();
		taxMonth = $(this).attr("data");
		$(this).addClass("tax-this").siblings().removeClass("tax-this");
		$(".date-item .date").children().remove();
		taxDate(taxYear, taxMonth)

	})

	//select 日期	
	layui.use('form', function () {

		var form = layui.form;

		//监听提交
		form.on('select', function (data) {
			taxYear = data.value;
			taxMonth = $(".month-item .tax-this").attr("data");
			$(".date-item .date").children().remove();
			taxDate(taxYear, taxMonth)
		});


	})






})