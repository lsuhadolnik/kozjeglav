
var ants = [];

var started = false;
var inter = null;
var a_canvas = null;
var a_ctx = null;

var info = {
    legLength : 30,
    legWidth: 7,
    w1 :16,
    w2 :14,
    wm1: 14,
    wm2: 14,
    offset1: 2,
    offset2: 2
};

function lefLengthChange(e){
    ;
    debugger; 
    info.legLength = event.target.value; 
}
function legWidthChange(e){;  info.legWidth = event.target.value}
function legLengthChange(e){;  info.legLength = event.target.value}
function w1Change(e){;        info.w1 = event.target.value}
function wm1Change(e){;       info.wm1 = event.target.value}
function w2Change(e){;        info.w2 = event.target.value}
function wm2Change(e){;       info.wm2 = event.target.value}
function offset1Change(e){;   info.offset1 = event.target.value}
function offset2Change(e){;   info.offset2 = event.target.value}

var startTime = new Date().getTime();

function stopAntsAnimation() {

    clearInterval(inter);

}

function resumeAntsAnimation() {

    if(!started){
        initAntsAnimation()
    }else {
        setInterval(function() {drawWrap()}, 50);
    }
    

}

function initAntsAnimation() {

    started = true;
    let numAnts = 10;


    a_canvas = document.getElementById("canvasAnts");
    a_ctx = null;
    if (a_canvas.getContext) {
        a_ctx = a_canvas.getContext("2d");
        a_ctx.strokeRect(0,0,900,500);
    }

    var colors = ["#1b0f00", "#2d1300", "#783201", "#3c1900"];

    setInterval(function() {drawWrap()}, 50);



    for(var i = 0; i < numAnts; i++){
        ants.push({
            x : (Math.random() * window.innerWidth),
            y : (Math.random() * 1000),
            speed : (Math.random() * 9 + 5),
            color: colors[Math.floor(Math.random()*(colors.length - 1))],
            perc1:Math.random(), perc2: Math.random(), perc3:Math.random(), perc4:Math.random(),
            p1A: false, p2A: false, p3A: false, p4A: false
        });
    }

}

function drawWrap() {
    
    var antCanvasWidth = window.innerWidth;
    var antCanvasHeight = window.innerHeight;

    a_canvas.height = antCanvasHeight;
    a_canvas.width = antCanvasWidth;

    a_ctx.clearRect(0, 0, antCanvasWidth, antCanvasHeight);
    draw(a_ctx, antCanvasWidth, antCanvasHeight, new Date().getTime() - startTime);
}

function draw(ctx, w, h, time){

    ants.forEach(a => {
        
        a.y += 10 * a.speed / 100;

        drawAnt(ctx, a);

        if(a.x - 10 > w) {
            a.x = 0;
        }
        if(a.y - 10 > h) {
            a.y = 0;
        }
    });


}

function drawLeg(ctx, a, x, y, deg, perc, left){

    

    ctx.beginPath();
    ctx.strokeStyle = a.color;
    
    ctx.lineWidth=info.legWidth
    ctx.moveTo(x, y);
    if(left){
        ctx.lineTo(x - info.legLength, y + info.legLength * perc - info.legLength / 2);
    }
    else{
        ctx.lineTo(x + info.legLength, y + info.legLength * perc - info.legLength / 2);
    }
    
    ctx.stroke();

}

function drawAnt(ctx, a){

    var w1 = info.w1;
    var w2 = info.w2;
    var wm1 = info.wm1;
    var wm2 = info.wm2;
    var offset1 = info.offset1;
    var offset2 = info.offset2;

    drawLeg(ctx, a, a.x, a.y, 0, a.perc1, true);
    drawLeg(ctx, a, a.x, a.y, 0, a.perc2, false);
    drawLeg(ctx, a, a.x, a.y + (w1 +2)*2, 0, a.perc3, true);
    drawLeg(ctx, a, a.x, a.y + (w1 +2)*2, 0, a.perc4, false);

    ctx.beginPath();
    ctx.ellipse(a.x, a.y,   w1, w2, 0, 0, 2*Math.PI);
    ctx.fillStyle = a.color;
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(a.x, a.y + w1+offset1,   wm1, wm2, 0, 0, 2*Math.PI);
    ctx.fillStyle = a.color;
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(a.x, a.y +w1+ +wm1+offset2, w1, w2, 0, 0, 2*Math.PI);
    ctx.fillStyle = a.color;
    ctx.fill();

    ascPerc(a, 1);
    ascPerc(a, 2);
    ascPerc(a, 3);
    ascPerc(a, 4);
    

}

function ascPerc(a, idx){
    if(a["perc"+idx] >= 1 || a["perc"+idx] < 0){
        a["p"+idx+"A"] = !a["p"+idx+"A"];
    }

    var mul = (idx % 2)*2 - 1;

    if(a["p"+idx+"A"]){
        a["perc"+idx] = a["perc"+idx] + mul*0.1;
    }else{
        a["perc"+idx] = a["perc"+idx] - mul*0.1;
    }
}





