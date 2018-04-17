import { IAwsS3Controller } from "./IAwsS3Controller";
import { AwsConfiguration } from "./AwsConfiguration";
import * as AWS from "aws-sdk";
import * as fs from "fs";
import * as path from "path";
import { AwsS3OkGetObjectResult } from "./AWSS3OkGetObjectResult";

const appDir = path.dirname(require.main.filename);

export class AwsS3Controller implements IAwsS3Controller {
    getObject(configuration: AwsConfiguration): Promise<AwsS3OkGetObjectResult> {
        return new Promise<AwsS3OkGetObjectResult>((ok, reject) => {
            let targetPath = '/assets/';
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
                    ok(new AwsS3OkGetObjectResult(pathToLocalFbxFile, targetPath));

                })
                .send();
        });
    }
}