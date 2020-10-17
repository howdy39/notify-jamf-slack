const express = require('express');
const bodyParser = require('body-parser');

const { emitDefaultHandler, emitComputer, emitMobileDevice } = require('./handler');

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.post('/', function (req, res) {
  try {
    const { webhook, event } = req.body;
    const { webhookEvent } = webhook;

    const computerWebhooks = [
      'ComputerAdded',
      'ComputerCheckIn',
      'ComputerInventoryCompleted',
      'ComputerPushCapabilityChanged',
      'ComputerPolicyFinished',
      'ComputerPatchPolicyCompleted',
    ];
    const mobileDeviceWebhooks = [
      'MobileDeviceCheckIn',
      'MobileDeviceCommandCompleted',
      'MobileDeviceEnrolled',
      'MobileDevicePushSent',
      'MobileDeviceUnenrolled',
    ];

    if (computerWebhooks.includes(webhookEvent)) {
      emitComputer({ webhook, event });
    } else if (mobileDeviceWebhooks.includes(webhookEvent)) {
      emitMobileDevice({ webhook, event });
    } else {
      emitDefaultHandler({ webhook, event });
    }

    res.send('ok');
  } catch (e) {
    console.log(e);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`notify-jam-slack app listening on port ${port}`);
});
