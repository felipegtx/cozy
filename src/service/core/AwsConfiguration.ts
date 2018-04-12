

class AwsConfiguration {

    readonly region: awsRegion;
    readonly bucket: string;
    readonly key: string;

    constructor(region: awsRegion, bucket: string, key: string) {
        this.region = region;
        this.bucket = bucket;
        this.key = key;
    }

}