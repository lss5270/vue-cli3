// JavaScript Document
 
$(document).ready(function(){
	
	 $(".tax-step-box").on("mouseenter",".item-step",function(){
	
		 var notice=$(this).children(".description").text();
		 if(notice==""){
			
		 }else{
			
		  $(this).append('<div class="notice">'+notice+'</div>') 
			 
		 }
		 
	 })
	 $(".tax-step-box").on("mouseleave",".item-step",function(){
		 
		  $(".tax-step-box .notice").remove();
		 
	 })
	 
//关联业务
	 $(".tax-business-box").on("mouseenter",".item-ul",function(){
	
		 var notice=$(this).children(".description").text();
		 if(notice==""){
			
		 }else{
			
		  $(this).append('<div class="notice">'+notice+'</div>') 
			 
		 }
		 
	 })
	 $(".tax-business-box").on("mouseleave",".item-ul",function(){
		 
		  $(".tax-business-box .notice").remove();
		 
	 })
	 
	 
	  

		
}) 	
 
function initializeStep(data){
	
	$(function(){
		 
		 var itemLength=data.item.length;
		 $(".tax-step-box").width(data.box[0].width).height(data.box[0].height) 
		  
		 for(var i=0; i<itemLength;i++){
		  	
			     var type=data.item[i].type 
		         var t=data.item[i].t+'px'
				 var l=data.item[i].l+'px'
				 var w=data.item[i].w+'px'
				 var h=data.item[i].h+'px'
				 var bg=data.item[i].bg
				 var icon=data.item[i].icon
				 var iconId=data.item[i].iconId
				 var name=data.item[i].name
				 var href=data.item[i].href
				 var description=data.item[i].description
			     var style=data.item[i].style
			 if(type=="node"){
				
				 
                 var html='<ul style="width:'+w+';height:'+h+'; top:'+t+'; left:'+l+';" class="item-ul item-step" step-type="node"><div class="step-div"><p class="'+bg+'" val-open="true"><i icon-id="'+iconId+'" class="'+icon+'"></i></p><a href="'+href+'" target="_blank" class="step-name">'+name+'</a></div><div class="description">'+description+'</div></ul>'
				 
                $("#showStep").append(html)
				 
			 }else{
				 

				 var html='<ul step-type="point" class="'+style+'" style="width:'+w+';height:'+h+'; top:'+t+'; left:'+l+';" ><p></p></ul>'
				 $("#showStep").append(html)
			 }
			  
		 } 
       
		var business=data.business.length;
		for(var i=0; i<business;i++){
			 
		 		 var icon=data.business[i].icon
				 var iconId=data.business[i].iconId
				 var name=data.business[i].name
				 var href=data.business[i].href
				 var description=data.business[i].description
				 var html='<ul class="item-ul"><i icon-id="'+iconId+'" class="'+icon+'"></i><a href="'+href+'"target="_blank" class="step-name">'+name+'</a><div class="description">'+description+'</div></ul>'
				 
                $("#showBusiness").append(html)
			
		}
		
		   
    
	})
	
}
