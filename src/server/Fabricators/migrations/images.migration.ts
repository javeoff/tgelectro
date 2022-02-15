import { MigrationInterface } from 'typeorm';
import fs from 'fs';
import { slugify as convertToUrl } from 'transliter';
import path from 'path';
import https from 'https';

import images from '@server/Fabricators/__mock__/images.json';

export class FabricatorsImagesMigration implements MigrationInterface {
  public name = `FabricatorsMigration${Date.now()}`;

  private readonly filepath = '../img/';

  public async up(): Promise<void> {
    await Promise.all(
      images.map(
        (image) =>
          new Promise((resolve) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            const imageName = convertToUrl(image.name) as string;
            const filePath = path.resolve(
              __dirname,
              '../img/',
              `${imageName}.jpg`,
            );

            if (fs.existsSync(filePath)) {
              return;
            }

            https.get(image.src, (res) => {
              res.pipe(fs.createWriteStream(filePath));
            });

            // eslint-disable-next-line no-console
            console.log(`loaded ${filePath}`);

            resolve(true);
          }),
      ),
    );
  }

  public async down(): Promise<void> {}
}
