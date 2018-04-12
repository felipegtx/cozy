
class DesignInformation {
    constructor(readonly configuration: AwsConfiguration) {
    }

    getObject(): Promise<DesignInformationResult> {
        return new Promise<DesignInformationResult>(function (resolve, reject) {
            let data = new Array<DesignInformationResultItem>();

            return new DesignInformationResult(data);
        })
    }
}

class DesignInformationResult {
    constructor(readonly ItemList: Array<DesignInformationResultItem>) { }
}

class DesignInformationResultItem {
    constructor(readonly Position: Point, readonly item_url: string, readonly item_name: string) {
    }
}

class Point {
    constructor(readonly x: number, readonly y: number, readonly z: number) { }
}