import Link from 'next/link'
import React, { Component } from 'react'

export default class extends Component {

  renderLink () {
    return <Link {...this.props}>
      {this.props.children}
    </Link>
  }

  renderNoLink () {
    return <span {...this.props}>
      {this.props.children}
    </span>
  }

  render () {
    return this.props.href ? this.renderLink() : this.renderNoLink()
  }
}
