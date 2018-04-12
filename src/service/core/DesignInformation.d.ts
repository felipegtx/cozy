import { AwsConfiguration } from "./AwsConfiguration";
import { IAwsS3Controller } from "./aws/IAwsS3Controller";
import { CozyFS } from "./io/CozyFS";
import { DesignInformationResult } from "./DesignInformationResult";
export declare class DesignInformation {
    readonly configuration: AwsConfiguration;
    readonly awsController: IAwsS3Controller;
    readonly fsController: CozyFS;
    constructor(configuration: AwsConfiguration, awsController?: IAwsS3Controller, fsController?: CozyFS);
    getObject(): Promise<DesignInformationResult>;
}
