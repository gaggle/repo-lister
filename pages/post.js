import Head from 'next/head'
import Link from 'next/link'
import { Component } from 'react'

import data from '../data.json'

export default class extends Component {
  static async getInitialProps ({query}) {
    const post = {
      id: 1,
      title: `title for ${query.id}`,
      body: data[query.id - 1].body
    }
    return {...post}
  }

  render () {
    return (
      <main>
        <Head>
          <title>{this.props.title}</title>
        </Head>

        <h1>{this.props.title}</h1>

        <p>{this.props.body}</p>
        <Link href={'/'}>
          <a>Go back home</a>
        </Link>
      </main>
    )
  }
}
