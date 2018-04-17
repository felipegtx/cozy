"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomFBXLoader = require("../../../fbx-reader/fbxReader.js");
const Box3D_1 = require("../Box3D");
const Point_1 = require("../Point");
const THREE = require("three");
const CozyFS_1 = require("../io/CozyFS");
class ThreeJsController {
    constructor(fsController = new CozyFS_1.CozyFS()) {
        this.fsController = fsController;
    }
    loadFrom(pathToLocalFbxFile) {
        return new Promise((resolve, reject) => {
            let start;
            let end;
            this.fsController.readFile(pathToLocalFbxFile, null, (err, nb) => {
                let bufferData = nb.buffer;
                let loader = new CustomFBXLoader();
                let object3d = loader.parse(bufferData);
                let box = new THREE.Box3().setFromObject(object3d);
                start = new Point_1.Point(box.min.x, box.min.y, box.min.z);
                end = new Point_1.Point(box.max.x, box.max.y, box.max.z);
                let result = new Box3D_1.Box3D(start, end);
                resolve(result);
                return result;
            });
        });
    }
}
exports.ThreeJsController = ThreeJsController;
//# sourceMappingURL=ThreeJsController.js.map