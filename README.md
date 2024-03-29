# reshuffle-smtp-connector

[Code](https://github.com/reshufflehq/reshuffle-smtp-connector) |  [npm](https://www.npmjs.com/package/reshuffle-smtp-connector)

`npm install reshuffle-smtp-connector`

### Reshuffle SMTP Connector


*NPM Package:*  [reshuffle-smtp-connector](https://www.npmjs.com/package/reshuffle-smtp-connector)

This package is a [Reshuffle](http://dev.reshuffle.com) connector that allows a developer to configure a transport that sends emails via SMTP.

The following code creates an HTTP endpoint at `/ping`. Sending a `GET` request to this endpoint with the following pattern, 
sends an email to the address in the `to` query parameter.

```js
const { HttpConnector, Reshuffle } = require('reshuffle')
const { SMTPConnector } = require('reshuffle-smtp-connector')

const app = new Reshuffle()
const httpConnector = new HttpConnector(app)
const smtpConnector = new SMTPConnector(
  app,
  {
    username: 'superman',
    password: 'hunter123',
    host: 'email.some.com',
    port: 587,
    fromName: 'Spiderman III',
    fromEmail: 'admin@superheros.com',
  },
  'connectors/smtp',
)

httpConnector.on(
  {
    method: 'GET',
    path: '/ping',
  },
  (event, app) => {
    app.getConnector('connectors/smtp').send({
      to: event.req.query.to,
      subject: 'Ping Email',
      html: 'You have been pinged',
    })
  },
)

app.start()
```

Hitting `/ping?to=doc@exmaple.com` will send a ping email to `doc@example.com`


#### Configuration Options:
```typescript
interface SMTPConnectorOptions {
  fromName: string // The sender name to appear on outgoing emails
  fromEmail: string // The sender email address to appear on outgoing emails
  host: string // SMTP host
  port: number // Port number for the host. Normally 587
  username: string // Username to login to the SMTP host
  password?: string // Password to login to the SMTP host
}
```

#### Connector actions
The SMTP connector provides the following actions:

##### send
Send an email message defined by the message parameter.
SMTPConnector.send(message: EmailMessage)
The EmailMessage type expects the following:

```typescript
interface EmailMessage {
  to: string | string[] // Recipient email address(es)
  subject: string // Message subject
  html: string // message content
  attachments?: Attachment[]
}
```
The `to` field can have the following formats:
1. A single email address inside a string object
2. A comma-separated list of email addresses inside a single string object
3. An array of email addresses (strings) 

Example on how to use this connector can be [found here](https://github.com/reshufflehq/reshuffle/tree/master/examples/email).