import Link from 'next/link'
import Parser from 'html-react-parser'
import React, { Component } from 'react'
import { pick } from 'lodash'

import Layout from '../components/layout'
import RepoTitle from '../components/repo-card-title'

import fileData from '../data.json'

export default class extends Component {
  static async getInitialProps ({query}) {
    const repo = fileData[query.full_name] || {}
    return {repo: repo}
  }

  render () {
    return (
      <main>
        <Layout title={`Details of ${this.props.repo.data.full_name}`}>
          <RepoTitle {...this.props.repo.data}/>
          <div>{this.props.repo.data.description}</div>
          <Link href={'/'}><a>Go back home</a></Link>
          <div>Readme:</div>
          <div>{Parser(this.props.repo.readme)}</div>
        </Layout>
      </main>
    )
  }
}
