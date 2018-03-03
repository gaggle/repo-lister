'use strict'
import Link from 'next/link'
import React from 'react'
import { storiesOf } from '@storybook/react'

import OptionalLink from '../components/optional-link'

storiesOf('OptionalLink', module)
  .addWithChapters('Simple', {
    chapters: [{
      sections: [
        {
          title: 'With href',
          sectionFn: () =>
            <OptionalLink href={'foo'}>
              <a>Read more...</a>
            </OptionalLink>
        },
        {
          title: 'Bare',
          sectionFn: () =>
            <OptionalLink>
              <a>Read more...</a>
            </OptionalLink>
        },
        {
          title: 'Multiple OptionalLinks',
          sectionFn: () =>
            <div>
              <OptionalLink href={'foo'}><a>Read more...</a></OptionalLink>
              <OptionalLink href={'foo'}><a>Read more...</a></OptionalLink>
            </div>
        },
        {
          title: 'Multiple OptionalLinks w/o href',
          sectionFn: () =>
            <div>
              <OptionalLink><a>Read more...</a></OptionalLink>
              <OptionalLink><a>Read more...</a></OptionalLink>
            </div>
        }]
    }]
  })
  .addWithChapters('Compare to Link', {
    chapters: [{
      sections: [
        {
          title: 'With href',
          sectionFn: () =>
            <div>
              <OptionalLink href={'foo'}>
                <a>Read more...</a>
              </OptionalLink>
              <Link href={'foo'}>
                <a>Read more...</a>
              </Link>
            </div>
        },
        {
          title: 'With href and as',
          sectionFn: () =>
            <div>
              <OptionalLink href={'foo'} as={'bar'}>
                <a>Read more...</a>
              </OptionalLink>
              <Link href={'foo'} as={'bar'}>
                <a>Read more...</a>
              </Link>
            </div>
        },
        {
          title: 'Multiple links',
          sectionFn: () =>
            <div>
              <div>
                <OptionalLink href={'foo'}><a>Read more...</a></OptionalLink>
                <OptionalLink href={'foo'}><a>Read more...</a></OptionalLink>
              </div>
              <div>
                <Link href={'foo'}><a>Read more...</a></Link>
                <Link href={'foo'}><a>Read more...</a></Link>
              </div>
            </div>
        }
      ]
    }]
  })
