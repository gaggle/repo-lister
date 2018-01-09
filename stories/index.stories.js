'use strict'
import lorem from 'lorem-ipsum'
import React from 'react'
import { action } from '@storybook/addon-actions'
import { Button, Welcome } from '@storybook/react/demo'
import { linkTo } from '@storybook/addon-links'
import { storiesOf } from '@storybook/react'

import Post from '../components/post'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome
  showApp={linkTo('Button')}/>)

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello
    Button</Button>)

storiesOf('Post', module)
  .add('simple', () => (
    <Post id='1' title={lorem({count: 1})} body={lorem({count: 10})} key='1'/>
  ))
  .add('list', () => (
    <section>
      <Post id='1' title={lorem({count: 1})} body={lorem({count: 10})} key='1'/>
      <Post id='2' title={lorem({count: 1})} body={lorem({count: 10})} key='2'/>
    </section>
  ))
