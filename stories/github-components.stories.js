'use strict'
import React from 'react'
import { storiesOf } from '@storybook/react'
import { Issues, Language, PullRequests } from '../components/github-components'

storiesOf('GitHub components', module)
  .addWithChapters('Language', {
    chapters: [{
      sections: [{
        title: 'Shell',
        sectionFn: () => <Language language="Shell"/>,
      }]
    }]
  })
  .addWithChapters('Issues', {
    chapters: [{
      sections: [
        {
          title: 'Bare',
          sectionFn: () => <Issues/>
        },
        {
          title: 'Count and URL',
          sectionFn: () => <Issues open_issues_count='1'
                                   html_url={'https://github.com/foo/bar'}/>
        },
        {
          title: 'Trailing URL slash',
          sectionFn: () => <Issues open_issues_count='1'
                                   html_url={'https://github.com/foo/bar'}/>
        },
        {
          title: 'Only count',
          sectionFn: () => <Issues open_issues_count='1'/>
        },
        {
          title: 'Only URL',
          sectionFn: () => <Issues html_url={'https://github.com/foo/bar'}/>
        },
      ]
    }]
  })
  .addWithChapters('Pull requests', {
    chapters: [{
      sections: [
        {
          title: 'Bare',
          sectionFn: () => <PullRequests/>
        },
        {
          title: 'Count and URL',
          sectionFn: () =>
            <PullRequests
              open_issues_count='1'
              html_url={'https://github.com/foo/bar'}
            />
        },
        {
          title: 'Trailing URL slash',
          sectionFn: () =>
            <PullRequests
              open_issues_count='1'
              html_url={'https://github.com/foo/bar/'}
            />
        },
        {
          title: 'Only count',
          sectionFn: () => <PullRequests open_issues_count='1'/>
        },
        {
          title: 'Only URL',
          sectionFn: () => <PullRequests
            html_url={'https://github.com/foo/bar/'}
          />
        },
      ]
    }]
  })
  .addWithChapters('Multiple', {
    chapters: [{
      sections: [{
        sectionFn: () =>
          <div className="multiple">
            <Language language='Python'/>
            <Issues open_issues_count='1' html_url={'https://github.com/foo/bar'}/>
            <PullRequests open_issues_count="1"
                          html_url="https://github.com/foo/bar"/>
            <style jsx="true">{`
              .multiple :global(> *) {
                margin: 4px;
              }
            `}</style>
          </div>
      }]
    }]
  })
