import Link from 'next/link'
import Parser from 'html-react-parser'
import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'

import Layout from '../components/layout'
import renderIf, { renderIfElse } from '../lib/render-if'
import RepoTitle from '../components/repo-card-title'
import { initStore } from '../store/index'
import { guardedStartDataPoll } from '../store/actions'

export class RepoPage extends Component {

  static getInitialProps ({isServer, query}) {
    return {isServer, query}
  }

  componentDidMount () {
    this.props.startDataPoll(this.props.isServer)
  }

  render () {
    return renderIfElse(this.props.hasInitialized,
      () =>
        <Layout title={this.props.full_name ? `Details of ${this.props.full_name}` : 'Loading...'}>
          <h1><RepoTitle owner={this.props.owner}
                         owner_url={this.props.owner_url}
                         repo={this.props.repo}
                         repo_url={this.props.repo_url}/></h1>
          <div className="lead">{this.props.description}</div>
          <Link href={'/'}><a>Go back home</a></Link>
          {renderIf(this.props.readme_html, () =>
            <div className='readme'>
              <h2>Readme:</h2>
              <div>{Parser(this.props.readme_html)}</div>
            </div>)}
        </Layout>
      ,
      () => <div>Loading...</div>)
  }
}

const mapStateToProps = ({data, fetching, initialized}, {isServer, query}) => {
  const repo = data.repos[query.id] || {}
  return {
    description: repo.description,
    full_name: repo.full_name,
    hasInitialized: initialized,
    isFetching: fetching,
    owner: repo.owner_name,
    owner_url: repo.owner_html_url,
    readme_html: repo.readme_html,
    repo: repo.repo_name,
    repo_url: repo.repo_html_url,
  }
}

const mapDispatchToProps = (dispatch) => ({
  startDataPoll: bindActionCreators(guardedStartDataPoll, dispatch)
})

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(RepoPage)
