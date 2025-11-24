export const normalizeContactKeys = (contacts) =>
  contacts.map((contact) => {
    const { firstname, lastname, phone, ...rest } = contact;

    return {
      ...rest,
      firstName: firstname,
      lastName: lastname,
      contactNumber: phone,
    };
  });

export const normalizeProjectKeys = (projects) =>
  projects.map((project) => {
    const { firstname, lastname, ...rest } = project;

    return {
      ...rest,
      firstName: firstname,
      lastName: lastname,
    };
  });

export const normalizeQualificationKeys = (qualifications) =>
  qualifications.map((qualification) => {
    const { firstname, lastname, ...rest } = qualification;

    return {
      ...rest,
      firstName: firstname,
      lastName: lastname,
    };
  });
