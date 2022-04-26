<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>贪吃蛇</title>
    <style>
      .test {
        position: absolute;
        top: 0;
        left: 0;
        width: 50px;
        height: 50px;
        background-color: green;
        border-radius: 15px;
      }
      .main {
        position: relative;
        top: 0;
        left: 0;
        width: 1000px;
        height: 800px;
        border: 20px solid black;
        margin: 0px auto;
      }
      .tip {
        margin: 200px auto;
        width: 400px;
        height: 100px;
        font-size: 24px;
        font-weight: 700px;
        text-align: center;
      }
      .scro {
        position: absolute;
        top: 0;
        left: 1050px;
        width: 100px;
        height: 50px;
        font-size: 24px;
        background-color: antiquewhite;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <div class="tip">
        按任意键开始<br />
        按 ↑ ↓ ← → 控制移动方向
      </div>
    </div>
    <script>
      var main = document.querySelector(".main");
      var body = document.querySelector("body");
      // 数组 用来存放蛇身
      var arr = [
        { top: 0, left: 0 },
        { top: 0, left: 50 },
        { top: 0, left: 100 },
        { top: 0, left: 150 },
      ];
      // 随机产生食物
      var foodtop = Math.floor(Math.random() * 8) * 100;
      var foodleft = Math.floor(Math.random() * 10) * 100;
      // 得分初始值
      var fenshu = 0;
      //渲染main盒子
      var td = "";
      function xuanran() {
        for (var k of arr) {
          td += `<div class="test" style='top:${k.top}px;left:${k.left}px'></div>`;
        }
        td += `<div class="scro" ">得分${fenshu}</div>`;
        td += `<div class="test" style="top: ${foodtop}px;left: ${foodleft}px"></div>`;
        main.innerHTML = td;
        // 食物的样式
        main.lastElementChild.style.backgroundColor = "#666";
        // 蛇头的样式
        main.childNodes[main.children.length - 3].style.backgroundColor = "red";
        td = "";
      }

      function move(element, keyCode) {
        clearInterval(element.timer);
        element.timer = setInterval(function () {
          //将数组里的数往前移一个
          for (var i = 0; i < arr.length - 1; i++) {
            arr[i].top = arr[i + 1].top;
            arr[i].left = arr[i + 1].left;
          }
          //模拟下一步的位置
          switch (keyCode) {
            case 37:
              var newhead = {
                top: arr[arr.length - 1].top,
                left: arr[arr.length - 1].left - 50,
              };
              break;
            case 38:
              var newhead = {
                top: arr[arr.length - 1].top - 50,
                left: arr[arr.length - 1].left,
              };
              break;
            case 39:
              var newhead = {
                top: arr[arr.length - 1].top,
                left: arr[arr.length - 1].left + 50,
              };
              break;
            case 40:
              var newhead = {
                top: arr[arr.length - 1].top + 50,
                left: arr[arr.length - 1].left,
              };
              break;
          }
          //  判断模拟的下一步是否咬到自己
          for (var i = 0; i < arr.length - 1; i++) {
            //如果咬到自己 游戏结束
            if (
              (newhead.top == arr[i].top && newhead.left == arr[i].left) ||
              newhead.top >= 800 ||
              newhead.left >= 1000 ||
              newhead.top <= -50 ||
              newhead.left <= -50
            ) {
              clearInterval(element.timer);
              alert("游戏结束");
              break;
            }
            // 没咬到自己 就将下一步添加到数组
            else {
              arr[arr.length - 1].left = newhead.left;
              arr[arr.length - 1].top = newhead.top;
            }
          }
          // 判断是否吃到食物
          if (
            arr[arr.length - 1].left == foodleft &&
            arr[arr.length - 1].top == foodtop
          ) {
            fenshu++;
            arr.push({ top: foodtop, left: foodleft });
            foodtop = Math.floor(Math.random() * 8) * 100;
            foodleft = Math.floor(Math.random() * 10) * 100;
          }
          xuanran();
        }, 250);
      }
      document.addEventListener("keyup", function (e) {
        xuanran();
        document.addEventListener("keydown", function (e) {
          move(body, e.keyCode);
        });
      });
    </script>
  </body>
</html>
