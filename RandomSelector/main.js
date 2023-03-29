
let last=$("li").length;//為了記住上一筆

$(function () {
    $("input").on("click", function () {
        
        var numberOfListItem = $("li").length; 
        var randomChildNumber = last;
        while (randomChildNumber==last){//跟上一次重複就重來
            randomChildNumber=Math.floor(Math.random() * numberOfListItem)
        }
        last=randomChildNumber;//記住這一次

        $("h1").text($("li").eq(randomChildNumber).text());
        $("img").attr("style","display: none");
        $("img").eq(randomChildNumber).attr("style","display:");
    });
});
