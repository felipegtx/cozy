
import * as path from "path";
import * as fs from "fs";
import * as AWS from "aws-sdk";
import { AwsConfiguration } from "./AwsConfiguration";
import * as THREE from "three";
import * as CustomFBXLoader from "../../fbx-reader/fbxReader.js";

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
                    console.log("teste");
                    reject(err);
                })
                .on('httpData', (chunk) => {
                    file.write(chunk);
                })
                .on('httpDone', () => {
                    file.end();
                })
                .on('complete', (fullResponse) => {

                    if (!downloadSucceded) { reject(); return; }

                    const endpointInfo = fullResponse["request"].httpRequest.endpoint;
                    fs.readFile(pathToLocalFbxFile, null, (err, nb) => {

                        let bufferData = nb.buffer;
                        let loader = new CustomFBXLoader();
                        let object3d = loader.parse(bufferData);
                        let box = new THREE.Box3().setFromObject(object3d);
                        let objectWidth = (Math.abs(box.min.x) + box.max.x);
                        let totalSpaceRequired = (objectWidth * 10);
                        let spaceOnEachSide = (totalSpaceRequired / 2);

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

export class DesignInformationResult {
    constructor(readonly ItemList: Array<DesignInformationResultItem>) { }
}

export class DesignInformationResultItem {
    constructor(readonly Position: Point, readonly item_url: string, readonly item_name: string) {
    }
}

export class Point {
    constructor(readonly x: number, readonly y: number, readonly z: number) { }
}