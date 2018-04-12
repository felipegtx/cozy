import { awsRegion } from "./enum/awsRegion";

export class AwsConfiguration {

    constructor(readonly region: awsRegion,
        readonly bucket: string,
        readonly key: string,
        readonly targetFileName: string = "FloorLamp.fbx") {
    }

    getAwsOptions(): any {
        return {
            Bucket: this.bucket,
            Key: this.key,
        };
    }

}