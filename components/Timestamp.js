import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { distanceInWords, format } from 'date-fns'

import { getDatetime } from '../lib/dates'

class Moment extends Component {
  static pooledElements = []
  static pooledTimer = null

  static propTypes = {
    interval: PropTypes.number
  }

  static defaultProps = {
    filter: (d) => { return d },
    interval: 1000,
    onChange: () => {}
  }

  constructor (props) {
    super(props)
    if (!Moment.pooledTimer) {
      startPooledTimer(props.interval)
    }

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

  componentDidMount () {
    pushPooledElement(this)
  }

  componentWillReceiveProps (nextProps) {
    this.update()
  }

  componentWillUnmount () {
    this.clearTimer()
  }

  clearTimer () {
    removePooledElement(this)
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

function startPooledTimer (interval) {
  clearPooledTimer()
  Moment.pooledTimer = setInterval(() => {
    Moment.pooledElements.forEach(element => {
      element.update()
    })
  }, interval)
}

function clearPooledTimer () {
  if (Moment.pooledTimer) {
    clearInterval(Moment.pooledTimer)
    Moment.pooledTimer = null
    Moment.pooledElements = []
  }
}

function pushPooledElement (element) {
  if (!(element instanceof Moment)) {
    throw new Error('Element not an instance of Moment')
  }
  if (Moment.pooledElements.indexOf(element) === -1) {
    Moment.pooledElements.push(element)
  }
}

function removePooledElement (element) {
  if (!(element instanceof Moment)) {
    throw new Error('Element not an instance of Moment')
  }
  const index = Moment.pooledElements.indexOf(element)
  if (index !== -1) {
    Moment.pooledElements.splice(index, 1)
  }
}

export default Moment
