import Link from 'next/link'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, Card, CardBody, CardColumns, CardText, CardTitle } from 'reactstrap'
import { pick } from 'lodash'

import queries from '../lib/data-query-entries'
import renderIf from '../lib/render-if'

import { Issues, Language, PullRequests } from './github-components'

export class RepoCards extends Component {

  static propTypes = {
    children: PropTypes.array.isRequired,
  }

  render () {
    return (
      <CardColumns>
        {this.props.children.map(child =>
          <RepoCard key={child.id} {...child}/>
        )}
      </CardColumns>
    )
  }
}

export class RepoCard extends Component {

  static propTypes = {
    full_name: PropTypes.string.isRequired,
    id: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    owner: PropTypes.shape({
      login: PropTypes.string.isRequired,
    }),
  }

  static defaultProps = {
    onClick: () => {},
    description: 'description',
    html_url: 'html_url',
    issues_url: 'issues_url',
    language: 'language',
    name: 'name',
    open_issues_count: 0,
    owner: {
      html_url: 'html_url',
      login: 'login',
    },
  }

  render () {
    return (
      <div className={this.constructor.name}>
        <Card key={this.props.id}>
          <CardBody>
            <CardTitle>
              <div>
                <div>
                  <Link href={this.props.owner.html_url}>
                    <a>{this.props.owner.login}</a>
                  </Link>
                  {' / '}
                  <Link href={this.props.html_url}>
                    <a>{this.props.name}</a>
                  </Link>
                </div>
              </div>
            </CardTitle>

            <CardText>{this.props.description}</CardText>

            <CardText className="gh-stats">
              {renderIf(this.props.language, () =>
                <Language {...this.props} />
              )}
              <Issues {...this.props} />
              <PullRequests {...this.props} />
            </CardText>

            <CardText>
              <Link href={{pathname: '/repo', query: pick(this.props, queries)}}
                    as={`/repo/${this.props.full_name}`}>
                <a>Details</a>
              </Link>
            </CardText>
          </CardBody>
        </Card>
        <style jsx="true">{`
          .${this.constructor.name} :global(.gh-stats > *) {
            margin: 1px 8px 1px 0;
          }
        `}</style>
      </div>
    )
  }
}
