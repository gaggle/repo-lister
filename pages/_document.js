import React from 'react'
import NextDocument, { Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render () {
    return (
      <html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
