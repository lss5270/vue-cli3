<%@ CODEPAGE=65001 %>
<%
Option Explicit
Response.CodePage=65001
Response.Charset="UTF-8"

Dim htmlData

htmlData = Request.Form("content1")

Function htmlspecialchars(str)
	str = Replace(str, "&", "&amp;")
	str = Replace(str, "<", "&lt;")
	str = Replace(str, ">", "&gt;")
	str = Replace(str, """", "&quot;")
	htmlspecialchars = str
End Function
%>
<!doctype html>
<html>
<head>
	<meta charset="utf-8" />
	<title>KindEditor ASP</title>
	<link rel="stylesheet" href="../themes/default/default.css" />
	<link rel="stylesheet" href="../plugins/code/prettify.css" />
	<script charset="utf-8" src="../kindeditor.js"></script>
	<script charset="utf-8" src="../lang/zh-CN.js"></script>
	<script charset="utf-8" src="../plugins/code/prettify.js"></script>
	<script charset="utf-8" src="../kindeditor-all.js"></script>
	<script>
		//kingeditor
var editor;
KindEditor.ready(function(K) {
    editor = K.create('#content1', {
        allowImageUpload:true
        ,resizeType : 1
        ,width:"100%"
        ,height:"500px"
        ,allowFileManager : true
        
        ,filePostName: 'imgFile'// name属性默认值
        ,items: ["source", "|", "undo", "redo", "|", "preview", "print", "template", "code", "cut", "copy", "paste", "plainpaste", "wordpaste",
            "|", "justifyleft", "justifycenter", "justifyright", "justifyfull", "insertorderedlist",
            "insertunorderedlist", "indent", "outdent", "subscript", "superscript", "clearhtml",
            "quickformat", "selectall", "|", "fullscreen", "/", "formatblock", "fontname", "fontsize",
            "|", "forecolor", "hilitecolor", "bold", "italic", "underline", "strikethrough",
            "lineheight","removeformat", "|", "image", "media",
            "insertfile", "table", "hr", "emoticons", "pagebreak", "anchor", "link",
            "unlink"]
    });
});
	</script>
</head>
<body>
	<%=htmlData%>
	<form name="example" method="post" action="demo.asp">
		<textarea id="content1" style="width:700px;height:200px;visibility:hidden;"><%=htmlspecialchars(htmlData)%></textarea>
		<br />
		<input type="submit" name="button" value="提交内容" /> (提交快捷键: Ctrl + Enter)
	</form>
</body>
</html>
