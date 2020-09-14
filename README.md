# reshuffle-smtp-connector

[Code](https://github.com/reshufflehq/reshuffle-smtp-connector) |  [npm](https://www.npmjs.com/package/reshuffle-smtp-connector)

`npm install reshuffle-smtp-connector`

### Reshuffle SMTP Connector

This connector provides the Reshuffle framework with SMTP email sending capabilities.

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
send an email message defined by the message parameter.
SMTPConnector.send(message: EmailMessage)
The EmailMessage type expects the following:

```typescript
interface EmailMessage {
  to: string // Recipient email address
  subject: string // Message subject
  html: string // message content
  attachments?: Attachment[]
}
```

Example on how to use this connector can be [found here](https://github.com/reshufflehq/reshuffle/tree/master/examples/email).