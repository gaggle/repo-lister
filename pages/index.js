import Head from 'next/head'
import { Component } from 'react'

import data from '../data.json'
import Post from '../components/post'

export default class extends Component {
  static async getInitialProps () {
    return {posts: data}
  }

  render () {
    return (
      <main>
        <Head>
          <title>Home page</title>
        </Head>

        <h1>List of posts</h1>

        <section>
          {this.props.posts.map(post => <Post {...post} key={post.id}/>)}
        </section>
      </main>
    )
  }
}
