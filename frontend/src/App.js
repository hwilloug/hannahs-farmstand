import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import ProductPage from './pages/ProductPage';
import NavBar from './components/NavBar';
import { getCookie } from './utils/getCookie'
import {useEffect, useState} from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import UserPage from './pages/UserPage';

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
      element: <ProductPage />
    },
    {
      path: "account",
      element: <UserPage user={userDetail} />
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
    <div className="App">
      <NavBar user={userDetail} />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
