import Link from 'next/link'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Card, CardBody, CardText, CardTitle } from 'reactstrap'

import renderIf from '../lib/render-if'

import RepoTitle from './repo-card-title'
import { Issues, Language, PullRequests, ReadmeBadge } from './github-components'

export class RepoCard extends Component {

  static propTypes = {
    description: PropTypes.string,
    hasReadme: PropTypes.bool,
    id: PropTypes.any.isRequired,
    issues: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    language: PropTypes.string,
    owner_name: PropTypes.string.isRequired,
    owner_url: PropTypes.string,
    pullrequests: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    repo_name: PropTypes.string.isRequired,
    repo_url: PropTypes.string,
  }

  static defaultProps = {
    hasReadme: false
  }

  render () {
    return (
      <div className="RepoCard">
        <Card>
          <CardBody>
            <CardTitle><RepoTitle owner={this.props.owner_name}
                                  owner_url={this.props.owner_url}
                                  repo={this.props.repo_name}
                                  repo_url={this.props.repo_url}/></CardTitle>
            <CardText>{this.props.description}</CardText>
            <CardText className="gh-stats">
              {renderIf(this.props.language, () =>
                <Language language={this.props.language}/>
              )}
              {renderIf(this.props.issues, () =>
                <Issues count={this.props.issues} url={this.props.issues_url}/>
              )}
              {renderIf(this.props.pullrequests, () =>
                <PullRequests count={this.props.pullrequests} url={this.props.pullrequests_url}/>
              )}
              {renderIf(this.props.hasReadme, () => <ReadmeBadge/>)}
            </CardText>
            <CardText>
              <Link href={{pathname: '/repo', query: {id: this.props.id}}}
                    as={`/repo/${this.props.id}`}>
                <a>Details</a>
              </Link>
            </CardText>
          </CardBody>

        </Card>
        <style jsx>{`
        .RepoCard :global(.gh-stats > *) {
          margin: 1px 8px 1px 0;
        }
      `}</style>
      </div>
    )
  }
}
