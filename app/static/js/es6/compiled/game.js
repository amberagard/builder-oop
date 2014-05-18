var audioChop,
    audioBeanStalk,
    audioDead;
function ajax(url, type) {
  'use strict';
  var data = arguments[2] !== (void 0) ? arguments[2] : {};
  var success = arguments[3] !== (void 0) ? arguments[3] : (function(r) {
    return console.log(r);
  });
  var dataType = arguments[4] !== (void 0) ? arguments[4] : 'html';
  $.ajax({
    url: url,
    type: type,
    dataType: dataType,
    data: data,
    success: success
  });
}
function plant() {
  'use strict';
  var userId = $('#user').attr('data-id');
  ajax('/trees/plant', 'post', {userId: userId}, (function(h) {
    $('#forest').append(h);
  }));
}
function root() {
  'use strict';
  var tree = $(this).closest('.tree');
  var treeId = tree.attr('data-id');
  ajax(("/trees/" + treeId + "/root"), 'put', null, (function(h) {
    $('#forest').append(h);
  }));
  tree.remove();
}
(function() {
  'use strict';
  $(document).ready(initialize);
  function initialize() {
    $('#login').click(login);
    $('#dashboard').on('click', '#plant', plant);
    $('#dashboard').on('click', '#getforest', forest);
    $('#forest').on('click', '.grow', grow);
    $('#forest').on('click', '.adult .chop', chop);
    $('#dashboard').on('click', '#exchange', exchange);
    $('#dashboard').on('click', '#purchase-autogrow', purchaseAutogrow);
    $('#dashboard').on('click', '#purchase-autoseed', purchaseAutoseed);
    $('#dashboard').on('click', '#purchase-autoroot', purchaseAutoroot);
    $('#forest').on('click', '.dead', root);
    preloadAssests();
  }
  function items() {
    var userId = $('#user').attr('data-id');
    ajax(("/items?userId=" + userId), 'get', null, (function(h) {
      $('#items-item').empty().append(h);
    }));
  }
  function purchaseAutoroot() {
    var userId = $('#user').attr('data-id');
    ajax(("/users/" + userId + "/purchase/autoroot"), 'put', null, (function(h) {
      $('#dashboard').empty().append(h);
      items();
    }));
  }
  function purchaseAutoseed() {
    var userId = $('#user').attr('data-id');
    ajax(("/users/" + userId + "/purchase/autoseed"), 'put', null, (function(h) {
      $('#dashboard').empty().append(h);
      items();
    }));
  }
  function purchaseAutogrow() {
    var userId = $('#user').attr('data-id');
    ajax(("/users/" + userId + "/purchase/autogrow"), 'put', null, (function(h) {
      $('#dashboard').empty().append(h);
      items();
    }));
  }
  function preloadAssests() {
    audioChop = $('<audio>')[0];
    audioChop.src = '/audios/chopping.mp3';
    audioBeanStalk = $('<audio>')[0];
    audioBeanStalk.src = '/audios/newsintro.mp3';
    audioDead = $('<audio>')[0];
    audioDead.src = '/audios/boo.mp3';
  }
  function exchange() {
    var userId = $('#user').attr('data-id');
    var amount = $('#wood-amt').val();
    ajax(("/users/" + userId + "/exchange"), 'put', {amount: amount}, (function(h) {
      $('#dashboard').empty().append(h);
    }));
  }
  function grow() {
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(("/trees/" + treeId + "/grow"), 'put', null, (function(h) {
      tree.replaceWith(h);
      if ($(h).hasClass('beanstalk')) {
        audioBeanStalk.play();
      }
      if ($(h).hasClass('dead')) {
        audioDead.play();
      }
    }));
  }
  function chop() {
    audioChop.play();
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    var userId = $('#user').attr('data-id');
    ajax(("/trees/" + treeId + "/chop/" + userId), 'put', null, (function(h) {
      tree.replaceWith(h);
      dashboard();
    }));
  }
  function dashboard() {
    var userId = $('#user').attr('data-id');
    ajax(("/users/" + userId), 'get', null, (function(h) {
      $('#dashboard').empty().append(h);
    }));
  }
  function forest() {
    var userId = $('#user').attr('data-id');
    ajax(("/trees?userId=" + userId), 'get', null, (function(h) {
      $('#forest').empty().append(h);
    }));
  }
  function login() {
    var username = $('#username').val();
    ajax('/login', 'post', {username: username}, (function(h) {
      $('#dashboard').empty().append(h);
      forest();
      items();
    }));
  }
})();

//# sourceMappingURL=game.map
