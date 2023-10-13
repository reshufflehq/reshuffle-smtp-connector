import { BaseConnector, Reshuffle } from 'reshuffle-base-connector'
import nodemailer, { SentMessageInfo, Transporter } from 'nodemailer'

export interface SMTPConnectorOptions {
  fromName: string
  fromEmail: string
  host: string
  port: number
  username: string
  password?: string
}

interface Attachment {
  filename: string
  content: Buffer
}

interface EmailMessage {
  to: string | string[]
  subject: string
  html: string
  attachments?: Attachment[]
}

class SMTPConnector extends BaseConnector<SMTPConnectorOptions, null> {
  private transporter: Transporter | undefined
  private from: string | undefined

  constructor(app: Reshuffle, options: SMTPConnectorOptions, id?: string) {
    super(app, options, id)
    this.updateOptions(options)
  }

  updateOptions(options: SMTPConnectorOptions): void {
    this.from = options.fromName ? `${options.fromName} <${options.fromEmail}>` : options.fromEmail
    this.transporter = nodemailer.createTransport({
      host: options.host,
      port: Number(options.port),
      auth: {
        user: options.username,
        pass: options.password,
      },
    })
  }

  async send(message: EmailMessage): Promise<SentMessageInfo | undefined> {
    if (!this.transporter) return
    if (typeof message.to !== 'string' && !Array.isArray(message.to)) {
      this.app.getLogger().error('Invalid recipient data type:', typeof message.to);
      return;
    }

    message.to = typeof message.to === 'string'
      ? message.to.split(',').map(email => email.trim())
      : message.to;
    return this.transporter.sendMail({
      from: this.from,
      ...message,
    })
  }
}

export { SMTPConnector }
