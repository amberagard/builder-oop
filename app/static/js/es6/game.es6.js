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
    }

    function grow() {
        var tree = $(this).closest('.tree');
        var treeId = tree.attr('data-id');
        ajax(`/trees/${treeId}/grow`, 'put', null, h=> {
            tree.replaceWith(h);
        });
    }

    function chop() {
        var tree = $(this).closest('.tree');
        var treeId = tree.attr('data-id');
        var userId = $('#user').attr('data-id');
        ajax(`/trees/${treeId}/chop`, 'put', null, h=>{
            tree.replaceWith(h);
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
