const fetch = require('node-fetch');

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

class SlackService {
  static async postSlackWithBlockKit(blockKit) {
    const options = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ blocks: blockKit }),
    };

    return await fetch(SLACK_WEBHOOK_URL, options);
  }
}

module.exports = SlackService;
