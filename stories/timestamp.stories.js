'use strict'
import React from 'react'
import Timestamp from '../components/timestamp'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

storiesOf('Timestamp', module)
  .add('simple', () => (
    <div>
      <div>
        <h1>epoch</h1>
        <Timestamp startDate='320371200000'/>
      </div>
      <div>
        <h1>strings</h1>
        <Timestamp startDate='1980-02-26T00:00:00+00:00'/>
      </div>
      <div>
        <h1>datetime</h1>
        <Timestamp startDate={new Date(1980, 2, 26)}/>
      </div>
    </div>
  ))
  .add('onChange', () => (
    <Timestamp startDate={Date()} onChange={action('timestamp-update')}/>
  ))
