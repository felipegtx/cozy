import { AwsConfiguration } from "../AwsConfiguration";
export interface IAwsS3Controller {
    getObject: AWSS3GetObjectFunc;
}
export interface AWSS3GetObjectFunc {
    (configuration: AwsConfiguration, ok: AWSS3OkGetObjectFunc, reject: AWSS3NokGetObjectFunc): any;
}
export interface AWSS3NokGetObjectFunc {
    (err: any): any;
}
export interface AWSS3OkGetObjectFunc {
    (pathToLocalFbxFile: string, targetPath: string): any;
}
