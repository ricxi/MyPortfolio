import React from 'react';

const Projects = () => {
  return (
    <>
      <h1>Projects Page</h1>
      <article>Here are three projects that I'm currently working on.</article>
      <section className='grid-wrapper'>
        <h2>Space Invaders Game</h2>
        <img
          src='/space_invader.svg'
          alt='image not found'
          className='img-project'
        />
        <p>
          In my game programming class, I am working with a team to build a 2D
          Space Invaders–style shooter game, designing and programming core
          gameplay systems—player movement, enemy waves, collision detection,
          sprite animation, and escalating difficulty—while keeping the code
          clean and modular. I am responsible for controls and the collision
          system, and review code to maintain standards. The current build is
          still in development.
        </p>
      </section>
      <section className='grid-wrapper'>
        <h2>Maze Adventure Game</h2>
        <img
          src='/maze_game.jpg'
          alt='image not found'
          className='img-project'
        />
        <p>
          In my game simulation course, I am developing a 3D maze adventure
          game. The game design document was just submitted last week, so it is
          still in its initial phase. I plan to work as a solo developer. I will
          be focusing on procedural generation, pathfinding, and puzzle-driven
          exploration. The current outcome is a prototype plan with defined
          milestones; near-term goals to validate movement, and readability.{' '}
        </p>
      </section>
      <section className='grid-wrapper btm-border'>
        <h2>Wooden Stool</h2>
        <img src='/stools.jpg' alt='image not found' className='img-project' />
        <p>
          I'm currently working on a woodworking project (one of my hobby side
          projects). I'm building a small stool from pre-milled boards with
          mortise-and-tenon joinery. I'll be shaping the seat and legs,
          dry-fitting, refining with a block plane, then sanding and finishing.
          I have never documented a woodworking project, but I have seen other
          carpenters do so with great success. The more I do woodworking, the
          more it reminds me of building software.
        </p>
      </section>
    </>
  );
};

export default Projects;
