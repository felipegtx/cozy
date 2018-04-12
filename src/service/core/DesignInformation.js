"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const AWS = require("aws-sdk");
const THREE = require("three");
const CustomFBXLoader = require("../../fbx-reader/fbxReader.js");
const appDir = path.dirname(require.main.filename);
class DesignInformation {
    constructor(configuration) {
        this.configuration = configuration;
    }
    getObject() {
        return new Promise((resolve, reject) => {
            let pathToLocalFbxFile = appDir + '/assets/' + this.configuration.targetFileName;
            let s3 = new AWS.S3({ region: this.configuration.region });
            var downloadSucceded = true;
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
                if (!downloadSucceded) {
                    reject();
                    return;
                }
                const endpointInfo = fullResponse["request"].httpRequest.endpoint;
                fs.readFile(pathToLocalFbxFile, null, (err, nb) => {
                    let bufferData = nb.buffer;
                    let loader = new CustomFBXLoader();
                    let object3d = loader.parse(bufferData);
                    let box = new THREE.Box3().setFromObject(object3d);
                    let objectWidth = (Math.abs(box.min.x) + box.max.x);
                    let midPoint = box.max.x;
                    let totalSpaceRequired = (objectWidth * 10);
                    let spaceOnEachSide = (totalSpaceRequired / 2);
                    let data = new Array();
                    for (var i = -spaceOnEachSide; i < spaceOnEachSide; i += objectWidth) {
                        data.push(new DesignInformationResultItem(new Point(i + midPoint, 0, 0), endpointInfo.href + this.configuration.bucket + "/" + this.configuration.key, this.configuration.key));
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
exports.DesignInformation = DesignInformation;
class DesignInformationResult {
    constructor(ItemList) {
        this.ItemList = ItemList;
    }
}
exports.DesignInformationResult = DesignInformationResult;
class DesignInformationResultItem {
    constructor(Position, item_url, item_name) {
        this.Position = Position;
        this.item_url = item_url;
        this.item_name = item_name;
    }
}
exports.DesignInformationResultItem = DesignInformationResultItem;
class Point {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
exports.Point = Point;
//# sourceMappingURL=DesignInformation.js.map