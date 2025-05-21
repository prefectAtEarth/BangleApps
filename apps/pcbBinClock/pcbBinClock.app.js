var fg = g.getColor();
var bg = g.getBgColor();

// define some colours
var white = 65535;
var black = 0;
var gray = 33808;
var red = 63488;
var green = 20457;
var blue = 31;
var ledBlue = 1500;
var wfBg = 20457;
var wfBorder = 608;

var hourLedsY = 41;
var minLedsY = 112;

// hour LEDs
var hourLeds = [{
    value: 16,
    startX: 44,
    on: false
  },
  {
    value: 8,
    startX: 67,
    on: true
  },
  {
    value: 4,
    startX: 92,
    on: false
  },
  {
    value: 2,
    startX: 116,
    on: false
  },
  {
    value: 1,
    startX: 140,
    on: false
  }
];
// minute LEDs
var minLeds = [{
    value: 32,
    startX: 20,
    on: true
  },
  {
    value: 16,
    startX: 44,
    on: false
  },
  {
    value: 8,
    startX: 67,
    on: false
  },
  {
    value: 4,
    startX: 92,
    on: false
  },
  {
    value: 2,
    startX: 116,
    on: false
  },
  {
    value: 1,
    startX: 140,
    on: false
  }
];

// draw background
g.setBgColor(wfBorder);
g.clear();
g.setColor(wfBg);
g.fillRect(5, 5, 171, 171);

// solder point decoration top and bottom
function drawSolderPoint(startX) {
  g.setColor(white);
  var width = 16;
  var height = 24;
  var rad = width / 2;
  g.fillRect(startX, 5, startX + width, 5 + height - rad);
  g.fillCircle(startX + rad, 5 + height - rad, rad);
  g.fillRect(startX, 171, startX + width, 171 - height + rad);
  g.fillCircle(startX + rad, 171 - height + rad, rad);
}

// a horizontal resistor
function drawHRes(startX, startY, color) {
  g.setColor(white);
  g.fillRect(startX, startY, startX + 44, startY + 7);
  g.setColor(black);
  g.drawRect(startX, startY, startX + 44, startY + 7);
  g.setColor(color);
  g.fillRect(startX + 8, startY - 5, startX + 36, startY + 12);
  g.setColor(black);
  g.drawRect(startX + 8, startY - 5, startX + 36, startY + 12);
}

// a vertical resistor
function drawVRes(startX, startY, color) {
  g.setColor(white);
  g.fillRect(startX, startY, startX + 7, startY + 44);
  g.setColor(black);
  g.drawRect(startX, startY, startX + 7, startY + 44);
  g.setColor(color);
  g.fillRect(startX - 5, startY + 8, startX + 12, startY + 36);
  g.setColor(black);
  g.drawRect(startX - 5, startY + 8, startX + 12, startY + 36);
}


function drawLed(startX, startY, state) {
  g.setColor(white);
  // vertical solder points of leds
  g.fillRect(startX + 1, startY - 4, startX + 3, startY + 25);
  g.fillRect(startX + 6, startY - 4, startX + 8, startY + 25);
  g.fillRect(startX + 11, startY - 4, startX + 13, startY + 25);
  // horizontal solder points of leds
  g.fillRect(startX - 4, startY + 3, startX + 17, startY + 5);
  g.fillRect(startX - 4, startY + 10, startX + 17, startY + 12);
  g.fillRect(startX - 4, startY + 17, startX + 17, startY + 19);

  // led in use
  if (state == true) {
    g.setColor(ledBlue);
  } else {
    // led, not in use
    g.setColor(gray);
  }
  g.fillRect(startX, startY, startX + 14, startY + 21);

  // led border
  g.setColor(black);
  g.drawRect(startX, startY, startX + 14, startY + 21);

}

// ---- DECORATION ----
[30, 66, 99, 133].forEach(function(point) {
  drawSolderPoint(point);
});
drawHRes(50, 83, gray);

function drawLeds(leds) {
  hourLeds.map((led) => {
    drawLed(led.startX, hourLedsY, led.on);
  });
  minLeds.map((led) => {
    drawLed(led.startX, minLedsY, led.on);
  });
}

drawLeds();

// Battery low -> red, Battery ok -> black
var battery = E.getBattery();
if (battery > 20) {
  drawHRes(106, 83, green);
} else {
  drawHRes(106, 83, red);
}

// WIP
// BLE connection -> blue, no connection -> black
drawVRes(19, 44, blue);

//g.setColor(white);
//g.drawImage(atob("CxQBBgDgFgJgR4jZMawfAcA4D4NYybEYIwTAsBwDAA=="),19,44);

// reset colors;
g.setColor(fg);
g.setBgColor(bg);