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

    // function slider() {
    //     $('#slider-connect').noUiSlider({
    //         start: 0,
    //         connect: 'lower',
    //         range: {
    //           'min': 0,
    //           'max': 1000
    //          }
    //      });
    // }

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
