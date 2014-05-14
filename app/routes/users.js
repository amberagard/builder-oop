'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');

exports.login = (req, res)=>{
    User.login(req.body.username, user => {
        res.render('users/dashboard', {user:user});
    });
};
