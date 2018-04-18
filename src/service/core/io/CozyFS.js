"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("promise-fs");
class CozyFS {
    readFile(path, options) {
        return fs.readFile(path);
    }
}
exports.CozyFS = CozyFS;
//# sourceMappingURL=CozyFS.js.map