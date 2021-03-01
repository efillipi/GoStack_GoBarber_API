import { request } from 'express'
import multer from 'multer'
import patch from 'path'
import crypto from 'crypto'

const tmpFolder = patch.resolve(__dirname, '..', '..', 'tmp','avatar')

export default {

    directory : tmpFolder,
    storage: multer.diskStorage({

        destination: tmpFolder,

        filename: (request, file, callback) => {

            const fileHash = crypto.randomBytes(10).toString('HEX');
            const filename = `${fileHash}_${file.originalname}`;

            return callback(null, filename);
        }
    }),


}