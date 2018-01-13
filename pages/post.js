import Head from 'next/head'
import Link from 'next/link'
import { Component } from 'react'

import Clicker from '../components/Clicker'
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

        <div className="mt-5">
          <Clicker/>
        </div>

        <Link href={'/'}>
          <a>Go back home</a>
        </Link>
      </main>
    )
  }
}
