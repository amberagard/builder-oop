'use strict';

//var items = global.nss.db.collection('items');
// var Mongo = require('mongodb');
// var _ = require('lodash');

class Item {
    constructor(type) {
        this.type = type;

        switch(type) {
        case 'autogrow':
            this.cost = 50000;
            this.image = '/img/autogrow.gif';
            break;
        }
    }
}

module.exports = Item;
