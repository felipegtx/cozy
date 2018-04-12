import { AwsConfiguration } from "./AwsConfiguration";
export declare class DesignInformation {
    readonly configuration: AwsConfiguration;
    constructor(configuration: AwsConfiguration);
    getObject(): Promise<DesignInformationResult>;
}
export declare class DesignInformationResult {
    readonly ItemList: Array<DesignInformationResultItem>;
    constructor(ItemList: Array<DesignInformationResultItem>);
}
export declare class DesignInformationResultItem {
    readonly Position: Point;
    readonly item_url: string;
    readonly item_name: string;
    constructor(Position: Point, item_url: string, item_name: string);
}
export declare class Point {
    readonly x: number;
    readonly y: number;
    readonly z: number;
    constructor(x: number, y: number, z: number);
}
