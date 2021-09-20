import { container } from 'tsyringe';
import mailConfig from '@config/mail';
import uploadConfig from '@config/upload';

import IStorageProvider from '@shared/Container/providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/Container/providers/StorageProvider/implementations/DiskStorageProvider';
import S3StorageProvider from '@shared/Container/providers/StorageProvider/implementations/S3StorageProvider';

import IMailProvider from '@shared/Container/providers/MailProvider/models/IMailProvider';
import EtherealMailProvider from '@shared/Container/providers/MailProvider/implementations/EtherealMailProvider';
import SESMailProvider from '@shared/Container/providers/MailProvider/implementations/SESMailProvider';

import IMailTemplateProvider from '@shared/Container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from '@shared/Container/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

import ICacheProvider from '@shared/Container/providers/CacheProvider/models/ICacheProvider';
import RedisCacheProvider from '@shared/Container/providers/CacheProvider/implementations/RedisCacheProvider';

import IOnesignalProvider from '@shared/Container/providers/OnesignalProvider/models/IOnesignalProvider';
import OnesignalProvider from '@shared/Container/providers/OnesignalProvider/implementations/OnesignalProvider';

const disk_providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  disk_providers[uploadConfig.driver],
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

const providers_mail = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers_mail[mailConfig.driver],
);

const providers_redis = {
  redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  providers_redis.redis,
);

container.registerSingleton<IOnesignalProvider>(
  'OnesignalProvider',
  OnesignalProvider,
);
