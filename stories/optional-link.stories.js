'use strict'
import Link from 'next/link'
import React from 'react'
import { storiesOf } from '@storybook/react'

import OptionalLink from '../components/optional-link'

storiesOf('OptionalLink', module)
  .add('simple', () =>
    <div>
      <div>w. href</div>
      <OptionalLink href={'foo'}>
        <a>Read more...</a>
      </OptionalLink>
      <div>Bare</div>
      <OptionalLink>
        <a>Read more...</a>
      </OptionalLink>

      <div>
        Multiple OptionalLinks
        <div>
          <OptionalLink href={'foo'}><a>Read more...</a></OptionalLink>
          <OptionalLink href={'foo'}><a>Read more...</a></OptionalLink>
        </div>
      </div>

      <div>
        Multiple OptionalLinks w/o href
        <div>
          <OptionalLink><a>Read more...</a></OptionalLink>
          <OptionalLink><a>Read more...</a></OptionalLink>
        </div>
      </div>

    </div>
  )
  .add('compare to Link', () =>
    <div>
      <div>
        Link w. href
        <div>
          <Link href={'foo'}>
            <a>Read more...</a>
          </Link>
        </div>
      </div>
      <div>
        OptionalLink w. href
        <div>
          <OptionalLink href={'foo'}>
            <a>Read more...</a>
          </OptionalLink>
        </div>
      </div>
      <div>
        Link w. href & as
        <div>
          <Link href={'foo'} as={'bar'}>
            <a>Read more...</a>
          </Link>
        </div>
      </div>
      <div>
        OptionalLink w. href & as
        <div>
          <OptionalLink href={'foo'} as={'bar'}>
            <a>Read more...</a>
          </OptionalLink>
        </div>
      </div>
      <div>
        Multiple Links
        <div>
          <Link href={'foo'}><a>Read more...</a></Link>
          <Link href={'foo'}><a>Read more...</a></Link>
        </div>
      </div>
      <div>
        Multiple OptionalLinks
        <div>
          <OptionalLink href={'foo'}><a>Read more...</a></OptionalLink>
          <OptionalLink href={'foo'}><a>Read more...</a></OptionalLink>
        </div>
      </div>
    </div>
  )
