import { container } from 'tsyringe'

import IStorageProvider from '@shared/Container/providers/StorageProvider/models/IStorageProvider'
import DiskStorageProvider from '@shared/Container/providers/StorageProvider/implementations/DiskStorageProvider'

import IMailProvider from '@shared/Container/providers/MailProvider/models/IMailProvider'
import MailProvider from '@shared/Container/providers/MailProvider/implementations/MailProvider'

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider
)

container.registerSingleton<IMailProvider>(
  'MailProvider',
  MailProvider
)
