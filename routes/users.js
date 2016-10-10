  // users.js
// Routes to CRUD users.

var URL = require('url');

var errors = require('../models/errors');
var User = require('../models/user');

function getUserURL(user) {
    return '/users/' + encodeURIComponent(user.username);
}

/**
 * GET /users
 */
exports.list = function (req, res, next) {
    User.getAll(function (err, users) {
        if (err) return next(err);
        res.json({ users: users });
    });
};

/**
 * POST /users {username, ...}
 */
exports.create = function (req, res, next) {
    User.create({
        username: req.body.username
    }, function (err, user) {
        if (err) {
            res.status(400).json({
              username: req.body.username,
              error: err.message,
            });
        }
        res.status(201).json({user:user});
    });
};

/**
 * GET /users/:username
 */
exports.show = function (req, res, next) {
    User.get(req.params.username, function (err, user) {
        if (err) {
          res.status(404).json({
            error: err.message,
            username: req.params.username
          });
        }
        user.getFollowingAndOthers(function (err, following, others) {
            if (err) return next(err);
            res.json({
              user: user,
              following: following,
              others: others
            });
        });
    });
};

/**
 * POST /users/:username {username, ...}
 */
exports.edit = function (req, res, next) {
    User.get(req.params.username, function (err, user) {
        if (err) {
          res.status(404).json({
            error: err.message,
            username: req.params.username
          });
        }
        user.patch(req.body, function (err) {
          if (err) {
            res.status(400).json({
              error: err.message,
              username: req.params.username
            });
          }
          res.json({user:user});
        });
    });
};

/**
 * DELETE /users/:username
 */
exports.del = function (req, res, next) {
    User.get(req.params.username, function (err, user) {
        // TODO: Gracefully handle "no such user" error somehow.
        // E.g. redirect back to /users with an info message?
        if (err) return next(err);
        user.del(function (err) {
            if (err) return next(err);
            res.redirect('/users');
        });
    });
};

/**
 * POST /users/:username/follow {otherUsername}
 */
exports.follow = function (req, res, next) {
    User.get(req.params.username, function (err, user) {
        // TODO: Gracefully handle "no such user" error somehow.
        // This is the source user, so e.g. 404 page?
        if (err) return next(err);
        User.get(req.body.otherUsername, function (err, other) {
            // TODO: Gracefully handle "no such user" error somehow.
            // This is the target user, so redirect back to the source user w/
            // an info message?
            if (err) return next(err);
            user.follow(other, function (err) {
                if (err) return next(err);
                res.redirect(getUserURL(user));
            });
        });
    });
};

/**
 * POST /users/:username/unfollow {otherUsername}
 */
exports.unfollow = function (req, res, next) {
    User.get(req.params.username, function (err, user) {
        // TODO: Gracefully handle "no such user" error somehow.
        // This is the source user, so e.g. 404 page?
        if (err) return next(err);
        User.get(req.body.otherUsername, function (err, other) {
            // TODO: Gracefully handle "no such user" error somehow.
            // This is the target user, so redirect back to the source user w/
            // an info message?
            if (err) return next(err);
            user.unfollow(other, function (err) {
                if (err) return next(err);
                res.redirect(getUserURL(user));
            });
        });
    });
};
