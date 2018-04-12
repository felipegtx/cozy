"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const THREE = require("three");
const CustomFBXLoader = require("../../fbx-reader/fbxReader.js");
const AwsS3Controller_1 = require("./aws/AwsS3Controller");
const appDir = path.dirname(require.main.filename);
class DesignInformation {
    constructor(configuration, awsController = new AwsS3Controller_1.AwsS3Controller()) {
        this.configuration = configuration;
        this.awsController = awsController;
    }
    getObject() {
        return new Promise((resolve, reject) => {
            this.awsController.getObject(this.configuration, (endpointInfo, pathToLocalFbxFile) => {
                fs.readFile(pathToLocalFbxFile, null, (err, nb) => {
                    let bufferData = nb.buffer;
                    let loader = new CustomFBXLoader();
                    let object3d = loader.parse(bufferData);
                    let box = new THREE.Box3().setFromObject(object3d);
                    let objectWidth = (Math.abs(box.min.x) + box.max.x);
                    let totalSpaceRequired = (objectWidth * 10);
                    let spaceOnEachSide = (totalSpaceRequired / 2);
                    let data = new Array();
                    for (var i = -spaceOnEachSide; i < spaceOnEachSide; i += objectWidth) {
                        data.push(new DesignInformationResultItem(new Point(i, 0, 0), endpointInfo + this.configuration.bucket + "/" + this.configuration.key, this.configuration.key));
                    }
                    let result = new DesignInformationResult(data);
                    resolve(result);
                    return result;
                });
            }, err => { reject(err); });
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