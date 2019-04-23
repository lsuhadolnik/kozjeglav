
var ants = [];

var started = false;
var inter = null;
var a_canvas = null;
var a_ctx = null;

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


    a_canvas = document.getElementById("canvasAnts");
    a_ctx = null;
    if (a_canvas.getContext) {
        a_ctx = a_canvas.getContext("2d");
        a_ctx.strokeRect(0,0,900,500);
    }

    var colors = ["#1b0f00", "#2d1300", "#783201", "#3c1900"];

    setInterval(function() {drawWrap()}, 50);

    for(var i = 0; i < 5; i++){
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

function drawAnt(ctx, a){

    drawLeg(ctx, a, a.x, a.y, 0, a.perc1, true);
    drawLeg(ctx, a, a.x, a.y, 0, a.perc2, false);
    drawLeg(ctx, a, a.x, a.y + 8 + 8, 0, a.perc3, true);
    drawLeg(ctx, a, a.x, a.y + 8 + 8, 0, a.perc4, false);

    ctx.beginPath();
    ctx.ellipse(a.x, a.y,   6, 6, 0, 0, 2*Math.PI);
    ctx.fillStyle = a.color;
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(a.x, a.y + 8,   6, 4, 0, 0, 2*Math.PI);
    ctx.fillStyle = a.color;
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(a.x, a.y + 8 + 8, 6, 6, 0, 0, 2*Math.PI);
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



function drawLeg(ctx, a, x, y, deg, perc, left){

    var legLength = 8.5;

    ctx.beginPath();
    ctx.strokeStyle = a.color;
    ctx.moveTo(x, y);
    if(left){
        ctx.lineTo(x - legLength, y + legLength * perc - legLength / 2);
    }
    else{
        ctx.lineTo(x + legLength, y + legLength * perc - legLength / 2);
    }
    
    ctx.stroke();

}

