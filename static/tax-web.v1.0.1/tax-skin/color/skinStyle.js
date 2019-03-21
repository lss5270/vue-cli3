// JavaScript Document


$(document).ready(function(){
	
	
var strFullPath=window.document.location.href;
var strPath=window.document.location.pathname;
var pos=strFullPath.indexOf(strPath);
var prePath=strFullPath.substring(0,pos);

	if(sessionStorage.skin == null){
	   
	   var cssPath=prePath+'/tax-skin/blue/layui.css'
		   $("#skinCss").attr("href",cssPath) 
	   
	
	   }else{
		   
		   var cssPath=prePath+'/tax-skin/'+sessionStorage.skin+'/layui.css'
		   $("#skinCss").attr("href",cssPath) 
		   
	   }
	
	console.log(cssPath)
});