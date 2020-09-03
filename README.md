 # reshuffle-smtp-connector

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
#### Actions
The SMTP connector provides the following actions:

1. `send`
Used to send an email message defined by the `message` parameter.
```typescript
SMTPConnector.send(message: EmailMessage)
``` 
The `EmailMessage` type expects the following:
```typescript
interface EmailMessage {
  to: string // Recipient email address
  subject: string // Message subject
  html: string // message content
  attachments?: Attachment[]
}
```
