import AbstractGenerator from '@endemolshinegroup/generator-nodejs-ts/generators/lib/AbstractGenerator';
import configureProjectRoot from '@endemolshinegroup/generator-nodejs-ts/generators/lib/configureProjectRoot';
import path from 'path';
import Generator from 'yeoman-generator';

import prompts from './prompts';

export default class EndemolShineGroupGenerator extends Generator {
  public answers: Generator.Answers = {};

  constructor(args: string | string[], opts: {}) {
    super(args, opts);
    this.sourceRoot(path.join(__dirname, 'templates'));
  }

  async initializing() {
    this.log('A few questions about your project...');
    this.log('Note: Project Name will also be used for Git URLs');
  }

  async prompting() {
    this.answers = await this.prompt(prompts);

    const PATH_PREFIX = '@endemolshinegroup/generator-nodejs-ts/generators/';

    this.composeWith(require.resolve(`${PATH_PREFIX}/repo`), this.answers);
    this.composeWith(require.resolve(`${PATH_PREFIX}/node`), this.answers);
    this.composeWith(require.resolve(`${PATH_PREFIX}/typescript`), {
      ...this.answers,
      generateExamples: false,
    });
    this.composeWith(require.resolve(`${PATH_PREFIX}/build`), this.answers);
    this.composeWith(require.resolve(`${PATH_PREFIX}/process`), {
      ...this.answers,
      addPrettier: true,
      addTSLint: true,
    });
    this.composeWith(require.resolve(`${PATH_PREFIX}/github`), this.answers);
    this.composeWith(require.resolve(`${PATH_PREFIX}/style`), this.answers);
    this.composeWith(require.resolve(`${PATH_PREFIX}/services`), this.answers);

    this.composeWith(require.resolve(`../project`), this.answers);
    this.composeWith(require.resolve(`../function`), {
      ...this.answers,
      pathPrefix: 'src/Services',
    });

    configureProjectRoot((this as unknown) as AbstractGenerator);
  }

  async install() {
    this.yarnInstall();
  }
}
