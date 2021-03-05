import { container } from 'tsyringe'

import IStorageProvider from '@shared/Container/providers/StorageProvider/models/IStorageProvider'
import DiskStorageProvider from '@shared/Container/providers/StorageProvider/implementations/DiskStorageProvider'

import IMailProvider from '@shared/Container/providers/MailProvider/models/IMailProvider'
import EtherealMailProvider from '@shared/Container/providers/MailProvider/implementations/EtherealMailProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
)

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider()
)
