import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { CardColumns } from 'reactstrap'
import { connect } from 'react-redux'

import RepoCard from './repo-card'

export class RepoCards extends Component {

  static propTypes = {
    repoIds: PropTypes.arrayOf(PropTypes.any),
  }

  static defaultProps = {
    repoIds: [],
  }

  render () {
    return (
      <CardColumns>
        {this.props.repoIds.map(id =>
          <RepoCard key={id} id={id}/>
        )}
      </CardColumns>
    )
  }
}

const mapStateToProps = ({fetching, data}) => ({
  repoIds: Object.keys(data.repos),
})
export default connect(mapStateToProps, null)(RepoCards)
