import { IAwsS3Controller } from "../../service/core/aws/IAwsS3Controller";
import { AwsConfiguration } from "../../service/core/aws/AwsConfiguration";
import { AwsS3OkGetObjectResult } from "../../service/core/aws/AWSS3OkGetObjectResult";

export class AwsS3ControllerMock implements IAwsS3Controller {

    constructor(readonly defaultMessage: string = "Ok", readonly errorMessage: string = null) {

    }

    getObject(configuration: AwsConfiguration): Promise<AwsS3OkGetObjectResult> {
        return new Promise<AwsS3OkGetObjectResult>((ok, reject) => {
            if (this.errorMessage) {
                reject(this.errorMessage)
            } else {
                ok(new AwsS3OkGetObjectResult(this.defaultMessage, null));
            }
        });
    }
}