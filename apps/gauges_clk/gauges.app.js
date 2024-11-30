{
    const centerX = g.getWidth() / 2;
    const yHourTickOffset = 200;
    const yMinuteTickOffset = 264;
    const tickRadius = g.getWidth() - 10;

    let drawTimeout;

    let queueDrawTime = function () {
        if (drawTimeout) clearTimeout(drawTimeout);
        drawTimeout = setTimeout(function () {
            drawTimeout = undefined;
            g.clearRect(0, 24, g.getWidth(), g.getHeight());
            drawTicks();
            drawMarker();
            drawTime();
        }, 60000 - (Date.now() % 60000));
    };

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
        const yStart = yFromAngle(circleR, angle);
        const yEnd = yFromAngle((circleR - length), angle);
        const xStart = xFromAngle(circleR, angle);
        const xEnd = xFromAngle((circleR - length), angle);

        return {xStart: xStart + circleX, xEnd: xEnd + circleX, yStart: yStart + circleY, yEnd: yEnd + circleY};
    };

    let drawTicks = function () {
        const currentFg = g.getColor();
        for (let i = 240; i <= 300; i += 2.5) {
            // draw hour ticks
            let length = 8;
            if (i % 5 === 0) {
                length = 15;
            }
            if (i >= 285) {
                g.setColor(1, 0, 0);
            }
            drawCircleLine(createCircleLine(centerX, yHourTickOffset, tickRadius, i, length));

            // draw minute ticks
            let minLength = 8;
            if (i % 15 === 0) {
                minLength = 15;
            }
            if (i % 5 === 0) {
                drawCircleLine(createCircleLine(centerX, yMinuteTickOffset, tickRadius, i, minLength));
            }
        }
        g.setColor(currentFg);
    };

    let drawMarker = function () {
        const date = new Date();
        let hourMarker = ["6", "9", "12", "15", "18"];
        const minuteMarker = ["0", "15", "30", "45", "60"];
        const angles = [240, 255, 270, 285, 300];
        if (date.getHours() < 6 || date.getHours() > 17) {
            hourMarker = ["18", "21", "0", "3", "6"];
        }
        for (let i = 0; i < angles.length; i++) {
            // draw hour marker
            const xH = xFromAngle((tickRadius - 22), angles[i]) + centerX;
            const yH = yFromAngle((tickRadius - 22), angles[i]) + yHourTickOffset;
            g.setFontAlign(0, 0);
            g.drawString(hourMarker[i], xH, yH);
            // draw minute marker
            const xM = xFromAngle((tickRadius - 22), angles[i]) + centerX;
            const yM = yFromAngle((tickRadius - 22), angles[i]) + yMinuteTickOffset;
            g.setFontAlign(0, 0);
            g.drawString(minuteMarker[i], xM, yM);
        }
    };

    let drawTime = function () {
        const date = new Date();
        const hour = date.getHours();
        const minutesOffset = Math.floor(date.getMinutes() / 12);
        const hourOffset = (hour - 6) * 5;
        const handOffset = 240 + hourOffset + minutesOffset;
        drawCircleLine(createCircleLine(centerX, yHourTickOffset, tickRadius - 22, handOffset, 38));
        const min = date.getMinutes() + 240;
        drawCircleLine(createCircleLine(centerX, yMinuteTickOffset, tickRadius - 22, min, 38));

        queueDrawTime();
    };

    g.clear();
    // do once
    drawTicks();
    drawMarker();
    drawTime();

    Bangle.setUI(
        {
            mode: "clock",
            remove: function () {
                if (drawTimeout) clearTimeout(drawTimeout);
            }
        }
    );

    Bangle.loadWidgets();
    require("widget_utils").show();
}
