import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './studio/schema';

export default defineConfig({
  name: 'default',
  title: 'AstroMera Admin',

  projectId: 'hkxp5ggh',
  dataset: 'production',
  basePath: '/admin',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
