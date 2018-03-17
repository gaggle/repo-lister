'use strict'
import React from 'react'
import { storiesOf } from '@storybook/react'

import { Issues, Language, PullRequests, ReadmeBadge } from '../components/github-components'

storiesOf('GitHub components', module)
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
        {
          title: 'Narrow',
          sectionFn: () =>
            <div className="root">
              <div>
                <Issues open_issues_count='1' html_url={'https://foo'}/>
                <Issues open_issues_count='1' html_url={'https://foo'}/>
              </div>
              <div className="medium">
                <Issues open_issues_count='1' html_url={'https://foo'}/>
                <Issues open_issues_count='1' html_url={'https://foo'}/>
              </div>
              <div className="narrow">
                <Issues open_issues_count='1' html_url={'https://foo'}/>
                <Issues open_issues_count='1' html_url={'https://foo'}/>
              </div>
              <style jsx>{`
                .root :global(> *) {
                  background-color:pink;
                }
                .medium {
                  width: 45px;
                }
                .narrow {
                  width: 20px;
                }
              `}</style>
            </div>
        },
      ]
    }]
  })
  .addWithChapters('Language', {
    chapters: [{
      sections: [
        {
          title: 'Languages',
          sectionFn: () =>
            <div>
              <Language language="Shell"/>
              <Language language="Python"/>
            </div>
        },
        {
          title: 'Unknown language',
          sectionFn: () => <Language language="Foo"/>
        },
        {
          title: 'Narrow',
          sectionFn: () =>
            <div className="root">
              <div>
                <Language language="Python"/>
                <Language language="Python"/>
              </div>
              <div className="medium">
                <Language language="JavaScript"/>
                <Language language="JavaScript"/>
              </div>
              <div className="narrow">
                <Language language="Ruby"/>
                <Language language="Ruby"/>
              </div>
              <style jsx>{`
                .root :global(> *) {
                  background-color:pink;
                }
                .medium {
                  width: 150px;
                }
                .narrow {
                  width: 35px;
                }
              `}</style>
            </div>
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
        {
          title: 'Narrow',
          sectionFn: () =>
            <div className="root">
              <div>
                <PullRequests open_issues_count='1' html_url={'https://foo'}/>
                <PullRequests open_issues_count='1' html_url={'https://foo'}/>
              </div>
              <div className="medium">
                <PullRequests open_issues_count='1' html_url={'https://foo'}/>
                <PullRequests open_issues_count='1' html_url={'https://foo'}/>
              </div>
              <div className="narrow">
                <PullRequests open_issues_count='1' html_url={'https://foo'}/>
                <PullRequests open_issues_count='1' html_url={'https://foo'}/>
              </div>
              <style jsx>{`
                .root :global(> *) {
                  background-color:pink;
                }
                .medium {
                  width: 45px;
                }
                .narrow {
                  width: 20px;
                }
              `}</style>
            </div>
        },
      ]
    }]
  })
  .addWithChapters('Readme badge', {
    chapters: [{
      sections: [
        {
          title: 'Bare',
          sectionFn: () => <ReadmeBadge/>
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
            <ReadmeBadge/>
            <style jsx>{`
              .multiple :global(> *) {
                margin: 4px;
              }
            `}</style>
          </div>
      }]
    }]
  })
