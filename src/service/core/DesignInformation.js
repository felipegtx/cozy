"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const AwsS3Controller_1 = require("./aws/AwsS3Controller");
const CozyFS_1 = require("./io/CozyFS");
const DesignInformationResult_1 = require("./DesignInformationResult");
const DesignInformationResultItem_1 = require("./DesignInformationResultItem");
const Point_1 = require("./Point");
const ThreeJsController_1 = require("./ThreeJs/ThreeJsController");
const appDir = path.dirname(require.main.filename);
class DesignInformation {
    constructor(configuration, awsController = new AwsS3Controller_1.AwsS3Controller(), fsController = new CozyFS_1.CozyFS(), geometryController = new ThreeJsController_1.ThreeJsController(), totalItemsToLoad = 10) {
        this.configuration = configuration;
        this.awsController = awsController;
        this.fsController = fsController;
        this.geometryController = geometryController;
        this.totalItemsToLoad = totalItemsToLoad;
    }
    getObject() {
        return new Promise((resolve, reject) => {
            this.awsController.getObject(this.configuration, (pathToLocalFbxFile, targetPath) => {
                this.fsController.readFile(pathToLocalFbxFile, null, (err, nb) => {
                    let bufferData = nb.buffer;
                    var box = this.geometryController.loadFrom(bufferData, this.totalItemsToLoad);
                    let objectWidth = box.width();
                    let midPoint = box.max.x;
                    let totalSpaceRequired = (objectWidth * 10);
                    let spaceOnEachSide = (totalSpaceRequired / 2);
                    let data = new Array();
                    for (var i = -spaceOnEachSide; i < spaceOnEachSide; i += objectWidth) {
                        data.push(new DesignInformationResultItem_1.DesignInformationResultItem(new Point_1.Point(i + midPoint, 0, 0), targetPath, this.configuration.key));
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