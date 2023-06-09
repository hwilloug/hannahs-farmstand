import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import ProductPage from './pages/ProductPage';
import NavBar from './components/NavBar';
import { getCookie } from './utils/getCookie'
import {useEffect, useState} from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import UserPage from './pages/UserPage';
import './App.css'
import Footer from './components/Footer';
import CartPage from './pages/CartPage';

function App() {

  const { user, isAuthenticated } = useAuth0()

  const [userDetail, setUserDetail] = useState()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />
    },
    {
      path: "products/:productId",
      element: <ProductPage user={userDetail} />
    },
    {
      path: "account",
      element: <UserPage user={userDetail} />
    },
    {
      path: "cart",
      element: <CartPage user={userDetail} />
    }
  ]);  

  const whoAmI = async () => {
    if (isAuthenticated) {
      const response = await axios({
        url: `/api/whoami/`,
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        },
        data: {
            username: user.email
        }
      })
      setUserDetail(response.data)
    }
  }

  useEffect(() => {
    whoAmI()
  }, [user])

  return (
    <div id="App">
      <NavBar user={userDetail} />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;
