/* jshint unused:false */

var audioChop, audioBeanStalk, audioDead;

function ajax(url, type, data={}, success=r=>console.log(r), dataType='html') {
    'use strict';
    $.ajax({
        url:url,
        type:type,
        dataType:dataType,
        data:data,
        success:success
    });
}

function plant() {
    'use strict';
    var userId = $('#user').attr('data-id');
    ajax('/trees/plant', 'post', {userId:userId}, h=>{
        $('#forest').append(h);
    });
}

function root() {
    'use strict';
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(`/trees/${treeId}/root`, 'put', null, h=>{
        $('#forest').append(h);
    });
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
        $('#dashboard').on('click', '#purchase-basichouse', purchaseBasicHouse);
        $('#dashboard').on('click', '#purchase-mansion', purchaseMansion);
        $('#dashboard').on('click', '#purchase-castle', purchaseCastle);
        preloadAssests();
    }

    function items() {
        var userId = $('#user').attr('data-id');
        ajax(`/items?userId=${userId}`, 'get', null, h=>{
            $('#items-item').empty().append(h);
        });
    }

    function purchaseCastle() {
        var userId = $('#user').attr('data-id');
        ajax(`/users/${userId}/purchase/castle`, 'put', null, h=>{
            $('#dashboard').empty().append(h);
            items();
        });
    }

    function purchaseMansion() {
        var userId = $('#user').attr('data-id');
        ajax(`/users/${userId}/purchase/mansion`, 'put', null, h=>{
            $('#dashboard').empty().append(h);
            items();
        });
    }

    function purchaseBasicHouse() {
        var userId = $('#user').attr('data-id');
        ajax(`/users/${userId}/purchase/basichouse`, 'put', null, h=>{
            $('#dashboard').empty().append(h);
            items();
        });
    }

    function purchaseAutoroot() {
        var userId = $('#user').attr('data-id');
        ajax(`/users/${userId}/purchase/autoroot`, 'put', null, h=>{
            $('#dashboard').empty().append(h);
            items();
        });
    }

    function purchaseAutoseed() {
        var userId = $('#user').attr('data-id');
        ajax(`/users/${userId}/purchase/autoseed`, 'put', null, h=>{
            $('#dashboard').empty().append(h);
            items();
        });
    }

    function purchaseAutogrow() {
        var userId = $('#user').attr('data-id');
        ajax(`/users/${userId}/purchase/autogrow`, 'put', null, h=>{
            $('#dashboard').empty().append(h);
            items();
        });
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
        ajax(`/users/${userId}/exchange`, 'put', {amount:amount}, h=>{
            $('#dashboard').empty().append(h);
        });
    }

    function grow() {
        var tree = $(this).closest('.tree');
        var treeId = tree.attr('data-id');
        ajax(`/trees/${treeId}/grow`, 'put', null, h=> {
            tree.replaceWith(h);
            if($(h).hasClass('beanstalk')) {
                audioBeanStalk.play();
            }
            if($(h).hasClass('dead')) {
                audioDead.play();
            }
        });
    }

    function chop() {
        audioChop.play();
        var tree = $(this).closest('.tree');
        var treeId = tree.attr('data-id');
        var userId = $('#user').attr('data-id');
        ajax(`/trees/${treeId}/chop/${userId}`, 'put', null, h=>{
            tree.replaceWith(h);
            dashboard();
        });
    }

    function dashboard() {
        var userId = $('#user').attr('data-id');
        ajax(`/users/${userId}`, 'get', null, h=>{
            $('#dashboard').empty().append(h);
        });
    }

    function forest() {
        var userId = $('#user').attr('data-id');
        ajax(`/trees?userId=${userId}`, 'get', null, h=>{
            $('#forest').empty().append(h);
        });
    }

    function login() {
        var username = $('#username').val();
        ajax('/login', 'post', {username:username}, h =>{
            $('#dashboard').empty().append(h);
            forest();
            items();
        });
    }
})();
