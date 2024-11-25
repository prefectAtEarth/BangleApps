{
    const centerX = g.getWidth() / 2;
    const yHourTickOffset = 200;
    const yMinuteTickOffset = 264;
    const tickRadius = g.getWidth()-10;

    let degreeToRadian = function (degree) {
        return (degree * Math.PI / 180);
    };

    let xFromAngle = function (radius, angle) {
        if (![90.0, 270.0].includes(angle)) {
            return (Math.round(radius * Math.cos(degreeToRadian(angle))));
        } else {
            return 0;
        }
    };

    let yFromAngle = function (radius, angle) {
        if (![360.0, 180.0, 0.0].includes(angle)) {
            return (Math.round(radius * Math.sin(degreeToRadian(angle))));
        } else {
            return 0;
        }
    };

    let drawCircleLine = function (line) {
        g.drawLineAA(line.xStart, line.yStart, line.xEnd, line.yEnd);
    };

    let createCircleLine = function (circleX, circleY, circleR, angle, length) {
        var yStart = yFromAngle(circleR, angle);
        var yEnd = yFromAngle((circleR - length), angle);
        var xStart = xFromAngle(circleR, angle);
        var xEnd = xFromAngle((circleR - length), angle);

        const line = { xStart: xStart + circleX, xEnd: xEnd + circleX, yStart: yStart + circleY, yEnd: yEnd + circleY };
        return line;
    };

    let drawTicks = function () {
        var currentFg = g.getColor();
        for (i = 240; i <= 300; i += 2.5) {
            // draw hour ticks
            var length = 8;
            if (i % 5 == 0) {
                length = 15;
            }
            if (i >= 285) {
                g.setColor(1,0,0);
            }
            drawCircleLine(createCircleLine(centerX, yHourTickOffset, tickRadius, i, length));

            // draw minute ticks
            var minLength = 8;
            if (i % 15 == 0) {
                minLength = 15;
            }
            if (i % 5 == 0) {
                drawCircleLine(createCircleLine(centerX, yMinuteTickOffset, tickRadius, i, minLength));
            }
        }
        g.setColor(currentFg);
    };

    let drawMarker = function () {
        var date = new Date();
        var hourMarker = ["6", "9", "12", "15", "18"];
        var minuteMarker = ["0", "15", "30", "45", "60"];
        var angles = [240, 255, 270, 285, 300];
        if (date.getHours() < 6 || date.getHours() > 17) {
            hourMarker = ["18", "21", "0", "3", "6"];
        }
        for (i = 0; i < angles.length; i++) {
            // draw hour marker
            var xH = xFromAngle((tickRadius - 22), angles[i]) + centerX;
            var yH = yFromAngle((tickRadius - 22), angles[i]) + yHourTickOffset;
            g.setFontAlign(0, 0);
            g.drawString(hourMarker[i], xH, yH);
            // draw minute marker
            var xM = xFromAngle((tickRadius - 22), angles[i]) + centerX;
            var yM = yFromAngle((tickRadius - 22), angles[i]) + yMinuteTickOffset;
            g.setFontAlign(0, 0);
            g.drawString(minuteMarker[i], xM, yM);
        }
    };

    let drawHourHand = function () {
        var date = new Date();
        var hour = date.getHours();
        var minsOffset = Math.floor(date.getMinutes() / 12);
        var hourOffset = (hour - 6)*5;
        var handOffset = 240 + hourOffset + minsOffset;
        drawCircleLine(createCircleLine(centerX, yHourTickOffset, tickRadius - 22, handOffset, 38));
    };

    let drawMinuteHand = function () {
        var date = new Date();
        var min = date.getMinutes() + 240;
        drawCircleLine(createCircleLine(centerX, yMinuteTickOffset, tickRadius - 22, min, 38)); 
    };

    g.clear();
    // do once
    drawTicks();
    // do once per minute;
    drawMarker();
    drawHourHand();
    drawMinuteHand();

    Bangle.setUI(
        {
            mode: "clock",
            remove: function () {
            }
        }
    );

    Bangle.loadWidgets();
    require("widget_utils").show();
}
