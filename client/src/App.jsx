import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import Nav from './components/Nav';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Education from './components/Education';
import Projects from './components/Projects';
import Services from './components/Services';

function App() {
  const [userInfo, setUserInfo] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const submitUserInfo = (contactInformation) => {
    setUserInfo(contactInformation);
    setHasSubmitted(true);
  };

  return (
    <BrowserRouter>
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
          <Route
            path='contact'
            element={<Contact onSubmitContactForm={submitUserInfo} />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
