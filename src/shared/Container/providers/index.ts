import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import IStorageProvider from '@shared/Container/providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/Container/providers/StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from '@shared/Container/providers/MailProvider/models/IMailProvider';
import EtherealMailProvider from '@shared/Container/providers/MailProvider/implementations/EtherealMailProvider';
import SESMailProvider from '@shared/Container/providers/MailProvider/implementations/SESMailProvider';

import IMailTemplateProvider from '@shared/Container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from '@shared/Container/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
