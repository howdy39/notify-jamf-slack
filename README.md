# notify-jamf-slack
notify-jamf-slack supply [Jamf Webhooks](https://www.jamf.com/developers/webhooks/) server and notify to Slack with [Incoming Webhooks](https://api.slack.com/messaging/webhooks).

## Prerequisites
- Node.js
- (optional) heroku

## Environment Variables
### Must
- SLACK_WEBHOOK_URL
  - Slack Incoming WebHooks url
  - ex) https://hooks.slack.com/services/AAAAAAAA/BBBBBBBB/CCCCCCCCCCCCCCCCCCCCCC
- JAMF_URL
  - Jamf application server url
  - ex) foo.jamfcloud.com

### Optional
- USE_BASICAUTH
  - Use Basic authentication flag
  - ex) TRUE
- AUTH_USERNAME
  - Basic authentication user name
  - ex) jamfadmin
- AUTH_PASSWORD
  - Basic authentication user password
  - ex) password42

## Development
### Start local server
For devloper, If you use next command, it will be updated automatically.

```
$ npm run local
```

### Testing with ngrok
For testing, you can use the [ngrok](https://ngrok.com/) secure tunneling service to expose the application to the internet and access it using both HTTP and HTTPS.

```
$ ./ngrok http 3000
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