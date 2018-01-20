import React, { Component } from 'react'
import { distanceInWords, format } from 'date-fns'

import { getDatetime } from '../lib/dates'

export default class Timestamp extends Component {
  static pooledElements = []
  static pooledTimer = null
  static pooledInterval = 1000

  static defaultProps = {
    filter: (d) => { return d },
    onChange: () => {}
  }

  constructor (props) {
    super(props)

    if (props.date && props.children) {
      throw new Error('Cannot specify both date and children')
    }
    this.state = {
      content: '',
      start: getDatetime(props.date || props.children || new Date()),
    }
  }

  componentWillMount () {
    this.update()
  }

  componentWillReceiveProps () {
    this.update()
  }

  componentWillUnmount () {
    removePooledElement(this)
  }

  componentDidMount () {
    ensurePooledTimer(this.pooledInterval)
    pushPooledElement(this)
  }

  /**
   * Update this.state.content
   */
  update () {
    const datetime = getDatetime(this.state.start)
    const content = distanceInWords(
      new Date(),
      datetime,
      {addSuffix: true, includeSeconds: true}
    )
    this.setState({content}, () => {
      this.props.onChange(content)
    })
  }

  render () {
    return (
      <time title={format(this.state.start, 'MMMM Do YYYY, HH:mm:ss')}
            data-datetime={format(this.state.start)}
            data-dateepoch={this.state.start.getTime()}>
        {this.state.content}
      </time>
    )
  }
}

function ensurePooledTimer (interval) {
  if (Timestamp.pooledTimer) return

  Timestamp.pooledTimer = setInterval(() => {
    Timestamp.pooledElements.forEach(element => {
      element.update()
    })
  }, interval)
}

export function clearPooledTimer () {
  if (!Timestamp.pooledTimer) return

  clearInterval(Timestamp.pooledTimer)
  Timestamp.pooledTimer = null
  Timestamp.pooledElements = []
}

function pushPooledElement (element) {
  if (!(element instanceof Timestamp)) {
    throw new Error('Element not an instance of Timestamp')
  }
  if (Timestamp.pooledElements.indexOf(element) === -1) {
    Timestamp.pooledElements.push(element)
  }
}

function removePooledElement (element) {
  if (!(element instanceof Timestamp)) {
    throw new Error('Element not an instance of Timestamp')
  }
  const index = Timestamp.pooledElements.indexOf(element)
  if (index !== -1) {
    Timestamp.pooledElements.splice(index, 1)
  }
}
