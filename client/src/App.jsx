import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AuthProvider } from './contexts/AuthContext';
import Nav from './components/Nav';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Education from './pages/Education';
import Projects from './pages/Projects';
import Services from './pages/Services';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Error from './pages/Error';

function App() {
  const [userInfo, setUserInfo] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const submitUserInfo = (contactInformation) => {
    setUserInfo(contactInformation);
    setHasSubmitted(true);
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Nav />
        <main className='container'>
          <Routes>
            <Route
              index
              element={<Home userInfo={userInfo} hasSubmitted={hasSubmitted} />}
            />
            <Route path='about' element={<About />} />
            <Route path='projects' element={<Projects />} />
            <Route path='education' element={<Education />} />
            <Route path='services' element={<Services />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='signin' element={<SignIn />} />
            <Route path='error' element={<Error />} />
            <Route
              path='contact'
              element={<Contact onSubmitContactForm={submitUserInfo} />}
            />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
