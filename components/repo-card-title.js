import PropTypes from 'prop-types'
import React, { Component } from 'react'

import OptionalLink from './optional-link'

export default class extends Component {

  static propTypes = {
    owner: PropTypes.string.isRequired,
    owner_url: PropTypes.string,
    repo: PropTypes.string.isRequired,
    repo_url: PropTypes.string,
  }

  render () {
    return (
      <div>
        <OptionalLink href={this.props.owner_url}>
          <a>{this.props.owner}</a>
        </OptionalLink>
        {' / '}
        <OptionalLink href={this.props.repo_url}>
          <a>{this.props.repo}</a>
        </OptionalLink>
      </div>
    )
  }
}
