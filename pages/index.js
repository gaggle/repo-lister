import React, { Component } from 'react'
import { Container } from 'reactstrap'
import lorem from 'lorem-ipsum'

import data from '../data.json'
import Layout from '../components/layout'
import Post from '../components/post'

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
        <Container>
          <h2 className="text-center display-4 mt-5 mb-2">Headline</h2>
          <div>{this.props.content}</div>
          <h2 className="text-center display-4 mt-5 mb-2">List of posts</h2>
          <section>
            {this.props.posts.map(post => <Post {...post} key={post.id}/>)}
          </section>
        </Container>
      </Layout>
    )
  }
}
