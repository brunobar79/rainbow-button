import image from '@rollup/plugin-image';

export default {
  input: 'src/index.tsx',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [image()]
};