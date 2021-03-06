/**
 * This module is meant to house all of the API
 * routes that pertain to theme settings
 */
let express = require('express');
let Theme = require('../../models/Theme');

/*********************** THEME TEMPLATE ROUTES ***********************/
module.exports.template = {};

module.exports.template.use = function(req, res, next) {
    // do logging
    console.log('Intializing.....');
    if (!req) console.log('Request is null');
    if (!res) console.log('Response is null');
    next();
};

module.exports.template.create = function(req, res) {
    let theme = new Theme();
    theme.user_id = req.params.user_id; //company or user id
    theme.form_color = "default";
    theme.background_img = "default";
    theme.displayPhone = false;
    theme.displayClock = false;
    theme.displaySignature = false;
    theme.additionalComments = false;

    theme.save(function(err) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(theme);
    });

};

module.exports.template.get = function(req, res) {
    Theme.findOne({
        user_id: req.params.user_id
    }, function(err, theme) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(theme);
    });
};

function updateFields(req, theme) {
    if (req.body.form_color) theme.form_color = req.body.form_color;
    if (req.body.background_img) theme.background_img = req.body.background_img;
    if (req.body.displayPhone) theme.displayPhone = req.body.displayPhone;
    if (req.body.displayClock) theme.displayClock = req.body.displayClock;
    if (req.body.displaySignature) theme.displaySignature = req.body.displaySignature;
    if (req.body.additionalComments) theme.additionalComments = req.body.additionalComments;
}

module.exports.template.update = function(req, res) {

    Theme.findOne({
        user_id: req.params.user_id
    }, function(err, theme) {

        if (err) {
            res.status(400).send(err);
        }
        theme.user_id = req.params.user_id; //company or user id
        updateFields(req, theme);

        theme.save(function(err) {
            if (err) {
                res.status(400).send(err);
            }
            res.status(200).json(theme);
        });

    });
};

module.exports.template.delete = function(req, res) {

    Theme.remove({
        user_id: req.params.user_id
    }, function(err) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json({msg: "OK"});
    });


};
