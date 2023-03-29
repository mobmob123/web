let mapArray, ctx, currentImgMain;
// let imgMountain, imgMain, imgEnemy;
//mapArray-決定地圖中每個格子的元素
//ctx - HTML5 Canvas用
//currentImgMainX,currentImgMainY - 決定主角所在座標
//imgMountain,imgMain,imgEnemy - 障礙物,主角,敵人的圖片物件
const gridLength = 200;

var sources = {
    imgMain: "images/spriteSheet.png",
    imgMountain: "images/material.png",
    imgEnemy: "images/Enemy.png"
}

function loadImgs(sources, callback) {
    var images = {};
    var loadedImgs = 0;
    var numImgs = Object.keys(sources).length//取得數量;
    for (var src in sources) {
        images[src] = new Image();

        images[src].onload = function () {
            if (++loadedImgs >= numImgs)
                callback(images);

        };

        images[src].src = sources[src];
    }
}



$(function () {
    mapArray = [//0-可走,1-障礙,2-終點,3-敵人
        [0, 1, 1],
        [0, 0, 0],
        [3, 1, 2]
    ];

    ctx = $("#myCanvas")[0].getContext("2d");

    //初始座標
    currentImgMain = {
        "x": 0,
        "y": 0
    };
    //畫出初始位置
    loadImgs(sources, function (imgs) {//imgs所有載入好了圖片
        //畫主角
        ctx.drawImage(imgs.imgMain, 0, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
        //畫山跟敵人
        for (var x in mapArray) {
            for (var y in mapArray[x]) {
                if (mapArray[x][y] == 1)
                    ctx.drawImage(imgs.imgMountain, 32, 65, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                else if (mapArray[x][y] == 3)
                    ctx.drawImage(imgs.imgEnemy, 7, 40, 104, 135, y * gridLength, x * gridLength, gridLength, gridLength);
            }
        }
    });

});


let imgMain = new Image();
imgMain.src = sources.imgMain;//主角重複使用

$(document).keydown(function (e) {
    if (imgMain.complete) {
        let targetImg, targetBlock, cutImagePositionX;
        targetImg = {
            "x": -1,
            "y": -1
        }
        targetBlock = {
            "x": -1,
            "y": -1
        }
        e.preventDefault();

        switch (e.code) {

            case "ArrowLeft":
                targetImg.x = currentImgMain.x - gridLength;
                targetImg.y = currentImgMain.y; cutImagePositionX = 175;//臉朝左
                break;
            case "ArrowUp":
                targetImg.x = currentImgMain.x;
                targetImg.y = currentImgMain.y - gridLength;
                cutImagePositionX = 355;//臉朝上
                break;
            case "ArrowRight":
                targetImg.x = currentImgMain.x + gridLength;
                targetImg.y = currentImgMain.y;
                cutImagePositionX = 540;//臉朝右
                break;
            case "ArrowDown":
                targetImg.x = currentImgMain.x;
                targetImg.y = currentImgMain.y + gridLength;
                cutImagePositionX = 0;//臉朝下
                break;
            default://其他按鍵不處理
                return;
        }
        if (targetImg.x <= 400 && targetImg.x >= 0 && targetImg.y <= 400 && targetImg.y >= 0) {
            targetBlock.x = targetImg.y / gridLength;
            targetBlock.y = targetImg.x / gridLength;
        } else {
            targetBlock.x = -1;
            targetBlock.y = -1;
        }
        ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);
        if (targetBlock.x != -1 && targetBlock.y != -1) {
            switch (mapArray[targetBlock.x][targetBlock.y]) {
                case 0://一般道路(可移動)
                    $("#talkBox").text("我要去右下角");
                    currentImgMain.x = targetImg.x;
                    currentImgMain.y = targetImg.y; break;
                case 1://有障礙物(不可移動)
                    $("#talkBox").text("有山"); break;
                case 2://終點(可移動)
                    $("#talkBox").text("抵達終點");
                    currentImgMain.x = targetImg.x;
                    currentImgMain.y = targetImg.y; break;
                case 3://敵人(不可移動)
                    $("#talkBox").text("哈摟"); break;
            }
        }

       
            ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
       
       
    }
});

