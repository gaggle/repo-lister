'use strict'
import lorem from 'lorem-ipsum'
import React from 'react'
import { storiesOf } from '@storybook/react'

import Post from '../components/post'

storiesOf('Post', module)
  .add('Simple', () =>
    <Post id='1'
          title={lorem({count: 1})}
          body={lorem({count: 10})}
          key='1'/>
  )
  .add('List', () =>
    <section>
      <Post id='1' title={lorem({count: 1})} body={lorem({count: 10})} key='1'/>
      <Post id='2' title={lorem({count: 1})} body={lorem({count: 10})} key='2'/>
    </section>
  )
