'use strict'
import React from 'react'
import { storiesOf } from '@storybook/react'
import Timestamp from '../components/Timestamp'

storiesOf('Timestamp', module)
  .add('single', () => (
    <Timestamp>
      1980-02-26T00:00:00+00:00
    </Timestamp>
  ))
  .add('misc.', () => (
    <div>
      <div>
        <div>empty</div>
        <div><Timestamp/></div>
      </div>
      <div>
        <div>epoch</div>
        <div><Timestamp date='320371200'/></div>
        <div><Timestamp>320371200</Timestamp></div>
      </div>
      <div>
        <div>datetime</div>
        <div><Timestamp date='1980-02-26T00:00:00+00:00'/></div>
        <div><Timestamp>1980-02-26T00:00:00+00:00</Timestamp></div>
      </div>
    </div>
  ))
