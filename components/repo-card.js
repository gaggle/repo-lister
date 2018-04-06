import Link from 'next/link'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Card, CardBody, CardText, CardTitle } from 'reactstrap'
import { connect } from 'react-redux'
import { join } from 'path'

import renderIf from '../lib/render-if'

import RepoTitle from './repo-card-title'
import { Issues, Language, PullRequests, ReadmeBadge } from './github-components'

export class RepoCard extends Component {

  static propTypes = {
    badges: PropTypes.array,
    description: PropTypes.string,
    has_readme: PropTypes.bool,
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
    badges: [],
    has_readme: false,
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
              {renderIf(this.props.issues !== undefined, () =>
                <Issues count={this.props.issues} url={this.props.issues_url}/>
              )}
              {renderIf(this.props.pullrequests !== undefined, () =>
                <PullRequests count={this.props.pullrequests} url={this.props.pullrequests_url}/>
              )}
              {renderIf(this.props.has_readme, () => <ReadmeBadge/>)}
            </CardText>
            <CardText className="readme-info">
              {this.props.badges.map(el => <img src={join('repos', el.src)}/>)}
            </CardText>
            <CardText>
              <Link href={{pathname: '/repos', query: {id: this.props.id}}}
                    as={`/repos/${this.props.id}`}>
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

const mapStateToProps = ({data}, {id}) => {
  const repo = data.repos[id]
  return {
    badges: repo.badges,
    description: repo.description,
    has_readme: !!repo.readme_html,
    issues: repo.open_issues,
    issues_url: repo.open_issues_html_url,
    language: repo.language,
    owner_name: repo.owner_name,
    owner_url: repo.owner_html_url,
    pullrequests: repo.open_pullrequests,
    pullrequests_url: repo.open_pullrequests_html_url,
    repo_name: repo.repo_name,
    repo_url: repo.repo_html_url,
  }
}
export default connect(mapStateToProps, null)(RepoCard)
