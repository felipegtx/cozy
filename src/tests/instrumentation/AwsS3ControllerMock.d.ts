import { IAwsS3Controller, AWSS3OkGetObjectFunc, AWSS3NokGetObjectFunc } from "../../service/core/aws/IAwsS3Controller";
import { AwsConfiguration } from "../../service/core/AwsConfiguration";
export declare class AwsS3ControllerMock implements IAwsS3Controller {
    readonly defaultMessage: string;
    readonly errorMessage: string;
    constructor(defaultMessage?: string, errorMessage?: string);
    getObject(configuration: AwsConfiguration, ok: AWSS3OkGetObjectFunc, reject: AWSS3NokGetObjectFunc): void;
}
