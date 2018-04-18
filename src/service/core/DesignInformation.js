"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const AwsS3Controller_1 = require("./aws/AwsS3Controller");
const DesignInformationResult_1 = require("./DesignInformationResult");
const DesignInformationResultItem_1 = require("./DesignInformationResultItem");
const Point_1 = require("./Point");
const ThreeJsController_1 = require("./threeJs/ThreeJsController");
const appDir = path.dirname(require.main.filename);
class DesignInformation {
    constructor(configuration, awsController = new AwsS3Controller_1.AwsS3Controller(), geometryController = new ThreeJsController_1.ThreeJsController()) {
        this.configuration = configuration;
        this.awsController = awsController;
        this.geometryController = geometryController;
    }
    getObject(totalItemsToLoad = 10) {
        let targetPath = "";
        return this.awsController.getObject(this.configuration)
            /// Gather geometry information from the file we just downloaded from AWS
            .then(result => {
            let pathToLocalFbxFile = result.pathToLocalFbxFile;
            targetPath = result.targetPath;
            return this.geometryController.loadFrom(pathToLocalFbxFile);
        })
            /// Build the response information with the data we're expecting from the API
            .then(box => {
            let objectWidth = box.width();
            let midPoint = box.max.x;
            let totalSpaceRequired = (objectWidth * totalItemsToLoad);
            let spaceOnEachSide = (totalSpaceRequired / 2);
            let data = new Array();
            for (var i = -spaceOnEachSide; i < spaceOnEachSide; i += objectWidth) {
                data.push(new DesignInformationResultItem_1.DesignInformationResultItem(new Point_1.Point(i + midPoint, 0, 0), targetPath, this.configuration.key));
            }
            return new DesignInformationResult_1.DesignInformationResult(data);
        })
            .catch(e => {
            console.error(e);
            return null;
        });
    }
}
exports.DesignInformation = DesignInformation;
//# sourceMappingURL=DesignInformation.js.map