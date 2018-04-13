import { IAwsS3Controller, AWSS3OkGetObjectFunc, AWSS3NokGetObjectFunc } from "./IAwsS3Controller";
import { AwsConfiguration } from "./AwsConfiguration";
import AWS = require("aws-sdk");
import * as fs from "fs";
import * as path from "path";

const appDir = path.dirname(require.main.filename);

export class AwsS3Controller implements IAwsS3Controller {
    getObject(configuration: AwsConfiguration, ok: AWSS3OkGetObjectFunc, reject: AWSS3NokGetObjectFunc) {

        let targetPath = '/assets/' ;
        let pathToLocalFbxFile = appDir + targetPath + configuration.key;        
        let s3 = new AWS.S3({ region: configuration.region });
        var downloadSucceded: boolean = true;
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

                if (!downloadSucceded) { reject("Nok"); return; }
                ok(pathToLocalFbxFile, targetPath);

            })
            .send();
    }
}