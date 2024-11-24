function drawCircleLine(line) {
    g.drawLineAA(line.xStart, line.yStart, line.xEnd, line.yEnd);
}

function createCircleLine(circleX, circleY, circleR, rad, length) {
    var yStart = 0;
    var yEnd = 0;
    var xStart = 0;
    var xEnd = 0;
    // calculate Y
    if(![360.0, 180.0, 0.0].includes(rad)) {
        yStart = Math.round(circleR * Math.sin((rad * Math.PI / 180)));
        yEnd = Math.round((circleR - length) * Math.sin((rad * Math.PI / 180)));
    }
    // calculate X
    if(![90.0, 270.0].includes(rad)) {
        xStart = Math.round(circleR * Math.cos((rad * Math.PI / 180)));
        xEnd = Math.round((circleR - length) * Math.cos((rad * Math.PI / 180)));
    }
    const line = { xStart: xStart + circleX, xEnd : xEnd + circleX, yStart: yStart + circleY, yEnd: yEnd + circleY};
    return line;
}

g.reset();
g.clear();

for (i = 240; i <= 300; i+= 2.5) {
    // draw hour ticks
    var length = 8;
    if (i%5 == 0) {
        length = 15;
    }
    drawCircleLine(createCircleLine(88, 200, 176, i, length));

    // draw minute ticks
    var minLength = 8;
    if (i%10 == 0) {
       minLength = 15; 
    }
    if (i%5 == 0) {
        drawCircleLine(createCircleLine(88, 264, 176, i, minLength));
    }
}
