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
exports.getDesignByUserId = function (user_id, budget, room_type, limit) {
  let di = require('./core/DesignInformation');
  let awsc = require('./core/aws/AwsConfiguration');
  let awsRegion = require('./core/aws/enum/awsRegion').awsRegion;

  return new di.DesignInformation(new awsc.AwsConfiguration(
    awsRegion.EUCentral, 'cozyo-assessment-test', '000001_FloorLamp_0001.FBX'
  )).getObject();

}