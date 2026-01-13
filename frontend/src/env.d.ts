interface Window {
  _ENV?: {
    VITE_API_BASE_URL?: string
    [key: string]: string | undefined
  }
}

declare module '*.svg?react' {
  import * as React from 'react'
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default ReactComponent
}
