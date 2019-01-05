import App, { Container } from 'next/app'
import React from 'react'
import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import { page } from 'repo-components'
import { connect, Provider } from 'react-redux'

import { makeStore } from '../store'
import { dataPoll } from '../store/actions'

import '../lib/styles.sass'

const mapStateToProps = ({ data, hasFetchedOnce, requestHistory }) => ({
  hasInitialized: hasFetchedOnce,
  repos: data.repos,
  requestHistory,
  createdAt: data.createdAt
})

const BuildDateLayout = ({ createdAt, children }) => <page.Layout buildDate={createdAt}>{children}</page.Layout>

const BuildDateLayoutWithStore = connect(mapStateToProps)(BuildDateLayout)

class AppWithStore extends App {
  static async getInitialProps ({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
    return { pageProps }
  }

  componentDidMount () {
    console.debug(`App mounted, isServer=${this.props.isServer}`)
    this.props.store.dispatch(dataPoll())
  }

  render () {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <BuildDateLayoutWithStore>
            <Component {...pageProps} />
          </BuildDateLayoutWithStore>
        </Provider>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startDataPoll: bindActionCreators(dataPoll, dispatch)
})

export default withRedux(makeStore, mapStateToProps, mapDispatchToProps)(AppWithStore)
