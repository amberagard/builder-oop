(function() {
  'use strict';
  initialize();
  function initialize() {
    $('#autoroot').click(root);
  }
  var isOn = false;
  var timer;
  function root() {
    isOn = !isOn;
    $('#autoroot').toggleClass('on');
    if (isOn) {
      start();
    } else {
      clearInterval(timer);
    }
  }
  function start() {
    clearInterval(timer);
    timer = setInterval(rooting, 1000);
  }
  function rooting() {
    var trees = $('.alive:not(.beanstalk)').length;
    if (trees < 50) {
      plant();
    }
  }
})();

//# sourceMappingURL=autoroot.map
