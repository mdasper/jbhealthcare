import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {myStructure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'jbhealthcare',

  projectId: 'qoi5yrg2',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: myStructure
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
