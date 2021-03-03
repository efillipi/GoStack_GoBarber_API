import { container } from 'tsyringe'

import IStorageProvider from '@shared/Container/providers/StorageProvider/models/IStorageProvider'
import DiskStorageProvider from '@shared/Container/providers/StorageProvider/implementations/DiskStorageProvider'

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider
)
