import React from 'react'
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'

export default class TaskilityDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    const cache = createCache() // Required for antd 5.x

    try {
      // eslint-disable-next-line
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props =>
            (
              <StyleProvider cache={cache}>
                <App {...props} />
              </StyleProvider>
            ),
          // sheet.collectStyles(<App {...props} />)
        })
      const initialProps = await Document.getInitialProps(ctx)
      const antdStyle = extractStyle(cache, true) //  Required for antd 5.x
      const styles = (
        // eslint-disable-next-line react/react-in-jsx-scope
        <div id="taskility-document-styles">
          {initialProps.styles}
          {sheet.getStyleElement()}
          {/* eslint-disable-next-line react/no-danger */}
          <style dangerouslySetInnerHTML={{ __html: antdStyle }} />
        </div>
      )
      return { ...initialProps, styles }
    } finally {
      sheet.seal()
    }
  }
}
