
/*
 * GET recipes.
 */

exports.list = function(req, res){
  res.json({ message: 'A list of recipes is coming' });
};

exports.create = function(req, res) {
  res.json({ message: 'Creating a recipe' });
};


/**
* GET
*/
exports.show = function (req, res, next) {
  res.json({ message: 'Showing a recipe' });
};

/**
* PUT
*/
exports.edit = function (req, res, next) {
  res.json({ message: 'Updating a recipe' });
};

/**
* DELETE
*/
exports.del = function (req, res, next) {
  res.json({ message: 'Deleting a recipe' });
};
