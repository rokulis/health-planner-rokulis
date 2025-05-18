import fs from 'fs';
import path from 'path';

import { generateApi } from 'swagger-typescript-api';

import prettierConfig from '../.prettierrc.json';

const RESOURCE_URL = 'https://patient-planner.testa-soft.tech/docs?api-docs.json';
const OUTPUT_URL = path.resolve(process.cwd(), 'src/types/schema.ts');
const MODULES_DIR = '/swagger';
const OUTPUT_DIR = path.dirname(OUTPUT_URL) + MODULES_DIR;

const config = {
  url: RESOURCE_URL,
  prettier: {
    ...prettierConfig,
    parser: 'typescript',
  },
  generateClient: false,
  generateRouteTypes: true,
  extractRequestParams: true,
  modular: true,
  output: OUTPUT_DIR,
  extractEnums: true,
  extractRequestBody: true,
  extractResponseBody: true,
};

(async function () {
  try {
    const output = await generateApi(config);

    const content = output.files.map(({ fileName }) => {
      return `export * from ".${MODULES_DIR}/${fileName.replace('.ts', '')}";`;
    });

    fs.writeFile(OUTPUT_URL, content.join('\n'), () => {

      console.log(`Successfully written generated types to ${OUTPUT_URL}`);
      process.exit(0);
    });
  } catch (e) {

    console.error('Unable to write generated types', e);
    process.exit(1);
  }
})();
