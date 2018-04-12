import { IAwsS3Controller, AWSS3OkGetObjectFunc, AWSS3NokGetObjectFunc } from "./IAwsS3Controller";
import { AwsConfiguration } from "../AwsConfiguration";
export declare class AwsS3Controller implements IAwsS3Controller {
    getObject(configuration: AwsConfiguration, ok: AWSS3OkGetObjectFunc, reject: AWSS3NokGetObjectFunc): void;
}
