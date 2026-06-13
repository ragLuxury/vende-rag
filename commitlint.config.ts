import type { UserConfig } from '@commitlint/types';

const verbs = [
  'implemented',
  'fixed',
  'refactored',
  'styled',
  'documented',
  'tested',
  'chored',
  'removed',
];

const config: UserConfig = {
  rules: {
    'type-enum': [2, 'always', verbs],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
  },
};

export default config;
