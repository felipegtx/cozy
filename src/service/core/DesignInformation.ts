
import * as path from "path";
import * as AWS from "aws-sdk";
import { AwsConfiguration } from "./aws/AwsConfiguration";
import { AwsS3Controller } from "./aws/AwsS3Controller";
import { IAwsS3Controller } from "./aws/IAwsS3Controller";
import { CozyFS } from "./io/CozyFS";
import { DesignInformationResult } from "./DesignInformationResult";
import { DesignInformationResultItem } from "./DesignInformationResultItem";
import { Point } from "./Point";
import { ThreeJsController } from "./ThreeJs/ThreeJsController";
import { IGeometryController } from "./IGeometryController";

const appDir = path.dirname(require.main.filename);

export class DesignInformation {
    constructor(readonly configuration: AwsConfiguration,
        readonly awsController: IAwsS3Controller = new AwsS3Controller(),
        readonly fsController: CozyFS = new CozyFS(),
        readonly geometryController: IGeometryController = new ThreeJsController(),
        readonly totalItemsToLoad: number = 10) {
    }

    getObject(): Promise<DesignInformationResult> {

        return new Promise<DesignInformationResult>((resolve, reject) => {

            this.awsController.getObject(this.configuration,
                (pathToLocalFbxFile, targetPath) => {
                    this.fsController.readFile(pathToLocalFbxFile, null, (err, nb) => {

                        let bufferData = nb.buffer;
                        var box = this.geometryController.loadFrom(bufferData, this.totalItemsToLoad);
                        let objectWidth = box.width();
                        let midPoint = box.max.x;
                        let totalSpaceRequired = (objectWidth * this.totalItemsToLoad);
                        let spaceOnEachSide = (totalSpaceRequired / 2);

                        let data = new Array<DesignInformationResultItem>();
                        for (var i = -spaceOnEachSide; i < spaceOnEachSide; i += objectWidth) {
                            data.push(new DesignInformationResultItem(new Point(i + midPoint, 0, 0),
                                targetPath, this.configuration.key));
                        }
                        let result = new DesignInformationResult(data);

                        resolve(result);
                        return result;
                    });
                }, err => { reject(err); });
        });
    }
}