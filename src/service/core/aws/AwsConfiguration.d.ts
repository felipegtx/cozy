import { awsRegion } from "./enum/awsRegion";
export declare class AwsConfiguration {
    readonly region: awsRegion;
    readonly bucket: string;
    readonly key: string;
    constructor(region: awsRegion, bucket: string, key: string);
    getAwsOptions(): any;
}
