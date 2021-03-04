import IMailProvider from '@shared/Container/providers/MailProvider/models/IMailProvider'


class MailProvider implements IMailProvider {

  public async sendMail(to: string, body: string): Promise<void> {

  }




}
export default MailProvider
