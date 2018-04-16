"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Box3D {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
    midPoint() {
        return this.max.x;
    }
    width() {
        return Math.abs(this.min.x) + this.max.x;
    }
}
exports.Box3D = Box3D;
//# sourceMappingURL=Box3D.js.map