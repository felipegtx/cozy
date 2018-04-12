'use strict';

var chai = require('chai'),
    sinon = require('sinon'),
    expect = chai.expect;

chai.should();

describe("Design information services integration", function () {

    let fsMock = require('../service/core/io/CozyFS');
    let di = require('../service/core/DesignInformation');
    let awsc = require('../service/core/aws/AwsConfiguration');
    let awscMock = require('./instrumentation/AwsS3ControllerMock');
    let awsRegion = require('../service/core/aws/enum/awsRegion').awsRegion;
    var desingInformation;

    it("should handle AWS failures", function () {

        var errorMessage = "Some weird error hapened!";
        desingInformation = new di.DesignInformation(new awsc.AwsConfiguration(
            awsRegion.EUCentral,
            'cozyo-assessment-test',
            '000001_FloorLamp_0001.FBX'
        ), new awscMock.AwsS3ControllerMock(null, errorMessage));

        var receivedMessage = "";
        desingInformation.getObject()
            .then(function (msg) {
                if (msg) {
                    receivedMessage = msg;
                }
            })
            .catch(function (err) {
                receivedMessage = err;
            })
            .then(function () {
                receivedMessage.should.equal(errorMessage);
            });

    });

    it("should handle AWS success response", function () {

        var mockedAwsController = new awscMock.AwsS3ControllerMock();
        var mockedFS = sinon.stub(new fsMock.CozyFS());

        desingInformation = new di.DesignInformation(new awsc.AwsConfiguration(
            awsRegion.EUCentral,
            'cozyo-assessment-test',
            '000001_FloorLamp_0001.FBX'
        ), mockedAwsController, mockedFS);
        
        desingInformation.getObject();
        mockedFS.readFile.called.should.be.true;

    });
});