import handlebars from 'handlebars'
import IMailTemplateProvider from '@shared/Container/providers/MailTemplateProvider/models/IMailTemplateProvider'
import IParseMailTemplateDTO from '@shared/Container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO'

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {

  constructor() {
  }

  public async parse({ template, variables }: IParseMailTemplateDTO): Promise<string> {

    const parseTemplate = handlebars.compile(template)
    return parseTemplate(variables)
  }
}

export default HandlebarsMailTemplateProvider
