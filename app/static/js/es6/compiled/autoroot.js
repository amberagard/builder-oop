(function() {
  'use strict';
  initialize();
  function initialize() {
    $('#autoroot').click(rootin);
  }
  var isOn = false;
  var timer;
  function rootin() {
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
    $('.dead').map((function(i, d) {
      return $(d).attr('data-id');
    })).each((function(i, v) {
      var tree = $((".tree[data-id=" + v + "]"));
      ajax(("/trees/" + v + "/root"), 'put', null, (function(h) {
        console.log(h);
      }));
      tree.remove();
    }));
  }
})();

//# sourceMappingURL=autoroot.map
