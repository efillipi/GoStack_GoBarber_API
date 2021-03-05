import IMailTemplateProvider from '@shared/Container/providers/MailTemplateProvider/models/IMailTemplateProvider'
import IParseMailTemplateDTO from '@shared/Container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO'

class FakeMailProvider implements IMailTemplateProvider {

  constructor() {
  }

  public async parse({ template, variables }: IParseMailTemplateDTO): Promise<string> {


    return template
  }
}

export default FakeMailProvider

