let mongoose = require('mongoose');
let User = require('../models/user.model');

function getUsers(req, res) {
    User.find({}, function(err, list) {
        if(err) {
            res.send(err);
        } else {
            res.json(list);
        }   
    });
}

function postUser(req, res) {
    var newUser = new User(req.body);
    newUser.save(function(err) {
        if(err) {
            res.send(err);
        } else {
            res.json(newUser);
        }   
    });
}

function getUser(req, res) {
    User.findById(req.params.id, (err, user) => {
        if(err) {
            res.send(err);
        } else {
            res.json(user);
        }   
    });     
}

function updateUser(req, res) {
    User.findById({_id: req.params.id}, (err, user) => {
        if(err) res.send(err);
        
        Object.assign(user, req.body).save((err, user) => {
            if(err) {
                res.send(err);
            } else {
                res.json({ message: 'User successfully updated!', user });
            }
            
        }); 
    });
}

module.exports = { getUsers, postUser, getUser, updateUser };