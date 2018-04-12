
import * as path from "path";
import * as AWS from "aws-sdk";
import { AwsConfiguration } from "./AwsConfiguration";
import * as THREE from "three";
import * as CustomFBXLoader from "../../fbx-reader/fbxReader.js";
import { AwsS3Controller } from "./aws/AwsS3Controller";
import { IAwsS3Controller } from "./aws/IAwsS3Controller";
import { CozyFS } from "./io/CozyFS";

const appDir = path.dirname(require.main.filename);

export class DesignInformation {
    constructor(readonly configuration: AwsConfiguration, readonly awsController: IAwsS3Controller = new AwsS3Controller(),
        readonly fsController: CozyFS = new CozyFS()) {
    }

    getObject(): Promise<DesignInformationResult> {

        return new Promise<DesignInformationResult>((resolve, reject) => {

            this.awsController.getObject(this.configuration,
                (endpointInfo, pathToLocalFbxFile) => {
                    this.fsController.readFile(pathToLocalFbxFile, null, (err, nb) => {

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
                                endpointInfo + this.configuration.bucket + "/" + this.configuration.key,
                                this.configuration.key));
                        }
                        let result = new DesignInformationResult(data);

                        resolve(result);
                        return result;
                    });
                }, err => { reject(err); });
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