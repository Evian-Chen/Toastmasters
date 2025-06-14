var changeErrMsgState = function(msg){
    $("#err-message").text(msg);
};

$(function(){

    $(".login input").keyup(function(){
        changeErrMsgState("");
    });

    $("#login-btn").click(function(){
        var account = $("#account").val();
        var passwd  = $("#passwd").val();


        axios.post("/auth",{ account , passwd })
             .then(function(res){
                var message = res.data.message;
                console.log(message);
                changeErrMsgState(message);

                // res 有帶redirect的參數的話，前端使用href跳轉
                if(res.data.redirect) location.href= res.data.redirect;
             })
             .catch(function(err){
                 var message = err.response.data.message;
                 console.log(message);
                 changeErrMsgState(message);
             });
    });
});