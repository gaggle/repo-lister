import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'next/app'

export class IndexPage extends Component {
  static getInitialProps ({ query: { id } }) {
    return { id }
  }

  render () {
    return (
      <Container fluid>
        <h2 className='text-center display-4 mt-5 mb-2'>Repo</h2>
        <div>Oh hello</div>
        <div>{JSON.stringify(this.props)}</div>
      </Container>
    )
  }
}

export default connect()(IndexPage)
