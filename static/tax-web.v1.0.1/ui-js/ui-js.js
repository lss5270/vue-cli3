// JavaScript Document

$(document).ready(function(){
	
	if(sessionStorage.skin == null){
	   
	   
	   
	   }else{
		   
			var dir=$("#link").attr("dir")
			var colorDir="../"
			for(var i=1;i<dir;i++){
				colorDir=colorDir+"../"
			}
			var cssHref=colorDir+'tax-skin/'+sessionStorage.skin+'/color.css'
			var link='<link rel="stylesheet" href="'+cssHref+'"> ' ;
			$("body").append(link);  
		   
	   }
	
	
	
	
})