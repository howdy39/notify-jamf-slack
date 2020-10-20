const SlackService = require('./SlackService');
const BlockKitBuilder = require('./BlockKitBuilder');

const JAMF_URL = process.env.JAMF_URL || 'https://sample.jamfcloud.com';
let IGNORE_POLICYIDS = [];
if (process.env.IGNORE_POLICYIDS) {
  IGNORE_POLICYIDS = process.env.IGNORE_POLICYIDS.split(',').map((policyId) => Number(policyId));
}

const emitDefaultHandler = ({ webhook, event }) => {
  SlackService.postSlackWithBlockKit(generateDefaultBlockKit({ webhook, obj: event }));
};

const emitComputer = ({ webhook, event }) => {
  const obj = {
    username: event.username,
    realName: event.computer.realName,
    serialNumber: event.computer.serialNumber,
    deviceName: event.computer.deviceName,
    model: event.computer.model,
    emailAddress: event.computer.emailAddress,
    department: event.computer.department,
    building: event.computer.building,
    jssID: event.computer.jssID,
  };
  SlackService.postSlackWithBlockKit(generateComputerBlockKit({ webhook, event, obj }));
};

const emitMobileDevice = ({ webhook, event }) => {
  const obj = {
    username: event.username,
    serialNumber: event.serialNumber,
    udid: event.udid,
    deviceName: event.deviceName,
    model: event.model,
    jssID: event.jssID,
  };
  SlackService.postSlackWithBlockKit(generateMobileDeviceBlockKit({ webhook, event, obj }));
};

const emitPatchSoftwareTitleUpdated = ({ webhook, event }) => {
  SlackService.postSlackWithBlockKit(
    generatePatchSoftwareTitleUpdatedBlockKit({ webhook, obj: event })
  );
};

function generateDefaultBlockKit({ webhook, obj }) {
  const builder = new BlockKitBuilder();
  builder.addHeader(webhook.webhookEvent);

  let textList = [];
  let i = 0;
  for (const [key, value] of Object.entries(obj)) {
    textList.push(getFieldText({ key, value }));
    i++;
    if (i % 10 === 0) {
      // max fields is 10.
      builder.addSectionFields(textList);
      textList = [];
    }
  }
  if (i % 10 !== 0) {
    builder.addSectionFields(textList);
  }

  return builder.getBlockKit();
}

function generateComputerBlockKit({ webhook, event, obj }) {
  const builder = new BlockKitBuilder();
  builder.addHeader(webhook.webhookEvent);

  let textList = [];

  if (webhook.webhookEvent === 'ComputerPolicyFinished') {
    if (IGNORE_POLICYIDS.includes(event.policyId)) {
      console.log(`${event.policyId} is ignored poilcyId.`);
      return;
    }
    textList.push(`*policyId*: ${event.policyId}`);
    textList.push(`*successful*: ${event.patchPolicyName}`);
  } else if (webhook.webhookEvent === 'ComputerPatchPolicyCompleted') {
    textList.push(`*patchPolicyId*: ${event.patchPolicyId}`);
    textList.push(`*patchPolicyName*: ${event.patchPolicyName}`);
    textList.push(`*softwareTitleId*: ${event.softwareTitleId}`);
    textList.push(`*successful*: ${event.patchPolicyName}`);
  }

  for (const [key, value] of Object.entries(obj)) {
    textList.push(getFieldText({ key, value }));
  }
  const imageUrl =
    'https://user-images.githubusercontent.com/6329532/96354794-9ebb6a00-1115-11eb-9a5b-42592714221a.png';
  const imageAltText = 'computer thumbnail';
  builder.addSectionWithImage(textList.join('\n'), imageUrl, imageAltText);

  return builder.getBlockKit();
}

function generateMobileDeviceBlockKit({ webhook, obj }) {
  const builder = new BlockKitBuilder();
  builder.addHeader(webhook.webhookEvent);

  let textList = [];
  for (const [key, value] of Object.entries(obj)) {
    textList.push(getFieldText({ key, value, isMobile: true }));
  }
  const imageUrl =
    'https://user-images.githubusercontent.com/6329532/96354820-e9d57d00-1115-11eb-9fd2-f1fc99585520.png';
  const imageAltText = 'mobile devices thumbnail';
  builder.addSectionWithImage(textList.join('\n'), imageUrl, imageAltText);

  return builder.getBlockKit();
}

function generatePatchSoftwareTitleUpdatedBlockKit({ webhook, obj }) {
  const builder = new BlockKitBuilder();
  builder.addHeader(webhook.webhookEvent);

  let textList = [];
  for (const [key, value] of Object.entries(obj)) {
    textList.push(getFieldText({ key, value }));
  }
  const imageUrl =
    'https://user-images.githubusercontent.com/6329532/96355526-79325e80-111d-11eb-943a-6b56f8e362ef.png';
  const imageAltText = 'update thumbnail';
  builder.addSectionWithImage(textList.join('\n'), imageUrl, imageAltText);

  return builder.getBlockKit();
}

function getFieldText({ key, value, isMobile = false }) {
  if (key.toLowerCase() === 'jssid') {
    const fileName = isMobile ? 'mobileDevices.html' : 'computers.html';
    return `*${key}*: <${JAMF_URL}/${fileName}?id=${value} | ${value}>`;
  } else if (key.toLowerCase() === 'policyid') {
    return `*${key}*: <${JAMF_URL}/policies.html?id=${value} | ${value}>`;
  } else {
    return `*${key}*: ${value}`;
  }
}

module.exports = {
  emitDefaultHandler,
  emitComputer,
  emitMobileDevice,
  emitPatchSoftwareTitleUpdated,
};
