import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'next/app'
import { page, repocards, renderprops } from 'repo-components'

const mapStateToProps = ({data, hasFetchedOnce, requestHistory}) => ({
  hasInitialized: hasFetchedOnce,
  repos: data.repos,
  requestHistory,
})

const LoadingRepocards = ({repos, hasInitialized}) => <renderprops.RenderIfElse
  test={hasInitialized}
  pass={() =>
    <page.Masonry>
      {Object.entries(repos).map(([key, value], index) =>
        <repocards.RepoCard key={key} data-index={index} {...value}/>
      )}
    </page.Masonry>}
  fail={() => <page.Loading/>}
>
</renderprops.RenderIfElse>

const LoadingRepocardsWithStore = connect(mapStateToProps)(LoadingRepocards)

export class IndexPage extends Component {
  render () {
    return <Container>
      <LoadingRepocardsWithStore/>
    </Container>
  }
}

export default connect(mapStateToProps)(IndexPage)
