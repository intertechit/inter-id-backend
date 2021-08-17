import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';

export const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    if (!/\.(jpe?g|png)$/i.test(file.originalname)) {
      callback(new BadRequestException('Image must be jpeg, jpg or png'), null);
    } else {
      callback(null, generateFilename(file));
    }
  },
});

function generateFilename(file) {
  return `${Date.now()}-${file.originalname}`;
}
