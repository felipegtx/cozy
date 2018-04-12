"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class CozyFS {
    readFile(path, options, callback) {
        fs.readFile(path, options, callback);
    }
}
exports.CozyFS = CozyFS;
//# sourceMappingURL=CozyFS.js.map