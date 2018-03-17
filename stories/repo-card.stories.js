'use strict'
import React from 'react'
import { storiesOf } from '@storybook/react'

import { RepoCard } from '../components/repo-card'

storiesOf('Repo Card', module)
  .addWithChapters('Simple', {
    chapters: [{
      sections: [
        {
          sectionFn: () =>
            <RepoCard description="baz"
                      hasReadme
                      id="1"
                      issues="1"
                      language="Shell"
                      owner_name="foo"
                      owner_url="http://foo"
                      pullrequests="2"
                      repo_name="bar"
                      repo_url="http://bar"/>
        },
        {
          title: 'Bare',
          sectionFn: () => <RepoCard id="2" owner_name="owner" repo_name="repo"/>
        },
      ]
    }]
  })
