const About = () => {
  return (
    <>
      <h1>About Me</h1>
      <article className='grid-wrapper'>
        <h2>Richard Xiong</h2>
        <img src='/profile_pic.jpeg' alt='image not found' />
        <p>
          I&#39;m a software student and game developer based in Ottawa,
          Ontario. I focus on building clear, reliable, and fun projects.
          Outside of school, you&#39;ll usually find me hiking local trails with
          my dogs, or in the shop working on woodworking projects. I&#39;m
          happiest outdoors, I like camping when I can, and I try to keep life
          balanced—learning new skills, staying active, and hanging out with
          friends, family, and my pups.
        </p>
      </article>
      <p>
        <a href='/rxiong_resume_2025.pdf' download='resume.pdf'>
          Here is a link to my resume.
        </a>
      </p>
    </>
  );
};

export default About;
