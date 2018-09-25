// $(document).ready(function(){
	//创建canvas画布
	var cvs = document.getElementById('cvs');
	var ctx = cvs.getContext('2d');
	// canvas.width = 512;
	// canvas.height = 480;
	//document.body.appendChild(canvas);

//背景图片
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

//英雄图片
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

//怪兽图片
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

var hero = {
    speed: 256 // 设置英雄的移动速度
};
var monster = {};
var monstersCaught = 0; //初始化抓捕次数为0

//处理用户的键盘输入
var keysDown = {};

addEventListener("keydown", function(e){
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e){
	delete keysDown[e.keyCode];
}, false);

// 定义reset方法，初始化，开始新的一轮游戏
var reset = function () {
	//把英雄放置在画布中心
	hero.x = cvs.width / 2;
	hero.y = cvs.height / 2;

	//把怪物随机放置
	monster.x = 36 + (Math.random() * (cvs.width - 82));
	monster.y = 36 + (Math.random() * (cvs.height - 82));
};

// 定义update方法，当开始或者结束时更新对象
// 		传入的modifier 变量，它是基于1开始并随时间变化的一个因子。
// 		例如1秒过去了，它的值就是1，英雄的速度将会乘以1，也就是每秒移动256像素（speed）；如果半秒钟则它的值为0.5，英雄的速度就乘以
// 0.5也就是说这半秒内英雄以正常速度一半的速度移动。理论上说因为这个update函数被调用的非常快且频繁，所以modifier的值
// 会很小，但有了这一因子后，不管我们的代码跑得快慢，都能够保证英雄的移动速度是恒定的。

var update = function (modifier) {
	if (38 in keysDown) { // 按下向上键
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // 按下向下键
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // 按下向左键
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // 按下向右键
		hero.x += hero.speed * modifier;
	}

	//判断英雄是否抓住怪兽，图片宽32*32
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
		) {
		++monstersCaught;
		reset();   //结束一轮游戏，重新初始化
	}
};

//定义draw方法，渲染图片
var draw = function(){
	if(bgReady){
		ctx.drawImage(bgImage, 0, 0);
	}
	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}
	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	//计分
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("抓捕次数: " + monstersCaught, 32, 32);
};

//游戏的主方法循环结构
var main = function () {
	var now = Date.now();
	var difference = now - then;

	update(difference / 1000); //modifier的值从毫秒变为秒为单位的
	draw();

	then = now;

	//requestAnimationFrame()用于浏览器中制作动画，通过递归调用同一方法来不断更新画面以达到动起来的效果。
	//该方法1秒刷新的帧数大概为60，即一秒刷新60次页面。
	requestAnimationFrame(main);
};

//浏览器的兼容性处理。
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//调用方法开始游戏
var then = Date.now();   // 设置初始时间变量
reset();
main();
//});


