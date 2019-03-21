layui.use(['layer','laydate','form'], function(){
    if(!window.layer){
        window.layer=layui.layer;
    }
    if(!window.laydate){
        window.laydate=layui.laydate;
    }
    if(!window.form){
        window.form=layui.form;
    }
});

/**
 * form样式渲染
 */
function layformRender(){
    if(window.form){
        window.form.render();
    }else if(layui.form){
        layui.form.render();
    }else{
        layui.use('form', function (form) {
            form.render();
            window.form=layui.form;
        });
    }
}

