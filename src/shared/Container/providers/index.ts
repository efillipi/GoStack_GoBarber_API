import { container } from 'tsyringe';

import IStorageProvider from '@shared/Container/providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/Container/providers/StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from '@shared/Container/providers/MailProvider/models/IMailProvider';
import EtherealMailProvider from '@shared/Container/providers/MailProvider/implementations/EtherealMailProvider';

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

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);
