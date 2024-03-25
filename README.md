# notify-jamf-slack
notify-jamf-slack supply [Jamf Webhooks](https://www.jamf.com/developers/webhooks/) server and notify to Slack with [Incoming Webhooks](https://api.slack.com/messaging/webhooks).

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/howdy39/notify-jamf-slack/tree/main)

## Prerequisites
- Node.js
- memcached
  - `brew install memcached`
- (optional) heroku

## Environment Variables
### Must
- SLACK_WEBHOOK_URL
  - Slack Incoming WebHooks url
  - ex) https://hooks.slack.com/services/AAAAAAAA/BBBBBBBB/CCCCCCCCCCCCCCCCCCCCCC
- JAMF_URL
  - Jamf application server url
  - ex) https://foo.jamfcloud.com
- JAMF_CLIENT_ID
  - API Client ID
  - ex) b31c7c16-2662-4304-a71a-xxxxxxxxxxxx
- JAMF_CLIENT_SECRET
  - API Client Secret
  - ex) O2CoyCYhvocCR0GLcr3TIQT19dOO834umXUwGhLoJ9Gezexxxxxxxxxxxxxxxxxx

### Optional
Do not specify if not needed.
- IGNORE_POLICYIDS
  - Policies you don't want to be notified
  - ex) 1,3,9

## Development
### Start local server
For devloper, If you use next command, it will be updated automatically.

```
$ memcached
$ npm run local
```

### Testing with ngrok
For testing, you can use the [ngrok](https://ngrok.com/) secure tunneling service to expose the application to the internet and access it using both HTTP and HTTPS.

```
$ ./ngrok http 3000
curl -X POST -H "Content-Type: application/json" -d @sample.json "https://xxx.ngrok.io"
```

### For heroku user
```
$ heroku git:remote -a foo-notify-jamf-slack
$ git push heroku main
```

## Thanks
notify-jamf-slack influenced by [Jackalope](https://jackalope-slack.readthedocs.io/en/latest/index.html).

## License
This software is released under the MIT License, see LICENSE.txt.
