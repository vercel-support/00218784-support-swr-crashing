'use client'

// Error components must be Client Components

import { useEffect } from 'react'
import { Button, Typography } from 'antd'

const { Title } = Typography

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <Title level={3}>Something went wrong!</Title>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
      </body>
    </html>
  )
}
