import { createBrowserRouter } from 'react-router';
import ProtectedRoute from './ProtectedRoute.jsx';

import App from '../App';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Qualifications from '../pages/Qualifications';
import Projects from '../pages/Projects';
import Services from '../pages/Services';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Error from '../pages/Error';
import Success from '../pages/Success';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Home /> },
      { path: 'about', element: <About /> },
      {
        path: 'projects',
        element: (
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        ),
      },
      {
        path: 'qualifications',
        element: (
          <ProtectedRoute>
            <Qualifications />
          </ProtectedRoute>
        ),
      },
      {
        path: 'contact',
        element: (
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        ),
      },
      { path: 'services', element: <Services /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'signin', element: <SignIn /> },
      { path: 'success', element: <Success /> },
      { path: 'error', element: <Error /> },
    ],
  },
]);
