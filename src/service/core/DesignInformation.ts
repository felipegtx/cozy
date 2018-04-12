
import * as path from "path";
import * as fs from "fs";
import * as AWS from "aws-sdk";
import { AwsConfiguration } from "./AwsConfiguration";

const appDir = path.dirname(require.main.filename);

export class DesignInformation {
    constructor(readonly configuration: AwsConfiguration) {
    }

    getObject(): Promise<DesignInformationResult> {
        return new Promise<DesignInformationResult>((resolve, reject) => {

            let pathToLocalFbxFile = appDir + '/assets/' + this.configuration.targetFileName;
            let s3 = new AWS.S3({ region: this.configuration.region });

            var downloadSucceded: boolean = true;
            var file = fs.createWriteStream(pathToLocalFbxFile, { encoding: 'utf16le' });
            s3.getObject(this.configuration.getAwsOptions())
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
                        resolve();
                        return;
                    }

                    const endpointInfo = fullResponse["request"].httpRequest.endpoint;
                    fs.readFile(pathToLocalFbxFile, null, (err, nb) => {

                        const THREE = require('three');
                        const CustomFBXLoader = require('../../fbx-reader/fbxReader.js');
                        const loader = new CustomFBXLoader();
                        const scene = new THREE.Scene();
                        const bufferData = nb.buffer;
                        const object3d = loader.parse(bufferData);
                        const box = new THREE.Box3().setFromObject(object3d);
                        const objectWidth = (Math.abs(box.min.x) + box.max.x);
                        const totalSpaceRequired = (objectWidth * 10);
                        const spaceOnEachSide = (totalSpaceRequired / 2);

                        let data = new Array<DesignInformationResultItem>();
                        for (var i = -spaceOnEachSide; i < spaceOnEachSide; i += objectWidth) {
                            data.push(new DesignInformationResultItem(new Point(i, 0, 0),
                                endpointInfo.href + this.configuration.bucket + "/" + this.configuration.key,
                                this.configuration.key));
                        }
                        let result = new DesignInformationResult(data);
                        resolve(result);
                        return result;
                    });
                })
                .send();
        });
    }
}

class DesignInformationResult {
    constructor(readonly ItemList: Array<DesignInformationResultItem>) { }
}

class DesignInformationResultItem {
    constructor(readonly Position: Point, readonly item_url: string, readonly item_name: string) {
    }
}

class Point {
    constructor(readonly x: number, readonly y: number, readonly z: number) { }
}