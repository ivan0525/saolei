var start = document.getElementById("startBtn");
var box = document.getElementById("box");
var score = document.getElementById("score");
var title = document.getElementsByClassName("title")[0];
var alertBox = document.getElementById("alertBox");
var close = document.getElementById("close");
var leftLei = document.getElementsByTagName('span')[0];
var mineNum; //总雷数
var mineOver; //剩余雷数
var block;
var mineMap = [];

bindEvent();
function bindEvent() {
  start.onclick = function() {
    //当点击开始游戏，布置好雷盘
    
    box.style.display = "block";
    score.style.display = "block";
    start.style.display = "none";
    title.style.display = "none";
    init();
    leftLei.innerHTML = mineOver;
  };
  box.oncontextmenu = function() {
    return false;
  };
  box.onmousedown = function(e) {
    var event = e.target; //获取事件源对象
    if (e.which == 1) {
      //单击鼠标左键
      leftClick(event);
    } else if (e.which == 3) {
      //单击鼠标右键
      rightClick(event);
    }
  };
  close.onclick = function() {
    alertBox.style.display = "none";
    box.style.display = "none";
    box.innerHTML = "";
    title.style.display = "block";
    start.style.display = "block";
  };
}
function init() {
  mineNum = 10;
  mineOver = 10;
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      var cao = document.createElement("div");
      cao.classList.add("block");
      cao.setAttribute("id", i + "-" + j);
      box.appendChild(cao);
      mineMap.push({ mine: 0 });
    }
  }
  var block = document.getElementsByClassName("block");
  while (mineNum) {
    var mineIndex = Math.floor(Math.random() * 100); //随机生成的地雷的序号
    if (mineMap[mineIndex].mine === 0) {
      //如果mineMap里面的元素的mine属性值为0的时候，就加入一个雷
      block[mineIndex].classList.add("isLei");
      mineMap[mineIndex].mine = 1; //添加雷之后把mine属性值改为1
      mineNum--; //要添加到雷数减1
    }
  }
}
function leftClick(ele) {
  var isLei = document.getElementsByClassName("isLei");
  if (ele && ele.classList.contains("isLei")) {
    for (var i = 0; i < isLei.length; i++) {
      isLei[i].classList.add("show");
    }
    setTimeout(function() {
      alertBox.style.backgroundImage = "url(./img/over.jpg)";
      alertBox.style.display = "block";
    }, 300);
  } else {
    var n = 0; //周围的雷数
    var posArr = ele && ele.getAttribute("id").split("-"); //通过设置的id获取元素的位置
    var posX = posArr && +posArr[0]; //横坐标
    var posY = posArr && +posArr[1]; //纵坐标
    ele && ele.classList.add("num"); //标识当前位置周围八个方块的雷数
    for (var i = posX - 1; i <= posX + 1; i++) {
      for (var j = posY - 1; j <= posY + 1; j++) {
        var arroundBox = document.getElementById(i + "-" + j); //取出周围的8个方块
        if (arroundBox && arroundBox.classList.contains("isLei")) {
          //如果有isLei属性
          n++; //周围的雷数就加1
        }
      }
    }
    ele && (ele.innerHTML = n);
    if (n == 0) {
      for (var i = posX - 1; i <= posX + 1; i++) {
        for (var j = posY - 1; j <= posY + 1; j++) {
          var nearBox = document.getElementById(i + "-" + j);
          if (nearBox && nearBox.length !=0) {
            if (!nearBox.classList.contains("checked")) {
              nearBox.classList.add("checked");
              leftClick(nearBox);
            }
          }
        }
      }
    }
  }
}
function rightClick(ele) {
    if(ele.classList.contains('num')){
        return;
    }
    ele.classList.toggle('flag');
    if(ele.classList.contains('isLei') && ele.classList.contains('flag')){
        mineOver--;
    }
    if(ele.classList.contains('isLei') && !ele.classList.contains('flag')){
        mineOver++;
    }
    leftLei.innerHTML = mineOver;
    if(mineOver == 0){
        setTimeout(function() {
            alertBox.style.backgroundImage = "url(./img/success.png)";
            alertBox.style.display = "block";
          }, 500);
    }
}
