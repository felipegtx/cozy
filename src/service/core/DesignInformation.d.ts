import { AwsConfiguration } from "./AwsConfiguration";
import { IAwsS3Controller } from "./aws/IAwsS3Controller";
import { CozyFS } from "./io/CozyFS";
export declare class DesignInformation {
    readonly configuration: AwsConfiguration;
    readonly awsController: IAwsS3Controller;
    readonly fsController: CozyFS;
    constructor(configuration: AwsConfiguration, awsController?: IAwsS3Controller, fsController?: CozyFS);
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
