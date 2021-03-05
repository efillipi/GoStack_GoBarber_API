import ISenMailDTO from '@shared/Container/providers/MailProvider/dtos/ISenMailDTO'

export default interface IMailProvider {
  sendMail(data: ISenMailDTO): Promise<void>
}
