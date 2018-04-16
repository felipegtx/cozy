"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomFBXLoader = require("../../../fbx-reader/fbxReader.js");
const Box3D_1 = require("../Box3D");
const Point_1 = require("../Point");
const THREE = require("three");
class ThreeJsController {
    loadFrom(buffer, objectCount) {
        let loader = new CustomFBXLoader();
        let object3d = loader.parse(buffer);
        let box = new THREE.Box3().setFromObject(object3d);
        return new Box3D_1.Box3D(new Point_1.Point(box.min.x, box.min.y, box.min.z), new Point_1.Point(box.max.x, box.max.y, box.max.z));
    }
}
exports.ThreeJsController = ThreeJsController;
//# sourceMappingURL=ThreeJsController.js.map