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
          sectionFn: () =>
            <Issues/>
        },
        {
          title: 'Count and URL',
          sectionFn: () =>
            <Issues count='1' url={'https://github.com/foo/bar/issues'}/>
        },
        {
          title: 'Only count',
          sectionFn: () =>
            <Issues count='1'/>
        },
        {
          title: 'Only count as number',
          sectionFn: () =>
            <Issues count={1}/>
        },
        {
          title: 'Only URL',
          sectionFn: () =>
            <Issues url={'https://github.com/foo/bar/issues'}/>
        },
        {
          title: 'Narrow',
          sectionFn: () =>
            <div className="root">
              <div>
                <Issues count='1' url={'https://foo'}/>
                <Issues count='1' url={'https://foo'}/>
              </div>
              <div className="medium">
                <Issues count='1' url={'https://foo'}/>
                <Issues count='1' url={'https://foo'}/>
              </div>
              <div className="narrow">
                <Issues count='1' url={'https://foo'}/>
                <Issues count='1' url={'https://foo'}/>
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
          sectionFn: () =>
            <PullRequests/>
        },
        {
          title: 'Count and URL',
          sectionFn: () =>
            <PullRequests count='1' url={'https://github.com/foo/bar/pulls'}/>
        },
        {
          title: 'Only count',
          sectionFn: () =>
            <PullRequests count='1'/>
        },
        {
          title: 'Only count as number',
          sectionFn: () =>
            <PullRequests count={1}/>
        },
        {
          title: 'Only URL',
          sectionFn: () =>
            <PullRequests url={'https://github.com/foo/bar/pulls'}
            />
        },
        {
          title: 'Narrow',
          sectionFn: () =>
            <div className="root">
              <div>
                <PullRequests count='1' url={'https://foo'}/>
                <PullRequests count='1' url={'https://foo'}/>
              </div>
              <div className="medium">
                <PullRequests count='1' url={'https://foo'}/>
                <PullRequests count='1' url={'https://foo'}/>
              </div>
              <div className="narrow">
                <PullRequests count='1' url={'https://foo'}/>
                <PullRequests count='1' url={'https://foo'}/>
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
      sections: [
        {
          sectionFn: () =>
            <div className="multiple">
              <Language language='Python'/>
              <Issues count='1' url={'https://github.com/foo/bar'}/>
              <PullRequests count="1"
                            url="https://github.com/foo/bar"/>
              <ReadmeBadge/>
              <style jsx>{`
              .multiple :global(> *) {
                margin: 4px;
              }
            `}</style>
            </div>
        },
      ]
    }]
  })
