import chaptersAddon, { setDefaults } from 'react-storybook-addon-chapters'
import { configure, setAddon } from '@storybook/react'
import '../css/index.scss'

setDefaults({
  sectionOptions: {
    showSource: false,
    allowSourceToggling: true,
    showPropTables: false,
    allowPropTablesToggling: true,
  }
})
setAddon(chaptersAddon)

const req = require.context('../stories', true, /.stories.js$/)

function loadStories () {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module)
