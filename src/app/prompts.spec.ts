import Generator from 'yeoman-generator';

import prompts from './prompts';

describe('prompts', () => {
  it('returns an array', () => {
    expect(prompts).toBeInstanceOf(Array);
  });
});
