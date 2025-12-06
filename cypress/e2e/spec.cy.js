Cypress.Commands.add('generateUniqueEmail', () => {
  const randomId = `${Date.now()}-${Cypress._.random(0, 1e9)}`;
  return `user${randomId}@courriel.ca`;
});

describe('check that protected routes cannot be accessed if not signed in', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('projects route: should redirect user to sign in page', () => {
    cy.visit('/projects');
    cy.url().should('include', '/signin');
  });

  it('qualifications route: redirect user to sign in page if not signed in', () => {
    cy.visit('/qualifications');
    cy.url().should('include', '/signin');
  });

  it('contact route: redirect user to sign in page if not signed in', () => {
    cy.visit('/contact');
    cy.url().should('include', '/signin');
  });
});

describe('sign up user', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('redirect user to signin page after signing up', () => {
    cy.visit('/signup');
    cy.generateUniqueEmail().then((email) => {
      cy.get('input[name="fullName"]').type('prenom surnom');
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type('motdepass');
      cy.get('button[type="submit"]').click();
    });
    cy.url().should('include', '/signin');
  });
});

describe('sign up fails (user already exists)', () => {
  beforeEach(() => {
    cy.clearLocalStorage();

    cy.generateUniqueEmail().then((email) => {
      cy.wrap({ email, password: 'motdepass' }).as('creds');
    });

    cy.get('@creds').then(({ email, password }) => {
      cy.visit('/signup');
      cy.get('input[name="fullName"]').type('prenom surnom');
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/signin');
    });
  });

  it('redirects user to error page', () => {
    cy.get('@creds').then(({ email, password }) => {
      cy.visit('/signup');
      cy.get('input[name="fullName"]').type('prenom surnom');
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/error');
    });
  });
});

describe('sign in fail (user not created)', () => {
  it('redirect user to error page when signing in fails', () => {
    cy.visit('/signin');
    cy.generateUniqueEmail().then((email) => {
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type('motdepass');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/error');
    });
  });
});

describe('sign in user', () => {
  beforeEach(() => {
    cy.clearLocalStorage();

    cy.generateUniqueEmail().then((email) => {
      cy.wrap({ email, password: 'motdepass' }).as('creds');
    });

    cy.get('@creds').then(({ email, password }) => {
      cy.visit('/signup');
      cy.get('input[name="fullName"]').type('prenom surnom');
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/signin');
    });
  });

  it('redirect user to home page after signing in', () => {
    cy.get('@creds').then(({ email, password }) => {
      cy.visit('/signin');
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/');
      cy.window().then((win) => {
        expect(win.localStorage.getItem('bearerToken')).to.not.be.null;
        expect(win.localStorage.getItem('userId')).to.not.be.null;
        expect(win.localStorage.getItem('userRole')).to.not.be.null;
      });
    });
  });
});

describe('sign out user', () => {
  beforeEach(() => {
    cy.clearLocalStorage();

    cy.generateUniqueEmail().then((email) => {
      cy.wrap({ email, password: 'motdepass' }).as('creds');
    });

    cy.get('@creds').then(({ email, password }) => {
      cy.visit('/signup');
      cy.get('input[name="fullName"]').type('prenom surnom');
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/signin');
    });
  });

  it('redirect user to home page after signing in', () => {
    cy.get('@creds').then(({ email, password }) => {
      cy.visit('/signin');
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/');

      cy.get('button[name="signout"').click();

      cy.window().then((win) => {
        expect(win.localStorage.getItem('bearerToken')).to.be.null;
        expect(win.localStorage.getItem('userId')).to.be.null;
        expect(win.localStorage.getItem('userRole')).to.be.null;
      });
    });
  });
});

describe('Check if all protected routes are accessible after signing in', () => {
  beforeEach(() => {
    cy.clearLocalStorage();

    cy.generateUniqueEmail().then((email) => {
      cy.wrap({ email, password: 'motdepass' }).as('creds');
    });

    cy.get('@creds').then(({ email, password }) => {
      cy.visit('/signup');
      cy.get('input[name="fullName"]').type('prenom surnom');
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();

      cy.get('@creds').then(({ email, password }) => {
        cy.visit('/signin');
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="password"]').type(password);
        cy.get('button[type="submit"]').click();
      });
    });
  });

  it('projects route is accessible', () => {
    cy.visit('/projects');
    cy.url().should('include', '/projects');
  });

  it('qualifications route is accessible', () => {
    cy.visit('/projects');
    cy.url().should('include', '/projects');
  });

  it('contact route is accessible', () => {
    cy.visit('/projects');
    cy.url().should('include', '/projects');
  });
});
