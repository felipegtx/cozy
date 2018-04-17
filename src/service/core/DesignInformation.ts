import * as path from "path";
import * as AWS from "aws-sdk";
import { AwsConfiguration } from "./aws/AwsConfiguration";
import { AwsS3Controller } from "./aws/AwsS3Controller";
import { IAwsS3Controller } from "./aws/IAwsS3Controller";
import { DesignInformationResult } from "./DesignInformationResult";
import { DesignInformationResultItem } from "./DesignInformationResultItem";
import { Point } from "./Point";
import { IGeometryController } from "./IGeometryController";
import { ThreeJsController } from "./threeJs/ThreeJsController";

const appDir = path.dirname(require.main.filename);

export class DesignInformation {
    constructor(readonly configuration: AwsConfiguration,
        readonly awsController: IAwsS3Controller = new AwsS3Controller(),
        readonly geometryController: IGeometryController = new ThreeJsController(),
        readonly totalItemsToLoad: number = 10) {
    }

    getObject(): Promise<DesignInformationResult> {

        let targetPath = "";
        return this.awsController.getObject(this.configuration)

            /// Gather geometry information from the file we just downloaded from AWS
            .then(result => {
                let pathToLocalFbxFile = result.pathToLocalFbxFile;
                targetPath = result.targetPath;
                return this.geometryController.loadFrom(pathToLocalFbxFile)
            })

            /// Build the response information with the data we're expecting from the API
            .then(box => {

                let objectWidth = box.width();
                let midPoint = box.max.x;
                let totalSpaceRequired = (objectWidth * this.totalItemsToLoad);
                let spaceOnEachSide = (totalSpaceRequired / 2);

                let data = new Array<DesignInformationResultItem>();
                for (var i = -spaceOnEachSide; i < spaceOnEachSide; i += objectWidth) {
                    data.push(new DesignInformationResultItem(new Point(i + midPoint, 0, 0),
                        targetPath, this.configuration.key));
                }

                return new DesignInformationResult(data);
            });
    }
}