'use strict'
import React from 'react'
import Timestamp from '../components/timestamp'
import { storiesOf } from '@storybook/react'

storiesOf('Timestamp', module)
  .add('simple', () => (
    <div>
      <div>
        <h1>epoch</h1>
        <div><Timestamp startDate='320371200000'/></div>
      </div>
      <div>
        <h1>datetime</h1>
        <div><Timestamp startDate='1980-02-26T00:00:00+00:00'/></div>
      </div>
    </div>
  ))
