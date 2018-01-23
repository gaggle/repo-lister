import Link from 'next/link'
import { Component } from 'react'

import Clicker from '../components/clicker'
import data from '../data.json'
import Layout from '../components/layout'

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
        <Layout title={this.props.title}>
          <h1>{this.props.title}</h1>

          <p>{this.props.body}</p>

          <div className="mt-5">
            <Clicker/>
          </div>

          <Link href={'/'}>
            <a>Go back home</a>
          </Link>
        </Layout>
      </main>
    )
  }
}
