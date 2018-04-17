"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWSS3OkGetObjectResult_1 = require("../../service/core/aws/AWSS3OkGetObjectResult");
class AwsS3ControllerMock {
    constructor(defaultMessage = "Ok", errorMessage = null) {
        this.defaultMessage = defaultMessage;
        this.errorMessage = errorMessage;
    }
    getObject(configuration) {
        return new Promise((ok, reject) => {
            if (this.errorMessage) {
                reject(this.errorMessage);
            }
            else {
                ok(new AWSS3OkGetObjectResult_1.AwsS3OkGetObjectResult(this.defaultMessage, null));
            }
        });
    }
}
exports.AwsS3ControllerMock = AwsS3ControllerMock;
//# sourceMappingURL=AwsS3ControllerMock.js.map