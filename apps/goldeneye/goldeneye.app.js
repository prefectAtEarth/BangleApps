{
  require("Font7x11Numeric7Seg").add(Graphics);

  let drawTimeoutMin;
  let drawTimeoutSec;

  // 60000 -> 1/minute
  // 1000 -> 1/second
  let queueDrawMinutes = function () {
    if (drawTimeoutMin) clearTimeout(drawTimeoutMin);
    drawTimeoutMin = setTimeout(function () {
      drawTimeoutMin = undefined;
      drawMinutes();
    }, 60000 - (Date.now() % 60000));
  };

  let queueDrawSeconds = function () {
    if (drawTimeoutSec) clearTimeout(drawTimeoutSec);
    drawTimeoutSec = setTimeout(function () {
      drawTimeoutSec = undefined;
      drawSeconds();
    }, 1000 - (Date.now() % 1000));
  };

  let drawTime = function() {
    queueDrawMinutes();
    queueDrawSeconds();
  };

  let drawMinutes = function() {
    let d = new Date();
    print("draw time: " + d.getMinutes() + ":" + "??");
    queueDrawMinutes();
  };

  let drawSeconds = function() {
    let d = new Date();
    print("draw seconds: " + "??" + ":" + d.getSeconds());
    queueDrawSeconds();
  };

  g.clear();
  drawTime();

  Bangle.setUI(
    {
      mode: "clock",
      remove: function () {
        if (drawTimeout) clearTimeout(drawTimeout);
        require("widget_utils").show();
      }
    }
  );

  Bangle.loadWidgets();
  require("widget_utils").swipeOn();
}
