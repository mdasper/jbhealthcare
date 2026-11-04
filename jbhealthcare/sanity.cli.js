import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'qoi5yrg2',
    dataset: 'production'
  },
  deployment: {
    appId: 'pdx7qqrz163ieddy6gdndv6c',
    autoUpdates: true
  },
  studioHost: 'jbhealthcare'
})
