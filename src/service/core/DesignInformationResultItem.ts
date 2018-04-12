import { Point } from "./Point";

export class DesignInformationResultItem {
    constructor(readonly Position: Point, readonly item_url: string, readonly item_name: string) {
    }
}
