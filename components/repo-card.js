import Link from 'next/link'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Card, CardBody, CardColumns, CardText, CardTitle } from 'reactstrap'
import { pick } from 'lodash'

import queries from '../lib/data-query-entries'
import renderIf from '../lib/render-if'

import RepoTitle from './repo-card-title'
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
    description: PropTypes.string,
    full_name: PropTypes.string,
    id: PropTypes.any.isRequired,
    language: PropTypes.string,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    description: '',
    onClick: () => {},
  }

  render () {
    return (
      <div className={this.constructor.name}>
        <Card key={this.props.id}>
          <CardBody>
            <CardTitle><RepoTitle {...this.props}/></CardTitle>

            <CardText>{this.props.description}</CardText>

            <CardText className="gh-stats">
              {renderIf(this.props.language, () => <Language {...this.props} />)}
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
