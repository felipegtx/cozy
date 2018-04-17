import { Box3D } from "./Box3D";

export interface IGeometryController {
    loadFrom(pathToLocalFbxFile: string): Promise<Box3D>;
}
