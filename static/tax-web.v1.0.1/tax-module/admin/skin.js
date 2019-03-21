// JavaScript Document

 $(function(){
	    var strFullPath=window.document.location.href;
        var strPath=window.document.location.pathname;
        var pos=strFullPath.indexOf(strPath);
        var prePath=strFullPath.substring(0,pos);
	 if(sessionStorage.skin){
		
		 var cssPath=prePath+'/etax40ui/tax-skin/color/'+sessionStorage.skin+'/color.css'
		 
		
		 $("#skinCss").attr("href",cssPath) 
		 
		 
		}else{
			
		var cssPath=prePath+'/etax40ui/tax-skin/color/blue/color.css'
		   $("#skinCss").attr("href",cssPath) 
		}
	 
	 
 })




 $(function(){
	 
	    var strFullPath=window.document.location.href;
        var strPath=window.document.location.pathname;
        var pos=strFullPath.indexOf(strPath);
        var prePath=strFullPath.substring(0,pos);
	    
	 if(sessionStorage.size){
		
		 var cssPath=prePath+'/etax40ui/tax-skin/size/'+sessionStorage.size+'.css'
		 
		
		 $("#sizeCss").attr("href",cssPath) 
		 
		 
		}else{
			
		var cssPath=prePath+'/etax40ui/tax-skin/size/mid.css'
		   $("#sizeCss").attr("href",cssPath) 
		}
	 
	 
 })