import IMailTemplateProvider from '@shared/Container/providers/MailTemplateProvider/models/IMailTemplateProvider';

class FakeMailProvider implements IMailTemplateProvider {
  constructor() {}

  public async parse(): Promise<string> {
    return 'Mail Content';
  }
}

export default FakeMailProvider;
