import React, { Component } from 'react'
import { Container } from 'reactstrap'
import lorem from 'lorem-ipsum'

import data from '../data.json'
import Layout from '../components/layout'
import { RepoCards } from '../components/repo-card'

export default class extends Component {
  static async getInitialProps () {
    return {
      content: lorem({count: 10}),
      posts: data
    }
  }

  render () {
    return (
      <Layout {...this.props}>
        <Container fluid={true}>
          <h2 className="text-center display-4 mt-5 mb-2">List of posts</h2>
          <RepoCards>{this.props.posts}</RepoCards>
        </Container>
      </Layout>
    )
  }
}
