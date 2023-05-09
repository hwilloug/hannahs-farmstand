import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { createLandingPage } from './pages/LandingPage';
import { createSignUpPage } from './pages/SignUpPage';
import { createProductPage } from './pages/ProductPage';
import NavBar from './components/NavBar';


const SignUpPage = createSignUpPage()
const LandingPage = createLandingPage()
const ProductPage = createProductPage()

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/sign_up",
    element: <SignUpPage />
  },
  {
    path: "products/:productId",
    element: <ProductPage />
  }
]);  

function App() {
  return (
    <div className="App">
      <NavBar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
