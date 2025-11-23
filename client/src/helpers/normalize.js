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
