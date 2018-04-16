import { Point } from "./Point";

export class Box3D {
    
    public constructor(readonly min: Point, readonly max: Point) {

    }

    midPoint(): number {
        return this.max.x;
    }

    width() : number { 
        return Math.abs(this.min.x) + this.max.x;
    }
}