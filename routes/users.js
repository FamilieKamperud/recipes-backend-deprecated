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
      if (err) {
          return res.status(400).json({
            username: req.body.username,
            error: err.message,
          });
      }
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
            return res.status(400).json({
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
          return res.status(404).json({
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
          return res.status(404).json({
            error: err.message,
            username: req.params.username
          });
        }
        user.patch(req.body, function (err) {
          if (err) {
            return res.status(400).json({
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
      if (err) {
        console.log(err);
        return res.status(404).json({
          error: err.message,
          username: req.params.username
        });
      }
      user.del(function (err) {
        if (err) {
          return res.status(400).json({
            error: err.message,
            username: req.params.username
          });
        }
        res.status(204).json();
      });
    });
};

/**
 * POST /users/:username/follow {otherUsername}
 */
exports.follow = function (req, res, next) {
    User.get(req.params.username, function (err, user) {
      if (err) {
        console.log(err);
        return res.status(404).json({
          error: err.message,
          username: req.params.username
        });
      }
      User.get(req.body.otherUsername, function (err, other) {
        if (err) {
          console.log(err);
          return res.status(404).json({
            error: err.message,
            username: req.body.otherUsername
          });
        }
        user.follow(other, function (err) {
          if (err) {
            return res.status(400).json({
              error: err.message,
              username: req.params.username,
              other: req.body.otherUsername
            });
          }
          res.json({
            follower:user,
            followed: other
          });
        });
      });
    });
};

/**
 * POST /users/:username/unfollow {otherUsername}
 */
exports.unfollow = function (req, res, next) {
  User.get(req.params.username, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(404).json({
        error: err.message,
        username: req.params.username
      });
    }
    User.get(req.body.otherUsername, function (err, other) {
      if (err) {
        console.log(err);
        return res.status(404).json({
          error: err.message,
          username: req.body.otherUsername
        });
      }
      user.unfollow(other, function (err) {
        if (err) {
          return res.status(400).json({
            error: err.message,
            username: req.params.username,
            other: req.body.otherUsername
          });
        }
        res.json({
          follower:user,
          unfollowed: other
        });
      });
      });
    });
};
