import IStorageProvider from '@shared/Container/providers/StorageProvider/models/IStorageProvider'
import path from 'path'
import fs from 'fs'
import uploadConfig from '@config/upload'



class DiskStorageProvider implements IStorageProvider {

  public async saveFile(file: string): Promise<string> {

    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    )

    return file
  }

  public async deleteFile(file: string): Promise<void> {

    const filePath = path.resolve(uploadConfig.uploadsFolder, file)


    try {
      await fs.promises.stat(filePath)
    } catch (err) {
      return
    }

    await fs.promises.unlink(filePath)
  }


}
export default DiskStorageProvider
