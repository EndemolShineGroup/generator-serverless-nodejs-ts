import os from 'os';
import path from 'path';
import rimraf from 'rimraf';
import uuid from 'uuid/v4';
// @ts-ignore
import assert from 'yeoman-assert';

import replaceTemplatePrefix from '@endemolshinegroup/generator-nodejs-ts/generators/lib/replaceTemplatePrefix';
import { generateWithOptions } from '../setupTests';
import files from './files';

describe('app:function', () => {
  describe('Generates a function correctly', () => {
    const FUNCTION_NAME = 'TestFunction';
    const OUTPUT_PATH = path.join(os.tmpdir(), uuid());
    const PROJECT_NAME = 'glasf-bist';
    const options: object = {
      name: FUNCTION_NAME,
      path: OUTPUT_PATH,
      projectName: PROJECT_NAME,
    };

    beforeEach(() => {
      return generateWithOptions(__dirname, OUTPUT_PATH, options);
    });

    afterEach(() => {
      rimraf.sync(OUTPUT_PATH);
    });

    it('copies all files', () => {
      const commonFiles = files.common.map((fileName) => {
        return `${OUTPUT_PATH}/${FUNCTION_NAME}/${replaceTemplatePrefix(
          fileName,
        )}`;
      });

      assert.file(commonFiles);
    });
  });
});
