import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import CssBaseline from '@mui/material/CssBaseline'
import { Auth0Provider } from "@auth0/auth0-react"
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'


const root = ReactDOM.createRoot(document.getElementById('root'));

const stripePromise = loadStripe('pk_test_51N72XUJIv5MHSkRBaAkGOGc8cJLctl6AA13iIm2EVgnrV8YEi15cUyBVsf7bzAtu4rJkT6XaSxkWV8EdJKHy6sYp00gAAX1mIs')
const options = {}

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <Elements stripe={stripePromise} options={options}>
        <CssBaseline />
        <App />
      </Elements>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
