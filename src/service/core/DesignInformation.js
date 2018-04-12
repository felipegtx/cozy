"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const THREE = require("three");
const CustomFBXLoader = require("../../fbx-reader/fbxReader.js");
const AwsS3Controller_1 = require("./aws/AwsS3Controller");
const CozyFS_1 = require("./io/CozyFS");
const DesignInformationResult_1 = require("./DesignInformationResult");
const DesignInformationResultItem_1 = require("./DesignInformationResultItem");
const Point_1 = require("./Point");
const appDir = path.dirname(require.main.filename);
class DesignInformation {
    constructor(configuration, awsController = new AwsS3Controller_1.AwsS3Controller(), fsController = new CozyFS_1.CozyFS()) {
        this.configuration = configuration;
        this.awsController = awsController;
        this.fsController = fsController;
    }
    getObject() {
        return new Promise((resolve, reject) => {
            this.awsController.getObject(this.configuration, (endpointInfo, pathToLocalFbxFile) => {
                this.fsController.readFile(pathToLocalFbxFile, null, (err, nb) => {
                    let bufferData = nb.buffer;
                    let loader = new CustomFBXLoader();
                    let object3d = loader.parse(bufferData);
                    let box = new THREE.Box3().setFromObject(object3d);
                    let objectWidth = (Math.abs(box.min.x) + box.max.x);
                    let totalSpaceRequired = (objectWidth * 10);
                    let spaceOnEachSide = (totalSpaceRequired / 2);
                    let data = new Array();
                    for (var i = -spaceOnEachSide; i < spaceOnEachSide; i += objectWidth) {
                        data.push(new DesignInformationResultItem_1.DesignInformationResultItem(new Point_1.Point(i, 0, 0), endpointInfo + this.configuration.bucket + "/" + this.configuration.key, this.configuration.key));
                    }
                    let result = new DesignInformationResult_1.DesignInformationResult(data);
                    resolve(result);
                    return result;
                });
            }, err => { reject(err); });
        });
    }
}
exports.DesignInformation = DesignInformation;
//# sourceMappingURL=DesignInformation.js.map