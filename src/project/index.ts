import AbstractGenerator from '@endemolshinegroup/generator-nodejs-ts/generators/lib/AbstractGenerator';
import Generator from 'yeoman-generator';

import files from './files';

export = class ProjectGenerator extends AbstractGenerator {
  constructor(args: string | string[], opts: {}) {
    super(args, opts, __dirname);
  }

  async writing() {
    this.copyTemplates(files);
  }

  async install() {
    const pkgJson = {
      devDependencies: {
        '@types/aws-lambda': '^8',
        '@types/node': '^8',
        serverless: '^1.32.0',
        'serverless-webpack': '^5',
        'source-map-support': '^0.5.6',
        'ts-loader': '^4',
        typescript: '^3',
        webpack: '^4',
      },
    };

    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    this.yarnInstall();
  }
};
