'use strict'
import React from 'react'
import Timestamp from '../components/timestamp'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

storiesOf('Timestamp', module)
  .addWithChapters('Simple', {
    chapters: [{
      sections: [
        {
          title: 'Epoch',
          sectionFn: () => <Timestamp startDate='320371200000'/>
        },
        {
          title: 'Strings',
          sectionFn: () =>
            <div className='times'>
              <Timestamp startDate='1980-02-26T00:00:00+00:00'/>
              <Timestamp startDate='1980-02-26'/>
              <style jsx>{`
                .times :global(> *) {
                  display: block;
                }
              `}</style>
            </div>
        },
        {
          title: 'Datetime object',
          sectionFn: () => <Timestamp startDate={new Date(1980, 2, 26)}/>
        }
      ]
    }]
  })
  .add('onChange', () =>
    <Timestamp startDate={Date()}
               onChange={action('timestamp-update')}/>
  )
