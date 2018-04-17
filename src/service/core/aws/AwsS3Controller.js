"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const AWSS3OkGetObjectResult_1 = require("./AWSS3OkGetObjectResult");
const appDir = path.dirname(require.main.filename);
class AwsS3Controller {
    getObject(configuration) {
        return new Promise((ok, reject) => {
            let targetPath = '/assets/';
            let pathToLocalFbxFile = appDir + targetPath + configuration.key;
            let s3 = new AWS.S3({ region: configuration.region });
            var downloadSucceded = true;
            var file = fs.createWriteStream(pathToLocalFbxFile, { encoding: 'utf16le' });
            s3.getObject(configuration.getAwsOptions())
                .on('error', (err) => {
                downloadSucceded = false;
                reject(err);
            })
                .on('httpData', (chunk) => {
                file.write(chunk);
            })
                .on('httpDone', () => {
                file.end();
            })
                .on('complete', (fullResponse) => {
                if (!downloadSucceded) {
                    reject("Nok");
                    return;
                }
                ok(new AWSS3OkGetObjectResult_1.AwsS3OkGetObjectResult(pathToLocalFbxFile, targetPath));
            })
                .send();
        });
    }
}
exports.AwsS3Controller = AwsS3Controller;
//# sourceMappingURL=AwsS3Controller.js.map