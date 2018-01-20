import Link from 'next/link'
import React from 'react'

export default function (props) {
  return <article>
    <h2>{props.title}</h2>
    <p>{props.body}</p>
    {/* render the URL as /post/:id */}
    <Link href={{pathname: '/post', query: {id: props.id}}}
          as={`/post/${props.id}`}>
      <a>Read more...</a>
    </Link>
  </article>
}
