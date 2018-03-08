'use strict'
import React from 'react'
import { storiesOf } from '@storybook/react'

import RepoCardTitle from '../components/repo-card-title'

const data = {
  'html_url': 'https://github.com/gaggle/adr-tools',
  'name': 'adr-tools',
  'owner': {
    'html_url': 'https://github.com/gaggle',
    'login': 'gaggle',
  },
}

storiesOf('Repo Card Title', module)
  .add('Simple', () =>
    <RepoCardTitle {...data}></RepoCardTitle>
  )
