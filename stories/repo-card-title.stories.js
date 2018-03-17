'use strict'
import React from 'react'
import { storiesOf } from '@storybook/react'

import RepoTitle from '../components/repo-card-title'

storiesOf('Repo Card Title', module)
  .add('Simple', () =>
    <RepoTitle owner="gaggle"
               owner_url="https://github.com/gaggle"
               repo="adr-tools"
               repo_url="https://github.com/gaggle/adr-tools"/>
  )
