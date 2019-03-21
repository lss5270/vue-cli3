// JavaScript Document

$(document).ready(function(){
	
	var alertHtml='<div class="alert-box"><ul><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td class="left-icon"><span class="alert-icon"> </span></td><td><div class="text"> 原适用17%税率且出口退税率为17%的出口货物，出口退税率调整至16%，出口退税率调整至10%。 </div> </td></tr></table></ul></div>'

	
	
	
	function alertJs(color){
		
		
		$(".alert-box").remove();
		$("body").append(alertHtml);
		$(".alert-box ul").addClass(color)
		$(".alert-box").animate({opacity:1,right:10},600)
		
	}
	
	function alertRemove(){

		 $(".alert-box").animate({opacity:0,right:-300},600);
		 setTimeout(function(){ $(".alert-box").remove();  },600);
		
	}
	
	
	
	
	$("#btnAlert1").on("click",function(){
		alertJs("colorBlue")
	})
	
	
	$("#btnAlert2").on("click",function(){
		alertJs("colorOrange")
	})
	
	$("#btnAlert3").on("click",function(){
	 alertRemove()
	})
	
	
	
})