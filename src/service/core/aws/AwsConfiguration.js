"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AwsConfiguration {
    constructor(region, bucket, key) {
        this.region = region;
        this.bucket = bucket;
        this.key = key;
    }
    getAwsOptions() {
        return {
            Bucket: this.bucket,
            Key: this.key,
        };
    }
}
exports.AwsConfiguration = AwsConfiguration;
//# sourceMappingURL=AwsConfiguration.js.map