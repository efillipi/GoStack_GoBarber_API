import IMailProvider from '@shared/Container/providers/MailProvider/models/IMailProvider';
import ISenMailDTO from '@shared/Container/providers/MailProvider/dtos/ISenMailDTO';

class FakeMailProvider implements IMailProvider {
  private messages: ISenMailDTO[] = [];

  public async sendMail(message: ISenMailDTO): Promise<void> {
    this.messages.push(message);
  }
}
export default FakeMailProvider;
