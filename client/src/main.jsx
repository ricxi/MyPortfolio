import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import './index.css';
import { router } from './routes/Router';

// import AuthedRoute from './routes/AuthedRoute';
// import App from './App';
// import Home from './pages/Home';
// import About from './pages/About';
// import Projects from './pages/Projects';
// import Qualifications from './pages/Qualifications';
// import Contact from './pages/Contact';
// import Services from './pages/Services';
// import SignUp from './pages/SignUp';
// import SignIn from './pages/SignIn';
// import Success from './pages/Success';
// import Error from './pages/Error';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children: [
//       { path: '', element: <Home /> },
//       { path: 'about', element: <About /> },
//       {
//         path: 'projects',
//         element: (
//           <AuthedRoute>
//             <Projects />
//           </AuthedRoute>
//         ),
//       },
//       {
//         path: 'qualifications',
//         element: (
//           <AuthedRoute>
//             <Qualifications />
//           </AuthedRoute>
//         ),
//       },
//       {
//         path: 'contact',
//         element: (
//           <AuthedRoute>
//             <Contact />
//           </AuthedRoute>
//         ),
//       },
//       { path: 'services', element: <Services /> },
//       { path: 'signup', element: <SignUp /> },
//       { path: 'signin', element: <SignIn /> },
//       { path: 'success', element: <Success /> },
//       { path: 'error', element: <Error /> },
//     ],
//   },
// ]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
