import React, { Component } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardColumns,
  CardText,
  CardTitle,
  Container
} from 'reactstrap'
import lorem from 'lorem-ipsum'

import data from '../data.json'
import Layout from '../components/layout'

export default class extends Component {
  static async getInitialProps () {
    return {
      content: lorem({count: 10}),
      posts: data
    }
  }

  render () {
    return (
      <Layout {...this.props}>
        <Container fluid={true}>
          <h2 className="text-center display-4 mt-5 mb-2">List of posts</h2>
          <CardColumns column-count="2">
            {this.props.posts.map(el =>
              <Card key={el.id}>
                <CardBody>
                  <CardTitle tag="h2">{`${el.id} ${el.title}`}</CardTitle>
                  <CardText>{el.body}</CardText>
                  <Button className="btn-sm">More info</Button>
                </CardBody>
              </Card>
            )}
          </CardColumns>
        </Container>
      </Layout>
    )
  }
}
