import React, { Component } from 'react'
import { Container } from 'reactstrap'

import Layout from '../components/layout'
import { RepoCards } from '../components/repo-card'

import fileData from '../data.json'

export default class extends Component {
  static async getInitialProps () {
    return {
      repos: fileData
    }
  }

  render () {
    return (
      <Layout {...this.props}>
        <Container fluid={true}>
          <h2 className="text-center display-4 mt-5 mb-2">List of repos</h2>
          <RepoCards>{this.props.repos}</RepoCards>
        </Container>
      </Layout>
    )
  }
}
