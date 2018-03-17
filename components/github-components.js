import GithubColors from 'github-colors'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { capitalize } from 'lodash'

import OptionalLink from './optional-link'

export class Issues extends Component {

  static propTypes = {
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    url: PropTypes.string,
  }

  render () {
    return (
      <span className="issues-badge">
        <OptionalLink href={this.props.url}><a>
          <span className="icon ion-md-information-circle mr-1"/>
          {this.props.count}
        </a></OptionalLink>
        <style jsx>{`
          .issues-badge {
            display: inline-block;
            white-space: nowrap;
          }
        `}</style>
      </span>
    )
  }
}

export class Language extends Component {

  static propTypes = {
    language: PropTypes.string.isRequired,
  }

  constructor (props) {
    super(props)
    const lookup = GithubColors.get(props.language)
    if (!lookup) {
      console.warn(`Could not identify language '${props.language}'`)
    }
    this.color = lookup ? lookup.color : undefined
    this.text = lookup ? capitalize(lookup.ace_mode) : props.language
  }

  render () {
    return (
      <span className="language-container">
        <span style={{color: this.color}} className="color">●</span>
        <span className="text">{this.text}</span>
        <style jsx>{`
          .language-container {
            display: inline-block;
            white-space: nowrap;
          }
          .color {
            padding-right: 4px;
          }
        `}</style>
      </span>
    )
  }
}

export class PullRequests extends Component {

  static propTypes = {
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    url: PropTypes.string,
  }

  render () {
    return (
      <span className="pr-badge">
        <OptionalLink href={this.props.url}><a>
          <span className="icon ion-md-git-pull-request mr-1"/>
          {this.props.count}
        </a></OptionalLink>
        <style jsx>{`
          .pr-badge {
            display: inline-block;
            white-space: nowrap;
          }
        `}</style>
      </span>
    )
  }
}

export class ReadmeBadge extends Component {

  render () {
    return (
      <span className="readme-container">
        <span title="Has README.md" className="icon ion-md-book mr-1"/>
        <style jsx>{`
          .readme-container {
            display: inline-block;
            white-space: nowrap;
          }
        `}</style>
      </span>
    )
  }
}
