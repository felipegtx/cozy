var DesignInformation = /** @class */ (function () {
    function DesignInformation(configuration) {
        this.configuration = configuration;
    }
    DesignInformation.prototype.getObject = function () {
        return new Promise(function (resolve, reject) {
            var data = new Array();
            return new DesignInformationResult(data);
        });
    };
    return DesignInformation;
}());
var DesignInformationResult = /** @class */ (function () {
    function DesignInformationResult(ItemList) {
        this.ItemList = ItemList;
    }
    return DesignInformationResult;
}());
var DesignInformationResultItem = /** @class */ (function () {
    function DesignInformationResultItem(Position, item_url, item_name) {
        this.Position = Position;
        this.item_url = item_url;
        this.item_name = item_name;
    }
    return DesignInformationResultItem;
}());
var Point = /** @class */ (function () {
    function Point(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    return Point;
}());
