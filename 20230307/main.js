let startDate = new Date($("#UserDateInput").val());//取預設值

let rowcounter = 0;
const millisecsPerDay = 24 * 60 * 60 * 1000;//7天是幾毫秒

$.fn.turntogray = function () {
    $("#courseTable td").each(function () {
        // 檢查每個單元格的內容是否為 "國定假日"
        if ($(this).text() == "國定假日" || $(this).text() == "停課") {
            // 如果是，將其所屬的列(tr)變成灰色
            $(this).parent("tr").css("background-color", "gray");
        }
    });
    return this;
};
//////////////////////////初始化的函式
$.fn.resetSchedule = function () {
    $("#courseTable").empty();
    rowcounter = 0;
    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");//初始化

    let topicCount = topic.length;
    for (let x = 0; x < topicCount; x++) {
        let future = (startDate.getTime() + 7 * rowcounter * millisecsPerDay);
        let futureDate = new Date(future);
        $("#courseTable").append(
            "<tr>" +
            `<td>${rowcounter += 1}</td>` +// ` ` js語法
            `<td>${(futureDate.getMonth() + 1) + '/' + futureDate.getDate()} </td>` +// ` ` js語法 可塞變數
            `<td>${topic[rowcounter - 1]}</td>` +
            "</tr>"

        );
    }
    $('body').turntogray();
    return this;
};

//////////////////////////初始化table
$('body').resetSchedule();

////////////////////////更改起始日期
$("#UserDateInput").on("input", function () {
    startDate = new Date($("#UserDateInput").val());
    $('body').resetSchedule();
});


/////////////////////////如果有國定假日就變灰色


////////////////////////新增活動
$("#SentNewEvent").click(function () {
    let future = (startDate.getTime() + 7 * rowcounter * millisecsPerDay);
    let futureDate = new Date(future);
    $("#courseTable").append(
        "<tr>" +
        `<td>${rowcounter += 1}</td>` +// ` ` js語法
        `<td>${(futureDate.getMonth() + 1) + '/' + futureDate.getDate()} </td>` +// ` ` js語法
        `<td>${$("#UserNewEvent").val()}</td>` +
        "</tr>"

    );
    $('body').turntogray();
});
