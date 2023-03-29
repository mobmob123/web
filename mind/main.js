$(function () {
    //儲存目前作答到第幾題
    let currentQuiz = null;
    //當按鈕按下後，要做的事情

    $("#startButton").on("click", function () {

        if (currentQuiz == null) {
            currentQuiz = 1;
            $("#question").text(questions[1].question);
            $("#options").empty();
            questions[1].answers.forEach(function (element, index, array) {
                $("#options").append(`<input name='options' type='radio' 
                value='${index}' id='${element[0]}'><label for='${element[0]}'>${element[0]}</label><br><br>`);
            });
            $("#startButton").attr("value", "下一題");
        }
        else {
            $.each($(":radio"), function (indexInArray, valueOfElement) {
                if (valueOfElement.checked) {

                    if (isNaN(questions[currentQuiz].answers[indexInArray][1])) {
                              var finalResult=questions[currentQuiz].answers[indexInArray][1];
                              $("#question").text(finalAnswers[finalResult][0]);
                              $("#options").empty();
                              $("#options").append(`${finalAnswers[finalResult][1]}<br><br>`);
                              currentQuiz=null;
                              $("#startButton").attr("value","重新開始");
                    }
                    else {
                        currentQuiz = questions[currentQuiz].answers[indexInArray][1];
                        $("#question").text(questions[currentQuiz].question);
                        $("#options").empty();
                        questions[currentQuiz].answers.forEach(function (element, index, array) {
                            $("#options").append(`<input name='options' type='radio' 
                            value='${index}' id='${element[0]}'><label for='${element[0]}'>${element[0]}</label><br><br>`);
                        })
                    }
                }

            });
        }
    });
});
