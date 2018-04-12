"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AwsS3ControllerMock {
    constructor(defaultMessage = "Ok", errorMessage = null) {
        this.defaultMessage = defaultMessage;
        this.errorMessage = errorMessage;
    }
    getObject(configuration, ok, reject) {
        if (this.errorMessage) {
            reject(this.errorMessage);
        }
        else {
            ok(this.defaultMessage, null);
        }
    }
}
exports.AwsS3ControllerMock = AwsS3ControllerMock;
//# sourceMappingURL=AwsS3ControllerMock.js.map