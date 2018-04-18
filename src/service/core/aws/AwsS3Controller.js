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
            if (pathToLocalFbxFile in AwsS3Controller.downloadedFiles) {
                ok(new AWSS3OkGetObjectResult_1.AwsS3OkGetObjectResult(pathToLocalFbxFile, targetPath));
                return;
            }
            let s3 = new AWS.S3({ region: configuration.region });
            var file = fs.createWriteStream(pathToLocalFbxFile, { encoding: 'utf16le' });
            var downloadSucceded = true;
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
                AwsS3Controller.downloadedFiles.add(pathToLocalFbxFile);
                ok(new AWSS3OkGetObjectResult_1.AwsS3OkGetObjectResult(pathToLocalFbxFile, targetPath));
            })
                .send();
        });
    }
}
AwsS3Controller.downloadedFiles = new Set();
exports.AwsS3Controller = AwsS3Controller;
//# sourceMappingURL=AwsS3Controller.js.map