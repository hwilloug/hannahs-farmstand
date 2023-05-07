import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import { createSignUpPage } from './pages/SignUpPage';
import NavBar from './components/NavBar';


const SignUpPage = createSignUpPage()

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/sign_up",
    element: <SignUpPage />
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
