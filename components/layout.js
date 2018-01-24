import Head from 'next/head'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { Component, Fragment } from 'react'
import { Container, Navbar, NavbarBrand } from 'reactstrap'

import Timestamp from './timestamp'

import Styles from '../css/index.scss'

export default class extends Component {

  static propTypes () {
    return {
      children: PropTypes.object.isRequired,
      fluid: PropTypes.boolean
    }
  }

  render () {
    return (
      <Fragment>
        <Head>
          <meta charSet="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <title>{this.props.title || ''}</title>
          <style dangerouslySetInnerHTML={{__html: Styles}}/>
        </Head>

        <Navbar light className="navbar navbar-expand-md pt-3 pb-3">
          <Link href="/">
            <NavbarBrand href="/">
              <span className="icon ion-md-home mr-1"/>Home
            </NavbarBrand>
          </Link>
        </Navbar>

        {this.props.children}

        <footer>
          <Container className="col-md-offset-3 text-center">
            <hr className="mt-3"/>
            <p className="text-muted small">
              <span> Updated </span>
              <Timestamp className="font-weight-bold">
                {this.props.buildDate}
              </Timestamp>
              <span>, built with </span>
              <Link href="https://github.com/zeit/next.js">
                <a className="text-muted font-weight-bold">Next.js</a>
              </Link>
              .
            </p>
          </Container>
        </footer>

      </Fragment>
    )
  }
}
