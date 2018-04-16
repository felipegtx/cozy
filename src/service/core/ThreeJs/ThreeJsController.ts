import { IGeometryController } from "../IGeometryController";
import * as CustomFBXLoader from "../../../fbx-reader/fbxReader.js";
import { Box3D } from "../Box3D";
import { Point } from "../Point";
import * as THREE from "three";

export class ThreeJsController implements IGeometryController {
    loadFrom(buffer: ArrayBuffer): Box3D {

        let loader = new CustomFBXLoader();
        let object3d = loader.parse(buffer);
        let box = new THREE.Box3().setFromObject(object3d);

        return new Box3D(
            new Point(box.min.x, box.min.y, box.min.z), 
            new Point(box.max.x, box.max.y, box.max.z));
    }
}





