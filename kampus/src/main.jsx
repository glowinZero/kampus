import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from "react-router-dom"
import { AuthProviderWrapper } from './Context/auth.context.jsx'
import {NextUIProvider} from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
    <Router>
      <AuthProviderWrapper>
        <App/>
      </AuthProviderWrapper>
    </Router>
  </NextUIProvider>
  </React.StrictMode>,
)
