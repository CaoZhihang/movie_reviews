$(function(){
    var signupForm = $('#signup');
    var name = $('#signupName');
    var pass = $('#signupPassword');
    var upInfo = $('.upInfo');
    var upbnt = $('.upsub');
    var reg = /^[0-9a-zA-Z]{6,}$/;

    upbnt.click(function(){
        if(!reg.test(name.val()))
        {
            upInfo.text('用户名至少6位字母数字组合');
            upInfo.css("color","red");
        }
        if(!reg.test(pass.val()))
        {
            upInfo.text('密码至少6位字母数字组合');
            upInfo.css("color","red");
        }
        $.ajax({
            type:"POST",
            url:"/admin/user/new/" + name.val(),
            // async:false,
            success:function(results){
            if(results.success == '1')
            {
                upInfo.text('符合');
                upInfo.css("color","green");
                upbnt.attr("disabled","disabled");
                signupForm.submit();
            }
            else
            {
                upInfo.text('用户名已经存在');
                upInfo.css("color","red");
            }
        }
        });
    });

});