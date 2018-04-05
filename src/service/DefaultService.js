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

  const AWS = require('aws-sdk');
  const s3 = new AWS.S3({
    region: 'eu-central-1'
  });
  const awsOptions = {
    Bucket: 'cozyo-assessment-test',
    Key: '000001_FloorLamp_0001.FBX',
  };

  const path = require('path');
  const appDir = path.dirname(require.main.filename);
  const pathToLocalFbxFile = appDir + '/assets/FloorLamp.fbx';
  const fs = require('fs');

  return new Promise(function (resolve, reject) {

    var downloadSucceded = true;
    var file = fs.createWriteStream(pathToLocalFbxFile, {
      encoding: 'utf16le'
    });

    s3.getObject(awsOptions)
      .on('error', function (err) {
        downloadSucceded = false;
        resolve();
      })
      .on('httpData', function (chunk) {
        file.write(chunk);
      })
      .on('httpDone', function () {
        file.end();
      })
      .on('complete', function () {

        if (!downloadSucceded) {
          resolve();
          return;
        }

        var THREE = require('three');
        var FBXLoader = require('../fbx-reader/fbxReader.js');
        var loader = new CustomFBXLoader();
        var scene = new THREE.Scene();
        fs.readFile(pathToLocalFbxFile, null, function (err, nb) {

          var ab = nb.buffer;
          // console.log(ab); // all is well
          // console.log(new Uint8Array(ab)); // all is well

          var object3d = loader.parse(ab);
        });

        // do stuff with data
        var examples = {
          'application/json': {
            "ItemList": [{
              "Quaternion": {
                "rotationw": 5.962134,
                "rotationx": 0.8008282,
                "rotationy": 6.0274563,
                "rotationz": 1.4658129
              },
              "Position": {
                "x": 5.637377,
                "y": 2.302136,
                "z": 7.0614014
              },
              "item_url": "item_url",
              "item_name": "item_name"
            }, {
              "Quaternion": {
                "rotationw": 5.962134,
                "rotationx": 0.8008282,
                "rotationy": 6.0274563,
                "rotationz": 1.4658129
              },
              "Position": {
                "x": 5.637377,
                "y": 2.302136,
                "z": 7.0614014
              },
              "item_url": "item_url",
              "item_name": "item_name"
            }]
          }
        };

        resolve(examples['application/json']);

      })
      .send();


  });
}