import os from 'os';
import path from 'path';
import rimraf from 'rimraf';
import uuid from 'uuid/v4';
// @ts-ignore
import assert from 'yeoman-assert';

import { generateWithPrompts } from '../setupTests';

describe('app', () => {
  const PROJECT_NAME = 'glasf-bist';
  const answers: object = {
    projectDescription: 'glaf as a bist in January',
    projectName: PROJECT_NAME,
    projectScope: '@endemolshinegroup',
    version: '0.0.13',
  };
  describe('Generates a Serverless project correctly', () => {
    const OUTPUT_PATH = path.join(os.tmpdir(), uuid());

    beforeEach(() => {
      return generateWithPrompts(__dirname, OUTPUT_PATH, {
        ...answers,
        isPublic: false,
      });
    });

    afterEach(() => {
      rimraf.sync(OUTPUT_PATH);
    });

    it('folder matching project name exists and is target directory', () => {
      assert.file(path.join(OUTPUT_PATH, PROJECT_NAME));
    });
  });
});
