import { awsRegion } from '../enum/awsRegion';
export declare class AwsConfiguration {
    readonly region: awsRegion;
    readonly bucket: string;
    readonly key: string;
    readonly targetFileName: string;
    constructor(region: awsRegion, bucket: string, key: string, targetFileName?: string);
    getAwsOptions(): any;
}
