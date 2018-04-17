import { AwsConfiguration } from './AwsConfiguration';
import { AwsS3OkGetObjectResult } from './AWSS3OkGetObjectResult';

export interface IAwsS3Controller {
    getObject: AWSS3GetObjectFunc;
}

export interface AWSS3GetObjectFunc {
    (configuration: AwsConfiguration): Promise<AwsS3OkGetObjectResult>;
}

