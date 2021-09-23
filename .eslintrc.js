module.exports = {
  extends: ['rainbow'],
  overrides: [
    {
      files: ['example/**'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
