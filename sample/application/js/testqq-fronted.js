// alert("hihi, this is js");  // 跳出警示訊息框

// 等待html上的標籤完成，才開始執行
// jQuery
$(function(){
    setTimeout(() => {
        $("#wording").text("一秒鐘之後修改文字");
    }, 1000);

    // 透過class透過class綁定click事件, event listening
    $(".btn").click(() => {
        alert("按到按鈕了");
    });

    // 串接前後端
    // 按鈕被點擊時，向後端發request
    $.ajax({  // 非同步請求
        url: "/buttonData",  // 發請求給 /buttonData api
        type: "GET"
    })
    .then((result) => {
        console.log(result);
        $("#wording").after(`<div> ${result["name"]} </div>`);
    }).catch((err) => {
        console.log(err);
    });
})