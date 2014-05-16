/* jshint unused:false */

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
        $('#dashboard').on('click', '#autogrow', autogrow);
        preloadAssests();
    }

    function autogrow() {
        var userId = $('#user').attr('data-id');
        ajax(`/users/${userId}/purchase/autogrow`, 'put', null, h=>{
            $('#dashboard').empty().append(h);
        });
    }

    var audioChop, audioBeanStalk, audioDead;

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

    function plant() {
        var userId = $('#user').attr('data-id');
        ajax('/trees/plant', 'post', {userId:userId}, h=>{
            $('#forest').append(h);
        });
    }

    function login() {
        var username = $('#username').val();
        ajax('/login', 'post', {username:username}, h =>{
            $('#dashboard').empty().append(h);
        });
    }

    function ajax(url, type, data={}, success=r=>console.log(r), dataType='html') {
        $.ajax({
            url:url,
            type:type,
            dataType:dataType,
            data:data,
            success:success
        });
    }



})();
