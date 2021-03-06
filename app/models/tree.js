'use strict';

var trees = global.nss.db.collection('trees');
var Mongo = require('mongodb');
var _ = require('lodash');

class Tree {
    constructor(userId) {
        this.userId = userId;
        this.height = 0;
        this.isHealthy = true;
        this.isChopped = false;
    }

    save(fn) {
        trees.save(this, ()=>fn());
    }

    grow() {
        var max = this.isAdult ? this.height * 0.10 : 2;
        this.height += _.random(0, max, true);

        var min = this.isAdult ? 200 - ((this.height/12)*0.10) : 200;
        min = min < 10 ? 10 : min;

        var rnd = _.random(0, min, true);
        this.isHealthy = rnd > 1;
    }

    chop(user) {
        user.wood += this.height / 2;
        this.height = 0;
        this.isHealthy = false;
        this.isChopped = true;
    }

    get isAdult() {
        return this.height >= 48;
    }

    get isGrowable() {
        return this.isHealthy && !this.isBeanStalk;
    }

    get isChoppable() {
        return this.isAdult && this.isHealthy && !this.isBeanStalk;
    }

    get isBeanStalk() {
        return (this.height / 12) >= 10000;
    }

    get classes() {
        var classes = [];

        if(this.height === 0) {
            classes.push('seed');
        } else if(this.height < 24) {
            classes.push('sapling');
        } else if(!this.isAdult) {
            classes.push('treenager');
        } else {
            classes.push('adult');
        }

        if(!this.isHealthy) {
            classes.push('dead');
        } else {
            classes.push('alive');
        }

        if(this.isChopped) {
            classes.push('chopped');
        }

        if(this.isBeanStalk) {
            classes.push('beanstalk');
        }

        return classes.join(' ');
    }

    static deleteByTreeId(treeId, fn) {
        treeId = Mongo.ObjectID(treeId);
        trees.remove({_id:treeId}, (e, tree)=>{
            fn(tree);
        });
    }

    static findByTreeId(treeId, fn) {
        treeId = Mongo.ObjectID(treeId);
        trees.findOne({_id:treeId}, (e, tree)=>{
            tree = _.create(Tree.prototype, tree);
            fn(tree);
        });
    }

    static plant(userId, fn) {
        userId = Mongo.ObjectID(userId);
        // users.findOne({_id:userId}, (e, user)=>{
        var tree = new Tree(userId);
        trees.save(tree, ()=>fn(tree));
    }

    static findAllByUserId(userId, fn) {
        userId = Mongo.ObjectID(userId);
        trees.find({userId:userId}).toArray((e,objs)=>{
            var forest = objs.map(o=>_.create(Tree.prototype, o));
            fn(forest);
        });
    }
}

module.exports = Tree;
