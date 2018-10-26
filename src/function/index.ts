import Generator from 'yeoman-generator';

import files from './files';

interface Options {
  name?: string;
  pathPrefix?: string;
}

export = class FunctionGenerator extends Generator {
  options: Options;

  constructor(args: string | string[], options: Options) {
    super(args, options);
    this.options = options;

    this.option('pathPrefix', {
      default: process.cwd(),
      description: 'Path to generate function relative to project root',
      type: String,
    });
    this.option('name', {
      default: 'MyNewFunction',
      description: 'Function name',
      type: String,
    });
  }

  async writing() {
    files.common.forEach((fileName) => {
      this.fs.copyTpl(
        this.templatePath(fileName),
        this.destinationPath(
          `${this.options.pathPrefix + '/' || ''}${
            this.options.name
          }/${fileName}`,
        ),
        this.options,
      );
    });
  }
};
