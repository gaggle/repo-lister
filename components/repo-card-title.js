import Link from 'next/link'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class extends Component {

  static propTypes = {
    html_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      html_url: PropTypes.string.isRequired,
      login: PropTypes.string.isRequired,
    }),
  }

  static defaultProps = {
    html_url: 'html_url',
    name: 'name',
    owner: {
      html_url: 'html_url',
      login: 'login',
    },
  }

  render () {
    return (
      <div>
        <Link href={this.props.owner.html_url}>
          <a>{this.props.owner.login}</a>
        </Link>
        {' / '}
        <Link href={this.props.html_url}>
          <a>{this.props.name}</a>
        </Link>
      </div>
    )
  }
}
