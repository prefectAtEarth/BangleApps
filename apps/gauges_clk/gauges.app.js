const centerX = g.getWidth() / 2;
const yHourTickOffset = 200;
const yMinuteTickOffset = 264;

function degreeToRadian(degree) {
    return (degree * Math.PI / 180);
}

function xFromAngle(radius, angle) {
    if (![90.0, 270.0].includes(angle)) {
        return (Math.round(radius * Math.cos(degreeToRadian(angle))));
    } else {
        return 0;
    }
}

function yFromAngle(radius, angle) {
    if (![360.0, 180.0, 0.0].includes(angle)) {
        return (Math.round(radius * Math.sin(degreeToRadian(angle))));
    } else {
        return 0;
    }
}

function drawCircleLine(line) {
    g.drawLineAA(line.xStart, line.yStart, line.xEnd, line.yEnd);
}

function createCircleLine(circleX, circleY, circleR, angle, length) {
    var yStart = yFromAngle(circleR, angle);
    var yEnd = yFromAngle((circleR - length), angle);
    var xStart = xFromAngle(circleR, angle);
    var xEnd = xFromAngle((circleR - length), angle);

    const line = { xStart: xStart + circleX, xEnd: xEnd + circleX, yStart: yStart + circleY, yEnd: yEnd + circleY };
    return line;
}

function drawTicks() {
    for (i = 240; i <= 300; i += 2.5) {
        // draw hour ticks
        var length = 8;
        if (i % 5 == 0) {
            length = 15;
        }
        drawCircleLine(createCircleLine(88, 200, 176, i, length));

        // draw minute ticks
        var minLength = 8;
        if (i % 10 == 0) {
            minLength = 15;
        }
        if (i % 5 == 0) {
            drawCircleLine(createCircleLine(88, 264, 176, i, minLength));
        }
    }
}

function drawHourMarker() {
    var date = new Date();
    var hourMarker = ["6", "9", "12", "15", "18"];
    var angles = [240, 255, 270, 285, 300];
    if (date.getHours() < 6 || date.getHours() > 17) {
        hourMarker = ["18", "21", "0", "3", "6"];
    }
    for (i = 0; i < hourMarker.length; i++) {
        var x = xFromAngle((176 - 22), angles[i]) + centerX;
        var y = yFromAngle((176 - 22), angles[i]) + yHourTickOffset;
        g.setFontAlign(0, 0);
        g.drawString(hourMarker[i], x, y);
        console.log("Text:", hourMarker[i], x, y);
    }
}

g.reset();
g.clear();
drawTicks();
drawHourMarker();
