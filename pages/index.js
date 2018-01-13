import React, { Component } from 'react'

import data from '../data.json'
import Layout from '../components/Layout'
import Post from '../components/Post'

export default class extends Component {
  static async getInitialProps () {
    return {posts: data}
  }

  render () {
    return (
      <main>
        <Layout>
          <h1>List of posts</h1>
          <section>
            {this.props.posts.map(post => <Post {...post} key={post.id}/>)}
          </section>
        </Layout>
      </main>
    )
  }
}
