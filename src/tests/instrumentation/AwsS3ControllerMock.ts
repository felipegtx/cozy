import { IAwsS3Controller, AWSS3OkGetObjectFunc, AWSS3NokGetObjectFunc } from "../../service/core/aws/IAwsS3Controller";
import { AwsConfiguration } from "../../service/core/AwsConfiguration";

export class AwsS3ControllerMock implements IAwsS3Controller {

    constructor(readonly defaultMessage: string = "Ok", readonly errorMessage: string = null) {

    }

    getObject(configuration: AwsConfiguration, ok: AWSS3OkGetObjectFunc, reject: AWSS3NokGetObjectFunc) {
        if (this.errorMessage) {
            reject(this.errorMessage)
        } else { 
            ok(this.defaultMessage, null);
        }
    }
}