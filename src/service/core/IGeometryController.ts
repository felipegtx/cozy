import { Box3D } from "./Box3D";

export interface IGeometryController {
    loadFrom(buffer:ArrayBuffer):Box3D;
}
