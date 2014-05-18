'use strict';

class Item {
    constructor(type) {
        this.type = type;

        switch(type) {
        case 'autogrow':
            this.cost = 50000;
            this.image = '/img/autogrow.gif';
            break;
        case 'autoseed':
            this.cost = 75000;
            this.image = '/img/autoseed.gif';
            break;
        case 'autoroot':
            this.cost = 85000;
            this.image = '/img/autoroot.gif';
            break;
        case 'basichouse':
            this.cost = 100000;
            this.image = '/img/basichouse.png';
            break;
        case 'mansion':
            this.cost = 500000;
            this.image = 'img/mansion.jpg';
            break;
        case 'castle':
            this.cost = 1000000;
            this.image = '/img/castle.jpg';
            break;
        }
    }
}

module.exports = Item;
