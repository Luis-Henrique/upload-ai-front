import * as React from 'react'
import * as ReactDOMClient from 'react-dom/client';
import { App } from './app'
import './index.css'

ReactDOMClient.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
