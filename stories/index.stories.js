'use strict'
import React from 'react'
import { action } from '@storybook/addon-actions'
import { Button, Welcome } from '@storybook/react/demo'
import { linkTo } from '@storybook/addon-links'
import { storiesOf } from '@storybook/react'

import Clicker from '../components/clicker'

storiesOf('Welcome', module)
  .add('to Storybook', () => <Welcome showApp={linkTo('Button')}/>)

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>
    Hello Button
  </Button>)

storiesOf('Clicker', module)
  .add('simple', () => <Clicker data='foo'/>)
