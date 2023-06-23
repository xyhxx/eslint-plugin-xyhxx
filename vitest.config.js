import {defineConfig} from 'vitest/config';
import commonjs from 'vite-plugin-commonjs';

export default defineConfig({
  test: {
    include: 'tests/*.js',
  },
  plugins: [commonjs()],
});
