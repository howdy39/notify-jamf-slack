const express = require('express');
const bodyParser = require('body-parser');

const { basicAuth } = require('./auth');
const { emitDefaultHandler, emitComputer, emitMobileDevice } = require('./handler');

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(basicAuth);

app.post('/', function (req, res) {
  try {
    const { webhook, event } = req.body;
    if (webhook === undefined) {
      console.log('コネクション確認リクエストのため終了', webhook);
      return;
    }
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
