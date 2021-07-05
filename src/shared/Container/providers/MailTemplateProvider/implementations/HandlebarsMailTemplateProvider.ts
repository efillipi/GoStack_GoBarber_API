import handlebars from 'handlebars';
import IMailTemplateProvider from '@shared/Container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import IParseMailTemplateDTO from '@shared/Container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';
import fs from 'fs';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  constructor() {}

  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);
    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
