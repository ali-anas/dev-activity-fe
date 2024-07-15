import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <React.StrictMode>
      <ChakraProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ChakraProvider>
    </React.StrictMode>
  </Router>,
)
