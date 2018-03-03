'use strict'
import React from 'react'
import { storiesOf } from '@storybook/react'

import Clicker from '../components/clicker'

storiesOf('Clicker', module)
  .add('Simple', () => <Clicker data='foo'/>)
