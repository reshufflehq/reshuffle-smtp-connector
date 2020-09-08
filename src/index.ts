import { BaseConnector } from 'reshuffle-base-connector'
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
  to: string
  subject: string
  html: string
  attachments?: Attachment[]
}

class SMTPConnector extends BaseConnector<SMTPConnectorOptions, null> {
  private transporter: Transporter | undefined
  private from: string | undefined

  constructor(options: SMTPConnectorOptions, id: string) {
    super(options, id)
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
    return this.transporter.sendMail({
      from: this.from,
      ...message,
    })
  }
}

export { SMTPConnector }
