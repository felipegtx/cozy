'use strict';


/**
 * Gets a design for a specified user
 * Returns a design
 *
 * user_id Long ID of user to return
 * budget String  (optional)
 * room_type String  (optional)
 * limit Long Limit the number of items to use in the prediction (optional)
 * returns ItemMetaList
 **/
exports.getDesignByUserId = function(user_id,budget,room_type,limit) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "ItemList" : [ {
    "Quaternion" : {
      "rotationw" : 5.962134,
      "rotationx" : 0.8008282,
      "rotationy" : 6.0274563,
      "rotationz" : 1.4658129
    },
    "Position" : {
      "x" : 5.637377,
      "y" : 2.302136,
      "z" : 7.0614014
    },
    "item_url" : "item_url",
    "item_name" : "item_name"
  }, {
    "Quaternion" : {
      "rotationw" : 5.962134,
      "rotationx" : 0.8008282,
      "rotationy" : 6.0274563,
      "rotationz" : 1.4658129
    },
    "Position" : {
      "x" : 5.637377,
      "y" : 2.302136,
      "z" : 7.0614014
    },
    "item_url" : "item_url",
    "item_name" : "item_name"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

