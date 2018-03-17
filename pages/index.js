import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import { Container } from 'reactstrap'

import Layout from '../components/layout'
import RepoCards from '../components/repo-cards'
import { initStore } from '../store/index'
import { renderIfElse } from '../lib/render-if'
import { startDataPoll } from '../store/actions'

export class IndexPage extends Component {

  static getInitialProps ({isServer}) {
    return {isServer}
  }

  componentDidMount () {
    this.props.startDataPoll(this.props.isServer)
  }

  render () {
    return (
      <Layout>
        <Container fluid={true}>
          <h2 className="text-center display-4 mt-5 mb-2">List of repos</h2>
          {renderIfElse(this.props.hasInitialized,
            () => <RepoCards/>,
            () => <div>Loading...</div>,
          )}
        </Container>
      </Layout>
    )
  }
}

const mapStateToProps = ({initialized}) => ({
  hasInitialized: initialized,
})

const mapDispatchToProps = (dispatch) => ({
  startDataPoll: bindActionCreators(startDataPoll, dispatch)
})

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(IndexPage)
