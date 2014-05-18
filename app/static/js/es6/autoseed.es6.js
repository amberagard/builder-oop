/* global plant */
(function() {
    'use strict';

    initialize();

    function initialize() {
        $('#autoseed').click(seed);
        //slider();
    }

    var isOn = false;
    var timer;

    function seed() {
        isOn = !isOn;
        $('#autoseed').toggleClass('on');

        if(isOn) {
            start();
        } else {
            clearInterval(timer);
        }
    }

    function start() {
        clearInterval(timer);
        timer = setInterval(seeding, 1000);
    }

    function seeding() {
        var trees = $('.alive:not(.beanstalk)').length;
        if(trees < 50) {
            plant();
        }

    }


})();
