////////////////////////活動一覽
var topic = [
    "尚未開學",
    "國定假日",
    "環境準備",
    "隨機性",
    "重複性",
    "條件判斷"
];



// function setMonthAndDay(startMonth,startDay){
//     startDate.setMonth(startMonth-1,startDay);
// }

////////////////////////////////////控制噁心的date物件
const today = new Date();
const year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();


if (month < 10) {// 如果月份或日期小於10，則在前面添加0
    month = "0" + month;
}
if (day < 10) {
    day = "0" + day;
}

$("#UserDateInput").val(`${year}-${month}-${day}`);// 將日期設定為今天


