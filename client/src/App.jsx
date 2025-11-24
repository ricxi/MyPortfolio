import { Outlet, BrowserRouter, Route, Routes } from 'react-router';
import { AuthProvider } from './contexts/AuthContext';
import Nav from './components/Nav';

function App() {
  return (
    <>
      <AuthProvider>
        <Nav />
        <main className='container'>
          <Outlet />
        </main>
      </AuthProvider>
    </>
  );
}

export default App;
