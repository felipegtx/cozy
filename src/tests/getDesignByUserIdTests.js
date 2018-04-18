'use strict';

var chai = require('chai'),
    sinon = require('sinon'),
    chaiAsPromised = require("chai-as-promised"),
    expect = chai.expect;

chai.use(chaiAsPromised);
chai.should();

describe("Design information services integration", function () {

    let Point = require('../service/core/Point').Point;
    let Box3D = require('../service/core/Box3D').Box3D;
    let ThreeJsController = require('../service/core/threeJs/ThreeJsController').ThreeJsController;
    let AwsS3ControllerMock = require('./instrumentation/AwsS3ControllerMock').AwsS3ControllerMock;
    let awsRegion = require('../service/core/aws/enum/awsRegion').awsRegion;
    let DesignInformation = require('../service/core/DesignInformation').DesignInformation;
    let AwsConfiguration = require('../service/core/aws/AwsConfiguration').AwsConfiguration;
    let p0 = new Point(0, 0, 0);
    let p1 = new Point(1, 0, 0);

    it("should handle AWS failures", function () {

        var errorMessage = "Some weird error hapened!";
        var receivedMessage = "";
        return expect(new DesignInformation(new AwsConfiguration(
                awsRegion.EUCentral, 'cozyo-assessment-test', '000001_FloorLamp_0001.FBX'
            ), new AwsS3ControllerMock(null, errorMessage))
            .getObject())
            .to.be.fulfilled.with(null);
    });

    it("should handle AWS success response", function () {

        var mockedAwsController = new AwsS3ControllerMock();
        var geometryController = sinon.stub(new ThreeJsController());
        geometryController.loadFrom.returns(new Box3D(p0, p1));
        var expectedItemCount = 12;
        var err;

        return expect(new DesignInformation(new AwsConfiguration(
                awsRegion.EUCentral, 'cozyo-assessment-test', '000001_FloorLamp_0001.FBX'
            ), mockedAwsController, geometryController, expectedItemCount)
            .getObject()
            .then(result => {
                result.ItemList.length.should.be.equal(expectedItemCount);
                geometryController.loadFrom.called.should.be.true;
                geometryController.loadFrom.calledOnce.should.be.true;
                geometryController.loadFrom.calledWith(mockedAwsController.defaultMessage);
            })).to.not.be.rejected;
    });
});