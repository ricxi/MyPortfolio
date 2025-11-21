
const validateSignin = (req) => {
  let fields = [];

  if (!req.user.email)  {
    fields = [...fields, {email: "missing"}]
  }

  if (!req.user.password) {
    fields = [...fields, {password: "missing"}]
  }

  if (fields.length === 0) return null;

  return ({ error: "Missing or invalid fields", fields });
}

module.exports = { validateSignin };