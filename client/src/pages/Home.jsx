import { NavLink } from 'react-router';

const Home = ({ userInfo, hasSubmitted }) => {
  return (
    <>
      {hasSubmitted ? (
        <p className='panel modal-msg'>{addMessageToHomePage(userInfo)} </p>
      ) : (
        ''
      )}
      <h1>Home</h1>
      <article className='btm-border'>
        Welcome! This is my little corner of the internet for low-stress
        building and learning out loud. Browse a project, read a quick note,
        checkout my services, or just enjoy the vibes. I&#39;m here for small
        steps and good energy. No rush—grab a coffee, poke around, and have fun.
      </article>
      <article className='btm-border'>
        I&#39;m here to keep things simple and a bit playful. I make small
        improvements, share what I learn, and try to leave every day better than
        I found it. Little by little adds up, balance over burnout. I remind
        myself to breathe, take breaks, and enjoy the moment. I&#39;m okay with
        second tries and slow, steady steps.
      </article>
      <article className='home-p'>
        <div style={{ marginBottom: '7px' }}>Checkout my other pages.</div>
        <NavLink to='projects' className='nav-link-home'>
          Projects
        </NavLink>
        <NavLink to='about' className='nav-link-home'>
          About Me
        </NavLink>
        <NavLink to='education' className='nav-link-home'>
          Education
        </NavLink>
        <NavLink to='services' className='nav-link-home'>
          Services Offered
        </NavLink>
        <NavLink to='contact' className='nav-link-home'>
          Contact Information
        </NavLink>
      </article>
    </>
  );
};

const addMessageToHomePage = (userInfo) => {
  /* Adds a messge to the home page when the user submits their information on the Contact Information Page */
  return (
    'Hello, ' +
    userInfo.firstName +
    '! Thank you for your message. We will try to get back to you as soon as we can.'
  );
};

export default Home;
