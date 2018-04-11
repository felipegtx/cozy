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
  const fbxLocalFileName = "FloorLamp.fbx";
  const pathToLocalFbxFile = appDir + '/assets/' + fbxLocalFileName;
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
      .on('complete', function (fullResponse) {

        if (!downloadSucceded) {
          resolve();
          return;
        }

        const endpointInfo = fullResponse.request.httpRequest.endpoint;
        fs.readFile(pathToLocalFbxFile, null, function (err, nb) {

          const THREE = require('three');
          const CustomFBXLoader = require('../fbx-reader/fbxReader.js');
          const loader = new CustomFBXLoader();
          const scene = new THREE.Scene();
          const bufferData = nb.buffer;
          const object3d = loader.parse(bufferData);
          const box = new THREE.Box3().setFromObject(object3d);
          const objectWidth = (Math.abs(box.min.x) + box.max.x);
          const totalSpaceRequired = (objectWidth * 10);
          const spaceOnEachSide = (totalSpaceRequired / 2);

          var resultData = [];
          for (var i = -spaceOnEachSide; i < spaceOnEachSide; i += objectWidth) {
            resultData.push({
              "Position": {
                "x": i,
                "y": 0,
                "z": 0
              },
              "item_url": endpointInfo.href + awsOptions.Bucket + "/" + awsOptions.Key,
              "item_name": awsOptions.Key
            });
          }
          resolve({
            "ItemList": resultData
            // ,"SceneDetails": {
            //   "objectWidth": objectWidth,
            //   "totalSpaceRequired": totalSpaceRequired,
            //   "spaceOnEachSide": spaceOnEachSide
            // }
          });

        });

      })
      .send();


  });
}