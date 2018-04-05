'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.getDesignByUserId = function getDesignByUserId(req, res, next) {
  
  var user_id = req.swagger.params['user_id'].value;
  var budget = req.swagger.params['budget'].value;
  var room_type = req.swagger.params['room_type'].value;
  var limit = req.swagger.params['limit'].value;

  Default.getDesignByUserId(user_id, budget, room_type, limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });

};