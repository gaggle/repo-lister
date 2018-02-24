import { addDecorator, configure } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import '../css/index.scss'

addDecorator((story, context) => withInfo('common info')(story)(context));

const req = require.context('../stories', true, /.stories.js$/)

function loadStories () {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module)
