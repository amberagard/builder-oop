/* global ajax, audioBeanStalk, audioDead */

(function() {
    'use strict';

    initialize();

    function initialize() {
        $('#autogrow').click(grow);
        slider();
    }

    var isOn = false;
    var timer;

    function slider() {
        $('#slider-connect').noUiSlider({
            start: 0,
            connect: 'lower',
            range: {
              'min': 0,
              'max': 1000
             }
         });
    }

    function grow() {
        isOn = !isOn;
        $('#autogrow').toggleClass('on');

        if(isOn) {
            start();
        } else {
            clearInterval(timer);
        }
    }

    function start() {
        clearInterval(timer);
        timer = setInterval(growing, 1000);
    }

    function growing() {
        $('.alive:not(.beanstalk)').map((i,d)=>$(d).attr('data-id')).each((i,v)=>{
                var tree = $(`.tree[data-id=${v}]`);
                ajax(`/trees/${v}/grow`, 'put', null, h=> {
                    tree.replaceWith(h);
                    if($(h).hasClass('beanstalk')) {
                        audioBeanStalk.play();
                    }
                    if($(h).hasClass('dead')) {
                        audioDead.play();
                    }
                });
        });

    }


})();
