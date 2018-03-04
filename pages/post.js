import Link from 'next/link'
import React, { Component } from 'react'

import Clicker from '../components/clicker'
import Layout from '../components/layout'

import data from '../data.json'

export default class extends Component {
  static async getInitialProps ({query}) {
    const datum = data[query.id - 1]
    const post = {
      id: 1,
      title: `title for ${query.id}`,
      body: datum ? datum.body : undefined
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
