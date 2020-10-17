const {
  emitDefaultHandler,
  emitComputer,
  emitMobileDevice,
  emitPatchSoftwareTitleUpdated,
} = require('./handler');
jest.unmock('./handler');

describe('emitDefaultHandler', () => {
  test('DeviceAddedToDEP', () => {
    const json = {
      event: {
        assetTag: '1664194',
        description: 'Mac Pro',
        deviceAssignedDate: 1552478234000,
        deviceEnrollmentProgramInstanceId: 1,
        model: 'Mac Pro',
        serialNumber: '92D8014694C4BE96B3',
      },
      webhook: {
        eventTimestamp: 1553550275590,
        id: 1,
        name: 'Webhook Documentation',
        webhookEvent: 'DeviceAddedToDEP(TEST)',
      },
    };

    emitDefaultHandler({ webhook: json.webhook, event: json.event });
  });

  test('JSSWebhoooks', () => {
    const json = {
      event: {
        hostAddress: '172.31.16.70',
        institution: 'Company Name',
        isClusterMaster: false,
        jssUrl: 'https://company.jamfcloud.com/',
        webApplicationPath: '/usr/local/jss/tomcat/webapps/ROOT',
      },
      webhook: {
        eventTimestamp: 1553550275590,
        id: 7,
        name: 'Webhook Documentation',
        webhookEvent: 'JSSShutdown(TEST)',
      },
    };

    emitDefaultHandler({ webhook: json.webhook, event: json.event });
  });

  test('PushSent', () => {
    const json = {
      event: {
        jssid: 13,
        type: 'PushSent',
      },
      webhook: {
        eventTimestamp: 1553550275590,
        id: 7,
        name: 'Webhook Documentation',
        webhookEvent: 'PushSent(TEST)',
      },
    };

    emitDefaultHandler({ webhook: json.webhook, event: json.event });
  });

  test('RestAPIOperation', () => {
    const json = {
      event: {
        authorizedUsername: 'administrator',
        objectID: 34,
        objectName: 'Self Service Mobile',
        objectTypeName: 'Mobile Device Application',
        operationSuccessful: true,
        restAPIOperationType: 'GET',
      },
      webhook: {
        eventTimestamp: 1553550275590,
        id: 7,
        name: 'Webhook Documentation',
        webhookEvent: 'RestAPIOperation(TEST)',
      },
    };

    emitDefaultHandler({ webhook: json.webhook, event: json.event });
  });

  test('SmartGroupComputerMembershipChange', () => {
    const json = {
      event: {
        computer: false,
        groupAddedDevices: [],
        groupAddedDevicesIds: [1, 2, 3, 4, 5],
        groupRemovedDevices: [],
        groupRemovedDevicesIds: [6, 7, 8, 9, 10],
        jssid: 8,
        name: 'Smart Group Name',
        smartGroup: true,
      },
      webhook: {
        eventTimestamp: 1553550275590,
        id: 1,
        name: 'Webhook Documentation',
        webhookEvent: 'SmartGroupMobileDeviceMembershipChange(TEST)',
      },
    };

    emitDefaultHandler({ webhook: json.webhook, event: json.event });
  });

  test('SmartGroupMobileDeviceMembershipChange', () => {
    const json = {
      event: {
        computer: false,
        groupAddedDevices: [],
        groupAddedDevicesIds: [1, 2, 3, 4, 5],
        groupRemovedDevices: [],
        groupRemovedDevicesIds: [6, 7, 8, 9, 10],
        jssid: 8,
        name: 'Smart Group Name',
        smartGroup: true,
      },
      webhook: {
        eventTimestamp: 1553550275590,
        id: 1,
        name: 'Webhook Documentation',
        webhookEvent: 'SmartGroupMobileDeviceMembershipChange(TEST)',
      },
    };

    emitDefaultHandler({ webhook: json.webhook, event: json.event });
  });
});

describe('emitComputer', () => {
  test('Computer', () => {
    const json = {
      event: {
        computer: {
          alternateMacAddress: '72:00:01:DD:A0:B9',
          building: 'Block D',
          department: 'Information Technology',
          deviceName: "John's MacBook Pro",
          emailAddress: 'john.smith@company.com',
          jssID: 13,
          macAddress: '60:03:08:A3:64:9D',
          model: '13-inch Retina MacBook Pro (Late 2013)',
          osBuild: '16G29',
          osVersion: '10.12.6',
          phone: '555-472-9829',
          position: 'Desktop Services Specialist',
          realName: 'John Smith',
          room: '487',
          serialNumber: 'C02M23PJFH50',
          udid: 'EBBFF74D-C6B7-5599-93A9-19E8BDDEFE32',
          userDirectoryID: '-1',
          username: 'john.smith',
        },
        trigger: 'CLIENT_CHECKIN',
        username: 'John Smith',
      },
      webhook: {
        eventTimestamp: 1553550275590,
        id: 7,
        name: 'Webhook Documentation',
        webhookEvent: 'ComputerCheckIn(TEST)',
      },
    };

    emitComputer({ webhook: json.webhook, event: json.event });
  });
});

describe('emitMobileDevice', () => {
  test('MobileDevice', () => {
    const json = {
      event: {
        bluetoothMacAddress: 'C0:F2:FB:37:04:2B',
        deviceName: 'iPad',
        icciID: '',
        imei: '',
        jssID: 2,
        model: 'iPad4,7',
        modelDisplay: 'iPad mini 3 (Wi-Fi)',
        osBuild: '14D27',
        osVersion: '10.2.1',
        product: null,
        room: '221',
        serialNumber: 'DLXN69VAG5X8',
        udid: '270aae10800b6e61a2ee2bbc285eb967050b5994',
        userDirectoryID: '-1',
        username: 'John Smith',
        version: '10.2.1',
        wifiMacAddress: 'C0:F2:FB:37:04:1F',
      },
      webhook: {
        eventTimestamp: 1553550275590,
        id: 7,
        name: 'Webhook Documentation',
        webhookEvent: 'MobileDeviceCommandCompleted(TEST)',
      },
    };

    emitMobileDevice({ webhook: json.webhook, event: json.event });
  });
});

describe('emitPatchSoftwareTitleUpdated', () => {
  test.only('PatchSoftwareTitleUpdated', () => {
    const json = {
      event: {
        jssID: 1,
        lastUpdate: 1506031211000,
        latestVersion: '61.0.3163.100',
        name: 'Google Chrome',
        reportUrl: 'https://company.jamfcloud.com//view/patch/1/report',
      },
      webhook: {
        eventTimestamp: 1553550275590,
        id: 7,
        name: 'Webhook Documentation',
        webhookEvent: 'PatchSoftwareTitleUpdated(TEST)',
      },
    };

    emitPatchSoftwareTitleUpdated({ webhook: json.webhook, event: json.event });
  });
});
