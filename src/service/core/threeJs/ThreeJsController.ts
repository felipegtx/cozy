import * as THREE from 'three';

import * as CustomFBXLoader from '../../../fbx-reader/fbxReader.js';
import { Box3D } from '../Box3D';
import { IGeometryController } from '../IGeometryController';
import { CozyFS } from '../io/CozyFS';
import { Point } from '../Point';

export class ThreeJsController implements IGeometryController {

    constructor(readonly fsController: CozyFS = new CozyFS()) {

    }

    loadFrom(pathToLocalFbxFile: string): Promise<Box3D> {

        return this.fsController.readFile(pathToLocalFbxFile, null)
            .then(nb => {

                let bufferData = nb.buffer;
                let loader = new CustomFBXLoader();
                let object3d = loader.parse(bufferData);
                let box = new THREE.Box3().setFromObject(object3d);

                let start = new Point(box.min.x, box.min.y, box.min.z);
                let end = new Point(box.max.x, box.max.y, box.max.z);
                return new Box3D(start, end);

            });
    }
}





