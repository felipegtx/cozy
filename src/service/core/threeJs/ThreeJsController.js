"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const THREE = require("three");
const CustomFBXLoader = require("../../../fbx-reader/fbxReader.js");
const Box3D_1 = require("../Box3D");
const CozyFS_1 = require("../io/CozyFS");
const Point_1 = require("../Point");
class ThreeJsController {
    constructor(fsController = new CozyFS_1.CozyFS()) {
        this.fsController = fsController;
    }
    loadFrom(pathToLocalFbxFile) {
        return this.fsController.readFile(pathToLocalFbxFile, null)
            .then(nb => {
            let bufferData = nb.buffer;
            let loader = new CustomFBXLoader();
            let object3d = loader.parse(bufferData);
            let box = new THREE.Box3().setFromObject(object3d);
            let start = new Point_1.Point(box.min.x, box.min.y, box.min.z);
            let end = new Point_1.Point(box.max.x, box.max.y, box.max.z);
            return new Box3D_1.Box3D(start, end);
        });
    }
}
exports.ThreeJsController = ThreeJsController;
//# sourceMappingURL=ThreeJsController.js.map