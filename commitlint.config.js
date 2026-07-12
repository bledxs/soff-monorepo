export default {
  extends: ['@commitlint/config-conventional'],
  ignores: [(message) => message.startsWith('Merge ')],
  rules: {
    'header-max-length': [2, 'always', 72],
    'body-max-line-length': [2, 'always', 400],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
        'perf',
      ],
    ],
    'subject-case': [0],
  },
};
