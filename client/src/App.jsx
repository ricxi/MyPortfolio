import { BrowserRouter, Route, Routes } from 'react-router';
import { AuthProvider } from './contexts/AuthContext';
import AuthedRoute from './routes/AuthedRoute';
import Nav from './components/Nav';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Qualifications from './pages/Qualifications';
import Projects from './pages/Projects';
import Services from './pages/Services';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Error from './pages/Error';
import Success from './pages/Success';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Nav />
        <main className='container'>
          <Routes>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='projects' element={<Projects />} />
            <Route
              path='qualifications'
              element={
                <AuthedRoute>
                  <Qualifications />
                </AuthedRoute>
              }
            />
            <Route path='contact' element={<Contact />} />
            <Route path='services' element={<Services />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='signin' element={<SignIn />} />
            <Route path='success' element={<Success />} />
            <Route path='error' element={<Error />} />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
