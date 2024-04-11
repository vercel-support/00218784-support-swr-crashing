'use client'

import React from 'react'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import type Entity from '@ant-design/cssinjs/es/Cache'
import { useServerInsertedHTML } from 'next/navigation'

// const StyledComponentsRegistry = ({ children }: React.PropsWithChildren) =>

function StyledComponentsRegistry({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  const cache = React.useMemo<Entity>(() => createCache(), [])
  useServerInsertedHTML(() => (
    // eslint-disable-next-line react/no-danger
    <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />
  ))
  return <StyleProvider cache={cache}>{children}</StyleProvider>
}

export default StyledComponentsRegistry
