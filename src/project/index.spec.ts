import os from 'os';
import path from 'path';
import rimraf from 'rimraf';
import uuid from 'uuid/v4';
// @ts-ignore
import assert from 'yeoman-assert';

import replaceTemplatePrefix from '@endemolshinegroup/generator-nodejs-ts/generators/lib/replaceTemplatePrefix';
import { generateWithOptions } from '../setupTests';
import files from './files';

describe('app:project', () => {
  const PROJECT_NAME = 'glasf-bist';
  const options: object = {
    projectName: PROJECT_NAME,
  };

  describe('Generates a project correctly', () => {
    const OUTPUT_PATH = path.join(os.tmpdir(), uuid());

    beforeEach(() => {
      return generateWithOptions(__dirname, OUTPUT_PATH, {
        ...options,
        skipInstall: true,
      });
    });

    afterEach(() => {
      rimraf.sync(OUTPUT_PATH);
    });

    it('copies all files', () => {
      assert.file(
        files.common.map((fileName) => {
          return replaceTemplatePrefix(fileName);
        }),
      );
    });

    it('adds dependencies to package.json', () => {
      [
        '@types/aws-lambda',
        '@types/node',
        'serverless',
        'serverless-webpack',
        'source-map-support',
        'ts-loader',
        'typescript',
        'webpack',
      ].forEach((dependency) => {
        assert.fileContent(
          path.join(OUTPUT_PATH, PROJECT_NAME, 'package.json'),
          new RegExp(dependency, 'g'),
        );
      });
    });
  });
});
